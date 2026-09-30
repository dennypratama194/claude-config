# Digital Revo Dashboard Design Standard

> Version 1.0  
> Purpose: Reusable design and UX standard for dashboard and application interfaces: CRM, CMS, ERP, SaaS dashboards, admin panels, internal tools, portals, and operational applications.
> Scope: This standard applies only to signed-in product interfaces and dashboard/application screens. It does not govern public landing pages, marketing websites, campaign pages, or other public-facing brand experiences.

---

# 1. Purpose

This document defines the default design language for dashboard and application interfaces in Digital Revo projects. It makes those interfaces consistent without requiring every visual and UX decision to be redesigned from scratch.

## In scope

- Signed-in dashboards and application shells
- CRM, CMS, ERP, POS administration, internal tools, and client portals
- Data tables, forms, settings, operational workflows, and analytics inside those products

## Out of scope

- Public landing pages and marketing websites
- Campaign pages, brand storytelling, and public product pages
- Public-facing content whose design is governed by a website or brand design system

Do not apply dashboard-specific rules such as compact density, persistent sidebars, KPI cards, or operational tables to an out-of-scope page. For mixed products, apply this document only to the signed-in application area; follow the website's own design system for public pages.

The system is primarily derived from:

1. **Crimson Creed Dashboard** — primary design reference
2. **DigitalRevo Dashboard** — secondary design reference
3. **Cafe POS Dashboard** — operational and data-heavy reference

The resulting system should feel clean, restrained, functional, compact, modern, premium without decoration, information-dense without feeling crowded, consistent across projects, and easy for developers and AI coding agents to reproduce. The goal is not to make every dashboard visually identical; the goal is to make every dashboard feel like it comes from the same design philosophy.

---

# 2. Design Hierarchy

When making a UI decision, use this precedence:

1. Existing established project patterns
2. `project-design.md` explicit overrides
3. This `design.md`
4. Existing reusable components
5. Product-specific UX requirements
6. Agent or developer judgment

Never introduce a new visual pattern when an established equivalent already exists. If an existing project already has a stable component that satisfies the requirement, reuse it rather than replacing it simply to match this file more literally.

---

# 3. Core Design Philosophy

## 3.1 Product UI first

This is product software, not a marketing website. Prioritize clarity, speed, scanning, predictable interaction, data visibility, and low cognitive load. Avoid decorative UI that does not help the user perform a task.

## 3.2 Neutral-first design

Most of the interface should be neutral: approximately 80–90% neutral surfaces, text, borders, and controls; project brand color for important emphasis; semantic colors only for meaningful states. The brand color should not dominate every component.

## 3.3 Compact, not cramped

Prefer relatively dense layouts. Dashboard users benefit from seeing more information at once. Do not create giant cards, oversized navigation, huge headings, excessive vertical whitespace, or 64px+ spacing between ordinary sections. Density must still preserve readability.

## 3.4 Borders before shadows

Use subtle borders as the primary way to separate surfaces. Shadows should be minimal; cards should not look like floating marketing cards.

```css
border: 1px solid var(--border);
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
```

Avoid large shadows unless implementing a modal, popover, or genuinely elevated surface.

## 3.5 One strong accent

A dashboard should normally have one brand accent (for example, DigitalRevo blue, Crimson Creed rust, or a client brand). Do not create a rainbow interface from the brand palette. Semantic colors are separate from branding.

---

# 4. Anti-Slop Rules

Do not introduce typical AI-generated dashboard styling. Avoid giant 32–48px dashboard headings, gradients on ordinary cards, glassmorphism, glowing buttons or borders, excessive shadows, gradient text, decorative blobs, random floating elements, unnecessary illustrations, giant icons inside KPI cards, every card having a different color, every value inside a pill, excessive rounded or nested containers, random spacing values, centered layouts where left alignment is more useful, excessive animations, fake analytics or activity feeds, decorative charts with no decision value, giant empty hero areas, marketing copy inside operational interfaces, and arbitrary spacing values such as 13px or 27px without a specific reason. If removing an element does not reduce usability or understanding, consider removing it.

---

# 5. Design Tokens

All visual values should resolve through reusable tokens. Never scatter raw hex values through individual components.

```css
:root {
  --background: ;
  --surface: ;
  --surface-muted: ;
  --surface-selected: ;
  --foreground: ;
  --foreground-secondary: ;
  --foreground-muted: ;
  --border: ;
  --border-strong: ;
  --primary: ;
  --primary-hover: ;
  --primary-foreground: ;
  --success: ; --success-bg: ; --success-border: ;
  --warning: ; --warning-bg: ; --warning-border: ;
  --danger: ; --danger-bg: ; --danger-border: ;
  --info: ; --info-bg: ; --info-border: ;
}
```

