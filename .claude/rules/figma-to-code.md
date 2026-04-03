---
paths:
  - "**/figma/**"
  - "**/design/**"
  - "**/mockup/**"
  - "src/components/**"
  - "src/sections/**"
  - "src/app/**"
  - "components/**"
  - "sections/**"
  - "app/**"
---

# Figma-to-Code Rules
# Loaded when working inside figma/, design/, or mockup/ folders

## Translation Workflow
1. Screenshot first — understand content layout and section structure
2. Read existing code — understand style system already in place
3. Map Figma layers to semantic HTML elements before writing a line
4. Inherit existing classes — only create new CSS if no match exists

## Matching the Design
- Match spacing visually, not by guessing pixel values
- Use the existing spacing scale — do not hardcode px values from Figma
- Font sizes must match the project's defined type scale, not raw Figma numbers
- Colors must map to existing CSS custom properties — never hardcode hex values

## What "Done" Means
- Layout matches design at all three breakpoints (375 / 768 / 1440px)
- Typography hierarchy is preserved — heading levels match visual weight
- Spacing is consistent with the rest of the site, not just this section
- Interactive states (hover, focus) are implemented

## What to Flag, Not Decide
- If the design conflicts with an existing pattern, flag it — don't pick one silently
- If a Figma component has no clear HTML equivalent, show two options
- If the design is desktop-only with no mobile comp, ask before inventing responsive behavior
