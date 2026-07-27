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
- `public/_redirects` (SPA fallback for Cloudflare Pages).
- Documented the full deploy pipeline, its secrets, and a "what can break this" maintenance section in `docs/cloudflare/OVERVIEW.md`.
- Attached and verified live the `ilovejava.spacesdrive.cc` custom domain on the Cloudflare Pages project, via two one-time `workflow_dispatch` workflows (removed after use) - see `docs/cloudflare/OVERVIEW.md`.
- Phase 1 content engine implementations ([ADR 0004](docs/decisions/0004-phase-1-content-engine-dependencies.md)): `src/features/lessons` (`LessonRenderer`, markdown via `react-markdown`/`remark-gfm`, lazily-loaded Shiki syntax highlighting), `src/features/exercises` (`ExerciseRunner`, an editable CodeMirror-based code exercise UI with an optional `PlaygroundRunner` prop, see [ADR 0003](docs/decisions/0003-java-code-execution-strategy.md)), `src/features/quizzes` (`QuizRenderer`, scores MCQ/true-false/fill-in questions against `passThreshold`).
- `src/hooks/use-progress.ts` and `src/lib/idb.ts` - shared IndexedDB-backed completion/attempt tracking used by the lessons, exercises, and quizzes features.
- `Card`, `Progress`, `Tabs`, `Accordion`, `Alert`, `Badge`, `RadioGroup`, `Checkbox`, `Input`, and `Label` shadcn/ui primitives, each with a component test.
- Real favicon set (`public/favicon-{16,32,48,180,192,512}x*.png`) and `public/site.webmanifest`, replacing the placeholder `favicon.svg`; `index.html` links the 16/32/48px icons, the 180px apple-touch-icon, and the manifest (192/512px, used for PWA/home-screen icons).
- Automated `sitemap.xml`/`robots.txt` generation: `src/lib/sitemap.ts` and `src/lib/robots-txt.ts` (pure, unit-tested XML/text builders and validation), `src/app/sitemap-routes.ts` (the single source of truth for indexable static routes), and `vite-sitemap-plugin.ts` (a build-only Vite plugin that validates and writes both files into `dist/` on every `pnpm build`, failing the build on an invalid entry). `src/app/__tests__/sitemap-routes.test.ts` guards against the route manifest drifting from `src/app/router.tsx`. See `docs/seo/OVERVIEW.md`.
- **First real content: the Java Fundamentals learning path** - ten lessons (`src/features/lessons/content/java-fundamentals`) covering what Java is, how it runs, environment setup, and core syntax through control flow, served at `/learn/java-fundamentals` and `/learn/java-fundamentals/<slug>` (both lazy-loaded routes), complete with breadcrumbs, previous/next navigation, per-lesson progress tracking, a completion screen, and `LearningResource`/`Course` JSON-LD structured data.
- Expanded `LessonBlock` with `comparison-table`, `expandable`, `steps`, `flashcards`, `summary`, `quiz`, and `exercise` variants, and widened `callout` with `example`/`mistake`/`best-practice`/`performance`/`history`/`insight` variants - see `src/engines/lesson-engine/OVERVIEW.md`. `quiz`/`exercise` blocks render via the existing `QuizRenderer`/`ExerciseRunner` (composed at the page level, not inside the lessons feature, to respect feature isolation).
- New reusable lesson components: `LessonHero`, `LessonNavigation`, `LessonCompletion`, `GlossaryTerm`, `Flashcards`, `LessonSteps`, `LessonComparisonTable`, `LessonExpandable`, `LessonSummary`, and a diagram registry (`src/features/lessons/components/diagrams`) with five hand-built SVG/Tailwind/Framer-Motion diagrams (Java execution flow, JDK/JRE/JVM, program structure anatomy, variable memory, if/else control flow) resolved by the `visualization` block type.
- `Tooltip`, `Breadcrumb`, `Separator`, `Table`, and `Skeleton` shadcn/ui primitives, each with a component test; `PageLoadingFallback` (`src/components/layout`) as the shared `Suspense` fallback for lazy-loaded routes.
- `Seo` component gained an optional `structuredData` prop that injects/removes a JSON-LD `<script type="application/ld+json">` tag.
- `getLessonSitemapEntries()` wired into `vite-sitemap-plugin.ts`, putting all ten lesson URLs and the path overview page into `sitemap.xml` - the content-driven sitemap extension point documented in `docs/seo/OVERVIEW.md` is now in actual use.
- **Real, client-side Java execution ([ADR 0003](docs/decisions/0003-java-code-execution-strategy.md), now `accepted`)**: `src/engines/playground-engine/wasm-jvm` implements `PlaygroundRunner` on top of CheerpJ, a WASM-compiled OpenJDK - `javac` compiles submitted source and the resulting bytecode runs, both entirely in the browser, inside a dedicated Web Worker so a hung or infinite-looping submission can be forcibly terminated (`worker.terminate()`) instead of freezing the page. `wasmJvmRunner` is wired into every exercise block via `src/pages/lesson-page.tsx`. `scripts/fetch-tools-jar.mjs` (a `postinstall` step) downloads a real `tools.jar` from Eclipse Temurin so `javac` has something to compile against; it's gitignored and never bundled into the app. `e2e/exercise-execution.spec.ts` verifies the full compile/run/pass-fail pipeline against a real production build.

