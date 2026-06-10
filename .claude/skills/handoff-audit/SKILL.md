# Skill: handoff-audit
# Trigger: /handoff-audit

Full pre-delivery audit using 14 parallel specialist agents (2 per section × 7 sections) with cross-checking, followed by a dedicated reconciler that consolidates all findings into a single report.

**All agents are read-only. Zero changes made to the codebase.**

---

## How It Works

1. **Discovery** — You (the orchestrator) read the project root, `package.json`, and main entry files to identify the stack and key paths.
2. **Specialist Agents** — Spawn all 14 agents simultaneously in one parallel message. Each agent checks specific items from a focused angle using grep/read on actual files.
3. **Reconciliation** — Once all 14 agents return, spawn one final reconciler agent that reads every report and produces the consolidated output.

---

## Agent Report Format

Every specialist agent must return findings in this exact structure:

```
SECTION: [section name]
ROLE: [agent role]

CHECK: [item description]
STATUS: PASS | FAIL | WARN | SKIP
DETAIL: [file:line if failing — omit line if PASS]
```

Status meanings:
- `PASS` — confirmed good from reading actual files
- `FAIL` — confirmed failing, include file:line where applicable
- `WARN` — present but incomplete, uncertain, or could not fully verify
- `SKIP` — not applicable for this stack

If a check cannot be determined from the available files, report `WARN` with "could not verify" — never guess PASS.

---

## Phase 1: Discovery

Before spawning agents, you must:

1. List the project root directory
2. Read `package.json` if present — note framework, key dependencies, scripts
3. Identify main entry files: `index.html`, `src/main.tsx`, `pages/index.tsx`, `app/layout.tsx`, etc.
4. Resolve the stack (e.g. "Next.js 14 + TypeScript + Tailwind CSS")

Use the discovered `[PROJECT_PATH]` and `[STACK]` in every agent prompt below.

---

## Phase 2: Specialist Agents

Spawn all 14 agents in a single parallel message using the Agent tool. Substitute `[PROJECT_PATH]` and `[STACK]` with actual values from Phase 1.

---

### 1A — Code Quality: Structure Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Structure Inspector for Code Quality. Use grep and file reads to check the actual source files.
>
> SECTION: Code Quality
> ROLE: Structure Inspector
>
> CHECK: No unused imports in source files
> CHECK: No dead code (unreachable functions, unused variables, orphaned exports)
> CHECK: No console.log, console.warn, or debugger statements in production source
> CHECK: No commented-out code blocks (3 or more consecutive commented lines)
> CHECK: Component and file names are semantic — no Section1, Card2, temp, test, copy, final, final2, new, untitled
> CHECK: No placeholder or temp files committed to the repo
>
> For each check, report using the structured format above.

---

### 1B — Code Quality: Standards Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Standards Inspector for Code Quality. Use grep and file reads to check the actual source files.
>
> SECTION: Code Quality
> ROLE: Standards Inspector
>
> CHECK: No hardcoded color values (hex/rgb/hsl literals) outside of CSS custom property definitions
> CHECK: No magic numbers used directly in layout, timing, or spacing (unnamed numeric literals)
> CHECK: No inline styles overriding design tokens
> CHECK: No TypeScript `any` types without a suppression comment and justification
> CHECK: Environment variables used for secrets — nothing sensitive hardcoded in source
> CHECK: `.env` is not committed; `.env.example` is committed with placeholder values only
>
> For each check, report using the structured format above.

---

### 2A — SEO: Technical Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Technical SEO Inspector. Check HTML templates, config files, and the public directory.
>
> SECTION: SEO
> ROLE: Technical Inspector
>
> CHECK: `robots.txt` exists at root and does not block important pages
> CHECK: `sitemap.xml` exists and is referenced in robots.txt
> CHECK: Canonical URL set on every page via `<link rel="canonical">`
> CHECK: `og:image` is referenced as an absolute URL (not a relative path)
> CHECK: `og:image` file physically exists at the path referenced in meta tags
> CHECK: Structured data / JSON-LD present where applicable (Organisation, Article, Product, BreadcrumbList)
>
> For each check, report using the structured format above.

