---
name: performance-audit
description: Evidence-based web performance audit, approved optimization, and before/after verification for Next.js, React, Astro, WordPress, Node, and database-backed apps. Use for slow pages, API latency, Core Web Vitals, bundle issues, or performance tuning. Modes: audit (default), optimize, verify. Unlike handoff-audit, this is a focused performance workflow.
---

# Performance Audit

Invoke with `/performance-audit audit`, `/performance-audit optimize`, or `/performance-audit verify`. If omitted or unrecognized, use **audit**. Do not automatically run `/handoff-audit`; that skill is a separate pre-delivery quality gate.

## Boundaries
- **Audit (default):** Read-only inspection. Do not modify source, lockfiles, configs, deployment, infrastructure, or data. Avoid commands that write to the repository; where a tool creates reports or caches, use a safe temporary directory and disclose it. Do not install packages.
- **Optimize:** First present an evidence-based plan and obtain explicit approval of the proposed changes. Edit only approved scope, in small reversible batches. No commit, push, deployment, production data mutation, schema migration, DNS change, or paid infrastructure without separate explicit approval.
- **Verify:** Run non-destructive checks and compare equivalent before/after conditions; do not modify application code.
- Never print secrets, use production credentials in load tests, or run destructive/high-volume tests against live systems. Ask before active load testing; default to local or isolated staging.
- Preserve behavior, auth, accessibility, SEO, content, and client project constraints in CLAUDE.md and standards.md. Stop and report if safe validation is impossible.

## Workflow
1. Discover project root, framework/version, runtime, routes, deployment target, databases, integrations, and traffic profile. Identify marketing site, app, ecommerce, API, or hybrid. Note which layers do not apply.
2. Define relevant user journeys and critical routes. Identify bottleneck hypotheses from source and configuration; record exact paths/lines and what evidence would confirm them.
3. Establish a baseline where tooling and access allow: LCP, INP, CLS (field p75 when available), TTFB, request waterfall, bundle weight, API latency, query plans, and resource usage as relevant. Record device, network, environment, sample size, date, cache state, and test procedure. No fabricated measurements; mark missing metrics NOT MEASURED.
4. Read only relevant references: `references/frontend.md`, `backend.md`, `database.md`, `frameworks.md`, `verification.md`. Do not blindly apply every checklist item.
5. Classify findings as CONFIRMED (measured or reproducible), STATIC RISK (source-backed), or HYPOTHESIS (requires measurement). Rank P0–P3 based on actual user impact and risk, not generic best-practice violations.
6. Recommend the smallest effective change. Consider built-in platform caching before Redis, managed infrastructure before load balancers, and existing queues before adding new services. Explicitly describe tradeoffs and invalidation or rollback requirements.
7. In optimize mode, implement approved changes one batch at a time, run appropriate tests, compare metrics, and revert or pause on regressions. Never silently expand scope.
8. In verify mode, compare like-for-like runs, check functional and nonfunctional regressions, and state confidence and limits.

## Report
- Architecture and applicable scope
- Baseline measurements, test conditions, and unavailable evidence
- Findings table: priority, classification, affected path/route, evidence, expected impact (estimate labeled), confidence, effort, regression risk
- Recommended sequence and approvals needed
- Verification method and rollback plan
- For verify: before/after values, sample size, variance, functional test results, and unresolved issues

Do not claim a PASS solely because a pattern appears in code. Do not promise performance improvements without measurement. For a full security, SEO, accessibility and delivery review, suggest the separate `/handoff-audit` skill.
