#!/usr/bin/env node
// PostToolUse hook: format edited files with the PROJECT'S OWN prettier.
//
// Deliberately conservative. It runs only when the project has both prettier
// installed and a prettier config on disk — i.e. the project has opted in.
// On a client's legacy codebase with no prettier setup it does nothing, because
// reformatting a hand-maintained file would be exactly the kind of structural
// churn the standards forbid.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, parse } from 'node:path';

const EXTS = new Set([
  '.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts',
  '.css', '.scss', '.less', '.html', '.json', '.md', '.mdx', '.yaml', '.yml', '.vue',
]);

const CONFIGS = [
  '.prettierrc', '.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml',
  '.prettierrc.json5', '.prettierrc.js', '.prettierrc.cjs', '.prettierrc.mjs',
  'prettier.config.js', 'prettier.config.cjs', 'prettier.config.mjs',
];

const read = () => { try { return readFileSync(0, 'utf8'); } catch { return ''; } };
const quiet = () => process.exit(0);

let input;
try { input = JSON.parse(read()); } catch { quiet(); }

const file = input?.tool_input?.file_path;
if (!file || !existsSync(file) || !EXTS.has(extname(file).toLowerCase())) quiet();

// Walk up from the file to find the project root that opted in.
function findRoot(start) {
  let dir = start;
  const { root } = parse(dir);
  while (true) {
    const pkgPath = join(dir, 'package.json');
    if (existsSync(pkgPath)) {
      let pkg = {};
      try { pkg = JSON.parse(readFileSync(pkgPath, 'utf8')); } catch { /* malformed */ }
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const hasPrettier = 'prettier' in deps;
      const hasConfig = 'prettier' in pkg || CONFIGS.some((c) => existsSync(join(dir, c)));
      if (hasPrettier && hasConfig) return dir;
      return null; // nearest package.json wins; don't keep climbing into a parent repo
    }
    if (dir === root) return null;
    dir = dirname(dir);
  }
}

const root = findRoot(dirname(file));
if (!root) quiet();

// Resolve the project's own prettier binary. No npx, no shell: avoids both the
// install-on-demand path and Node's shell-argument deprecation warning.
const bin = join(root, 'node_modules', 'prettier', 'bin', 'prettier.cjs');
if (!existsSync(bin)) quiet();

try {
  execFileSync(process.execPath, [bin, '--write', file], { cwd: root, stdio: 'ignore' });
} catch {
  quiet(); // prettier rejected the file (syntax error, ignored path) — never block the edit
}

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'PostToolUse',
    systemMessage: `Formatted with the project's prettier: ${basename(file)}`,
  },
}));
