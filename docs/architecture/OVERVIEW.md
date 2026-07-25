# Architecture

## Browser-first, by default

ILoveJava is a client-side rendered single-page application. The browser is the runtime: routing, rendering, and state all execute locally. Assume every feature works without a backend unless there's a compelling, documented reason it can't - see [Adding a backend](#adding-a-backend) below.

Prefer, in this order, before reaching for anything server-side:

1. Browser-native storage - `localStorage` (settings), `IndexedDB` (progress, larger structured data), `Cache API` (offline assets)
2. Browser-native APIs - Web Workers (off-main-thread work), Broadcast Channel (cross-tab sync), File System Access API, Clipboard API
3. Client-side computation - WebAssembly for anything CPU-heavy that isn't plain JS-fast-enough

## No SSR

No Next.js, no server components, no server-rendered HTML. This repo is a Vite + React Router SPA. SEO for a CSR app is handled via the client-side [`Seo`](../../src/components/seo/seo.tsx) component plus a prerendered/static `index.html` shell - see [../seo](../seo).

## State management

In order of preference:

1. Local component state (`useState`/`useReducer`)
2. URL state (route params/search params) for anything that should be shareable/bookmarkable
3. React Context + custom hooks for state shared across a subtree (e.g. theme)
4. `localStorage`/`IndexedDB` for state that must survive a reload

No global state library (Redux, Zustand, etc.) is introduced without an ADR justifying it over the above.

## Folder structure

```
src/
  app/            Router, providers, app shell - composition root only
  components/
    ui/           Shared design-system primitives (shadcn-based)
    layout/       App shell components (Header, Footer, Layout)
    seo/          SEO metadata component
  features/       Feature-first modules (empty until the first feature)
  hooks/          Shared hooks used by 2+ features
  lib/            Framework-agnostic utilities (e.g. `cn`)
  types/          Shared TypeScript types used by 2+ features
  constants/      App-wide constants (site metadata, etc.)
  content/        Content metadata contract + content-agnostic utilities
  engines/        Typed contracts for lesson/exercise/quiz/playground content
  pages/          Route-level components, composed from features
  test/           Test setup
```

Every folder has its own `OVERVIEW.md` - read it before adding files there. Rules are enforced by convention and code review, not tooling, until the codebase is large enough to justify lint rules for import boundaries.

## Adding a backend

Only after evaluating browser-based approaches first. If you believe a feature needs a backend, write an ADR (see [../decisions/template.md](../decisions/template.md)) that answers:

- Why the browser solution is insufficient (which APIs were considered)
- What the backend enables
- Performance, maintenance, and privacy cost
- Whether the feature can remain optional/degrade gracefully without it

The playground engine (`src/engines/playground-engine`) is the one place this is already an open, tracked question - Java has no mainstream in-browser runtime.
