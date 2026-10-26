import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
const report = JSON.parse(await readFile('dist/seo-build-report.json', 'utf8'))
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir,e.name)]))).flat()
}
const files = (await walk('dist')).filter(f => f.endsWith('.html') && !f.endsWith('admin-shell.html'))
const canonicals = new Set()
for (const file of files) {
  const html = await readFile(file,'utf8')
  assert.equal((html.match(/<title[ >]/g) || []).length, 1, `One title: ${file}`)
  const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g)]
  assert.equal(canonical.length, 1, `One canonical: ${file}`)
  assert(canonical[0][1].startsWith('https://www.kirandermatology.com/'), `Preferred domain: ${file}`)
  assert(!canonicals.has(canonical[0][1]), `Unique canonical: ${file}`)
  canonicals.add(canonical[0][1])
  assert(html.includes('data-prerendered="true"'), `Rendered body: ${file}`)
  assert(/<h1[ >]/.test(html), `Main heading: ${file}`)
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1])
  if (report.mode !== 'production') assert(/content="noindex, follow"/.test(html), `Preview noindex: ${file}`)
}
const robots = await readFile('dist/robots.txt','utf8')
assert(!robots.includes('<html')); assert(robots.includes('Sitemap: https://www.kirandermatology.com/sitemap.xml'))
const sitemap = await readFile('dist/sitemap.xml','utf8')
assert(sitemap.startsWith('<?xml')); assert(!sitemap.includes('/admin'));assert(!sitemap.includes('/terms'));assert(!sitemap.includes('/privacy-policy'))
const count = (sitemap.match(/<loc>/g) || []).length
assert.equal(count, report.mode === 'production' ? report.pages : 0)
const config = JSON.parse(await readFile('vercel.json','utf8'))
assert(!config.rewrites.some(r=>r.source.includes('(.*)')))
console.log(`SEO checks passed: ${files.length} HTML pages; ${count} sitemap URLs; JSON-LD parses; canonical and noindex checks pass.`)
