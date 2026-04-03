# Global Style Rules
# Loaded every session, every project

## Layout
- Max content width: 1440px
- Container padding: 24px (mobile) → 48px (tablet) → 80px (desktop)
- Base spacing unit: 4px. Multiples only: 4/8/12/16/24/32/48/64/96/128px
- No arbitrary spacing values. No magic numbers.
- 12-column grid. Prefer asymmetry over symmetry.
- Mobile-first. Breakpoints: 375 / 768 / 1024 / 1440px

## Typography
Scale: 12/14/16/18/20/24/28/32/40/48/56/64/72px
- Body: 16px, line-height 1.6
- Headings: line-height 1.1–1.3
- Vary heading sizes per section — uniform sizes = AI slop
- Never use Inter, Roboto, Arial, Space Grotesk as primary display font

## Color
- Define everything via CSS custom properties — never hardcode values
- WCAG AA minimum: 4.5:1 body text, 3:1 large text
- 1–2 accent colors max. Commit to the palette early.

## Anti-Patterns — Never
- Purple/blue gradient on white
- Centered hero + stock photo background
- Uniform card grids with no hierarchy
- Animations that delay content loading
- Hardcoded colors instead of custom properties
- Desktop-only builds
- Generic "AI-generated" aesthetic — every section should feel intentional
