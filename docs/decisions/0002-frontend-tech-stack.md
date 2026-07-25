# ADR 0002: Frontend tech stack

- **Status:** accepted
- **Date:** 2026-07-25

## Context

Following [ADR 0001](0001-browser-first-csr-architecture.md), the project needs a concrete, boring, well-supported stack that can scale to thousands of content entries without becoming unmaintainable, and that a contributor (human or AI) can understand quickly.

## Options considered

Evaluated primarily on: TypeScript-first support, community size/longevity, bundle-size discipline, and fit for a component-heavy, interactive educational UI.

- **Framework**: React 19 vs. Solid/Svelte/Vue — React chosen for ecosystem depth and because it's the explicit project requirement.
- **Build tool**: Vite vs. webpack/Parcel — Vite for dev-server speed and first-class Tailwind v4/React plugin support.
- **Styling**: Tailwind CSS v4 vs. CSS Modules/vanilla-extract — Tailwind for velocity and the shadcn/ui ecosystem built on top of it.
- **Component primitives**: shadcn/ui (Radix-based, code you own) vs. a packaged component library (MUI, Chakra) — shadcn/ui because components are copied into the repo (`src/components/ui`), not an opaque dependency, which matters for a project expected to run for years and be extended by many contributors.
- **Routing**: React Router (data-router API) — standard, well-documented, supports lazy route loading for code splitting.
- **Motion**: Framer Motion — for orchestrated/gesture-driven animation only, not simple hover states (see [docs/design](../design)).
- **Testing**: Vitest + Testing Library (unit/component) + Playwright (e2e) — Vitest shares Vite's config/transform pipeline; Testing Library enforces accessible, user-facing queries by design.
- **Package manager**: pnpm — strict, content-addressable node_modules, fast installs; explicit project requirement.
- **Linting/formatting**: ESLint (flat config) + Prettier, replacing Vite's default `oxlint` scaffold — chosen over oxlint because the project needs the mature `eslint-plugin-jsx-a11y` and `eslint-plugin-react-hooks` rule sets and broad editor/CI tooling support; oxlint's ecosystem is younger and narrower.

## Decision

React 19, TypeScript, Vite, React Router, Tailwind CSS v4, shadcn/ui, Framer Motion, Vitest, Testing Library, Playwright, pnpm, ESLint + Prettier, as scaffolded in this repository.

## Consequences

- The stack is entirely mainstream and documented — low onboarding cost for new contributors.
- shadcn/ui components live in-repo (`src/components/ui`), which means they must be kept in sync manually rather than via a version bump — accepted tradeoff for ownership and customizability.
- Any change to this stack (swapping a framework, adding a state-management library, etc.) needs its own ADR.
