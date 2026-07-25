# hooks/

Shared React hooks used across two or more features.

- `use-progress.ts` - IndexedDB-backed completion/attempt tracking (`src/lib/idb.ts`), used by `src/features/lessons`, `src/features/exercises`, and `src/features/quizzes`. Falls back to an always-incomplete, read-only state when `indexedDB` is unavailable rather than throwing.

Rules:

- Feature-specific hooks live inside that feature's own `hooks/` folder, not here.
- Name files `use-thing.ts`, export a single hook named `useThing`.
- Hooks that wrap a browser API should degrade gracefully when that API is unavailable (SSR/old browsers), per the browser-first architecture in [docs/architecture](../../docs/architecture).
