# Measurement and regression protocol
1. Define critical routes and user journeys, expected functional behavior and acceptance thresholds before editing.
2. Prefer field p75 Core Web Vitals for user impact; use lab measurements for controlled diagnosis. Record source, dates, traffic coverage and limitations.
3. Use comparable builds, hosting regions, test devices, network profiles, cache state and input data. Collect repeated runs and report range/variance; avoid one-run victory claims.
4. Measure page-load waterfall, LCP/INP/CLS, JS weight, API p95, database latency or costs only where relevant and observable.
5. After each approved batch run existing lint/typecheck/build/tests as applicable, plus smoke tests for navigation, auth, forms, SEO metadata, accessibility and critical business flows.
6. Confirm no regression in functionality, privacy, accessibility or billing. If metrics worsen or results are inconclusive, report it; propose rollback, not rationalization.
7. Distinguish measured deltas from estimates. Record test command, environment, baseline and after values, confidence and missing evidence.
8. Never generate synthetic success claims or treat a Lighthouse score as proof of real-user experience.
