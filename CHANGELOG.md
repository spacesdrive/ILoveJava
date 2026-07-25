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

### Changed

- Renamed every folder-level `README.md` under `docs/` and `src/` to `OVERVIEW.md` to give each doc an actual, descriptive name instead of the generic default.
- Replaced em dashes and en dashes with standard hyphens throughout the codebase and docs, per the writing standards.
