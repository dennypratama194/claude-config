---
name: build-from-figma
description: Implement a Figma frame in an existing website codebase, then validate the build, responsive behavior, and visual fidelity. Use only when the user explicitly invokes /build-from-figma with a Figma frame URL.
argument-hint: "[figma-frame-url] [target-route-or-file]"
disable-model-invocation: true
---

Turn the Figma frame in `$ARGUMENTS` into production-ready frontend code in the current repository.

The user's invocation authorizes edits needed for this implementation. It does not authorize dependency installation, commits, pushes, deployments, destructive commands, or unrelated cleanup.

## 1. Resolve the request

- Require a Figma Design frame or layer URL. Treat an optional second argument as the target route or file.
- Read `CLAUDE.md`, relevant scoped rules, `package.json`, the project token/style files, routing, nearby pages, shared layout, and `git status`.
- Identify the framework, package manager, available validation scripts, dev command, target route/file, and pre-existing changes.
- Preserve existing architecture and user changes. Do not replace the stack, initialize a new app inside an existing app, or modify files outside the implementation surface.
- If the target location is ambiguous and choosing incorrectly would create a parallel page or break routing, ask one focused question before editing.
- Confirm the Figma MCP server is available. If it is unavailable or cannot access the file, stop with the exact setup or permission problem; do not build from a screenshot guess.

## 2. Build a design contract before coding

Explicitly read [the canonical Figma-to-code rule](../../rules/figma-to-code.md) before any design extraction or implementation, even when the target files do not match its path globs. If the file is missing or unreadable, stop and request it; do not reconstruct its policy from memory.

Follow that rule for design extraction, token reconciliation, component reuse, assets, motion, responsive decisions, and implementation acceptance criteria. Do not maintain a second translation checklist here. Project-specific constraints still apply; surface conflicts for the user to resolve.

Summarize the resulting implementation plan: target route, scope, existing/new components, assets, required viewports, and unresolved decisions. Resolve blocking decisions before editing.

## 3. Implement in one coordinated context

- Keep implementation in the main context. Do not launch multiple coding agents against the same working tree.
- Preserve supplied copy and section order unless the user explicitly requests content changes.
- Implement the agreed plan under the canonical rule and project constraints.
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
- canonical rule path, implementation plan, and approved project-specific exceptions
- previously retrieved design context and reference screenshots, where accessible

The evaluator owns the comparison method, severity definitions, and pass criteria in `.claude/agents/figma-visual-qa.md`; do not duplicate them here. If the evaluator is unavailable, report visual QA as incomplete.

Run an initial evaluation. For NEEDS CORRECTION, fix confirmed in-scope findings and re-evaluate after each correction round, at most twice (three evaluations total). Stop on PASS or INCOMPLETE. After the limit, report remaining findings without claiming completion. Re-run relevant deterministic checks after the final code changes.

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

