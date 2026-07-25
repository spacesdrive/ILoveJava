# ADR 0001: Browser-first, client-side rendered architecture

- **Status:** accepted
- **Date:** 2026-07-25

## Context

ILoveJava needs to serve interactive lessons, exercises, playgrounds, and progress tracking to learners for free, indefinitely, at low operating cost. The project also has a stated goal of working offline for core content and avoiding unnecessary infrastructure and privacy exposure.

## Options considered

1. **Server-rendered app (Next.js SSR/RSC)** - better default SEO, but requires a persistent server or serverless compute for every render, complicates offline support, and ties every deploy to a backend.
2. **Client-side rendered SPA, browser-first** - no server required for core functionality; progress/settings stored locally (localStorage/IndexedDB); works offline once cached; SEO handled via a static HTML shell plus client-side metadata patching for JS-executing crawlers.
3. **Static site generator (content baked at build time, e.g. Astro)** - good SEO and performance for static content, but a poor fit for interactive, stateful features like exercise runners and progress tracking, which still need a client-side app underneath.

## Decision

Client-side rendered SPA (Option 2): React 19 + Vite + React Router, no SSR, no backend by default. Every feature is assumed to run in the browser unless an ADR justifies otherwise (see [ADR 0003](0003-java-code-execution-strategy.md) for the one open exception).

## Consequences

- Zero server cost for the core product; it can run indefinitely on static hosting (Cloudflare Pages).
- Progress and settings are private to the user's browser by default - no account system needed for the core experience.
- SEO requires deliberate handling per [docs/seo](../seo) since there's no server-rendered HTML per route; this is an accepted tradeoff, revisited if organic search traffic becomes a priority (candidate mitigation: build-time prerendering, not a server).
- Any future feature that seems to need a backend must be justified against this ADR, not assumed.
