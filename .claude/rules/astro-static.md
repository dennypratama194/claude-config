---
paths:
  - "**/*.astro"
  - "src/components/**"
  - "src/pages/**"
  - "src/layouts/**"
---

# Astro Static Rules
# Loaded only when working with .astro files or Astro project folders

## Read First
Before touching any page or component, read:
1. src/layouts/Layout.astro — the base layout and global styles
2. src/components/ — what components already exist
Do NOT create a component that already exists with a different name.

## Style Inheritance Workflow
1. Check if a style already exists in Layout.astro or a global CSS file
2. Use existing CSS custom properties — never hardcode values
3. Add component-scoped styles in <style> blocks only if no global class fits
4. Never duplicate a style that's already defined globally

## Astro-Specific Rules
- Pages go in src/pages/ — one file per route
- Reusable UI goes in src/components/
- Layouts go in src/layouts/
- Static assets go in public/ — never in src/
- Use Astro.props for all component data — no hardcoded content inside components

## JavaScript
- Script goes in <script> tags inside .astro files or separate .ts files
- GSAP setup, lifecycle and cleanup: see `.claude/rules/gsap.md` (loads with this file).
  The short version: import via npm, never CDN, and which event you bind to depends on
  whether <ClientRouter /> is in Layout.astro — check before writing any animation.

## Client Project Rules
- Copy and section order: see the client-work rule in standards.md. It governs.
- If a design decision conflicts with an existing pattern, flag it. Don't pick silently.

## What "Done" Means
- Page renders correctly at 375 / 768 / 1440px
- No console errors
- Styles inherited from layout — no duplicated CSS
- Hover and focus states implemented
