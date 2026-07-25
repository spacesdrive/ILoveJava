# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org/) once the project has its first release.

## [Unreleased]

### Added

- Engineering foundation: Vite + React 19 + TypeScript, Tailwind v4 + shadcn/ui, React Router, ESLint + Prettier, Vitest + Testing Library, Playwright.
- Client-side app shell: layout, theme provider (light/dark/system), SEO metadata component.
- Documentation system (`docs/`), ADR process, root project docs (README, ROADMAP, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY).
- Content and engine type contracts (`src/content`, `src/engines/*`) with no implementations yet.
- `docs/WRITING_STANDARDS.md` and `docs/workflows/GIT.md` codifying writing, typography, and commit conventions.
- Expanded `CLAUDE.md` with a reading order, full documentation map, and a documentation maintenance policy table.
- `docs/mcp/OVERVIEW.md` documenting when and how to use each configured MCP server (Context7, shadcn, Filesystem, Chrome DevTools, Sequential Thinking, Parallel Search).
- A "Project memory" section in `CLAUDE.md` defining the four durable, authoritative source-of-truth files and their precedence order.
- Hard rules for research-before-implementing (MCP usage), reading the relevant docs first, strict security compliance, and removing dead code/files before every commit.
- Deployed to Cloudflare Pages (project `ilovejava`); `.github/workflows/deploy.yml` redeploys automatically on push to `main` when a deploy-relevant path changes, gated on `ci.yml` passing.
- `public/_redirects` (SPA fallback for Cloudflare Pages) and `public/favicon.svg`.
- Documented the full deploy pipeline, its secrets, and a "what can break this" maintenance section in `docs/cloudflare/OVERVIEW.md`.

### Changed

- Renamed every folder-level `README.md` under `docs/` and `src/` to `OVERVIEW.md` to give each doc an actual, descriptive name instead of the generic default.
- Replaced em dashes and en dashes with standard hyphens throughout the codebase and docs, per the writing standards.

### Fixed

- CI: pinned `packageManager` in `package.json` so `pnpm/action-setup` can resolve a pnpm version instead of failing with "No pnpm version is specified".
- Dependabot: added `commit-message` prefixes (`chore(deps)` for npm, `ci(deps)` for GitHub Actions) so automated PRs follow the same Conventional Commits format as the rest of the repository.
- Corrected the site domain typo (`spacedrive` to `spacesdrive`) in `src/constants/site.ts`.
- Restored `public/` (favicon and the new `_redirects`), which had never actually been committed since the initial scaffold despite `index.html` referencing `/favicon.svg`.