Components consume semantic tokens and should not care what brand they belong to.

---

# 6. Default Neutral Palette

For new dashboards, use this neutral foundation unless the project requires another palette.

```css
--background: #ffffff;
--surface: #ffffff;
--surface-muted: #f7f8f9;
--surface-selected: #f1f2f4;
--foreground: #141517;
--foreground-secondary: #4a4e57;
--foreground-muted: #6a6e78;
--border: #e6e7e9;
--border-strong: #d5d7db;
```

The foundation should feel neutral rather than blue-gray.

---

# 7. Default Brand Accent

The fallback accent may use Crimson Creed warm rust:

```css
--primary: #a5502b;
--primary-hover: #874020;
--primary-foreground: #ffffff;
```

The brand accent is expected to be overridden by each project. Changing the brand color should not require changing component implementation.

---

# 8. Semantic Colors

Semantic colors represent meaning, not decoration.

| State | Background | Foreground | Border | Use |
|---|---|---|---|---|
| Success | `#ecfdf3` | `#067647` | `#abefc6` | Active, completed, successful, paid, healthy |
| Warning | `#fffaeb` | `#b54708` | `#fedf89` | Pending attention, low stock, incomplete, review |
| Danger | `#fef3f2` | `#b42318` | `#fecdca` | Errors, failures, destructive or blocked states |
| Information | `#eff8ff` | `#175cd3` | `#b2ddff` | Informational, processing, secondary workflow state |

Never use red simply because an element needs more attention.

---

# 9. Dark Mode

Dark mode is optional. Implement it when required, already supported, or when users work for long periods in the product. Design it intentionally; do not mechanically invert light mode.

```css
--background: #08090a;
--surface: #0f1011;
--surface-muted: #151719;
--surface-selected: #1a1c1f;
--foreground: #f7f8f8;
--foreground-secondary: #c8cace;
--foreground-muted: #8a8f98;
--border: #23252a;
--border-strong: #2b2e34;
```

Brand colors may need a lighter dark-mode equivalent. Semantic colors should use tinted, subdued backgrounds rather than bright solid surfaces.

---

# 10. Spacing System

Use a 4px base system with an 8px dominant rhythm.

| Value | Typical use |
|---|---|
| 2px | Optical or micro adjustment only |
| 4px | Micro gap |
| 8px | Tight component spacing |
| 12px | Compact component spacing |
| 16px | Default internal padding |
| 24px | Major component padding or form gap |
| 32px | Section spacing |
| 48px | Large separation |
| 64px | Exceptional page separation |

Do not invent spacing values without a specific reason.

---

# 11. Border Radius

The interface should feel slightly rounded, not bubbly.

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-control: 8px;
--radius-card: 12px;
--radius-modal: 12px;
--radius-large: 16px;
--radius-full: 9999px;
```

Use 4–6px for tiny controls, 6–8px for buttons/inputs/navigation, 10–12px for cards and table containers, 8–10px for dropdowns, 12–16px for dialogs, and full radius for badges and avatars. Avoid 20–32px radius everywhere.

---

# 12. Typography

Preferred fonts: Geist, Inter, or a high-quality system sans-serif. Prioritize readability over visual personality.

| Role | Default |
|---|---|
| Desktop base | 14px / 1.5 |
| Page title | 24px / 600 / ~1.25 line height |
| Section title | 16px / 600 |
| Card title | 14–16px / 600 |
| Body | 14px / 400 |
| Supporting copy | 13–14px / muted |
| Metadata | 12px / muted |

Use at least 16px on mobile form fields where needed to prevent browser zoom. Use tabular numerals for currency, quantities, KPI values, percentages, and other values that need to align (`font-variant-numeric: tabular-nums`).

---

# 13. Writing Style

Use direct language and sentence case. Buttons should normally begin with verbs; descriptions should usually be one sentence.

Prefer: “Create order,” “Save changes,” “Add member,” “Delete item,” “View details,” “Low stock,” “Awaiting review.” Avoid “Unlock possibilities,” “Take your business to the next level,” and other marketing language in operational UI.

---

# 14. Application Shell

The default desktop application consists of a persistent sidebar and a main column containing the top bar and page content.

```text
Sidebar | Main column
        |   Top bar
        |   Page content
