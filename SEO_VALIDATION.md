# SEO validation record

Date: 26 October 2026.

## Passed

- Client compilation and build-time rendering with the uploaded source.
- No-credentials local preview: 6 public core pages, plus legal placeholders/404; explicit noindex and empty sitemap.
- Production-style integration using a temporary local public-API fixture: 9 services + 2 published blogs, 17 indexable public routes. Temporary fixtures and generated dist are not included in the deliverable.
- Generated HTML checks across 20 pages in the production-style fixture build: one title, one unique canonical, preferred HTTPS/www origin, prerender marker, H1 presence, JSON-LD JSON parsing, and correct sitemap membership/count.
- Local HTTP server checks: homepage/about/admin login return 200, robots.txt returns text/plain, sitemap.xml returns application/xml, unknown pages/missing assets return 404.
- Missing production environment variables stop the production build before publishing incomplete content.
- DOM-based React hydration tests for homepage, about, contact, appointment, an individual service and an individual blog: no React hydration errors after providing normal browser globals in the test environment.
- Original public assets and all CSS files compared byte-for-byte with the uploaded ZIP: unchanged.
- Dependency list and package-lock retained. No new runtime dependency added.
- Lint command completed with warnings; no unrelated lint cleanup applied.

## Not verified here

- Chromium visual testing could not complete: the browser process crashed in this execution environment. DOM hydration checks do not replace visual testing on a real browser.
- Real Supabase content, row-level permissions and actual appointment/contact submission or admin login, because environment credentials were not supplied.
- Actual Vercel deployment routing, domain redirects and live HTTP status codes. Local HTTP checks validate the included preview server; verify the real host after deployment.
- Search Console indexing, rich-result eligibility, Core Web Vitals field data, Google Business Profile consistency and GA4 data collection.
- Rankings or AI citations. These cannot be promised by a code update.

## Developer release gate

Configure actual public Supabase environment variables; run `npm ci`, `npm run build`, `npm run check:seo`, `npm run preview`; review real pages/forms/admin and then deploy. Follow SEO_UPDATE_README.md. Never deploy local-preview output or output generated against fixture APIs.
