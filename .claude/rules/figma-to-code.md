---
paths:
  - "**/figma/**"
  - "**/design/**"
  - "**/mockup/**"
---

# Figma-to-Code Rules
# Active when working in design/figma/mockup folders, or whenever a Figma URL is provided in the conversation.

## Step 1: Read the Design First

When a Figma URL is provided:
1. Use `get_design_context` to read the full layer structure, spacing, typography, and component properties
2. Use `get_screenshot` to visually confirm the layout and hierarchy
3. Extract the `fileKey` and `nodeId` from the URL before calling any tool:
   - `figma.com/design/:fileKey/:name?node-id=:nodeId` — convert `-` to `:` in nodeId

Do not write a single line of code until you understand the full layout, breakpoints present in the design, and component structure.

## Step 2: Read the Existing Codebase

Before implementing:
- Read the project's style system (CSS custom properties, Tailwind config, token file)
- Identify existing components that match Figma layers — reuse before creating
- Understand naming conventions already in use

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
