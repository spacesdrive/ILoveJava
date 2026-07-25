# Contributing

Thanks for wanting to help build ILoveJava. This project is early — the engineering foundation comes before any Java content, so most early contributions will be architecture, tooling, and design-system work.

## Before you start

1. Read [CLAUDE.md](CLAUDE.md) and [docs/architecture](docs/architecture) — they define what's in scope (browser-first, client-side rendered, no backend without an ADR justifying it).
2. Check [ROADMAP.md](ROADMAP.md) and open issues/PRs so you're not duplicating work.
3. For anything that changes architecture (new dependency, new folder at the `src/` root, a backend of any kind), open an issue first, or write an ADR — see [docs/decisions/template.md](docs/decisions/template.md).

## Setup

```bash
pnpm install
pnpm dev
```

Requires Node 22+ and pnpm (this project standardizes on pnpm; do not commit an npm or yarn lockfile).

## Before opening a PR

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
```

All of the above must pass. Add or update tests for behavior you change.

## Commit messages

Use imperative mood and explain the _why_, not just the _what_: `fix: prevent theme flash on first paint` rather than `update theme-provider.tsx`.

## Pull requests

- Keep PRs focused — one concern per PR.
- Update the relevant docs in the same PR as the code change (folder `README.md`, `docs/architecture`, `ROADMAP.md`, `CHANGELOG.md` as applicable).
- Describe what changed and why; link the issue if there is one.
- Don't add lesson/exercise/quiz content in a foundation PR, and don't add foundation changes in a content PR.

## Code style

- TypeScript, strict. No `any` without a comment explaining why.
- Components are small and composable; shared UI lives in `src/components/ui`, feature UI lives in `src/features/<feature>`.
- No unjustified new dependencies — see the "package manager" rules in the project's engineering standards.
- Accessibility is not optional: keyboard support, semantic HTML, focus management on every new interactive component.
