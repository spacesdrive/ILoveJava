# hooks/

Shared React hooks used across two or more features (e.g. `use-local-storage`, `use-media-query`).

Rules:

- Feature-specific hooks live inside that feature's own `hooks/` folder, not here.
- Name files `use-thing.ts`, export a single hook named `useThing`.
- Hooks that wrap a browser API should degrade gracefully when that API is unavailable (SSR/old browsers), per the browser-first architecture in [docs/architecture](../../docs/architecture).
