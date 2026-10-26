import { build, loadEnv } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { PAGE_METADATA, serviceMetadata, blogMetadata, plainText } from '../src/seo/metadata.js'
import { PRIVACY_SECTIONS, TERMS_SECTIONS, LEGAL_UPDATED } from '../src/seo/legal.js'
const root = process.cwd()
const env = { ...loadEnv('production', root, ''), ...process.env }
const preview = process.argv.includes('--preview-only')
const origin = 'https://www.kirandermatology.com'
const staticRoutes = Object.keys(PAGE_METADATA)
let snapshot = { services: [], blogs: [] }
const url = env.VITE_SUPABASE_URL
const key = env.VITE_SUPABASE_ANON_KEY
if (!preview && (!url || !key)) throw new Error('Production SEO build requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local or deployment settings. Use build:preview only for a noindex local check.')
async function publicRows(table, query) {
  const result = []
  for (let offset = 0; offset < 100000; ) {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${offset}-${offset + 999}`, 'Range-Unit': 'items', Prefer: 'count=exact' },
      signal: AbortSignal.timeout(30000),
    })
    if (!response.ok) throw new Error(`Public ${table} fetch failed (${response.status}). Check public SELECT access and build env. Do not use a service-role key.`)
    const rows = await response.json()
    if (!Array.isArray(rows)) throw new Error(`Invalid ${table} response`)
    result.push(...rows)
    const total = response.headers.get('content-range')?.split('/')[1]
    if (total && total !== '*' && result.length >= Number(total)) return result
    if (!rows.length || ((!total || total === '*') && rows.length < 1000)) return result
    offset += rows.length
  }
  throw new Error(`${table} exceeds build pagination safety limit`)
}
if (!preview) {
  const [services, blogs] = await Promise.all([
    publicRows('services', 'select=*&order=display_order.asc,id.asc'),
    publicRows('blogs', 'select=*&published=eq.true&order=published_at.desc,id.asc'),
  ])
  snapshot = { services, blogs: blogs.filter(row => row.published === true) }
} else { snapshot.previewOnly = true;console.warn('LOCAL PREVIEW ONLY: no database content; all generated pages are noindex. Do not deploy this output.') }
const pages = staticRoutes.map(route => ({ route, ...PAGE_METADATA[route] }))
for (const [table, prefix, metadata] of [['services', '/services/', serviceMetadata], ['blogs', '/blog/', blogMetadata]]) {
  for (const row of snapshot[table]) {
    if (!row.slug || !/^[a-zA-Z0-9_-]+$/.test(row.slug)) throw new Error(`Invalid ${table} slug: use letters, numbers, hyphens or underscores.`)
    pages.push({ route: prefix + row.slug, ...metadata(row) })
  }
}
if (new Set(pages.map(p => p.route)).size !== pages.length) throw new Error('Duplicate public slugs found')
await build()
await build({ build: { ssr: 'src/entry-server.jsx', outDir: '.seo-server', emptyOutDir: true } })
const { render } = await import(pathToFileURL(path.join(root, '.seo-server/entry-server.js')))
const template = await readFile('dist/index.html', 'utf8')
const serialized = JSON.stringify(snapshot).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
async function writePage(route, file, noindex = false) {
  let { body, head } = render(route, snapshot)
  if (preview || noindex) head = head.replace(/<meta[^>]*name="robots"[^>]*>/g, '') + '<meta data-rh="true" name="robots" content="noindex, follow" />'
  const html = template.replace('<!--seo-head-->', head).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div><script>window.__SEO_SNAPSHOT__=${serialized}</script>`)
  await mkdir(path.dirname(file), { recursive: true });await writeFile(file, html)
}
for (const { route } of pages) await writePage(route, route === '/' ? 'dist/index.html' : `dist${route}.html`)
await writePage('/not-found-build-route', 'dist/404.html', true)
const adminHead = '<title data-rh="true">Admin | Kiran Skin Clinic</title><meta data-rh="true" name="robots" content="noindex, follow" />'
await writeFile('dist/admin-shell.html', template.replace('<!--seo-head-->', adminHead))
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + (preview ? [] : pages).map(({route}) => `  <url><loc>${escape(origin + route)}</loc></url>`).join('\n') + '\n</urlset>\n'
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
const label = value => plainText(value).replace(/[\[\]<>]/g, '')
const links = pages.map(p => `- [${label(p.title)}](${origin}${p.route}): ${label(p.description)}`).join('\n')
const introduction = '# Kiran Skin Clinic\n\n> Kiran Skin Clinic, also known as Kiran Dermatology, is a skin, hair and laser clinic in Patna, Bihar, India. The website provides information about Dr. (Major) Asmita Singh, services, educational articles and appointment requests.\n\n## Medical information\n\nWebsite content is general information, not an individual diagnosis or treatment plan. Appointment requests require clinic confirmation. Confirm current fees, availability and treatment suitability directly with the clinic.\n\n## Contact\n\n- Address: Jalalpur Complex, Bailey Road, Patna, Bihar, India\n- Phone: +91 8595749644\n- Email: asmita.hi@gmail.com\n\n'
await writeFile('dist/llms.txt', introduction + '## Public pages\n\n' + links + `\n\n## Index and full text\n\n- [Sitemap](${origin}/sitemap.xml): Public URL index.\n- [Full text](${origin}/llms-full.txt): Public website information snapshot.\n`)
let full = introduction + '## Main pages\n\n' + links + '\n\n'
for (const service of snapshot.services) {
  full += `## ${label(service.name)}\n\nURL: ${origin}/services/${service.slug}\n\n`
  for (const value of [service.short_description || service.shortDescription, service.overview, service.description]) if (value) full += plainText(value) + '\n\n'
  if (Array.isArray(service.faqs)) for (const faq of service.faqs) full += `${plainText(faq.question)}\n${plainText(faq.answer)}\n\n`
}
for (const blog of snapshot.blogs) full += `## ${label(blog.title)}\n\nURL: ${origin}/blog/${blog.slug}\n\n${plainText(blog.content || blog.excerpt)}\n\n`
for (const [name, sections] of [['Privacy Policy', PRIVACY_SECTIONS], ['Terms & Conditions', TERMS_SECTIONS]]) {
  full += `## ${name}\n\nLast updated: ${LEGAL_UPDATED}\n\n` + sections.map(([heading, ...text]) => `### ${heading}\n\n${text.join('\n\n')}`).join('\n\n') + '\n\n'
}
await writeFile('dist/llms-full.txt', full)
await writeFile('dist/seo-metadata.json', JSON.stringify(pages, null, 2))
await writeFile('dist/seo-build-report.json', JSON.stringify({ mode: preview ? 'local-preview-noindex' : 'production', pages: pages.length, services: snapshot.services.length, publishedArticles: snapshot.blogs.length }, null, 2))
await rm('.seo-server', { recursive: true, force: true })
console.log(`SEO build complete: ${pages.length} public pages; ${snapshot.services.length} services; ${snapshot.blogs.length} published articles. Sitemap, llms.txt, llms-full.txt and metadata report generated.`)
