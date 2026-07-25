# Cloudflare

## Pages (configured)

Static hosting for the CSR SPA, project `ilovejava`, production branch `main`.

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Default URL:** `ilovejava.pages.dev` (Cloudflare-assigned)
- **Custom domain:** `ilovejava.spacesdrive.cc` (referenced in [`src/constants/site.ts`](../../src/constants/site.ts)) - attached via the Cloudflare API (`POST /accounts/{account}/pages/projects/ilovejava/domains`). The `spacesdrive.cc` zone is on the same Cloudflare account, so the CNAME record and SSL certificate were provisioned automatically; no manual DNS step was needed. Provisioning takes a few minutes after attachment - if the domain 404s or doesn't resolve immediately after being added, that's expected, not a bug.
- **SPA fallback:** [`public/_redirects`](../../public/_redirects) (`/* /index.html 200`) - required so a direct link or refresh on any client-side route (e.g. `/tools/whatever` once routes like that exist) resolves instead of 404ing. Cloudflare Pages copies everything under `public/` to the output root as-is.

## Deployment pipeline

```
push to main, touching a deploy-relevant path
  -> .github/workflows/deploy.yml
       verify:  calls ci.yml (typecheck, lint, format check, test, build) as a reusable workflow
       deploy:  needs verify to succeed -> pnpm build
                -> wrangler pages project create ilovejava --production-branch=main
                   (continue-on-error: true - idempotent, only does anything the first time)
                -> wrangler pages deploy dist --project-name=ilovejava --branch=main
  -> live at ilovejava.pages.dev and ilovejava.spacesdrive.cc
```

Also runnable on demand: **Actions -> Deploy -> Run workflow** (`workflow_dispatch`), for a redeploy that isn't tied to a file change (e.g. recovering from a failed run).

### Attaching a custom domain (already done, documented for the next one)

Custom domains aren't managed through `wrangler` - there is no CLI command for it, only the Cloudflare dashboard or the REST API. `ilovejava.spacesdrive.cc` was attached via a one-time `workflow_dispatch` workflow that called `POST /accounts/{account}/pages/projects/{project}/domains` with the domain name, using the same `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` secrets as the deploy pipeline. That workflow was removed once the domain was confirmed attached, since it's a one-time operation with no reason to exist in the repo permanently - re-add a similar `workflow_dispatch` step (or use the dashboard) if another domain is ever needed.

### Trigger: which files redeploy the site

`deploy.yml`'s `push` trigger is path-filtered to only what can actually change the built output:

- `src/**`
- `public/**`
- `index.html`
- `package.json`, `pnpm-lock.yaml`
- `vite.config.ts`, `tsconfig*.json`, `components.json`
- `.github/workflows/deploy.yml` itself (so a pipeline change redeploys to prove it still works)

