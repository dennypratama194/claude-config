---
paths:
  - "src/components/**/*.tsx"
  - "src/components/**/*.jsx"
  - "src/pages/**/*.tsx"
  - "src/pages/**/*.jsx"
  - "app/**/*.tsx"
  - "app/**/*.jsx"
---

# React Component Rules
# Loaded only when working with React component or page files

## Component Structure
- Functional components only — no class components
- TypeScript props interfaces required on every component
- Named exports preferred over default exports
- One component per file. Name matches filename.

## Styling
- Tailwind utility classes — no custom CSS unless absolutely unavoidable
- Mobile-first: start with base styles, add md: lg: xl: breakpoints
- Never use arbitrary Tailwind values like w-[327px] — use scale values

## State and Logic
- Extract reusable logic into custom hooks in src/hooks/
- Keep components focused — if it needs 100+ lines, split it
- Loading and error states required for every async component

## Naming
- Components: PascalCase (HeroSection, PricingCard)
- Hooks: camelCase with "use" prefix (useScrollPosition)
- Utilities: camelCase (formatDate, truncateText)

## Animation
- Framer Motion for React projects
- CSS transitions for simple hover/show states
- Never animate on initial load unless it adds real value
