#!/usr/bin/env node
// JS-only guard for sorb-www.
//
// CLAUDE.md hard rule: JavaScript only — never TypeScript — for every repo
// EXCEPT sorb-cloud. sorb-www is a Next.js app authored in JS; Next's grain is
// TS, so this guard fails the build if any .ts/.tsx source file appears, or if
// a `typescript`/`@types/*` dependency creeps into package.json.
//
// Generated/build output (.next/, out/, node_modules) is excluded — Next emits
// type stubs under .next/types/ at build time, which are not source.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  "build",
  ".git",
  "coverage",
  ".vercel",
]);

/** @param {string} dir @param {string[]} hits */
function walk(dir, hits) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, hits);
    } else if (/\.tsx?$/.test(entry)) {
      hits.push(relative(ROOT, full));
    }
  }
}

const tsFiles = [];
walk(ROOT, tsFiles);

const errors = [];
if (tsFiles.length > 0) {
  errors.push(
    `Found ${tsFiles.length} TypeScript source file(s) (sorb-www is JS-only):\n` +
      tsFiles.map((f) => `  - ${f}`).join("\n"),
  );
}

// Reject a typescript / @types/* dependency in package.json.
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const allDeps = {
  ...(pkg.dependencies ?? {}),
  ...(pkg.devDependencies ?? {}),
  ...(pkg.peerDependencies ?? {}),
  ...(pkg.optionalDependencies ?? {}),
};
const badDeps = Object.keys(allDeps).filter(
  (name) => name === "typescript" || name.startsWith("@types/"),
);
if (badDeps.length > 0) {
  errors.push(
    `package.json has TypeScript dependencies (forbidden): ${badDeps.join(", ")}`,
  );
}

if (errors.length > 0) {
  console.error("✗ JS-only guard failed:\n" + errors.join("\n"));
  process.exit(1);
}

console.log("✓ JS-only guard passed: no .ts/.tsx source, no typescript dep.");
