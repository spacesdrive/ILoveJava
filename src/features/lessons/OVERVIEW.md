# features/lessons

Renders `LessonContent` (`src/engines/lesson-engine`) and tracks per-lesson completion.

- `components/lesson-renderer.tsx` - maps each `LessonBlock` to a sub-renderer: `prose`/`callout` through `react-markdown` + `remark-gfm` (never raw HTML - see [docs/security](../../../docs/security)), `code` through `components/lesson-code-block.tsx` (Shiki, lazy-loaded so it doesn't inflate the app shell bundle - see [ADR 0004](../../../docs/decisions/0004-phase-1-content-engine-dependencies.md)). `visualization` and `check` blocks render an explicit "not yet available" notice - no visualization-component registry or cross-engine quiz-check wiring exists yet; this is not a placeholder for what the block _should_ look like, it's an honest state.
- `hooks/use-lesson-progress.ts` - thin wrapper around the shared `useProgress` hook (`src/hooks/use-progress.ts`), scoped to one lesson slug.
- `types.ts` - re-exports the engine's types; this feature does not define its own.

No real lesson content exists yet (see [ROADMAP.md](../../../ROADMAP.md) Phase 2) - tests use fixture `LessonContent` objects defined inline in the test file, not shipped content.