```

---

# 15. Sidebar

Desktop sidebar is persistent and collapsible. Recommended expanded width is 240–256px (default 240px), collapsed width 64px, height `100dvh`. Use a 1px right border and avoid large shadows.

## 15.1 Structure

```text
Brand / collapse control
Navigation groups and items
Account / workspace controls
```

## 15.2 Navigation items

Use 32–36px height, 16px icons, 14px text at 500 weight, 12px horizontal padding, 8–12px gap, and 6–8px radius. Navigation should feel compact.

## 15.3 Groups

Group labels are 11–12px, medium or semibold, muted. Uppercase with light tracking is acceptable; labels should not dominate.

## 15.4 Active state

Use a subtle neutral background and stronger text, optionally with brand-colored text or icon. Avoid a fully saturated block unless specifically appropriate.

## 15.5 Collapsed state

Hide text, center icons, preserve active state and group separation, provide tooltips, and persist the user's preference. Do not show truncated labels.

## 15.6 Route matching

Only one item should appear active. A more specific child route takes precedence over its parent (for example, `/settings/staff` highlights Staff rather than Settings).

---

# 16. Mobile Navigation

Below the desktop breakpoint, hide the persistent sidebar and show a hamburger control. The sidebar becomes a slide-in drawer with a backdrop and width `min(280px, 85vw)`. Lock page scrolling while open, close on Escape and after navigation, and return focus to the trigger when closed. Do not squeeze the desktop sidebar onto a mobile screen.

---

# 17. Top Bar

Use a 56px recommended height and 1px bottom border. Contents may include mobile navigation, notifications, theme toggle, workspace switcher, and user menu. A slightly translucent sticky header with subtle blur is acceptable. Do not turn it into a second navigation bar without need.

---

# 18. Main Content

Recommended maximum width is 1440–1536px; wide operational dashboards may use 1536px. Center content in the available workspace without forcing narrow marketing widths onto data-heavy screens.

| Viewport | Padding |
|---|---|
| Mobile | 16px horizontal, 20–24px vertical |
| Tablet | 24–32px horizontal |
| Desktop | 32–48px horizontal, 32px vertical |

Wide operational screens may increase horizontal padding to 64–80px when space allows.

---

# 19. Page Header

Use a predictable structure: title and actions, followed by an optional description. Use a 24px semibold title, 14px muted description, and about 24px below the header. Align actions right on desktop. On mobile stack title, description, then actions; allow actions to wrap.

---

# 20. Breadcrumbs

Use breadcrumbs when hierarchy is deeper than the main navigation communicates, such as nested records, edit pages, detailed CMS structures, and configuration hierarchies. Do not add them to every page.

---

# 21. Cards

Default cards use a surface background, 1px border, 10–12px radius, and subtle or no shadow. Use 16–24px padding: 16px for dense analytical cards, 24px for forms or content-heavy panels.

## 21.1 Hierarchy

A card represents a meaningful group. Avoid wrapping every section in nested cards unless hierarchy genuinely requires it.

## 21.2 Hover

Only interactive cards should change meaningfully on hover, through a subtle surface or border change. Static cards should not imply clickability. Avoid dramatic lift animations.

---

# 22. KPI Cards

Use KPI cards for a small number of high-value metrics. Anatomy: label and optional small icon, primary value and trend, comparison or supporting text. Use a 14px muted label, 20–30px semibold tabular value, 16px muted icon, and a small 12px semantic trend indicator. Icons support scanning and should not dominate.

Prefer 4–6 primary KPIs. Do not elevate every database value to a KPI. Responsive grid: mobile 1–2 columns, small screens 2–3, desktop 4–5; use 12–16px gaps.

---

# 23. Dashboard Overview Pattern

A default overview may follow: page header/date range; primary KPI grid; main trend chart beside needs-attention widget; recent activity and a secondary operational widget; recent records; secondary analytics. Do not add sections just to fill space. Every widget should answer a useful question.

---

# 24. Attention and Action Widgets

Highlight items that require action (payments to verify, orders to process, low-stock products, failed syncs). Each row has a concise label, optional explanation, count, and a link directly to relevant filtered records. Actionable queues are more useful than decorative analytics.

---

# 25. Tables

Tables are a primary dashboard primitive. Use a 1px border, 10–12px outer radius, and subtle header surface. Do not add a heavily styled outer card unless it adds real value.

## 25.1 Typography and spacing

Headers: 12px, 500, muted. Body: 14px. Cell padding: 12–16px horizontal and 10–12px vertical; typical row height 40–48px.

## 25.2 Header and hover

Use a subtle muted surface for the header. Interactive rows may use a subtle muted background on hover.

## 25.3 Alignment

Keep text, names, and statuses left aligned. Use tabular numerals. Right-align numeric columns only when that materially improves comparisons. Consistency within a table matters most.

## 25.4 Row actions

Place secondary actions in a compact overflow menu. Avoid permanently showing a row of Edit/Delete/Duplicate/Archive/Reset controls. Record name or row may navigate; controls inside a clickable row must remain independently usable.

## 25.5 Large tables

Do not shrink columns until text becomes unreadable. Allow horizontal scrolling, maintain sensible minimum widths, keep identifying information visible, and optionally show scroll affordances or sticky headers.

---

# 26. Filters

Place filters immediately above relevant data. Use a search control, filters, and primary action in a compact row; allow wrapping on small screens.

## 26.1 Search

Recommended width 280–360px. Use context-specific placeholders such as “Search members…” or “Search orders…”, not “Type here.”

## 26.2 Segmented filters

Use for mutually exclusive short choices (about 2–5), such as All, Active, Inactive, Archived. The active segment uses a surface background and stronger text. Avoid colorful pill collections.

## 26.3 Select filters

Use a select when there are many options, long labels, or a growing choice set.

## 26.4 URL state

Where practical, reflect table filters and pagination in URL search parameters, for refresh, sharing, back navigation, server rendering, and debugging.

---

# 27. Tabs

Use a simple underline pattern for major local navigation: a bottom border, 10px 12px tab padding, 14px medium text. The active tab uses a 2px brand-colored underline and stronger text. Provide clear keyboard behavior and do not use tabs for unrelated routes or actions.

---

# 28. Buttons

Buttons have clear hierarchy and concise verb-first labels.

| Variant | Use |
|---|---|
| Primary | One main action for the page or form |
| Secondary | Useful alternative action |
| Tertiary/ghost | Low-emphasis local action |
| Destructive | Delete or irreversible action, clearly labeled |
| Icon-only | Frequent compact actions with accessible name and tooltip |

Use consistent 36–40px control height, 6–8px radius, 14px medium text, and 8px icon gap. Do not place multiple competing primary buttons together. Disabled buttons must be visibly disabled and explain the reason when it is not obvious.

---

# 29. Forms

Forms should be easy to scan and forgiving to complete.

## 29.1 Field anatomy

```text
Label
Control
Optional helper text or error
```

Keep labels visible; do not rely on placeholder text as a label. Use consistent 14px labels, 14px control text, 40px default control height (44px on touch-oriented layouts), and 8px label-to-control gap. Group related fields and use a 16–24px vertical rhythm.

## 29.2 Layout

Use one column for most forms. Use two columns only for short, related fields with enough width. Keep long text fields full width. Put related advanced options in a clearly labeled section; avoid unnecessary nested cards.

## 29.3 Validation

Validate at a helpful time, preserve entered values, identify the field and explain how to fix it. Use text plus semantic color; never communicate errors by color alone. Show a form-level summary when multiple errors exist or the form is long.

## 29.4 Save behavior

Use a clear submit action. Indicate saving, prevent accidental duplicate submission, preserve recoverable input after errors, and confirm success. For long forms, use a sticky action footer only when it improves access and does not cover content.

---

# 30. CRUD Patterns

Management pages should follow a predictable path.

## 30.1 List

Page header → title, concise description if needed, primary create action. Then search and filters, list/table/grid, pagination, and loading/empty/error feedback. Keep the create action easy to find.

## 30.2 Create

Use a dedicated page for complex or multi-section records. Use a dialog or drawer for short, focused tasks that benefit from preserving list context. Match the form complexity to the task; do not compress a complex workflow into a cramped modal.

## 30.3 Read and edit

Show important identity and status first, followed by grouped details. Make edit actions clear. Preserve list context when returning, including filters and page when practical.

## 30.4 Delete and destructive actions

Require confirmation for permanent destructive actions. State what will be deleted and any meaningful consequence. Name the record when possible. Use an explicit destructive button label. Offer undo for reversible removal when feasible. Do not use confirmation dialogs for routine, reversible actions.

## 30.5 Feedback

Confirm successful create/update/delete with concise feedback. Keep errors actionable and preserve data. Use inline feedback for local field or section errors and toast notifications for completed background actions; avoid relying on disappearing toast text for critical information.

---

# 31. Status Badges

Use badges for compact, meaningful state labels. Keep labels short and consistent. Reserve semantic colors for semantic states; neutral statuses can use neutral styling. Do not make every category a brightly colored pill. Include visible text, not color alone.

---

# 32. Pagination

Show the current range and total when available, such as “21–40 of 238.” Provide clear previous/next controls and a page-size choice only when useful. Disable unavailable directions. Preserve filters and sorting while paging; use URL state when practical.

---

# 33. Charts and Data Visualization

Every chart must answer a product question. Use restrained colors, clear labels, readable axes, useful time ranges, and accessible summaries. Avoid 3D, decorative gradients, needless animation, misleading truncated axes, and ambiguous colors. Provide a table or text alternative when chart values are important. Empty and loading states should preserve chart context.

---

# 34. Dialogs, Drawers, and Popovers

Use dialogs for focused decisions or short tasks, drawers for contextual detail or medium-length forms, and dedicated pages for complex workflows. Give each overlay a clear title, concise context, and explicit actions. Close on Escape when safe; do not unexpectedly discard unsaved work. Keep focus inside modal dialogs and return it to the opener on close. Popovers should be compact and dismiss predictably.

---

# 35. Loading, Empty, Error, and Success States

Design all states as part of the component, not as afterthoughts.

- **Loading:** Preserve layout where possible; use restrained skeletons for structured content. Avoid full-page spinners for local updates.
- **Empty:** Explain what is absent and provide a relevant next action when one exists. Distinguish “no records yet” from “no results for these filters.”
- **Error:** State what failed, what the user can do, and whether retry is safe. Keep entered data and provide retry when appropriate.
- **Success:** Confirm the completed action in plain language. Do not overwhelm with celebratory animation.

---

# 36. Responsive Behavior

Design for mobile, tablet, and desktop rather than scaling one desktop composition.

- Reflow KPI grids and card layouts as space narrows.
- Stack page headers and wrap actions on mobile.
- Use a mobile navigation drawer.
- Keep touch targets comfortably usable (prefer at least 44×44px on touch-first controls).
- Let tables scroll horizontally or switch to a carefully designed record list when appropriate; never silently discard important fields.
- Keep forms full width on narrow screens.
- Avoid horizontal page overflow, clipped controls, and hover-only actions.
- Respect safe areas and dynamic viewport sizing where relevant.

Choose breakpoints based on the content's needs and the existing project system; do not introduce arbitrary breakpoints per component.

---

# 37. Accessibility

Accessibility is part of the design standard.

- Use semantic landmarks, headings, buttons, links, labels, and table markup.
- Ensure complete keyboard access and a visible focus indicator.
- Maintain sufficient contrast for text, controls, borders, and focus states.
- Never communicate status, validation, or chart meaning by color alone.
- Give icon-only controls accessible names; decorative icons should be hidden from assistive technology.
- Associate helper text and errors with their fields.
- Announce important async updates appropriately without interrupting unnecessarily.
- Manage focus in dialogs and drawers, including return focus on close.
- Respect reduced-motion preferences.
- Use appropriate accessible names and descriptions for charts and complex widgets.

---

# 38. Interaction Rules

Provide clear hover, focus, pressed, selected, disabled, loading, and error states. Hover effects are subtle and never the only indication of interactivity. Do not animate layout or state without a purpose. Respect reduced motion. Prevent duplicate submissions and destructive misclicks. Make clickable areas match their visual affordance and avoid nested interactive controls.

---

# 39. Icons and Imagery

Use one consistent icon family already present in the project. Icons are supportive and generally 16px in dense controls or 18–20px in larger actions. Pair unfamiliar icons with labels or tooltips. Do not add decorative illustrations to routine management pages. Use real product imagery only when it helps identify or compare records.

---

# 40. Responsive and Density Overrides

The project may adjust density to fit the user and workflow. Operational tools can be denser; consumer-facing portals may need more breathing room. Record the choice in `project-design.md` and apply it consistently. Preserve accessible text sizes, touch interaction, and hierarchy at every density.

---

# 41. Project-Specific Overrides

Each project may define a small override file (recommended name: `project-design.md`) for:

- Brand colors and logo usage
- Light/dark theme defaults
- Font choice
- Product-specific navigation and terminology
- Required components or workflow variations
- Explicit exceptions to this standard

Overrides should be specific, justified, and limited to the project. They do not silently rewrite this shared standard. When project requirements conflict with these defaults, document the exception and its scope.

Example:

```md
# Project Design Overrides
- Primary: #2248f3
- Theme: light
- Sidebar: light, expanded by default
- Density: compact for order-management tables
- Exception: use a full-width editor for the CMS page builder
```

---

# 42. Repository Structure

Keep shared rules discoverable and close to the project. A recommended structure is:

```text
/design-system
  design.md
  dashboard-patterns.md
  project-design.md
  /examples
    dashboard.md
    data-table.md
    form.md
    settings.md
