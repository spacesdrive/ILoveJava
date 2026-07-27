# playground-engine

Executes user-submitted Java code and returns stdout/stderr/exit code. This is the one subsystem where the browser-first mandate was genuinely in tension with reality: **Java has no mainstream in-browser runtime** comparable to what WASM gives C/Rust/Go.

The `PlaygroundRunner` interface (`types.ts`) is written so the rest of the app - exercises, MCQs that involve running code, the standalone playground - never talks to a JVM directly, only to this contract. That means the execution strategy can be decided (and changed) later without touching feature code.

## Implementation: `wasm-jvm` via CheerpJ

[ADR 0003](../../../docs/decisions/0003-java-code-execution-strategy.md) resolved this to `wasm-jvm`, implemented in `wasm-jvm/`:

- `wasm-jvm-runner.ts` - the `PlaygroundRunner` implementation (`mode: 'wasm-jvm'`), exported as `wasmJvmRunner`. Currently wired into `src/pages/lesson-page.tsx`'s exercise blocks.
- `cheerpj-worker.ts` - runs inside a dedicated Web Worker, never the main thread (see the ADR for why this matters - it's what makes a timeout actually enforceable). Loads CheerpJ's runtime on demand, compiles submitted source with `javac` (itself running under CheerpJ), then runs the result, capturing stdout/stderr via a temporary console tap.
- `worker-manager.ts` - owns the worker's lifecycle: lazy creation, timeout enforcement via `worker.terminate()`, discarding and recreating the worker after a timeout.

Read the ADR before touching any of this - it documents the licensing constraints, the `tools.jar` sourcing (`scripts/fetch-tools-jar.mjs`), and several non-obvious behaviors (CheerpJ's own console chatter, why stdin isn't wired up, why the first run per page is slow).

## Extending

Adding a `server-sandbox` implementation later (if the wasm-jvm approach ever proves insufficient) means writing a second `PlaygroundRunner` and swapping which one `lesson-page.tsx` passes to `ExerciseRunner` - per ADR 0001's "assume no backend" default, that would need its own ADR justifying the change, not just a PR.
