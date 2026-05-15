# Skill: stack-select
# Trigger: /stack-select

Clean up CLAUDE.md after a stack has been chosen. Removes all unused stack and style-reference entries so the file only reflects the actual project stack.

## Steps

1. Read CLAUDE.md in the current project root.

2. Identify the chosen stack. It is the one line in the `## Stack` section that is **not** a placeholder — i.e. it is filled in without square-bracket `[...]` tokens and matches one of the known stacks:
   - Vanilla HTML / CSS / JavaScript
   - Astro + CSS
   - React + Tailwind CSS
   - WordPress

   If no stack has been chosen yet (all lines are still placeholders), stop and ask the user which stack to use before proceeding.

3. Remove every stack line in `## Stack` that does not match the chosen stack.
   Keep the chosen line exactly as-is.

4. In `## Style Reference`, keep only the line whose prefix matches the chosen stack:
   - Vanilla HTML → `Vanilla HTML: index.html`
   - Astro → `Astro: src/layouts/Layout.astro`
   - React → `React: src/components/Layout.tsx`
   - WordPress → `WordPress: functions.php + style.css`
   Remove all other style-reference lines.

5. Update the section comments to remove the "Pick one / delete the rest" instructions since the selection is now done.

6. Show the user a before/after diff of exactly what was removed.

7. Do NOT commit. Do NOT touch any other section of CLAUDE.md.

## Example output

```
Stack selected: React + Tailwind CSS

Removed from ## Stack:
  - Vanilla HTML / CSS / JavaScript
  - Astro + CSS
  - WordPress (theme: [theme name])

Removed from ## Style Reference:
  - Vanilla HTML: index.html
  - Astro: src/layouts/Layout.astro
  - WordPress: functions.php + style.css

CLAUDE.md is now clean. No commit made.
```
