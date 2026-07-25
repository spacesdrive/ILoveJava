# CLAUDE.md

AI operating manual for ILoveJava. Keep this file short — detail lives in the linked docs, not here.

## What this is

A free, open source, interactive Java learning platform: lessons, exercises, quizzes, playgrounds, projects, interview prep. Currently in the **engineering foundation** phase — no lessons or Java content yet. Do not add lesson/exercise/quiz content unless the user explicitly provides the topic and asks for it.

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

A change isn't done until `typecheck`, `lint`, and `test` pass.

## Architecture, in one paragraph

Client-side rendered SPA (React 19 + Vite + React Router). Browser-first: progress, settings, and content run locally (localStorage/IndexedDB) with no backend by default. Feature-first `src/features/*`, shared UI in `src/components/ui` (shadcn/Tailwind v4), and a content layer (`src/content`, `src/engines/*`) that defines typed contracts for lessons/exercises/quizzes/playground independent of any specific Java topic. Full detail: [docs/architecture](docs/architecture).

## Hard rules

- **Browser-first.** Don't reach for a backend because it's convenient. If a feature seems to need one, write the tradeoff up as an ADR in [docs/decisions](docs/decisions) first — see the template there. The one open exception is running Java code itself; see [src/engines/playground-engine/README.md](src/engines/playground-engine/README.md).
- **No SSR.** No Next.js server components, no server-rendered HTML. Routing, rendering, and state stay client-side.
- **Feature isolation.** Code in `src/features/<name>` may depend on `src/components`, `src/hooks`, `src/lib`, `src/types`, `src/constants`, `src/engines`. Features must not import from each other directly.
- **pnpm only.** Don't introduce npm/yarn lockfiles.
- **Docs move with code.** Architecture, folder, or workflow changes update the relevant file under `docs/` in the same change.
- **No placeholder features.** Don't scaffold lesson/exercise UI ahead of real content — the engines in `src/engines` are contracts (types), not implementations, until a real feature is being built.

## Where things live

- Full doc index: [docs/index.md](docs/index.md)
- Folder responsibilities: each `src/*` folder has its own `README.md`
- Decisions: [docs/decisions](docs/decisions) (ADRs)
- Roadmap: [ROADMAP.md](ROADMAP.md)
