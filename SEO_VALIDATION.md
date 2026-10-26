# Validation record

26 October 2026. Source based on the newly uploaded kiran-dermatology(1).zip.

- `npm ci` completed with the existing dependency lockfile.
- No-credentials local preview build passed: eight core pages, noindex, no DB content and no sitemap URLs.
- Production-style local fixture build passed: eight core pages + nine service fixtures + two published article fixtures = 19 public pages. Test data and generated output are NOT included in the source ZIP.
- Automated generated-HTML checks passed for unique canonicals, one title, headings, JSON-LD parsing, metadata presence, sitemap count, complete legal pages, generated LLM files and analytics default-off HTML.
- DOM hydration/cookie-choice/analytics and local HTTP tests are recorded in the release checks. DOM tests do not replace a real-browser visual review.
- Original CSS and public image assets retained byte-for-byte; original visible content/admin CRUD unchanged apart from the requested legal pages, metadata and privacy controls.
- Lint completed with warnings, including the existing repository warnings and effect/state guidance. Unrelated cleanup was not performed.

Real Supabase credentials were not in this archive. Live database content, live hosting, actual forms/admin actions, Search Console, GA4 dashboard configuration and real-user speed metrics were not verified here. No production deployment, ranking or complete legal/security compliance is claimed.