---

### 2B — SEO: Content Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Content SEO Inspector. Check page and template files.
>
> SECTION: SEO
> ROLE: Content Inspector
>
> CHECK: Every page has a unique `<title>` tag — not identical across pages
> CHECK: Every page has `<meta name="description">` between 120–160 characters
> CHECK: OG tags present on every page: og:title, og:description, og:image, og:url, og:type
> CHECK: Every image has a descriptive `alt` attribute — not empty, not the filename, not "image" or "photo"
> CHECK: Heading hierarchy is correct: exactly one `<h1>` per page, logical h2 → h3 nesting
> CHECK: No obviously broken internal links (href="#", href="", empty href, placeholder links)
>
> For each check, report using the structured format above.

---

### 3A — Performance: Asset Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Asset Inspector for Performance. Check source files, stylesheets, and the assets/public directory.
>
> SECTION: Performance
> ROLE: Asset Inspector
>
> CHECK: All images use modern formats — WebP or AVIF, not JPEG/PNG for photos unless legacy-required
> CHECK: Images below the fold use lazy loading (`loading="lazy"` or framework equivalent)
> CHECK: Web fonts use `font-display: swap` in CSS or font config
> CHECK: Critical above-fold fonts are preloaded with `<link rel="preload">`
> CHECK: No obviously unused CSS rules or dead style blocks in stylesheets
> CHECK: No unused JS modules being imported and bundled (tree-shaking not defeated)
>
> For each check, report using the structured format above.

---

### 3B — Performance: Load Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Load Inspector for Performance. Check HTML files, component files, and package.json.
>
> SECTION: Performance
> ROLE: Load Inspector
>
> CHECK: No render-blocking scripts — all `<script>` tags use defer or async, or are placed before </body>
> CHECK: Images have explicit `width` and `height` attributes or are sized via CSS to prevent layout shift (CLS)
> CHECK: No bloated or redundant dependencies in package.json (multiple date libraries, duplicate utilities, etc.)
> CHECK: Third-party scripts (analytics, chat, ads) loaded asynchronously and not in the critical path
> CHECK: No unnecessary polyfills for browsers that are not being targeted
> CHECK: Build config targets production mode — no dev-only bundles, source maps, or verbose logging shipped
>
> For each check, report using the structured format above.

---

### 4A — Accessibility: Semantics Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Semantics Inspector for Accessibility. Check HTML and component source files.
>
> SECTION: Accessibility
> ROLE: Semantics Inspector
>
> CHECK: `lang` attribute set on `<html>` element with a correct BCP 47 language code
> CHECK: Skip-to-content link is the first focusable element on every page
> CHECK: Icon-only buttons and icon-only links have `aria-label` or visually-hidden text
> CHECK: All form inputs have an associated `<label>` via `for`/`id` or as a wrapping element
> CHECK: Semantic HTML used where appropriate: `<nav>`, `<main>`, `<footer>`, `<header>`, `<article>`, `<section>`
> CHECK: No `role` attributes that unnecessarily override native HTML semantics
>
> For each check, report using the structured format above.

---

### 4B — Accessibility: Visual & Interaction Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Visual & Interaction Inspector for Accessibility. Check CSS files and component source.
>
> SECTION: Accessibility
> ROLE: Visual & Interaction Inspector
>
> CHECK: Visible focus states on all focusable elements — no `outline: none` without a custom replacement
> CHECK: Color contrast meets WCAG AA: 4.5:1 for body text, 3:1 for large text and UI components (check CSS variables and values)
> CHECK: No content relies solely on color to convey meaning (error states, status indicators, required fields)
> CHECK: Interactive elements appear in a logical keyboard tab order (DOM order matches visual order)
> CHECK: No `tabindex` values greater than 0 (breaks natural tab order)
> CHECK: Motion/animation respects `prefers-reduced-motion` media query
>
> For each check, report using the structured format above.

---