### Changed

- **Redesigned the home page and app chrome.** The home page was previously a single centered heading, one line of copy, and a button - a huge amount of unused whitespace with nothing to anchor it. It's now composed of a two-column hero (headline/CTAs alongside a static preview of a real exercise), a "Why ILoveJava" feature grid, a three-step "How a lesson works" section, a curriculum preview listing all ten Java Fundamentals lesson titles, and a closing call to action (`src/pages/home-page.tsx`, `src/pages/home/*`). `Header` gained a "Java Fundamentals" nav link, a GitHub link, and a sticky/backdrop-blurred bar; `Footer` gained a link column (Java Fundamentals, source code, issue tracker) and a copyright line. Both widened from `max-w-5xl` to `max-w-6xl` with responsive horizontal padding to match - `LessonPage`, `LearningPathPage`, and `PageLoadingFallback` now share that same outer width too (with their existing `max-w-3xl` reading column left-anchored inside it, not independently centered), so page headings line up with the header logo above them instead of sitting in an independently-centered, narrower column. Scroll-reveal on the new sections uses a small `IntersectionObserver` hook (`src/pages/home/use-reveal.ts`) plus `motion-safe:` Tailwind variants rather than Framer Motion, keeping the library out of the home route's eagerly-loaded bundle - see `docs/performance/OVERVIEW.md`.

- Replaced the full `shiki` package with its fine-grained `@shikijs/*` sub-packages (Java/Bash grammars only, pure-JS regex engine instead of the WASM oniguruma engine) - the full package's default highlighter bundled every supported language into the production build. See the amendment to [ADR 0004](docs/decisions/0004-phase-1-content-engine-dependencies.md) and `docs/performance/OVERVIEW.md`.
- `tsconfig.node.json` switched from `moduleResolution: nodenext` to `bundler` (matching how Vite/esbuild actually resolve these files at runtime) and gained the `@/` path alias, so build-tooling files (`vite-sitemap-plugin.ts` and what it imports) can use the same import style as the rest of the app.

- Renamed every folder-level `README.md` under `docs/` and `src/` to `OVERVIEW.md` to give each doc an actual, descriptive name instead of the generic default.
- Replaced em dashes and en dashes with standard hyphens throughout the codebase and docs, per the writing standards.

### Fixed

- CI: pinned `packageManager` in `package.json` so `pnpm/action-setup` can resolve a pnpm version instead of failing with "No pnpm version is specified".
- Dependabot: added `commit-message` prefixes (`chore(deps)` for npm, `ci(deps)` for GitHub Actions) so automated PRs follow the same Conventional Commits format as the rest of the repository.
- Corrected the site domain typo (`spacedrive` to `spacesdrive`) in `src/constants/site.ts`.
- Restored `public/` (favicon and the new `_redirects`), which had never actually been committed since the initial scaffold despite `index.html` referencing `/favicon.svg`.
- Deploy workflow: pinned `wrangler` as a `devDependency` and added `pnpm-workspace.yaml` (`allowBuilds: { esbuild: true, workerd: true }`) after the first deploy run failed - `wrangler-action`'s fallback install failed under pnpm 11's default build-script sandboxing.
- Deploy workflow: added an idempotent `wrangler pages project create` step before every deploy, after the second deploy run failed with "The Pages project 'ilovejava' does not exist" - `wrangler pages deploy` does not create a project on the fly.
- Custom domain: Cloudflare's documented automatic-CNAME-on-same-account behavior did not trigger when the domain was added via the raw API (the domain sat stuck reporting "CNAME record not set"); fixed by creating the CNAME record directly via the DNS API.
