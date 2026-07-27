# Testing

## Layers

| Layer            | Tool                     | Lives in                            | Covers                                                       |
| ---------------- | ------------------------ | ----------------------------------- | ------------------------------------------------------------ |
| Unit / component | Vitest + Testing Library | `src/**/__tests__` next to the code | Individual functions, hooks, components in isolation         |
| End-to-end       | Playwright               | `e2e/`                              | Real user flows in a real browser against a production build |

Accessibility and performance checks are folded into these layers (see below), not separate frameworks, until scale demands otherwise.

## What to test

- **Components**: rendered output for its accessible name/role, interaction behavior (click, keyboard), and each meaningfully different state (disabled, error, empty, loading).
- **Hooks**: behavior through a consuming component or `renderHook`, not implementation details.
- **Utilities** (`src/lib`, `src/content`): pure input/output, including edge cases.
- **E2E**: the paths a real learner takes - navigating, completing an exercise, switching theme - not implementation detail. Keep the suite small and high-value; unit/component tests should catch most regressions.
- **Real external runtimes that jsdom can't meaningfully fake**: `e2e/exercise-execution.spec.ts` runs a real exercise through CheerpJ (`src/engines/playground-engine/wasm-jvm`, [ADR 0003](../decisions/0003-java-code-execution-strategy.md)) in a real browser - a WASM JVM loaded from a third-party CDN into a Web Worker isn't something a unit test can substitute for. Give this pattern more test weight than a typical e2e case (it's the only coverage this code path gets at all), and expect it to be slower (cold CheerpJ init) - see the ADR before changing its timeout expectations.

## Browser APIs jsdom doesn't implement

`src/test/setup.ts` polyfills two APIs jsdom lacks, needed by the content engine features (`src/features/lessons`, `exercises`, `quizzes`):

- `indexedDB` - via `fake-indexeddb/auto`, for `src/hooks/use-progress.ts`. Tests in the same file share one in-memory database (the connection is cached module-level in `src/lib/idb.ts`) - use distinct slugs per test rather than trying to reset it between tests.
- `ResizeObserver` - a no-op stub, needed for `@uiw/react-codemirror` (`src/features/exercises`) to mount in jsdom.
- `IntersectionObserver` - a no-op stub, needed for Framer Motion's `whileInView` (`LessonSteps` in `src/features/lessons`) to mount in jsdom. It never fires, so scroll-reveal components render in their base/initial state under test - assert against that, not the post-reveal animated state.

## Accessibility in tests

Prefer queries that mirror how assistive tech finds elements - `getByRole`, `getByLabelText` - over `getByTestId`. If a component can't be found by role/label, that's usually an accessibility bug, not a test problem.

## Running

```bash
pnpm test          # unit/component, single run
pnpm test:watch    # unit/component, watch mode
pnpm test:e2e      # playwright (builds and serves the app first)
```

CI runs `typecheck`, `lint`, `test`, and `build` on every PR - see [../workflows](../workflows) and `.github/workflows/ci.yml`. `test:e2e` runs separately (slower, browser install required) - see the workflow file for when it's wired in.
