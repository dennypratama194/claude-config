# Claude Code — Project Template

## What This Is

A reusable Claude Code config template. Copy it into every new project.
Edit only `CLAUDE.md` per project. The rule files stay the same.

---

## Folder Structure

```
claude-config/
  standards.md                ← Canonical base standards. NOT copied per project —
                                 imported once per device (see Device Setup below)

  CLAUDE.md                   ← Template. Copy + edit per project
  .gitignore

  .claude/
    settings.json             ← Allow/deny permissions

    rules/
      html-static.md          ← Loaded for *.html and *.css only
      astro-static.md         ← Loaded for *.astro only
      react-components.md     ← Loaded for *.tsx and *.jsx only
      nextjs.md               ← Loaded for app/ and pages/ router files only
      wordpress.md            ← Loaded for *.php and WP files only
      gsap.md                 ← Loaded for *.js and *.astro — GSAP setup + lifecycle
      figma-to-code.md        ← Loaded inside figma/ or design/ folders only

    skills/
      build-from-figma/       ← /build-from-figma — Figma → code → visual QA → audit
      handoff-audit/          ← /handoff-audit — orchestrates the 19 agents below
      handoff-audit-lite/     ← /handoff-audit-lite — fast single-pass audit
      optimize-images/        ← /optimize-images — WebP + width/height + lazy loading
      stack-select/           ← /stack-select — prune CLAUDE.md to the chosen stack

    agents/
      audit-*.md              ← 18 read-only inspectors (tools: Read, Grep, Glob)
      audit-reconciler.md     ← consolidates their 18 reports into one
      figma-visual-qa.md       ← read-only Figma vs local screenshot evaluator

    hooks/
      format.mjs              ← PostToolUse: runs the project's own prettier after edits
```

### The hook

`format.mjs` runs after every Edit/Write, but **only in projects that already have
prettier installed and configured**. On a client's hand-maintained codebase with no
prettier setup it does nothing at all — reformatting those files would be exactly the
structural churn the standards forbid. Opt a project in by adding prettier to
`package.json` plus a prettier config.

Frontend design guidance is **not** duplicated in this repo — Claude Code ships its own
`frontend-design` skill. `standards.md` carries the constraints it does not cover
(4px spacing scale, type scale, 1440 max width, breakpoints).

### Build from Figma

Install and authenticate Figma's official Claude Code plugin once:

```bash
claude plugin install figma@claude-plugins-official
```

Then run the workflow from the target project:

```bash
/build-from-figma <figma-frame-url> [target-route-or-file]
```

The skill reads the design and existing codebase, implements in one coordinated context,
runs the project's existing checks, delegates screenshot comparison to the read-only
`figma-visual-qa` agent, performs at most two correction rounds, then runs
`/handoff-audit-lite`. It does not commit, push, deploy, or install dependencies.

---

## Device Setup (once per machine)

`standards.md` is the single source of truth for all your projects. Point each
device's global config at it instead of copying it around:

```bash
git clone <this repo> ~/claude-config
```

Then in `~/.claude/CLAUDE.md`:

```markdown
@~/claude-config/standards.md
```

That's it. The standards now apply to **every** project on that machine, template
or not. To change them: edit `standards.md`, commit, `git pull` on the other device.
Never edit the standards in two places.

---

## How to Use on a New Project

**Step 1 — Copy the config into your project**
```
Copy .claude/ folder → your-project/.claude/
Copy CLAUDE.md      → your-project/CLAUDE.md
Copy .gitignore     → your-project/.gitignore (or merge with existing)
```
Do **not** copy `standards.md` — it loads from your global config already.

**Step 2 — Edit CLAUDE.md**
Fill in the placeholders: project name, stack, constraints, style reference file.
Keep it under 30 lines. Everything else is handled by the rule files.

**Step 3 — Start Claude Code**
Rules load automatically. You're done.

---

## How Path-Scoped Rules Work

Rules with a `paths:` block only load when Claude touches matching files.

- Working on a `.html` file → `html-static.md` loads
- Working on a `.astro` file → `astro-static.md` loads
- Working on `.php` → `wordpress.md` loads
- Working on anything → `standards.md` always loads (via your global config)

Claude never sees all rules at once. Context stays clean.

Path-scoped rules load when Claude *reads a matching file*, not on every tool call,
and they reload after `/compact`. Run `/context` to see which rules are actually loaded.

---

## What to Edit Per Project (CLAUDE.md only)

```markdown
# Brenom Systems — Client Site

## Project
B2B industrial supplier. Static HTML. Staging: brenom.netlify.app

## Stack
Vanilla HTML / CSS / JavaScript. GSAP via CDN. No build tools.

## Style Reference
index.html — read this before touching any inner page.

## Active Constraints
- Accent orange (#f57418) — max 6 instances total
- Bebas Neue: hero and process section only
- Barlow: all other headings, varied sizes per section
- IBM Plex Mono: labels and utility text only
- No copy changes. No section removals. Improve only.
```

---

## What NOT to Edit

The rule files in `.claude/rules/` are project-agnostic standards.
Don't edit them per project. If a project needs a special exception,
put it in `CLAUDE.md` under Active Constraints.

Only update rule files when your global standards change across all projects.

---

## Maintenance

- `standards.md` — update when your layout/type/color standards change (repo root).
  It is also the single authority on the never-touch-client-copy rule; the stack rules
  defer to it rather than restating it.
- `.claude/agents/audit-*.md` — update when an audit check changes; the skill just orchestrates
- `html-static.md` / `astro-static.md` — update when your static site workflow changes
- `react-components.md` — update when your React conventions change
- `wordpress.md` — update when your WP workflow changes
- Add new rule files for new stacks (e.g. `shopify.md`, `svelte.md`)
