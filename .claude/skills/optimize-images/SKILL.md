---
name: optimize-images
description: Convert a project's images to WebP, write real width and height into the markup, and add correct lazy-loading and fetchpriority attributes. Use when the user asks to optimize, compress or convert images, fix Core Web Vitals or layout shift (CLS), speed up a slow-loading page, or resolve the image findings from a handoff audit. Works on vanilla HTML, Astro, React and Next.js projects.
---

Closes the loop that `/handoff-audit` opens: the audit reports unoptimized images,
this converts them and fixes the markup.

## Hard rules

- **Never delete an original.** Convert alongside; the original stays on disk.
- **Never touch `alt` text.** Alt text is copy. Report bad alt text, don't rewrite it.
- **Only these attributes may change:** `src`, `srcset`, `width`, `height`, `loading`,
  `decoding`, `fetchpriority`. Nothing else in the markup moves.
- **Keep whichever file is smaller.** WebP usually wins on photographs, but loses on
  flat graphics, screenshots and anything with large uniform areas. Always compare the
  byte size after converting and discard the WebP if it didn't help.
- Show the plan and get approval before writing anything.

---

## Phase 1 — Inventory

Find the images and how they're referenced:

```bash
find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) \
  -not -path './node_modules/*' -not -path './.git/*' \
  -printf '%s\t%p\n' | sort -rn
```

Read dimensions with `ffprobe`:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 IMG
```

Then grep the markup for each filename to find every reference — `src`, `srcset`,
CSS `url()`, Astro `import`, and `next/image` usage all count.

## Phase 2 — Plan

Present a table before touching anything:

| Image | Size | Dimensions | Referenced in | Missing |
|---|---|---|---|---|
| hero.jpg | 1.4 MB | 2400×1600 | index.html:42 | width/height, fetchpriority |
| team-3.png | 890 KB | 1200×800 | about.html:88 | width/height, loading=lazy |

Flag anything oversized for its display box — a 2400px-wide image in a 600px column is
the single biggest win available and no format change fixes it.

## Phase 3 — Convert

Use the first available tool:

```bash
# 1. The project's own sharp, if installed
npx --no-install sharp -i IN -o OUT -f webp -q 82

# 2. ffmpeg
ffmpeg -v error -i IN -c:v libwebp -quality 82 -compression_level 6 -y OUT

# 3. cwebp
cwebp -q 82 IN -o OUT
```

Quality 82 is the default. Go to 90 for images with text or sharp edges; 75 is
acceptable for large decorative photography.

Then enforce the size guard:

```bash
[ "$(stat -c%s OUT)" -lt "$(stat -c%s IN)" ] || rm OUT   # WebP didn't help — keep the original
```

Report the actual saving per file. Do not claim a saving you did not measure.

## Phase 4 — Markup

**Every image** gets intrinsic `width` and `height` — the real pixel dimensions of the
file, not the CSS display size. This is what prevents CLS, and it works even when the
image is sized to `width: 100%` in CSS.

**Above the fold** (hero, header, anything visible without scrolling):
```html
<img src="hero.webp" width="2400" height="1600" alt="[UNCHANGED]"
     fetchpriority="high" decoding="async">
```
Never `loading="lazy"` here — it delays the LCP element and makes the score worse.

**Below the fold:**
```html
<img src="team-3.webp" width="1200" height="800" alt="[UNCHANGED]"
     loading="lazy" decoding="async">
```

If you cannot tell whether an image is above the fold, ask. Guessing wrong on the hero
is the one mistake in this skill that actively degrades performance.

**Keeping a fallback** (only when the original was kept because it was smaller, or the
project supports old browsers):
```html
<picture>
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" width="2400" height="1600" alt="[UNCHANGED]">
</picture>
```

### Framework notes

- **Next.js** — use `next/image`; it handles format, sizing and lazy-loading. Supply
  `width`/`height` (or `fill` plus a sized parent) and `priority` on the LCP image.
  Do not hand-convert images that `next/image` will serve.
- **Astro** — prefer `astro:assets` (`<Image />`) over raw `<img>` for local images;
  it emits the dimensions itself.
- **Vanilla** — everything above applies directly.

## Phase 5 — Report

State per file: original size, new size, actual percentage saved, and which files were
left alone because WebP was larger. Then list any image still oversized for its display
box as a follow-up, since that needs a resize decision rather than a format change.

Do not commit.
