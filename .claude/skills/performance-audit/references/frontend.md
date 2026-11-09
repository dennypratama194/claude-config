# Frontend performance
Check only applicable routes and interactions.
- Measure field Core Web Vitals at p75 where possible: good LCP <= 2.5s, INP <= 200ms, CLS <= 0.1. Distinguish lab from field data.
- Inspect LCP element and critical request chain; never lazy-load the LCP image. Consider fetch priority, responsive srcset/sizes, formats, and caching based on evidence.
- Reserve space for images, embeds, banners, dynamic UI and fonts to avoid CLS. Do not preload every image or font.
- Inspect JS route chunks, hydration, long tasks, third-party scripts, waterfall dependencies, render-blocking resources, CSS, and bundle analysis.
- Review unnecessary renders with profiling; memoization is not an automatic fix.
- Use pagination or virtualization for measured large-list costs; debounce input-driven network calls where appropriate.
- Skeletons improve perceived continuity, not raw speed. Prefer useful immediate content and accessible loading states.
- Ensure keyboard navigation, reduced-motion preferences, and SEO survive changes.
- Check real mobile devices or realistic throttling; record hardware, network, cold/warm cache and test route.
