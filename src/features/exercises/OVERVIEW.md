# features/exercises

Renders `ExerciseContent` (`src/engines/exercise-engine`) as an editable code exercise and tracks per-exercise progress.

- `components/exercise-runner.tsx` - prompt, an editable `@uiw/react-codemirror` editor (Java mode via `@codemirror/lang-java`, theme-aware via `src/hooks/use-is-dark-mode.ts`) seeded with `starterCode`, a test case list (hidden cases show only "Hidden test case", never their content), and progressive hint reveal (`accordion`). Accepts an optional `runner: PlaygroundRunner` prop (`src/engines/playground-engine/types.ts`); without one, clicking Run shows an honest "execution isn't available yet" state instead of pretending to execute code.
- `src/pages/lesson-page.tsx` passes `wasmJvmRunner` (`src/engines/playground-engine/wasm-jvm`) - real, client-side Java compilation and execution via CheerpJ, resolved in [ADR 0003](../../../docs/decisions/0003-java-code-execution-strategy.md). A 60-second run timeout accounts for CheerpJ's cold-start cost on the first run per page.
- `lib/evaluate-run.ts` - pure function turning a `PlaygroundRunResult` into an `ExerciseRunResult` by comparing `stdout` against each test case's expected output.
- `hooks/use-exercise-progress.ts` - thin wrapper around `src/hooks/use-progress.ts`, scoped to one exercise slug.

Real exercises exist within the Java Fundamentals lessons (`src/features/lessons/content/java-fundamentals`, from Lesson 4 onward) - see [docs/content/OVERVIEW.md](../../../docs/content/OVERVIEW.md). Component tests here still use fixture `ExerciseContent` objects; the real wasm-jvm execution path is verified via `e2e/exercise-execution.spec.ts` (a real browser, real production build) rather than unit tests - see the ADR's Testing section for why.
