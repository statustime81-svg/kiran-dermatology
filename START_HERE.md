# Final SEO + legal-page update

Updated 26 October 2026. Read this file first; it supersedes earlier handover notes.

## What is ready in this source

- Full Privacy Policy at `/privacy-policy` and Terms & Conditions at `/terms`, replacing Coming soon pages. Both now have unique metadata and are included in the production sitemap.
- Eight core pages with page-specific titles/descriptions/keywords. Service metadata uses the actual service name and short description; article metadata uses the actual title, excerpt/content and tags. Social previews use the same metadata. Google does not use meta keywords as a ranking factor.
- Initial HTML rendering, route canonicals, existing clinic/doctor/page schema and relevant detail breadcrumbs.
- Real generated `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt`. LLM files include only public pages, services and published articles; no appointments, enquiries or auth data. They are optional reference files, not an AI ranking guarantee. `robot.txt` and `llm.txt` are not additional required files.
- A generated `seo-metadata.json` report for reviewing every page's title, description and keywords after a build.
- Admin noindex, correct local 404 handling and retained Vercel clean-URL/admin routing.
- Analytics privacy choice with Essential only / Accept analytics and footer Cookie Preferences. Existing GA ID retained; Google Analytics is not loaded until acceptance. Added simple privacy/terms notices to forms. Existing form fields and submission services are retained.
- Original public assets and CSS retained. Existing public-page content, URLs and admin CRUD retained. New legal pages and privacy controls are the intentional visible additions.

## Install and build on your computer

1. Back up your existing project. Copy these project files into the existing clone, retaining your `.git` and real `.env.local` / `.env`.
2. Use Node 22.12+ or Node 24. Run `npm ci`.
3. Ensure actual `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in `.env.local` or the deployment environment. Use only a public anon/publishable key, never a service-role key.
4. Run:

```powershell
npm run build
npm run check:seo
npm run preview
```

5. Open http://127.0.0.1:4173. Test main/service/article pages, legal pages, form submissions with your real setup, admin login and cookie preferences.
6. Preserve `.env.local` as a local ignored file. Review `git status`, then commit/push using your own GitHub account. No GitHub push or live deployment was performed here.

The production build needs working public READ access to services and published blogs. It fails instead of silently publishing an empty site when credentials/data fetching fail. It now paginates public content rather than truncating at 1,000 rows.

`npm run build:preview` is only for local testing without credentials. It intentionally has no database content, all pages noindex and an empty sitemap. Never deploy that output. `build:client` is a diagnostic Vite build, not the release build.

## Deployment settings

For existing Vercel hosting, use the supplied `vercel.json`, Build Command `npm run build`, Output Directory `dist`, and your real public Supabase variables. Keep the preferred domain www.kirandermatology.com and configure non-www/HTTP redirects in the hosting dashboard. Those account settings have not been changed here.

For other hosting, serve actual files / extensionless HTML URLs, keep admin-only fallback to admin-shell.html, and return actual HTTP 404 for unknown URLs. Do not reintroduce a blanket /index.html fallback. Use plain-text MIME types for .txt and application/xml for the sitemap.

After deployment check:

- `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` return their correct formats, not homepage HTML.
- Valid pages return 200; a random missing URL returns 404.
- Privacy and terms contain full text with route-specific canonical/title.
- Public pages have main content in View Source; no unwanted noindex remains.
- Search Console sitemap submission and live URL Inspection succeed.
- Actual forms/admin work and GA4 Realtime receives only consented activity.

## Analytics dashboard: one external setting

The code emits a pageview for each React route after analytics acceptance. In the GA4 web stream, disable automatic history-based pageviews in Enhanced Measurement (Page views advanced settings) to prevent duplicate SPA pageviews. Review other Enhanced Measurement options against the clinic's privacy practices. This account-side setting cannot be changed from this source archive.

Cookie controls govern this site's Google Analytics loading. Google Fonts, Google Maps and WhatsApp are separate external services; their current use is explained in the Privacy Policy. No claim of blocking all third-party network requests is made.

## Whenever services/articles change

Rebuild/redeploy after publishing, editing, unpublishing, deleting or changing slugs. Static HTML, direct URLs, sitemap and LLM snapshots update at build time. New direct URLs do not exist until the build deploys. For automation, your developer can connect a protected server-side database webhook to a deploy hook; that external integration is not configured in this package. Keep deploy secrets out of browser code.

With the same 52 services and 15 published articles you showed earlier, adding the two complete legal pages should produce 75 public URLs. The actual count depends on current database rows.

## Clinic approval and checks

Legal text uses the known clinic contact details and actual form/provider setup, without inventing cancellation charges, fixed retention periods, registration numbers, guaranteed treatment results or a full legal-compliance certification. Have the clinic verify its details and operating practices before publication. Confirmed timings, coordinates, registration details and additional medical reviews can be added separately.

No dependency upgrades, RLS/schema changes, new conversion events or live account configuration were performed. Previously reported npm audit findings were not resolved in this SEO/legal update; review them separately before release without blindly applying breaking force upgrades. Full real-browser visual testing and actual production DB/admin/form checks remain your release checks.
