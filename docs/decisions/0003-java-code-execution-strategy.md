# ADR 0003: Java code execution strategy

- **Status:** accepted - `wasm-jvm` via CheerpJ
- **Date:** 2026-07-25 (proposed), resolved 2026-07-26

## Context

Exercises and the playground need to run arbitrary, learner-written Java code and return stdout/stderr/exit code. [ADR 0001](0001-browser-first-csr-architecture.md) commits the project to browser-first execution wherever possible, but Java has no mainstream in-browser runtime comparable to what WebAssembly gives C/Rust/Go.

`src/engines/playground-engine/types.ts` defines a `PlaygroundRunner` interface so the rest of the app (exercise runner, playground UI, MCQs that execute code) depends only on that contract, not on whichever strategy is chosen - the decision below can be made, deferred, or changed later without touching feature code.

## Options considered

1. **`wasm-jvm`** - an in-browser JVM (candidates: CheerpJ, Doppio, a TeaVM-compiled interpreter).
   - Browser APIs considered: WebAssembly, Web Workers (to keep the main thread responsive during execution).
   - Fully client-side: no backend, works offline, no privacy exposure.
   - Costs: large download payload (JVM + stdlib subset), likely incomplete standard-library coverage, slower cold-start than native, and licensing terms to verify per candidate before adopting.
2. **`server-sandbox`** - a minimal Worker (or container) endpoint that compiles and runs submitted Java in a sandbox and returns the result.
   - Enables: full JDK compatibility, fast and predictable execution, no client payload cost.
   - Costs: this would be the platform's first real backend dependency - ongoing hosting/compute cost, an abuse/rate-limiting surface, and a privacy consideration (submitted code leaves the browser). Must be justified against [docs/backend](../backend)'s "assume no backend" default.
   - Sandbox requirements if chosen: no shared filesystem/network access from the execution context, strict CPU/memory/time limits, no persistence of submitted code beyond what's needed to return a result.

## Decision

**`wasm-jvm`, via [CheerpJ](https://cheerpj.com)** (a WebAssembly-based JVM), prototyped and confirmed working end-to-end: real compilation with `javac` and real execution, entirely client-side, no backend.

This keeps [ADR 0001](0001-browser-first-csr-architecture.md) fully intact - no server was introduced. `server-sandbox` was not pursued once the wasm-jvm prototype proved viable, per this ADR's own original guidance to try option 1 first.

### How it works

- **Runtime**: CheerpJ's loader (`https://cjrtnc.leaningtech.com/4.3/loader.js`) is loaded on demand, only when a learner first presses "Run" - never eagerly. It provides `cheerpjInit`, `cheerpjRunMain`, and `cheerpOSAddStringFile`.
- **Compilation**: `javac` is itself a Java program, so CheerpJ runs it like any other class (`com.sun.tools.javac.Main`) to compile submitted source in the browser. This needs `tools.jar` (the standalone javac jar - a Java 8 concept; 9+ modularized it away), which isn't bundled with CheerpJ and has to be supplied: `scripts/fetch-tools-jar.mjs` downloads a real Eclipse Temurin 8 build via [Adoptium's API](https://api.adoptium.net) as a `postinstall` step and extracts `tools.jar` into `public/` (gitignored, ~18MB, never committed).
- **Execution safety**: everything runs inside a dedicated Web Worker (`src/engines/playground-engine/wasm-jvm/cheerpj-worker.ts`), not the main thread. CheerpJ has no way to interrupt code once it starts running - a learner's infinite loop would otherwise freeze the entire tab. Running in a worker means a timeout can be enforced for real: `worker.terminate()` kills a hung worker outright (`worker-manager.ts`). The next run pays CheerpJ's full init cost again, since a terminated worker can't be reused - an accepted cost of the timeout actually meaning something.
- **Output capture**: CheerpJ routes Java's `System.out`/`System.err` through the browser console - the worker temporarily taps `console.log`/`warn`/`error` during each run and restores them afterward. CheerpJ also logs its own status chatter (`"CheerpJ runtime ready"`, `"Class is loaded, main is starting"`) through the same channel; these are filtered out by exact match (see `CHEERPJ_STATUS_LINES` in `cheerpj-worker.ts`) - an observed-behavior heuristic, not a documented CheerpJ guarantee.

### Licensing

CheerpJ is commercial software, **free for FOSS projects, personal projects, and technical evaluation** - this repository qualifies (public, MIT-licensed). Self-hosting the CheerpJ runtime itself is not permitted on the free tier, which is why it's loaded from Leaning Technologies' own CDN rather than bundled - consistent with its size (CheerpJ ships a full WASM-compiled OpenJDK) anyway. Re-verify licensing terms at [cheerpj.com/licensing](https://cheerpj.com/licensing/) if usage patterns change (e.g. this ever becomes a for-profit product beyond a one-person company).

## Consequences

- The exercise runner now executes real, learner-submitted Java - `src/features/exercises/components/exercise-runner.tsx` is passed `wasmJvmRunner` (`src/pages/lesson-page.tsx`), replacing the honest "execution unavailable" state that shipped in Phase 1.
- **First run per page load is slow** (CheerpJ init + tools.jar fetch, observed several seconds to tens of seconds depending on network) - `ExerciseRunner` sets a 60-second timeout budget and shows an explicit "the first run downloads a Java runtime" message while running, rather than leaving a learner staring at a spinner with no explanation. Subsequent runs on the same page reuse the warm worker and are fast.
- **New build-time dependency on network access**: `scripts/fetch-tools-jar.mjs` must reach Adoptium's API during `pnpm install`. It fails soft (never breaks the install) - a missing `tools.jar` just means the exercise runner reports compilation as unavailable until the script is re-run with network access, matching the pre-CheerpJ honest-unavailable behavior rather than crashing.
- **stdout/stderr separation and CheerpJ's status-line filtering are both heuristics**, not documented guarantees - see `cheerpj-worker.ts`'s comments. If a future CheerpJ version changes its logging, output could get corrupted again; there is no automated test that would catch this (see Testing below), so a real behavior change would need to be caught by hand during a routine "does the exercise runner still work" check.
- **`stdin` is not wired to the running program.** `PlaygroundRunRequest.stdin` exists in the type but the wasm-jvm implementation ignores it - no current exercise needs interactive input (Scanner-based exercises exist in lesson 9's teaching content but not as gradable exercises yet). Wiring real stdin into CheerpJ's `System.in` is future work if that changes.
- **Testing**: this integrates a real external WASM runtime loaded from a third-party CDN - not meaningfully testable in Vitest's jsdom environment (no real WASM/Worker/network stack). Verified instead via a Playwright e2e test (`e2e/exercise-execution.spec.ts`) that runs against a real production build in a real browser, plus manual verification during development. See [docs/testing/OVERVIEW.md](../testing/OVERVIEW.md).
