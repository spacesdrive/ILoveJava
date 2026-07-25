# ADR 0004: Phase 1 content engine dependencies

- **Status:** accepted
- **Date:** 2026-07-25

## Context

`ROADMAP.md` Phase 1 requires implementing the lesson renderer, exercise runner UI, and quiz renderer on top of the type contracts in `src/content` and `src/engines/*`, plus IndexedDB-backed progress persistence. None of the required capabilities - markdown rendering, code syntax highlighting, an embeddable code editor, or a typed IndexedDB wrapper - exist in the current dependency set (see [ADR 0002](0002-frontend-tech-stack.md)). Each is a new core dependency per [the ADR index rule](OVERVIEW.md#when-to-write-one).

## Options considered

- **Markdown rendering** (for `LessonBlock` `prose`/`callout` markdown fields): `react-markdown` + `remark-gfm` vs. hand-rolling a markdown subset vs. MDX. `react-markdown` renders to React elements (not `dangerouslySetInnerHTML`), which matters for [docs/security](../security); MDX would require a build-time compilation step this project doesn't otherwise need and is overkill for prose blocks that are plain markdown, not executable JSX.
- **Code syntax highlighting** (for `LessonBlock` `code` blocks): `shiki` vs. `prismjs`/`highlight.js`. Shiki produces TextMate-grammar-accurate highlighting (same engine VS Code uses) and ships Java grammar support out of the box; Prism/highlight.js are lighter but less accurate for Java specifically. Bundle-size risk is mitigated by lazy-loading Shiki only inside the code-block sub-renderer, not the app shell.
- **Code editor** (for the exercise/playground code input, editable): `@uiw/react-codemirror` (CodeMirror 6) vs. `@monaco-editor/react`. CodeMirror 6 is materially lighter and modular; Monaco is VS Code's own editor and much heavier, which cuts against [docs/performance](../performance) for a CSR app with no backend to offset load cost. CodeMirror is sufficient for the exercise runner's plain code-input use case.
- **IndexedDB wrapper** (for progress persistence): `idb` vs. `dexie` vs. the raw `IndexedDB` API. `idb` is a ~1kB Promise-based wrapper with TypeScript schema support (`DBSchema`) and no query/relational layer to learn - this project needs one object store keyed by content slug, not Dexie's fuller ORM-like feature set.

## Decision

Adopt `react-markdown` + `remark-gfm`, `shiki`, `@uiw/react-codemirror` (+ `@codemirror/lang-java`), and `idb`.

## Consequences

- Four new runtime dependencies to track for updates/security advisories, per [docs/security](../security).
- Shiki is imported lazily inside the lesson code-block renderer so the app shell bundle is unaffected for routes that never render a code block; this should be re-checked against `docs/performance/OVERVIEW.md` targets once real lesson content exists and bundle analysis is meaningful.
- `idb`'s schema (`src/lib/idb.ts`) becomes the source of truth for what "progress" means on disk; changing it later requires a version bump and, if the stored shape changes incompatibly, a migration in the `upgrade` callback.
- `fake-indexeddb` is added as a dev-only test dependency to exercise `src/lib/idb.ts`/`src/hooks/use-progress.ts` under Vitest's jsdom environment (jsdom has no native `indexedDB`); it is never shipped.
