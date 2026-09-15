---
name: build-from-figma
description: Implement a Figma frame in an existing website codebase, then validate the build, responsive behavior, and visual fidelity. Use only when the user explicitly invokes /build-from-figma with a Figma frame URL.
argument-hint: "[figma-frame-url] [target-route-or-file]"
disable-model-invocation: true
---

Turn the Figma frame in `$ARGUMENTS` into production-ready frontend code in the current repository.

The user's invocation authorizes edits needed for this implementation. It does not authorize dependency installation, commits, pushes, deployments, destructive commands, or unrelated cleanup.

## 1. Resolve the request

- Require a Figma Design frame or layer URL. Extract its file key and node ID. Treat an optional second argument as the target route or file.
- Read `CLAUDE.md`, relevant scoped rules, `package.json`, the project token/style files, routing, nearby pages, shared layout, and `git status`.
- Identify the framework, package manager, available validation scripts, dev command, target route/file, and pre-existing changes.
- Preserve existing architecture and user changes. Do not replace the stack, initialize a new app inside an existing app, or modify files outside the implementation surface.
- If the target location is ambiguous and choosing incorrectly would create a parallel page or break routing, ask one focused question before editing.
- Confirm the Figma MCP server is available. If it is unavailable or cannot access the file, stop with the exact setup or permission problem; do not build from a screenshot guess.

## 2. Build a design contract before coding

Read the exact node through Figma MCP. Follow the repository's Figma-to-code rules, with these requirements:

1. Call `get_variable_defs` for the node.
2. Call `get_design_context`; for a large node, use `get_metadata` to split it into meaningful sections and retrieve context section by section.
3. Call `get_screenshot` for visual reference.
4. Call `get_code_connect_map` and inspect the repository for matching components before creating new ones.
5. Use `download_assets` for production images and SVGs. Reuse returned assets; do not substitute placeholders or install an icon library when Figma provides the asset.
6. If the design contains motion, call `get_motion_context` and reuse the project's existing motion approach.

Summarize a compact implementation contract in the working notes:

- target route/file and page boundaries
- section order and responsive frames present
- typography, colors, spacing, radii, and reusable tokens
- existing components to reuse and new components genuinely needed
- assets and interactive states
- unclear or conflicting decisions

Project tokens and existing components win when they map cleanly. Flag genuine design-system conflicts rather than silently hardcoding around them.

If the Figma source has no mobile/tablet intent and the repository does not provide an obvious established responsive pattern, ask before inventing one.

## 3. Implement in one coordinated context

- Keep implementation in the main context. Do not launch multiple coding agents against the same working tree.
- Reuse the existing layout, header, footer, design tokens, components, data patterns, and utilities when appropriate.
- Preserve supplied copy and section order unless the user explicitly requests content changes.
- Use semantic HTML and accessible interaction states. Make the implementation responsive only within the approved design intent.
- Do not add dependencies without approval. Do not rewrite unrelated code or fix unrelated findings.
- Work section by section, checking the rendered page as the implementation develops.

## 4. Run deterministic validation

Run the repository's existing relevant commands. Prefer scripts already defined in `package.json` or documented in `CLAUDE.md`:

- typecheck
- lint
- tests relevant to changed files
- production build

Distinguish failures caused by this change from failures that already existed. Fix regressions in scope. Report unrelated failures without expanding the task.

## 5. Visual QA loop

Start or reuse the local development server without killing unrelated processes. Invoke the `figma-visual-qa` subagent with:

- Figma URL and node ID
- local route URL
- changed files
- approved viewport widths
- relevant design and project constraints

The subagent is read-only. It must compare screenshots, not merely inspect CSS.

Fix confirmed high- and medium-impact mismatches, then run the evaluator once more. Stop after two correction rounds even if minor differences remain. Never loop indefinitely. If browser capture is unavailable, mark visual QA as incomplete and give the user the exact manual check required.

## 6. Finish

Run `/handoff-audit-lite` after visual QA unless the user explicitly asked to skip audit. Do not automatically run the 19-agent full audit; reserve `/handoff-audit` for an explicit pre-handoff request.

Return a concise report containing:

- implemented route and changed files
- reused and newly created components
- validation results
- visual QA result and remaining mismatches
- assumptions or Figma/code conflicts
- audit result
- explicit statement that no commit, push, or deployment was performed

