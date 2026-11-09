# Database performance
- Inventory data stores, ORM, serverless connection mode, poolers and actual query patterns.
- Inspect potential N+1 reads, overfetching, repeated queries, unbounded lists, missing selective indexes and slow joins.
- Prefer EXPLAIN or EXPLAIN ANALYZE only in safe environments and with awareness that ANALYZE executes queries; never run potentially mutating or costly statements on production without approval.
- Evaluate indexes using selectivity, query frequency, write overhead and actual plans. Do not add speculative indexes.
- Check transaction duration, lock contention, connection limits, pooling and query caching only where relevant.
- Treat row-level security, tenant boundaries, PII and authorization as non-negotiable; optimization must not leak cached private data.
- Schema migrations, index creation, pooler changes and production data operations require separate approval and rollback plans.
