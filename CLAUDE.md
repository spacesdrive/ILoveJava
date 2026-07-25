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
4. The relevant section(s) from the documentation map below, read in full, not skimmed - a document exists precisely because a past decision or convention needs to survive past one conversation
5. [docs/workflows/GIT.md](docs/workflows/GIT.md) before committing

Skipping straight to writing code without reading the domain-specific document for whatever the change touches is how the codebase and its documentation drift apart - don't. For a small, well-scoped change (a copy fix, a single obvious bug fix), judgment applies, but "this is small" is not an excuse to skip [docs/architecture](docs/architecture) when the change touches routing, the content-engine contracts, or anything else load-bearing.

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
- **Research before implementing.** Use Context7 for current library/API docs and the shadcn MCP for UI components before hand-building anything a registry or official doc already covers - don't rely on training-data knowledge of a fast-moving library's API. See [docs/mcp/OVERVIEW.md](docs/mcp/OVERVIEW.md) for which MCP server to use for what.
- **Read the relevant docs first.** Follow the reading order above and open the specific domain doc for whatever the change touches before writing code - don't guess at a convention this repository already documents. See [Documentation map](#documentation-map) below.
- **Security rules are strict, not advisory.** Follow [docs/security/OVERVIEW.md](docs/security/OVERVIEW.md) without exception - never expose secrets, never render unsanitized content, never skip validation at a boundary.
- **No dead code or dead files.** Remove unused code, unused files, and unused dependencies as part of the same change that made them unused - don't leave cleanup for later. A change is not done until it's clean, not just until it works. See [docs/workflows/GIT.md](docs/workflows/GIT.md#pre-commit-checklist).
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
  mcp/OVERVIEW.md            When and how to use each MCP server
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
| MCP server added or usage rule changed  | `docs/mcp/OVERVIEW.md`                                                                        |
| Any feature shipped                     | `CHANGELOG.md` (Unreleased section)                                                           |
| Release tagged                          | `CHANGELOG.md` (Unreleased -> version + date)                                                 |
| Planned work added or changed           | `ROADMAP.md`                                                                                  |
| Setup or deployment instructions change | `README.md`                                                                                   |

## Project memory

This project's durable, authoritative memory is exactly four files:

1. `CLAUDE.md` (this file) - meta-level rules only.
2. [`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md) - current implementation reality.
3. [`docs/decisions`](docs/decisions) - why the implementation is that way.
4. [`README.md`](README.md) - what the project is and how to run it.

If two of these conflict, precedence is: `docs/architecture/OVERVIEW.md` for how the system currently works, `docs/decisions` for why, this file for meta-level process rules only, `README.md` for setup/usage. A conflict between any of them and the actual code means the documentation is wrong - fix it, don't work around it.

This is distinct from any cross-session AI memory feature the assistant harness itself provides (user preferences, prior-conversation recall) - that captures things about _how to collaborate_; the four files above capture facts about _the project itself_, live in the repository, and are what any contributor (human or AI) should trust.

## Tooling

Use Context7 for current library/API documentation and see [docs/mcp/OVERVIEW.md](docs/mcp/OVERVIEW.md) for every other MCP server available in this project (shadcn, Filesystem, Chrome DevTools, Sequential Thinking, Parallel Search) and when to reach for each one.
