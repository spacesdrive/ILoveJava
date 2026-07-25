# Performance

## Targets

100 Lighthouse Performance / Accessibility / SEO / Best Practices, as a north star — measured, not assumed. Run `pnpm build && pnpm preview`, then Lighthouse against the preview build (dev-mode numbers are meaningless).

## Rules

- **Lazy load routes** once there is more than a handful — `React.lazy` per route in `src/app/router.tsx`.
- **No unjustified dependencies.** Every new dependency is weighed against bundle size (`pnpm build` reports gzip size in the output) — see the package-manager rules in [../../CLAUDE.md](../../CLAUDE.md).
- **Fonts are self-hosted and variable** (`@fontsource-variable/*`) — no external font requests, one file per family covers the full weight range. See [../design](../design).
- **Images**: prefer SVG for icons/illustrations; raster images must specify dimensions and use a modern format (WebP/AVIF) once any are added.
- **Animation**: CSS transitions for simple state changes, Framer Motion reserved for orchestrated/gesture-driven motion — see [../design](../design). Motion must not block interaction.
- **Memoization** (`useMemo`/`useCallback`/`memo`) only where a measured re-render cost justifies it — don't apply it reflexively.

## Current baseline

As of the engineering-foundation commit: production build is ~324 KB JS / ~104 KB gzip (React + Router + Framer Motion + app shell), ~23 KB CSS / ~7 KB gzip. Re-check this number as features land; if it grows without a corresponding feature justifying it, that's a regression worth investigating.

## Offline

Not yet implemented. A service worker (Cache API) for offline-capable core content is planned once there's real content to cache — see [ROADMAP.md](../../ROADMAP.md).
