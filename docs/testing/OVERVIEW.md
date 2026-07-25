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

## Accessibility in tests

Prefer queries that mirror how assistive tech finds elements - `getByRole`, `getByLabelText` - over `getByTestId`. If a component can't be found by role/label, that's usually an accessibility bug, not a test problem.

## Running

```bash
pnpm test          # unit/component, single run
pnpm test:watch    # unit/component, watch mode
pnpm test:e2e      # playwright (builds and serves the app first)
```

CI runs `typecheck`, `lint`, `test`, and `build` on every PR - see [../workflows](../workflows) and `.github/workflows/ci.yml`. `test:e2e` runs separately (slower, browser install required) - see the workflow file for when it's wired in.
