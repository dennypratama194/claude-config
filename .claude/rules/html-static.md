---
paths:
  - "**/*.html"
  - "**/assets/css/**"
  - "**/assets/js/**"
---

# Static HTML/CSS Rules
# Loaded only when working with .html or .css files

## The Core Rule
Read the homepage (index.html) before touching any inner page.
Inherit its styles. Do NOT reinvent them.

## Style Inheritance Workflow
1. Read index.html first — understand the class patterns in use
2. Read the linked CSS files — understand custom properties and existing utilities
3. Swap markup structure only — never add new CSS unless there is no existing class that works
4. If a style gap exists, add a utility class following the existing naming pattern

## What You Can Touch
- HTML structure and content sections
- Class names (following existing conventions)
- Inline responsive adjustments if clearly missing

## What You Cannot Touch Without Being Asked
- Copy (text content) — never rewrite, rephrase, or shorten
- Section order — never remove or reorder sections
- Existing class names that are already styled
- Any color value that is already defined in :root

## Client Project Constraint
This is likely a client site. Improve, never replace.
If you think something should be removed, flag it — don't do it.

## Animation (Vanilla JS Projects)
- GSAP via CDN only — no npm install
- Wrap all GSAP in DOMContentLoaded
- Check element exists before animating: if (!el) return
- Place all animation code at the bottom of main.js in a marked section
- Every motion needs intent. Nothing decorative.
