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

- [ ] Lesson renderer for `LessonContent` blocks (prose, code, callout, visualization, check)
- [ ] Progress persistence (IndexedDB) and a `useProgress` hook
- [ ] ADR + implementation for Java code execution (`docs/decisions`, `src/engines/playground-engine`)
- [ ] Exercise runner UI built on the playground engine
- [ ] Quiz/MCQ renderer and scoring

## Phase 2 - First real content

- [ ] First learning path defined (topics provided by the project owner)
- [ ] First lessons, exercises, and quizzes shipped end to end

## Phase 3 - Platform features

- [ ] Search (client-side index)
- [ ] Learning paths and achievements
- [ ] Interview prep and revision modules
- [ ] Projects section

## Later

- [ ] Multilingual content support
- [ ] PWA / full offline mode

This roadmap is updated as decisions are made - it is not a committed schedule.
