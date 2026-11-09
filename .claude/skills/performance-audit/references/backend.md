# Backend and API performance
- Trace representative user journeys and API routes; measure p50/p95 latency, failure rate and response sizes when data exists.
- Look for redundant calls, sequential independent requests, waterfalls, excessive payloads, missing pagination, and avoidable serialization.
- Use timeouts and cancellation for external calls; retries require backoff, bounded attempts, idempotency and rate-limit awareness.
- Streaming helps perceived responsiveness for incremental AI/text output; confirm client and proxy support.
- Move genuinely slow, noninteractive tasks to durable background processing only if infrastructure and failure recovery justify it.
- Inspect cache headers, server cache and CDN behavior; define freshness, invalidation, privacy boundaries and stale behavior before adding Redis.
- Inspect concurrency, cold starts, memory, CPU and region placement where measurable. Never propose load balancing without capacity evidence.
- Do not benchmark production aggressively; require permission for load tests and use isolated environments and synthetic data.
