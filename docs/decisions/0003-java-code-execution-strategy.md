# ADR 0003: Java code execution strategy

- **Status:** proposed - unresolved, tracked deliberately, no implementation yet
- **Date:** 2026-07-25

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

Not yet made. This ADR exists to record the tradeoff explicitly rather than let a strategy get chosen implicitly inside a feature PR. Do not implement `PlaygroundRunner` for either mode until this ADR is updated to `accepted` with a chosen option, evaluated against real prototypes of at least one WASM-JVM candidate.

## Consequences

- The exercise and playground features are blocked on this decision for real code execution; UI work that doesn't require actual execution (prompt display, static code editor) can proceed independently.
- Whoever picks this up next should prototype option 1 first (it's the one that keeps [ADR 0001](0001-browser-first-csr-architecture.md) intact) before concluding a backend is required.
