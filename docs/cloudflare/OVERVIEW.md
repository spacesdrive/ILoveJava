# Cloudflare

Not configured yet. This project will deploy to **Cloudflare Pages** (static hosting for the CSR SPA) once there's a Cloudflare account connected - the project owner will provide access when that happens (see the repository's operating instructions).

Planned, in order of likely need:

1. **Pages** - hosts the built `dist/` output. Build command `pnpm build`, output directory `dist`.
2. **Workers** - only if/when a backend is justified by an ADR (see [../backend](../backend)) - e.g. a Java execution sandbox.
3. **KV / R2 / D1 / Queues / Analytics / Images / Turnstile** - evaluated individually, only against a real need, never added speculatively.

## Rules once configured

- Secrets and environment variables are deployment configuration - set via the Cloudflare dashboard/`wrangler`, never committed to this repo.
- Preview deployments per PR before anything merges to `main`.
- Any Worker/KV/D1 schema change gets documented here and in an ADR if it changes architecture.