A docs-only or `.github/`-config-only change (anything not in that list) does not trigger a deploy. If you add a new top-level config file that affects the build (a new `*.config.ts`, a new `.npmrc`, etc.), add its path to this filter in the same change - see [What can break this](#what-can-break-this) below.

### Secrets

`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are GitHub Actions repository secrets (Settings -> Secrets and variables -> Actions), never committed to this repository or printed in any workflow log. `GITHUB_TOKEN` (automatic, scoped to the run) is passed to `wrangler-action` so it can attach a GitHub Deployment entry and a job summary with the deployment URL.

Rotate `CLOUDFLARE_API_TOKEN` in the Cloudflare dashboard (My Profile -> API Tokens) and update the GitHub secret in the same change if it's ever suspected of exposure.

### R2 credentials: provided, intentionally unused

S3-compatible R2 credentials for this Cloudflare account were provided when this pipeline was set up. They are not stored anywhere (not as a GitHub secret, not in any file) and nothing in this repository uses R2. Nothing in this project currently needs object storage - every tool/lesson runs and stores its state entirely in the visiting browser, per [../architecture](../architecture). Wiring in R2 speculatively would be exactly the kind of unjustified addition the "KV / R2 / D1 / Queues / Analytics / Images / Turnstile - evaluated individually, only against a real need, never added speculatively" rule below exists to prevent. If a genuine need for object storage ever arises, provide fresh credentials at that point and write an ADR justifying it first, per [../backend](../backend).

## What's still planned, not yet configured

1. **Workers** - only if/when a backend is justified by an ADR (see [../backend](../backend)) - e.g. a Java execution sandbox.
2. **KV / R2 / D1 / Queues / Analytics / Images / Turnstile** - evaluated individually, only against a real need, never added speculatively.
3. **Preview deployments per PR** - not implemented. `deploy.yml` only deploys on push to `main`. Adding a PR-preview job means either accepting that `ci.yml`'s checks run twice for a PR that also gets a preview build, or restructuring the triggers to avoid that (see the trade-off noted below) - don't add this without deciding that trade-off deliberately.

## What can break this

Read this before changing anything that touches the build, the workflow files, or the Cloudflare project itself.

- **Renaming the `build` or removing the `dist` output.** `deploy.yml` runs `pnpm build` and deploys the `dist` folder by path, hardcoded. If `vite.config.ts`'s `build.outDir` ever changes, or the `build` script in `package.json` is renamed, update the `wrangler pages deploy <dir>` command in `deploy.yml` in the same change.
- **Renaming the Cloudflare Pages project.** The project name `ilovejava` is hardcoded in `deploy.yml`'s `--project-name=ilovejava` flag. Renaming the project in the Cloudflare dashboard without updating this flag will make every subsequent deploy fail (or silently create a second, wrong project) - update both together.
- **Rotating or revoking `CLOUDFLARE_API_TOKEN`.** The deploy job will fail with an authentication error. Generate a new token (Cloudflare dashboard -> My Profile -> API Tokens -> Pages edit permission is sufficient, no need for full account access) and update the GitHub secret - see [Secrets](#secrets) above.
- **Removing or narrowing the path filter without updating it.** If a new file type that affects the build (e.g. a new top-level config) is added but not added to `deploy.yml`'s `paths:` list, a change to it silently won't trigger a redeploy - the site will look stale even though `main` is current. Conversely, an overly broad filter wastes a deploy on something that couldn't have changed the output. Keep the filter matched to what `vite build` actually reads.
- **The verify-then-deploy double-run trade-off.** `ci.yml` triggers on every push to `main` (its own trigger, unconditional) _and_ is called again, reusably, by `deploy.yml`'s `verify` job whenever a push to `main` also matches the deploy path filter. That means checks run twice for most real code changes. This is deliberate, not a bug: this project allows small direct-to-`main` pushes (see [../workflows/GIT.md](../workflows/GIT.md#branch-strategy)), so `ci.yml`'s own trigger can't be restricted to non-`main` branches the way a PR-only-merge project would - `deploy.yml` still needs its own guaranteed-passing verification before it ships anything. If this redundancy ever becomes a real cost (build times grow enough to matter), revisit as an ADR rather than silently removing the gate.
- **Forgetting the SPA fallback.** If `public/_redirects` is ever deleted or its content changed, every route except `/` will 404 on direct navigation or refresh once real client-side routes exist. This is easy to miss locally (`pnpm dev`/`pnpm preview` both already handle SPA fallback themselves) - it only breaks on the actual deployed site.
- **A missing or wrong favicon.** `index.html` references `/favicon.svg`; it must exist under `public/`. This repository's `public/` directory was accidentally never committed once already (fixed in the same change that added this deploy pipeline) - if `public/` and its contents disappear from `git status` unexpectedly, that's the same failure mode recurring, not a new one.
- **Deleting the Cloudflare Pages project.** `wrangler pages deploy` targets an existing project by name - it does not create one on the fly (this bit the first real deploy attempt: `wrangler pages deploy` failed outright with `The Pages project "ilovejava" does not exist`). `deploy.yml` therefore runs `wrangler pages project create ilovejava --production-branch=main` immediately before every deploy, with `continue-on-error: true` so the (expected, harmless) failure on every run after the first doesn't block the actual deploy step. If the project is ever deleted from the Cloudflare dashboard, the next push recreates it automatically - no manual intervention needed.
- **Removing `wrangler` from `devDependencies` or deleting `pnpm-workspace.yaml`.** `wrangler-action`'s own fallback install (`pnpm add wrangler@4`, run fresh in the action when no satisfying version is already present) fails on this project's pnpm version: pnpm 11 blocks `esbuild`'s and `workerd`'s postinstall scripts by default (`allowBuilds` unset), and that failure aborts the whole install step, taking the deploy down with it. This is why `wrangler` is a pinned `devDependency` here (the action finds it already installed and skips its own install) and why `pnpm-workspace.yaml` explicitly allows `esbuild`/`workerd` to run their postinstall scripts (`allowBuilds: { esbuild: true, workerd: true }`, added via `pnpm approve-builds esbuild workerd` - see [pnpm's `allowBuilds` docs](https://pnpm.io) for the current syntax, since this replaced the older `onlyBuiltDependencies` package.json field as of pnpm 11). If `wrangler` is ever bumped to a new major version, re-run `pnpm approve-builds` for any new native-binary dependency it pulls in, and update `wranglerVersion`/the devDependency together so they can't drift apart.

## Verifying a deploy

After a deploy, check the job summary on the `Deploy` workflow run (written by `wrangler-action` when `gitHubToken` is set) for the deployment URL, or visit `https://ilovejava.pages.dev` directly. Hard-refresh if a very recent deploy doesn't appear to have taken effect - Cloudflare's edge cache can serve a stale asset briefly after a deploy.
