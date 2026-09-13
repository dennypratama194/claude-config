---
paths:
  - "**/*.js"
  - "**/*.mjs"
  - "**/assets/js/**"
  - "**/*.astro"
---

# GSAP Rules
# Loaded for JS files and .astro files. Single source of truth for GSAP setup and lifecycle.

## Install Method — depends on the stack

| Stack | How |
|---|---|
| Vanilla HTML/CSS/JS | CDN only. No npm, no build step. |
| Astro | npm — `import gsap from 'gsap'`. Never CDN in Astro. |
| React / Next.js | Don't. Use Motion (`motion/react`) — see standards.md. |

Register plugins explicitly, once, before any animation:

```js
gsap.registerPlugin(ScrollTrigger);
```

## Lifecycle — this is where GSAP breaks

Bind to the right event or animations silently never run:

| Context | Event |
|---|---|
| Vanilla HTML | `DOMContentLoaded` |
| Astro **with** `<ClientRouter />` in the layout | `astro:page-load` — fires on first load *and* every client-side navigation |
| Astro **without** `<ClientRouter />` | `DOMContentLoaded` — `astro:page-load` never fires |

Check `Layout.astro` for `<ClientRouter />` before choosing. Guessing produces a page
where nothing animates and nothing errors, which is the hardest version to debug.

```js
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.hero');
  if (!el) return;           // always guard — a missing element throws and kills the rest of the file
  gsap.from(el, { y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' });
});
```

## Cleanup on client-side navigation

With `<ClientRouter />`, ScrollTriggers from the previous page survive navigation and
stack up. Kill them before rebuilding:

```js
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
```

Without this, scroll performance degrades on every navigation and triggers fire against
elements that no longer exist.

## Conventions

- Vanilla projects: all animation code at the bottom of `main.js`, in one marked section
- Always guard with `if (!el) return` before animating
- Respect `prefers-reduced-motion` — skip or shorten, never ignore:
  ```js
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  ```
- Never animate an element into view that contains content the user needs immediately.
  Animations that delay content are an anti-pattern, not a flourish.
- Every motion needs intent. Nothing decorative.