```

For a smaller project, a root-level `design.md` and optional `project-design.md` are enough. Avoid duplicating the standard across several files; link to the source of truth.

---

# 43. AI Agent and Developer Rules

Before implementing dashboard or signed-in application UI:

1. Read `design.md` and any `project-design.md` or pattern documents that apply.
2. Inspect the existing codebase, tokens, and components before creating new ones.
3. Reuse stable components and established project patterns.
4. Follow the spacing, typography, layout, card, form, table, navigation, responsive, accessibility, and interaction rules here.
5. Do not invent data, metrics, activity, or product capabilities to make a screen look populated.
6. Introduce a new pattern only when product requirements need it; make it consistent with the system and document a lasting exception.
7. Keep business logic and visual styling separated where the project architecture supports it.
8. Implement loading, empty, error, success, and disabled states alongside the default state.
9. Do not replace an established project design wholesale to match this document literally.
10. When uncertain, prefer the simplest existing pattern that communicates the task clearly.

Do not use this document as the design specification for landing pages or public websites. If a task includes both a public website and a signed-in application, apply this standard only to the application screens and follow the applicable website or brand guidance for public pages.

Suggested `AGENTS.md` instruction:

```md
For dashboard and frontend work, read design.md and any project-specific overrides first.
Inspect and reuse existing components before creating new patterns. Treat the design
standard as the default source for visual and UX decisions; document necessary
project-specific exceptions in project-design.md.
```

---

# 44. Review Checklist

Before considering a dashboard page complete, check:

## Visual consistency

- [ ] Uses design tokens rather than scattered raw values
- [ ] Uses the spacing, type, radius, border, and color rules consistently
- [ ] Has one clear primary action and a readable hierarchy
- [ ] Avoids gratuitous gradients, shadows, nested cards, and decoration

## Product usability

- [ ] Page purpose is clear from the title and content
- [ ] Search, filters, sorting, and pagination are understandable where needed
- [ ] Actions have predictable outcomes and useful feedback
- [ ] Destructive actions are clear and safely confirmed
- [ ] Empty, loading, error, and success states are designed

## Responsive and accessible behavior

- [ ] Works at mobile, tablet, and desktop widths
- [ ] No clipped content or accidental horizontal page overflow
- [ ] Keyboard navigation and visible focus work
- [ ] Labels, contrast, status text, and accessible names are present
- [ ] Dialogs/drawers manage focus and Escape behavior appropriately

## Data integrity

- [ ] Metrics and chart labels reflect real product data
- [ ] No fake records or decorative analytics were added
- [ ] Numeric alignment, date range, currency, and status meanings are consistent

---

# 45. Source References and Actionable Design DNA

The design inspiration was informed by three prior projects, with this weighting:

## Crimson Creed — primary reference

Contributes the restrained premium feel, confident use of warm brand accent, compact operational layout, clear hierarchy, and strong product character without turning the interface into marketing.

## DigitalRevo — secondary reference

Contributes the modern, neutral-first SaaS dashboard language, reusable patterns, clear navigation, and restrained blue accent use.

## Cafe POS — operational reference

Contributes practical data density, transaction-oriented workflows, and patterns for users who need to scan and act quickly.

These names are provenance only. An AI agent cannot infer the appearance or implementation of those dashboards from their names. It should not assume access to their repositories, screenshots, or code. The standard is self-contained: follow the explicit rules in this document and the project's own tokens and components.

The actionable shared principles are:

- Keep signed-in product UI neutral-first, with one intentional brand accent.
- Prefer compact but readable information layouts.
- Separate surfaces with subtle borders and restrained rounding; use little or no shadow.
- Keep navigation and CRUD workflows predictable.
- Make tables, forms, and operational summaries practical and easy to scan.
- Use decoration only when it improves understanding or task completion.

Project-specific brand and product needs may change the expression while preserving these principles. These principles apply only within the dashboard/application scope defined in Section 1.

---

# 46. Final Principle

Build dashboards that help people understand what is happening and act on it quickly. Keep the interface calm, consistent, and honest. Every visual choice should support the product, the workflow, or the user's understanding.

