import { build, loadEnv } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const env = { ...loadEnv('production', root, ''), ...process.env }
const preview = process.argv.includes('--preview-only')
const origin = 'https://www.kirandermatology.com'
const staticRoutes = ['/', '/about', '/services', '/blog', '/contact', '/appointment']
let snapshot = { services: [], blogs: [] }
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY
if (!preview && (!url || !key)) {
  throw new Error('Production SEO build requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Configure .env.local or deployment environment. For a noindex local-only check use npm run build:preview.')
}
async function publicRows(table, query) {
  const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Range: '0-999', Prefer: 'count=exact' },
    signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) throw new Error(`Public ${table} fetch failed (${response.status}). Check public SELECT RLS and build env; do not use a service-role key.`)
  const rows = await response.json()
  if (!Array.isArray(rows)) throw new Error(`Invalid ${table} response`)
  const total = response.headers.get('content-range')?.split('/')[1]
  if (total && total !== '*' && Number(total) > rows.length) throw new Error(`${table} exceeds snapshot limit. Add pagination before deploying.`)
  return rows
}
if (!preview) {
  const [services, blogs] = await Promise.all([
    publicRows('services', 'select=*&order=display_order.asc'),
    publicRows('blogs', 'select=*&published=eq.true&order=published_at.desc'),
  ])
  snapshot = { services, blogs }
} else { snapshot.previewOnly = true; console.warn('LOCAL PREVIEW ONLY: no database content, all generated pages are noindex. Do not deploy this output.') }
const routes = [...staticRoutes]
for (const [table, prefix] of [['services', '/services/'], ['blogs', '/blog/']]) {
  for (const row of snapshot[table]) {
    if (!row.slug || !/^[a-zA-Z0-9_-]+$/.test(row.slug)) throw new Error(`Invalid ${table} slug. Use letters, numbers, hyphens or underscores.`)
    routes.push(prefix + row.slug)
  }
}
if (new Set(routes).size !== routes.length) throw new Error('Duplicate public slugs found')
await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.seo-server', emptyOutDir: true } })
const { render } = await import(pathToFileURL(path.join(root, '.seo-server/entry-server.js')))
const template = await readFile('dist/index.html', 'utf8')
// Pass only public services and published blogs, never contacts, patients or auth data.
const serialized = JSON.stringify(snapshot).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
async function writePage(route, file, noindex = false) {
  let { body, head } = render(route, snapshot)
  if (preview || noindex) head = head.replace(/<meta[^>]*name="robots"[^>]*>/g, '') + '<meta data-rh="true" name="robots" content="noindex, follow" />'
  const html = template.replace('<!--seo-head-->', head)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div><script>window.__SEO_SNAPSHOT__=${serialized}</script>`)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
}
for (const route of routes) {
  await writePage(route, route === '/' ? 'dist/index.html' : `dist${route}.html`)
}
// Legal placeholders are intentionally excluded from sitemap and marked noindex.
for (const route of ['/privacy-policy', '/terms']) await writePage(route, `dist${route}.html`, true)
await writePage('/not-found-build-route', 'dist/404.html', true)
// Admin keeps the existing client app and login flow; no public data snapshot.
const adminHead = '<title data-rh="true">Admin | Kiran Skin Clinic</title><meta data-rh="true" name="robots" content="noindex, follow" />'
await writeFile('dist/admin-shell.html', template.replace('<!--seo-head-->', adminHead))
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + (preview ? [] : routes).map(route => `  <url><loc>${escape(origin + route)}</loc></url>`).join('\n') + '\n</urlset>\n'
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/seo-build-report.json', JSON.stringify({ mode: preview ? 'local-preview-noindex' : 'production', pages: routes.length, services: snapshot.services.length, publishedArticles: snapshot.blogs.length }, null, 2))
await rm('.seo-server', { recursive: true, force: true })
console.log(`SEO build complete: ${routes.length} public pages; ${snapshot.services.length} services; ${snapshot.blogs.length} published articles.`)
