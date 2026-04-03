# Claude Code — Project Template

## What This Is

A reusable Claude Code config template. Copy it into every new project.
Edit only `CLAUDE.md` per project. The rule files stay the same.

---

## Folder Structure

```
your-project/
  CLAUDE.md                   ← Edit this per project (client, stack, constraints)
  CLAUDE.local.md             ← Personal overrides — gitignored, optional
  .gitignore                  ← Already includes CLAUDE.local.md

  .claude/
    settings.json             ← Allow/deny permissions
    settings.local.json       ← Personal permission overrides — gitignored, optional

    rules/
      global-style.md         ← Always loaded (layout, type, color, anti-patterns)
      html-static.md          ← Loaded for *.html and *.css only
      astro-static.md         ← Loaded for *.astro only
      react-components.md     ← Loaded for *.tsx and *.jsx only
      wordpress.md            ← Loaded for *.php and WP files only
      figma-to-code.md        ← Loaded inside figma/ or design/ folders only
```

---

## How to Use on a New Project

**Step 1 — Copy the config into your project**
```
Copy .claude/ folder → your-project/.claude/
Copy CLAUDE.md      → your-project/CLAUDE.md
Copy .gitignore     → your-project/.gitignore (or merge with existing)
```

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
- Working on anything → `global-style.md` always loads

Claude never sees all rules at once. Context stays clean.

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

- `global-style.md` — update when your layout/type/color standards change
- `html-static.md` / `astro-static.md` — update when your static site workflow changes
- `react-components.md` — update when your React conventions change
- `wordpress.md` — update when your WP workflow changes
- Add new rule files for new stacks (e.g. `nextjs.md`, `shopify.md`)
