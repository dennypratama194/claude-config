---
paths:
  - "**/figma/**"
  - "**/design/**"
  - "**/mockup/**"
---

# Figma-to-Code Rules

Canonical policy for translating Figma designs into this project's code.
Path-based loading is limited to the globs above; a Figma URL alone is not a trigger.
The `build-from-figma` skill explicitly reads this file regardless of target paths.
For direct Figma tasks outside those paths, explicitly read this file first.

## Step 1: Read the Design First

When a Figma URL is provided:
1. Extract the `fileKey` and `nodeId` from the URL before calling any tool:
   - `figma.com/design/:fileKey/:name?node-id=:nodeId` — convert `-` to `:` in nodeId
2. Use `get_variable_defs` **first** — it returns the design's actual variables
   (colors, spacing, radii, type). This is the token source of truth. Reading hex
   values off a screenshot or out of the design context instead is how hardcoded
   values end up in the code.
3. Use `get_design_context` to read layer structure, spacing, typography, and component properties
4. Use `get_screenshot` to visually confirm the layout and hierarchy

For oversized design context, use `get_metadata` to identify sections, then retrieve
context for those sections without assuming the missing content.

Do not write a single line of code until you understand the full layout, breakpoints present in the design, and component structure.

## Step 2: Read the Existing Codebase

Before implementing:
- Read the project's style system (CSS custom properties, Tailwind `@theme`, token file)
- Run `get_code_connect_map` — it maps Figma components to components that already
  exist in this codebase. Check it before hand-matching layer names to files.
- Identify existing components that match Figma layers — reuse before creating
- Understand naming conventions already in use

## Assets and Motion

- Reuse the supplied Figma assets; do not replace them with placeholders or a new icon library.
- Use `download_assets` when available for production images and SVGs. Otherwise use
  the asset sources returned by the connected Figma tools through permitted access.
  Do not ship temporary or localhost asset URLs as production dependencies.
- If the design specifies motion, use `get_motion_context` when available and adapt
  it to the project's existing motion approach. If unavailable, flag the missing
  motion evidence rather than inventing animation.
- Missing required tool access is a blocker to report, not permission to bypass settings.

## Token Reconciliation

With `get_variable_defs` output on one side and the project's tokens on the other,
every Figma value falls into one of three buckets:

| Case | Action |
|---|---|
| Figma variable maps cleanly to an existing project token | Use the project token |
| Figma variable has no project equivalent | **Flag it.** Do not invent a token, do not hardcode the raw value |
| Figma layer uses a raw value with no variable behind it | Flag it — usually a design-side mistake worth reporting back |

## Translation Workflow

### Layers → HTML
- Map Figma layer names to semantic HTML elements before writing code
- Frame/Group containing text + icon → likely a `<button>` or `<a>`
- Frame with list of items → `<ul>` / `<li>` or mapped array
- Layer names in PascalCase often indicate a reusable component — check if it already exists

### Auto-Layout → CSS
| Figma | CSS |
|---|---|
| Auto-layout horizontal | `display: flex; flex-direction: row` |
| Auto-layout vertical | `display: flex; flex-direction: column` |
| Wrap | `flex-wrap: wrap` |
| Gap | `gap: [spacing token]` |
| Fill container | `flex: 1` or `width: 100%` |
| Hug contents | `width: fit-content` (or no explicit width) |
| Fixed size | explicit `width` / `height` mapped to spacing scale |

### Variants → Code Props
- Figma component variants (Size: sm/md/lg, State: default/hover/disabled) → component props
- Figma boolean properties → optional props or conditional classes
- Figma instance swap → `children` prop or slot pattern
- Implement all variants that exist in the design — do not flatten to a single state

### Values → Tokens
- Spacing: map to project spacing scale — never hardcode raw Figma px values
- Font sizes: map to project type scale — never use raw Figma numbers
- Colors: map to CSS custom properties — never hardcode hex values
- If a Figma value has no matching token, flag it before proceeding

## What "Done" Means

- Layout matches design at all four breakpoints: 375px / 768px / 1024px / 1440px
- All component variants present in the design are implemented
- Typography hierarchy is preserved — heading levels match visual weight
- Spacing is consistent with the rest of the site, not just this section
- Interactive states implemented: hover, focus, active, disabled (wherever the design specifies)
- All images have descriptive `alt` text

## What to Flag, Not Decide

- If a Figma value (spacing, color, size) has no matching token in the project — flag it, don't invent a new token
- If the design conflicts with an existing pattern or component — flag it, don't pick one silently
- If a Figma component has no clear HTML equivalent — show two options before implementing
- If the design is desktop-only with no mobile frame — ask before inventing responsive behavior
- If Figma variants exist that are not specified for this screen — ask whether to implement all or only the ones shown
