# Roadmap

## Phase 0 - Engineering foundation (current)

- [x] Vite + React 19 + TypeScript scaffold
- [x] Tailwind v4 + shadcn/ui design system baseline
- [x] Client-side routing (React Router), theme provider, SEO component
- [x] ESLint + Prettier, Vitest + Testing Library, Playwright
- [x] Documentation system (this repo's `docs/`)
- [x] Content/engine contracts (`src/content`, `src/engines/*`) - types only, no implementations
- [x] CI (GitHub Actions): lint, typecheck, test, build on every PR
- [x] Cloudflare Pages deployment, automated redeploy on push to `main`
- [x] Attach the `ilovejava.spacesdrive.cc` custom domain to the Cloudflare Pages project (see [docs/cloudflare/OVERVIEW.md](docs/cloudflare/OVERVIEW.md))

## Phase 1 - Content engine implementations

- [x] Lesson renderer for `LessonContent` blocks (prose, code, callout; visualization/check render an honest "not yet available" notice - see [src/features/lessons](../src/features/lessons))
- [x] Progress persistence (IndexedDB) and a `useProgress` hook
- [ ] ADR + implementation for Java code execution (`docs/decisions`, `src/engines/playground-engine`) - [ADR 0003](docs/decisions/0003-java-code-execution-strategy.md) is still `proposed`, no `PlaygroundRunner` exists. The exercise runner UI (below) is unblocked via an optional `runner` prop that's simply not supplied yet, per the ADR's own note that UI work can proceed independently.
- [x] Exercise runner UI built on the playground engine (runner not yet wired - see above)
- [x] Quiz/MCQ renderer and scoring

## Phase 2 - First real content

- [x] First learning path defined: **Java Fundamentals**, 10 lessons (`src/features/lessons/content/java-fundamentals`), topics provided by the project owner
- [x] First lessons, exercises, and quizzes shipped end to end - `/learn/java-fundamentals` and `/learn/java-fundamentals/<slug>`, live in the sitemap. Exercises and quizzes ship embedded in lesson content (`quiz`/`exercise` blocks) rather than as separate standalone pages; exercises don't execute real code yet, pending [ADR 0003](docs/decisions/0003-java-code-execution-strategy.md).

## Phase 3 - Platform features

- [ ] Search (client-side index)
- [ ] Learning paths and achievements
- [ ] Interview prep and revision modules
- [ ] Projects section

## Later

- [ ] Multilingual content support
- [ ] PWA / full offline mode

This roadmap is updated as decisions are made - it is not a committed schedule.
