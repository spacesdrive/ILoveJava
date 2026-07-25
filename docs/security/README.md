# Security

Full reporting process: [SECURITY.md](../../SECURITY.md). This doc covers engineering rules.

## Rules

- **Never render untrusted HTML directly.** Lesson/exercise content will eventually include markdown and code — when the renderer for that lands, it must sanitize (e.g. via a markdown renderer with HTML disabled, or an explicit sanitizer) before anything touches `dangerouslySetInnerHTML`. Nothing in this repo uses `dangerouslySetInnerHTML` today; keep it that way unless sanitization ships alongside it.
- **No secrets in client code, ever.** This is a fully client-side app today — there is nothing to keep secret yet. If a backend is introduced (see [../architecture](../architecture)), its secrets are deployment configuration (Cloudflare environment variables/secrets), never committed, never logged, never present in client-shipped code.
- **Validate at boundaries.** The only external input today is what a user types into the browser (future: exercise code, quiz answers). Validate/sanitize at the point content crosses from user input into anything rendered or persisted.
- **Dependency hygiene.** Run `pnpm audit` periodically; avoid adding low-reputation or unmaintained packages (see the package-manager rules in [CLAUDE.md](../../CLAUDE.md)).
- **The playground engine is the highest-risk future surface** — executing arbitrary user code. Whichever execution strategy is chosen (see [src/engines/playground-engine](../../src/engines/playground-engine)), it must be sandboxed: a WASM JVM is sandboxed by construction; a server-sandbox strategy needs an explicit, documented sandbox (no shared filesystem/network access, strict timeouts and resource limits).
