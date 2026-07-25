# playground-engine

Executes user-submitted Java code and returns stdout/stderr/exit code. This is the one subsystem where the browser-first mandate is genuinely in tension with reality: **Java has no mainstream in-browser runtime** comparable to what WASM gives C/Rust/Go.

The `PlaygroundRunner` interface (`types.ts`) is written so the rest of the app - exercises, MCQs that involve running code, the standalone playground - never talks to a JVM directly, only to this contract. That means the execution strategy can be decided (and changed) later without touching feature code.

Candidate strategies, to be evaluated in an ADR before implementation:

1. **`wasm-jvm`** - an in-browser JVM (e.g. CheerpJ, Doppio, TeaVM-compiled interpreter). Fully client-side, works offline, but has real limitations: large payload, incomplete stdlib coverage, slower startup, and licensing to check.
2. **`server-sandbox`** - a small Worker/container endpoint that compiles and runs Java in a sandbox and returns the result. Simple and fully correct, but is the platform's first real backend dependency, with the cost/privacy/availability tradeoffs that implies.

No decision has been made yet - do not implement either path until [docs/decisions](../../../docs/decisions) has an ADR justifying the choice per the "when a server is allowed" rule in the project's operating instructions.