### 5A — Security: Secrets & Dependencies Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Secrets & Dependencies Inspector for Security. Use grep to scan source files.
>
> SECTION: Security
> ROLE: Secrets & Dependencies Inspector
>
> CHECK: No secrets, API keys, tokens, or passwords in committed source files — grep for patterns: `sk-`, `key=`, `secret=`, `password=`, `token=`, `_KEY`, `_SECRET`, `_TOKEN`, `AUTH_`
> CHECK: `.env` file not committed — check .gitignore and confirm it lists .env
> CHECK: No npm scripts with `--legacy-peer-deps` or `--force` that mask dependency issues
> CHECK: Third-party scripts loaded only from official/known CDN domains
> CHECK: No `npm audit` high/critical findings visible in package-lock.json metadata (check for known vulnerability patterns)
>
> For each check, report using the structured format above.

---

### 5B — Security: Input & Output Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Input & Output Inspector for Security. Check component and utility source files.
>
> SECTION: Security
> ROLE: Input & Output Inspector
>
> CHECK: Any use of `dangerouslySetInnerHTML` (React) sanitizes its input before assignment
> CHECK: Any use of `innerHTML` directly only assigns sanitized or trusted content
> CHECK: User-supplied input (forms, URL params, query strings) is validated before use
> CHECK: All external links use `rel="noopener noreferrer"`
> CHECK: No mixed content — no HTTP asset URLs on what will be an HTTPS site
> CHECK: No `eval()`, `new Function()`, or dynamic code execution patterns with user-controlled input
>
> For each check, report using the structured format above.

---

### 6A — Mobile & Responsive: Layout Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Layout Inspector for Mobile & Responsive. Check HTML templates and CSS/Tailwind files.
>
> SECTION: Mobile & Responsive
> ROLE: Layout Inspector
>
> CHECK: Viewport meta tag is present and correct: `<meta name="viewport" content="width=device-width, initial-scale=1">`
> CHECK: Media queries or responsive utilities cover all target breakpoints: 375px, 768px, 1024px, 1440px
> CHECK: No fixed pixel widths on layout containers that would cause overflow on narrow screens
> CHECK: Images are responsive — use `max-width: 100%`, `width: 100%`, or equivalent — no fixed-width images that break mobile
> CHECK: Flexbox/Grid layouts have appropriate `flex-wrap`, `grid-template-columns`, or collapse rules for narrow viewports
> CHECK: No horizontal overflow caused by content wider than the viewport (check for `overflow-x: hidden` as a band-aid)
>
> For each check, report using the structured format above.

---

### 6B — Mobile & Responsive: Interaction Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Interaction Inspector for Mobile & Responsive. Check CSS and component files for mobile interaction patterns.
>
> SECTION: Mobile & Responsive
> ROLE: Interaction Inspector
>
> CHECK: All interactive elements (buttons, links, inputs) have a minimum 44×44px touch target size
> CHECK: Sufficient spacing between adjacent tap targets — minimum 8px gap between clickable elements
> CHECK: Input font size is at least 16px on mobile — prevents iOS Safari auto-zoom on focus
> CHECK: No `user-scalable=no` or `maximum-scale=1` in viewport meta — these disable pinch-zoom (accessibility violation)
> CHECK: Navigation is functional on mobile (hamburger menu, bottom nav, drawer, or equivalent — not a desktop-only nav bar)
> CHECK: No hover-only interactive states with no touch or focus equivalent
>
> For each check, report using the structured format above.

---

### 7A — Deployment Readiness: File Completeness Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the File Completeness Inspector for Deployment Readiness. Check the project root, public directory, and output config.
>
> SECTION: Deployment Readiness
> ROLE: File Completeness Inspector
>
> CHECK: `favicon.ico` or `favicon.svg` present at the correct location for this stack
> CHECK: Custom 404 page exists and is wired up (404.html, pages/404.tsx, app/not-found.tsx, etc.)
> CHECK: OG image file physically exists at the path referenced in meta tags
> CHECK: `README.md` exists and contains actual setup and run instructions (not just a framework default)
> CHECK: `.gitignore` covers: node_modules/, dist/, .env, build artifacts, .DS_Store, *.log
> CHECK: `robots.txt` and `sitemap.xml` are present in the public or output directory
>
> For each check, report using the structured format above.

