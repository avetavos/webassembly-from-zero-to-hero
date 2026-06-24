# WebAssembly — From Zero to Hero

A bilingual (EN/TH), standalone, beginner→advanced course on **WebAssembly** — from the WAT text format and the stack machine, through JS interop and linear memory, to compiling Rust/C/AssemblyScript, tooling, and WASI. Examples run **in your browser**: write WAT, click Run, and it compiles (via `wabt`) and executes with real output. Diagrams are **Mermaid**, and there's a **read-mode** toggle.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Hands-on | **`<WasmRunner>`** runs JS in a sandboxed iframe and shows `console.log`; the iframe preloads `wabt` and exposes `compileWat(wat) → wasm bytes`, so lessons compile WAT and instantiate it live. `stackblitz` mode opens AssemblyScript toolchain projects. |
| Diagrams | Client-side, theme-aware **Mermaid** (`<Mermaid>` + `public/enhance.js`) |
| Reading | **Read-mode** toggle (hides sidebar/TOC, widens content) via `public/enhance.js` |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

## Content Structure

```
src/content/docs/
  en/                          # English — served at /en/...
    intro-what-is-wasm/
    wat-text-format/
    control-flow-functions/
    js-interop/
    linear-memory/
    languages-to-wasm/
    tooling/
    wasi-and-beyond/
    index.mdx                  # EN landing (splash)
  th/                          # Thai — served at /th/...
    (same module directories)
    index.mdx
```

### The 8 Modules

| Directory | Module |
| --------- | ------ |
| `intro-what-is-wasm` | Intro: What is Wasm? |
| `wat-text-format` | The WAT Text Format |
| `control-flow-functions` | Control Flow & Functions |
| `js-interop` | JS Interop & Loading |
| `linear-memory` | Linear Memory & Data |
| `languages-to-wasm` | Languages to Wasm (Rust / C / AssemblyScript) |
| `tooling` | Tooling (wabt / Binaryen) |
| `wasi-and-beyond` | WASI & Beyond the Browser |

### Components & Lesson Template

- **`WasmRunner.tsx`** `{ code, stackblitz? }` — sandboxed-iframe JS runner with console capture + `compileWat`; `wasm-project.ts` builds the StackBlitz AssemblyScript project. Runnable examples are a hoisted `export const ...Code` (JS that compiles WAT via `compileWat` and instantiates it) + `<WasmRunner code={...} />`.
- **`Mermaid.astro`** `{ code, title }`, **`Callout.astro`** `{ title }`, **`Quiz.tsx`** `{ id, questions }` (0-based `answer`, field `q`), **`ProgressTracker.tsx`** `{ id }`.

Lesson order: frontmatter → imports → concept intro → prose (fenced `wasm`/`js` + `<Mermaid>`) → `export const ...Code` + `<WasmRunner>` (where runnable) → `<Callout>` → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`. WAT shown for reading goes in fenced ` ```wasm ` blocks.

> **⚠️ Authoring notes:**
> - **In `export const` snippets:** escape inner backticks as `` \` `` (the WAT is a nested template literal), `${`→`\${`, and double-escape `\\n`. Fenced blocks are literal.
> - **Never a bare `{...}`/`${...}` in prose** — keep JS objects, imports objects, and JSON in code spans / fenced blocks / `export const`. **Diagrams are Mermaid, not ASCII** (typographic arrows `→`/`↔` in prose are fine).
> - **Internal links include the base path**, e.g. `/webassembly-from-zero-to-hero/en/wat-text-format/`.
> - Use **current Wasm** (WAT, the JS `WebAssembly` API, `wasm-bindgen`/AssemblyScript/Emscripten, WASI, wabt/Binaryen).

## Deployment

Fully static → `dist/`. Base path in `astro.config.mjs`: `site: 'https://avetavos.github.io'`, `base: '/webassembly-from-zero-to-hero'`.

Deployed to GitHub Pages via **branch-source** (`gh-pages`): build `dist/`, add `.nojekyll`, push to `gh-pages`, set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/`**, then **request a Pages build** (`gh api -X POST repos/<owner>/<repo>/pages/builds`) — flipping the source alone does not trigger one. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
