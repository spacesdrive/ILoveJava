# CLAUDE.md

AI operating manual for ILoveJava. Keep this file short - detail lives in the linked docs, not here. Never duplicate documentation: if something is documented elsewhere, link to it instead of restating it.

## What this is

A free, open source, interactive Java learning platform: lessons, exercises, quizzes, playgrounds, projects, interview prep. Currently in the **engineering foundation** phase - no lessons or Java content yet. Do not add lesson/exercise/quiz content unless the user explicitly provides the topic and asks for it.

- Repository: https://github.com/spacesdrive/ILoveJava
- Author: spacesdrive (valzorx7@gmail.com) - see [docs/workflows/GIT.md](docs/workflows/GIT.md)
- Default branch: `main`

## Reading order before any change

1. This file
2. [docs/WRITING_STANDARDS.md](docs/WRITING_STANDARDS.md) - typography, icons, writing style, UI copy, commit messages
3. [docs/architecture](docs/architecture) - system shape and constraints
4. The relevant section from the documentation map below
5. [docs/workflows/GIT.md](docs/workflows/GIT.md) before committing

## Commands

```bash
pnpm dev             # dev server
pnpm build           # typecheck + production build
pnpm typecheck       # tsc, no emit
pnpm lint            # eslint
pnpm format          # prettier --write
pnpm test            # vitest (unit/component)
pnpm test:e2e        # playwright
```

A change isn't done until `typecheck`, `lint`, `format:check`, and `test` pass. See [docs/workflows/GIT.md](docs/workflows/GIT.md#pre-commit-checklist).

## Architecture, in one paragraph

Client-side rendered SPA (React 19 + Vite + React Router). Browser-first: progress, settings, and content run locally (localStorage/IndexedDB) with no backend by default. Feature-first `src/features/*`, shared UI in `src/components/ui` (shadcn/Tailwind v4), and a content layer (`src/content`, `src/engines/*`) that defines typed contracts for lessons/exercises/quizzes/playground independent of any specific Java topic. Full detail: [docs/architecture](docs/architecture).

## Hard rules

- **Browser-first.** Don't reach for a backend because it's convenient. If a feature seems to need one, write the tradeoff up as an ADR in [docs/decisions](docs/decisions) first - see the template there. The one open exception is running Java code itself; see [src/engines/playground-engine/OVERVIEW.md](src/engines/playground-engine/OVERVIEW.md).
- **No SSR.** No Next.js server components, no server-rendered HTML. Routing, rendering, and state stay client-side.
- **Feature isolation.** Code in `src/features/<name>` may depend on `src/components`, `src/hooks`, `src/lib`, `src/types`, `src/constants`, `src/engines`. Features must not import from each other directly.
- **pnpm only.** Don't introduce npm/yarn lockfiles.
- **No placeholder features.** Don't scaffold lesson/exercise UI ahead of real content - the engines in `src/engines` are contracts (types), not implementations, until a real feature is being built.
- **Writing standards apply everywhere.** No emojis, no em/en dashes, Lucide-only icons - see [docs/WRITING_STANDARDS.md](docs/WRITING_STANDARDS.md).
- **Git conventions apply to every commit.** Conventional Commits, spacesdrive authorship, no AI co-author trailers - see [docs/workflows/GIT.md](docs/workflows/GIT.md).
- **Documentation is part of implementation.** See the maintenance policy below.

## Documentation map

```
docs/
  WRITING_STANDARDS.md   Typography, icons, writing style, UI copy, commit messages
  architecture/OVERVIEW.md   Browser-first rules, state management, folder structure
  frontend/OVERVIEW.md       React/TypeScript conventions, routing, error handling
  design/OVERVIEW.md         Design tokens, typography, motion
  components/OVERVIEW.md     src/components/ui conventions (shadcn-based)
  content/OVERVIEW.md        Content/engine contracts, writing standards for lessons
  seo/OVERVIEW.md            Metadata, structured data, crawlability for a CSR app
  testing/OVERVIEW.md        Unit, component, and e2e testing strategy
  performance/OVERVIEW.md    Bundle size, Lighthouse targets, loading strategy
  security/OVERVIEW.md       XSS, dependency, and (future) secrets handling
  accessibility/OVERVIEW.md  WCAG AA baseline and per-component checklist
  backend/OVERVIEW.md        When a backend is allowed, and how it must be justified
  cloudflare/OVERVIEW.md     Deployment target once one exists
  workflows/
    OVERVIEW.md              Branching, PRs, releases
    GIT.md                   Commit format, cadence, authorship
  templates/                 Copy-paste templates: ADR, lesson/exercise/quiz
  decisions/                 Architecture Decision Records (ADRs)
  reference/OVERVIEW.md      Scripts, path aliases, glossary
  guides/OVERVIEW.md         Longer how-tos

ROADMAP.md       Planned work, phased
CHANGELOG.md     Version history (Unreleased section first)
```

Full index with descriptions: [docs/index.md](docs/index.md). Folder responsibilities inside `src/` live in each folder's own `OVERVIEW.md`.

## Documentation maintenance policy

If a file documents something that changed, update it in the same change.

| What changed                            | Files to update                                                                               |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| New route/page                          | `docs/frontend/OVERVIEW.md`, `docs/seo/OVERVIEW.md` if it needs metadata                      |
| New component in `src/components/ui`    | `docs/components/OVERVIEW.md`                                                                 |
| New content/engine type                 | The engine's `OVERVIEW.md`, `docs/content/OVERVIEW.md`, matching template in `docs/templates` |
| New dependency                          | `docs/decisions` (ADR), the relevant `OVERVIEW.md`                                            |
| New top-level `src/` folder             | `docs/architecture/OVERVIEW.md`, an ADR, that folder's own `OVERVIEW.md`                      |
| Design token change                     | `docs/design/OVERVIEW.md`                                                                     |
| Backend introduced or evaluated         | `docs/backend/OVERVIEW.md`, `docs/decisions` (ADR)                                            |
| Deployment/Cloudflare config            | `docs/cloudflare/OVERVIEW.md`                                                                 |
| Writing or design rule changed          | `docs/WRITING_STANDARDS.md`                                                                   |
| Git convention changed                  | `docs/workflows/GIT.md`                                                                       |
| Any feature shipped                     | `CHANGELOG.md` (Unreleased section)                                                           |
| Release tagged                          | `CHANGELOG.md` (Unreleased -> version + date)                                                 |
| Planned work added or changed           | `ROADMAP.md`                                                                                  |
| Setup or deployment instructions change | `README.md`                                                                                   |

## Tooling

Use Context7 to fetch current documentation for any library or API involved in a change (React, Vite, Tailwind, shadcn/ui, etc.) - training data goes stale, prefer the live docs. See the global Context7 instructions for the exact workflow.
