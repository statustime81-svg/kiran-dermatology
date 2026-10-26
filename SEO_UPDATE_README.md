# Kiran Dermatology: SEO update handover

Updated: 26 October 2026. Existing React + Vite project retained.

## Pehle yeh karein

1. Apne original repository ka backup / separate branch banayein.
2. Is archive ke project files ko cloned project mein copy karein. Apna existing `.git` folder aur working `.env.local` preserve karein. Archive mein Git history, node_modules aur built dist intentionally include nahi hain.
3. Node 22.12+ or Node 24 use karein. Run `npm ci`.
4. `.env.example` ko `.env.local` mein copy karke existing project ki real public Supabase settings set karein. Existing deployment variables already correct hain to unhi ko retain karein:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Optional existing `VITE_WHATSAPP_NUMBER`
5. Run `npm run build`, then `npm run check:seo`, then `npm run preview`.
6. Preview at http://127.0.0.1:4173. Test public routes, admin login, appointment form and contact form before deploying.

**Important:** Supabase credentials were not included in the uploaded ZIP. Production database access and actual clinic forms/admin actions could not be tested here. Do not use service_role keys. No database schema, RLS policies or records were changed.

## Exactly what changed

- Shared SEO component uses the current route instead of giving every page the homepage canonical. Preferred SEO origin is `https://www.kirandermatology.com`.
- Route-specific titles, descriptions, canonical, og:url and absolute image URLs are written into initial HTML. Existing visible business copy and service/article content are retained.
- Build-time rendering generates HTML for the six public core pages and every service/published blog actually returned by your public Supabase API. No demo rows from src/data are used in production.
- Build creates a real `dist/sitemap.xml`. `public/robots.txt` is copied to dist as text.
- Removed blanket Vercel SPA rewrite. Clean URLs serve generated HTML. Unknown paths use the host's real 404 response; `404.html` is included. Admin routes retain their client application shell.
- Clinic / doctor / website / page entities share stable IDs. Service pages use MedicalWebPage instead of incorrectly classifying every service as a non-invasive medical procedure. Visible detail breadcrumbs have BreadcrumbList data. BlogPosting uses actual article title, cover, author and dates.
- Removed duplicate static SEO/schema from index.html; Helmet owns the generated tags.
- Admin and unfinished legal placeholder pages are noindex and excluded from sitemap. Legal text itself has NOT been invented or replaced.
- Unknown service/article paths show Not Found instead of silently redirecting to a listing. Public article detail queries now require `published = true`.
- Admin editors load separately, reducing public JS payload. Existing CRUD components are untouched.
- Form IDs use React useId instead of random values, supporting server/client hydration without changing form design.
- Existing GA4 and Search Console verification code is retained. No new conversion events, tracking IDs, cookie banner or patient-data tracking were introduced.
- Existing preloader remains in development/client-only mode. Production pages hydrate their already rendered content instead of covering it with an initial preloader.

## Publishing and updates: do not skip

**Services and blog HTML/sitemap are generated at deployment time.** Whenever the admin publishes, unpublishes, edits, deletes or changes the slug of a service/article, rebuild and redeploy so the HTML, direct URLs and sitemap match the latest data. New direct URLs do not exist on the host until that build completes. Old article HTML can remain until redeploy after unpublishing.

For automatic updates, developer should connect a secured server-side Supabase database webhook to a hosting deploy hook. This external integration is NOT configured in this archive. Keep any deploy-hook secret out of VITE_ variables and out of client JavaScript.

Use the default production build: `npm run build`. It deliberately stops if credentials/public SELECT access fail, avoiding deployment of an empty public sitemap. It fetches only services and published blogs, never appointments, contacts or auth records. Current build detects a truncated API result above the initial 1,000-row limit and stops rather than silently publishing an incomplete sitemap; add pagination if your public content grows beyond that.

## Local-only test without credentials

`npm run build:preview` generates only the core routes with no database content and explicit noindex. Then `npm run check:seo` and `npm run preview` can be used to inspect layout/routing.

**Never deploy build:preview output.** An empty preview sitemap and noindex are intentional. Always build again with real credentials using `npm run build` for production. `npm run build:client` is only a raw Vite diagnostic build, not the deploy build.

## Hosting

### Existing Vercel setup

- `vercel.json`: build command `npm run build`; output `dist`; clean URLs; no blanket homepage rewrite.
- Set your real Supabase public environment variables in the hosting dashboard for the target environment.
- Set the preferred domain to www.kirandermatology.com in the dashboard and redirect the non-www alias to it. This account-level domain configuration has not been changed here.
- Verify deployed HTTP and HTTPS domain variants. Check a random missing URL returns 404, not 200. Local static checks cannot prove the production host's behavior.

### If hosting on Nginx instead

Use generated dist as root, and adapt this example to the existing server block. Do not overwrite SSL or other server settings blindly:

```nginx
location = /admin { try_files /admin-shell.html =404; }
location ^~ /admin/ { try_files /admin-shell.html =404; }
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
location = /404.html { internal; }
```

Use appropriate text/plain and application/xml MIME types. Avoid a fallback like `try_files $uri /index.html`, which recreates the original soft-404 issue. For Apache or another host, implement the equivalent actual-file / clean-URL / admin-only fallback rules.

## Acceptance checks after deployment

- `/robots.txt`: HTTP 200, plain text; no HTML.
- `/sitemap.xml`: HTTP 200, XML; actual core/service/published article URLs; no admin or unfinished legal pages.
- A real service and article: direct URL and refresh work; unique title and self-canonical; visible content is in View Source.
- `/a-deliberately-missing-url`: HTTP 404. Valid service/article HTTP 200.
- One canonical and one title per page; no duplicate homepage schema.
- Structured data parses, matches visible information, and no invented rating/reviewer data exists.
- Admin login/refresh/logout and existing forms work with real credentials.
- Check Search Console URL Inspection rendered HTML and submit the sitemap.
- Check Rich Results Test / Schema Validator and real mobile PageSpeed data.
- Verify GA4 Realtime/DebugView. Existing analytics implementation was preserved; actual data collection needs account/browser checks.

## AI visibility and remaining editorial work

This update improves crawlability, rendered text, page identity and structured data. There is no special AI-ranking script, and llms.txt is not required for Google AI features. AI citations/ranking are not guaranteed.

Clinic team should verify doctor qualifications/registration, exact address/postcode, opening hours and profile links, and review treatment risks, suitability, aftercare and medical references. No new credentials, reviewer labels, dates, prices, ratings, medical claims or visible treatment copy were fabricated in this update. Update Google Business Profile and citations outside the code as needed.

## Validation performed

- Original client Vite build passed before the build pipeline was extended.
- Local no-credentials prerender build passed; generated pages explicitly noindex.
- Production-style integration build passed against a LOCAL TEST API: 9 service fixtures and 2 published article fixtures, 17 public pages total. These fixtures are NOT in this archive or production code.
- Automated generated-HTML checks passed: single title/canonical per page, preferred domain, prerendered heading/body, JSON-LD parsing, sitemap membership/count, and no broad fallback rewrite.
- No live deployment or real production database/admin/form submission was performed.
- Existing repository lint warnings remain outside the SEO scope; no unrelated cleanup was attempted.

Read `SEO_VALIDATION.md` for final test results and any browser-test limits.
