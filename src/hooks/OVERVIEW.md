# hooks/

Shared React hooks used across two or more features.

- `use-progress.ts` - IndexedDB-backed completion/attempt tracking (`src/lib/idb.ts`), used by `src/features/lessons`, `src/features/exercises`, and `src/features/quizzes`. Falls back to an always-incomplete, read-only state when `indexedDB` is unavailable rather than throwing.
- `use-is-dark-mode.ts` - reads the `dark` class on `<html>` directly (via `MutationObserver`), instead of the theme context in `src/app/providers/theme-provider.tsx`. Exists specifically so features - which must not import from `src/app` - can still react to theme changes for things React context can't reach, like a third-party component's own `theme` prop (see `src/features/exercises/components/exercise-runner.tsx`'s CodeMirror instance). Lives here even with one current consumer, since the whole point is being importable by any feature that hits the same "app is off-limits" wall.

Rules:

- Feature-specific hooks live inside that feature's own `hooks/` folder, not here.
- Name files `use-thing.ts`, export a single hook named `useThing`.
- Hooks that wrap a browser API should degrade gracefully when that API is unavailable (SSR/old browsers), per the browser-first architecture in [docs/architecture](../../docs/architecture).
