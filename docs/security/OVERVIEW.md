# Security

Full reporting process: [SECURITY.md](../../SECURITY.md). This doc covers engineering rules. These are strict, not advisory - see [CLAUDE.md](../../CLAUDE.md#hard-rules).

## Invariants - never violate these

- Never expose a secret, token, or credential in client-shipped code, a log, or a commit.
- Never render untrusted content as raw HTML.
- Never skip input validation at a boundary (user input, a third-party API response, anything read from `localStorage`/`IndexedDB` that another script could have written).
- Never trust `userId`-shaped or ownership-shaped data from anything other than the single source of truth for it, once one exists (today: nothing - there is no auth, no accounts; keep it that way unless a backend is introduced per [../backend](../backend)).

## Rules

- **Never render untrusted HTML directly.** Lesson/exercise content will eventually include markdown and code - when the renderer for that lands, it must sanitize (e.g. via a markdown renderer with HTML disabled, or an explicit sanitizer) before anything touches `dangerouslySetInnerHTML`. Nothing in this repo uses `dangerouslySetInnerHTML` today; keep it that way unless sanitization ships alongside it.
- **No secrets in client code, ever.** This is a fully client-side app today - there is nothing to keep secret yet. If a backend is introduced (see [../architecture](../architecture)), its secrets are deployment configuration (Cloudflare environment variables/secrets), never committed, never logged, never present in client-shipped code.
- **Validate at boundaries.** The only external input today is what a user types into the browser (future: exercise code, quiz answers). Validate/sanitize at the point content crosses from user input into anything rendered or persisted.
- **Dependency hygiene.** Run `pnpm audit` periodically; avoid adding low-reputation or unmaintained packages (see the package-manager rules in [CLAUDE.md](../../CLAUDE.md)). Prefer removing a dependency that's become unused over leaving it in `package.json` - see [docs/workflows/GIT.md](../workflows/GIT.md#pre-commit-checklist).
- **The playground engine is the highest-risk surface** - executing arbitrary user code. [ADR 0003](../decisions/0003-java-code-execution-strategy.md) resolved this to `wasm-jvm` via CheerpJ (see [src/engines/playground-engine/wasm-jvm](../../src/engines/playground-engine/wasm-jvm)): sandboxed by construction (a WebAssembly JVM, no shared filesystem or native access), and run inside a dedicated Web Worker specifically so a hung or infinite-looping submission can be forcibly terminated (`worker.terminate()`) rather than freezing the page - the browser-first equivalent of the timeout/resource limits a server-sandbox strategy would need to implement by hand. No code is ever sent anywhere; compilation and execution are both entirely client-side.

## Verification

Check for committed secrets before every push, not just once: review `git diff --staged` for anything that looks like a key/token, and never stage a `.env` file with real values (see [docs/workflows/GIT.md](../workflows/GIT.md#what-to-commit-together)). Audit dependencies (`pnpm audit`) when adding one, not only periodically.
