---
name: handoff-audit
description: Full pre-delivery audit of a client site or app before handoff, covering code quality, SEO, performance, accessibility, security, mobile/responsive, and deployment readiness. Runs 18 parallel read-only specialist agents whose high-stakes checks are cross-verified, then reconciles them into one report. Use when the user asks to audit a project, check whether a site is ready to ship or hand off to a client, run a pre-launch or pre-delivery check, or verify deployment readiness. For a fast single-pass version, use handoff-audit-lite instead.
disallowed-tools: Write, Edit, NotebookEdit
---

Full pre-delivery audit. 18 parallel specialist agents cross-check each other's
highest-stakes findings, then a reconciler consolidates everything into one report.

Sections: Code Quality, SEO, Performance, Accessibility, Security (three pairs),
Mobile & Responsive, Deployment Readiness.

**Read-only.** Each agent is defined in `.claude/agents/` with `tools: Read, Grep, Glob`,
so none of them can write, and this skill's own `disallowed-tools` blocks Write and Edit
for you as orchestrator. Report only — never fix, never commit, never suggest refactors.

---

## Hybrid coverage model

Each section is covered by a **pair** of agents. Within a pair:

- **`[SHARED]` checks** appear in *both* agents — three per pair, 27 in total. Each agent
  verifies them independently, without seeing the other's result. The reconciler compares:
  agreement confirms the finding, disagreement is surfaced as disputed. These are the
  checks where a false "pass" costs the most.
- **Solo checks** appear in one agent only, for breadth.

The agents carry their own checklists and report format. You do not restate them here.

---

## Phase 1 — Discovery

Before spawning anything:

1. List the project root
2. Read `package.json` if present — note framework, key dependencies, scripts
3. Identify entry files: `index.html`, `src/main.tsx`, `pages/index.tsx`, `app/layout.tsx`
4. Resolve the stack, e.g. "Next.js 16 + TypeScript + Tailwind v4"

Carry the resulting `PROJECT_PATH` and `STACK` into every agent prompt.

---

## Phase 2 — Specialists

Spawn all 18 in **one parallel message**. Each prompt is only the context line — the
checklist lives in the agent definition:

> Read-only audit. Project: `[PROJECT_PATH]`. Stack: `[STACK]`.
> Run your checklist against the real files and report in your required format.

| Section | `subagent_type` |
|---|---|
| Code Quality | `audit-code-structure`, `audit-code-standards` |
| SEO | `audit-seo-technical`, `audit-seo-content` |
| Performance | `audit-perf-assets`, `audit-perf-load` |
| Accessibility | `audit-a11y-semantics`, `audit-a11y-interaction` |
| Security — injection | `audit-sec-injection`, `audit-sec-xss` |
| Security — exposure | `audit-sec-secrets`, `audit-sec-disclosure` |
| Security — auth/config | `audit-sec-auth`, `audit-sec-headers` |
| Mobile & Responsive | `audit-mobile-layout`, `audit-mobile-interaction` |
| Deployment Readiness | `audit-deploy-files`, `audit-deploy-content` |

---

## Phase 3 — Reconciliation

Once all 18 have returned, spawn `audit-reconciler` with every report injected verbatim:

> Here are the 18 specialist reports from the handoff audit of `[PROJECT_PATH]`
> (`[STACK]`). Reconcile them into the final report.
>
> [ALL 18 REPORTS, VERBATIM]

Return the reconciler's report to the user as-is.

---

## Orchestrator notes

- 18 specialists in parallel + 1 reconciler = 19 agent calls.
- No `package.json` → tell the dependency-facing agents (`audit-perf-load`,
  `audit-sec-headers`, `audit-deploy-files`) to mark npm checks SKIP.
- Pure static site with no auth → `audit-sec-auth` will SKIP most of its list. Expected.
- If an agent returns nothing usable, say so in the final output rather than quietly
  dropping half a pair — a missing counterpart breaks cross-verification.