---

### 7B — Deployment Readiness: Content Hygiene Inspector

> Read-only audit. Project: [PROJECT_PATH]. Stack: [STACK].
>
> You are the Content Hygiene Inspector for Deployment Readiness. Grep across all source files.
>
> SECTION: Deployment Readiness
> ROLE: Content Hygiene Inspector
>
> CHECK: No TODO, FIXME, or HACK comments remaining in production source files
> CHECK: No staging URLs or localhost references (localhost, 127.0.0.1, .local, staging.) in production code
> CHECK: No placeholder content: Lorem ipsum, [Client name], [URL], [Email], example.com (outside of .example files)
> CHECK: No hardcoded "test", "demo", or "staging" copy visible in UI components
> CHECK: No placeholder images from picsum.photos, placehold.co, via.placeholder.com, lorempixel.com
> CHECK: All `<title>`, `<meta description>`, and OG content is real — not template placeholder text
>
> For each check, report using the structured format above.

---

## Phase 3: Reconciler Agent

After all 14 agents have returned, spawn one final reconciler agent. Inject all 14 reports into its prompt verbatim.

**Reconciler prompt:**

> You are the Reconciler for a full handoff audit. You have received 14 specialist agent reports below (2 per section × 7 sections).
> Your job is to reconcile findings and produce the final audit report.
>
> [INSERT ALL 14 AGENT REPORTS HERE VERBATIM]
>
> ## Reconciliation Rules
>
> Match checks across agent pairs by description. Apply these rules:
>
> | Agent A | Agent B | Final Status |
> |---------|---------|--------------|
> | PASS | PASS | ✅ Pass |
> | FAIL | FAIL | ❌ Fail — merge both details |
> | WARN | WARN | ⚠️ Needs attention — merge both details |
> | FAIL | PASS | ⚠️ Disputed — show both perspectives |
> | PASS | FAIL | ⚠️ Disputed — show both perspectives |
> | FAIL | WARN | ❌ Fail — use the more severe detail |
> | WARN | PASS | ⚠️ Needs attention — use the warning detail |
> | SKIP (either) | any | — Not applicable |
>
> For solo checks (only one agent covered it, no counterpart): include as-is with the agent's reported status.
>
> ## Output Format
>
> Produce the final report exactly as shown:
>
> ---
> # Handoff Audit — [Project Name]
> **Stack:** [STACK]
> **Audited:** [today's date]
>
> ## 1. Code Quality
> [all reconciled items with status icon and one-line detail if not passing]
>
> ## 2. SEO
> [all reconciled items]
>
> ## 3. Performance
> [all reconciled items]
>
> ## 4. Accessibility
> [all reconciled items]
>
> ## 5. Security
> [all reconciled items]
>
> ## 6. Mobile & Responsive
> [all reconciled items]
>
> ## 7. Deployment Readiness
> [all reconciled items]
>
> ---
>
> ## Summary
> ✅ [X] passing
> ⚠️ [X] need attention
> ❌ [X] failing
> — [X] not applicable
>
> ## Priority Fixes Before Handoff
> [Ordered list: ❌ items first by severity, then ⚠️ items. Each item: section, what's wrong, file:line if known.]
>
> ## Disputed Findings (Manual Review Required)
> [List any items where the two agents disagreed. For each: what Agent A found, what Agent B found, recommended next step.]
> ---

---

## Orchestrator Notes

- If a section is entirely not applicable (e.g. pure API project — no SEO needed), instruct agents to SKIP that section and note it.
- If the project has no `package.json`, skip dependency/npm checks and mark those SKIP.
- The 14 specialist agents and 1 reconciler = 15 Agent tool calls total. The 14 specialist calls happen in parallel. The reconciler runs after all 14 complete.
- Do not commit anything. Do not suggest refactors. Report only.
