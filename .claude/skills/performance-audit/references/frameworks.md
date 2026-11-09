# Stack-specific routing
## Next.js / React
Identify App Router vs Pages Router, rendering and cache semantics for installed version. Check server/client component boundaries, route-level bundles, next/image, next/font, server data fetches, API routes, ISR/revalidation and hosting constraints. Do not assume every route should be SSR or static.
## Astro / static HTML
Prefer minimal client JS and selective hydration. Check asset pipeline, preload discipline, CDN headers and script scheduling.
## WordPress
Inspect theme/page builder, plugins, object/page cache, database queries, image sizes and third-party scripts. Avoid plugin additions by default; preserve editing workflow and compatibility.
## Node / API
Check middleware, response sizes, external dependencies, instrumentation, async concurrency and runtime limits.
## Supabase / Postgres
Check query patterns, indexes, RLS-safe access, connection/pooler mode, edge-function location and auth boundaries.
## Vercel / Cloudflare
Confirm actual deployed platform and runtime restrictions before recommending caching, Node APIs, background tasks or region changes. Do not assume parity across providers.
If a stack is different, document its real conventions rather than forcing these patterns.
