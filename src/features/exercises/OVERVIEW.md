# features/exercises

Renders `ExerciseContent` (`src/engines/exercise-engine`) as an editable code exercise and tracks per-exercise progress.

- `components/exercise-runner.tsx` - prompt, an editable `@uiw/react-codemirror` editor (Java mode via `@codemirror/lang-java`) seeded with `starterCode`, a test case list (hidden cases show only "Hidden test case", never their content), and progressive hint reveal (`accordion`). Accepts an optional `runner: PlaygroundRunner` prop (`src/engines/playground-engine/types.ts`). **No runner is wired up anywhere in this app yet** - [ADR 0003](../../../docs/decisions/0003-java-code-execution-strategy.md) is still unresolved. Without a `runner`, clicking Run shows an honest "execution isn't available yet" state; nothing pretends to execute code.
- `lib/evaluate-run.ts` - pure function turning a `PlaygroundRunResult` into an `ExerciseRunResult` by comparing `stdout` against each test case's expected output. This exists so the comparison logic is ready and tested for whenever a real runner lands - it is exercised today only via tests with fixture `PlaygroundRunResult` data.
- `hooks/use-exercise-progress.ts` - thin wrapper around `src/hooks/use-progress.ts`, scoped to one exercise slug.

No real exercise content exists yet (see [ROADMAP.md](../../../ROADMAP.md) Phase 2) - tests use fixture `ExerciseContent` objects.
