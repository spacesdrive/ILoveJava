# Performance

## Targets

100 Lighthouse Performance / Accessibility / SEO / Best Practices, as a north star - measured, not assumed. Run `pnpm build && pnpm preview`, then Lighthouse against the preview build (dev-mode numbers are meaningless).

## Rules

- **Lazy load routes** once there is more than a handful - `React.lazy` per route in `src/app/router.tsx`.
- **No unjustified dependencies.** Every new dependency is weighed against bundle size (`pnpm build` reports gzip size in the output) - see the package-manager rules in [../../CLAUDE.md](../../CLAUDE.md).
- **Fonts are self-hosted and variable** (`@fontsource-variable/*`) - no external font requests, one file per family covers the full weight range. See [../design](../design).
- **Images**: prefer SVG for icons/illustrations; raster images must specify dimensions and use a modern format (WebP/AVIF) once any are added.
- **Animation**: CSS transitions for simple state changes, Framer Motion reserved for orchestrated/gesture-driven motion - see [../design](../design). Motion must not block interaction.
- **Memoization** (`useMemo`/`useCallback`/`memo`) only where a measured re-render cost justifies it - don't apply it reflexively.

## Current baseline

As of the engineering-foundation commit: production build is ~324 KB JS / ~104 KB gzip (React + Router + Framer Motion + app shell), ~23 KB CSS / ~7 KB gzip. Re-check this number as features land; if it grows without a corresponding feature justifying it, that's a regression worth investigating.

With the Java Fundamentals lessons (ten lessons, `/learn/java-fundamentals/*`), the home route's own bundle is essentially unchanged (~184 KB JS / ~59 KB gzip) - the lesson-rendering machinery (Shiki, CodeMirror, the lesson/exercise/quiz features) is entirely behind the lazy-loaded lesson routes, per the lazy-load rule above. Those lesson-route chunks are large (roughly 480-540 KB / 150-170 KB gzip, dominated by `@uiw/react-codemirror` and `@codemirror/lang-java` for the exercise editor) - acceptable for now since they only load when a learner opens a lesson, but worth a closer look (manual chunking, deferring CodeMirror until "Run" is first needed) if that route's Lighthouse score doesn't hold up under measurement.

### Shiki: fine-grained bundle, not the full package

`src/features/lessons/components/lesson-code-highlighter.ts` imports `@shikijs/core` + `@shikijs/engine-javascript` + `@shikijs/langs/java` + `@shikijs/langs/bash` + two themes directly, instead of the top-level `shiki` package. The full package's default highlighter bundles every supported language and theme plus the WASM oniguruma regex engine - in this app that produced several megabytes of async chunks (one per bundled language) the very first time any lesson code block rendered, for a course that only ever highlights Java and the occasional shell command. The fine-grained bundle plus the pure-JS regex engine (`@shikijs/engine-javascript`, no WASM) cut the highlighting-related chunks to a few dozen KB each. Adding a third language to lesson content means adding its `@shikijs/langs/<name>` import to `lesson-code-highlighter.ts`, not switching back to the full package. See [ADR 0004](../decisions/0004-phase-1-content-engine-dependencies.md).

### CheerpJ (exercise execution): loaded on demand, not bundled at all

[ADR 0003](../decisions/0003-java-code-execution-strategy.md)'s wasm-jvm implementation (`src/engines/playground-engine/wasm-jvm`) loads CheerpJ - a full WASM-compiled OpenJDK, tens of MB - from Leaning Technologies' CDN, and only inside a dedicated Web Worker, and only the first time a learner presses "Run" on an exercise. It is never part of any bundled JS chunk (it's not an npm dependency at all) and never loads on page visit, lesson read-through, or any route that doesn't include pressing Run. `scripts/fetch-tools-jar.mjs` (a `postinstall` step) separately downloads `tools.jar` (~18MB, gitignored) so `javac` has something to compile against - also only fetched at install time, never shipped as part of the app's own JS bundle. First-run latency (runtime download + init) is real and expected; `ExerciseRunner` sets a 60-second timeout and surfaces a "downloading a Java runtime" message during it rather than a bare unexplained spinner - see the ADR's Consequences section.

## Offline

Not yet implemented. A service worker (Cache API) for offline-capable core content is planned once there's real content to cache - see [ROADMAP.md](../../ROADMAP.md).
