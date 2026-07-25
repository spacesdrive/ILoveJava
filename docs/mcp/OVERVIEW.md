# MCP usage

When and how to use each MCP server available in this project. General principle: research before implementing, verify after implementing, and don't reach for a tool when the answer is already documented - check [docs/index.md](../index.md) and the relevant domain doc first.

Do not skip straight to writing code for anything non-trivial without the research step below - training-data knowledge of fast-moving libraries (Tailwind v4's Vite plugin, shadcn's current CLI behavior, React Router's Data Mode) goes stale, and this project has already hit that directly (see [docs/decisions/0002-frontend-tech-stack.md](../decisions/0002-frontend-tech-stack.md) and the shadcn CLI path-alias issue documented in [docs/components/OVERVIEW.md](../components/OVERVIEW.md)).

## Context7

**Use for:** current, version-accurate documentation on any library, framework, or API this project uses or is about to use - React, Vite, Tailwind CSS, React Router, shadcn/ui, TypeScript, testing libraries, and any new npm package before it's added.

**When:** before implementing anything involving one of the above, even if the API seems familiar. Prefer it over general web search for library documentation specifically (see the global Context7 instructions).

**When not:** for general programming concepts, debugging application logic, or refactoring decisions that aren't about a specific library's API.

**Workflow:** `resolve-library-id` with the library name and a specific query, then `query-docs` with the resolved ID and the specific question, not a vague topic. Prefer the result with higher source reputation and benchmark score when multiple libraries resolve.

## shadcn

**Use for:** browsing, adding, and inspecting shadcn/ui components before hand-building a UI primitive. Check the registry (`search_items_in_registries` / `list_items_in_registries`) before writing a new `src/components/ui/*` file from scratch, and use `get_add_command_for_items` to get the correct CLI invocation rather than hand-authoring one from memory.

**When not:** for project-specific composed components (`src/components/layout`, `src/components/seo`, future `src/features/*` components) - those are hand-authored on top of shadcn primitives, not generated. See [docs/components/OVERVIEW.md](../components/OVERVIEW.md) for the composition conventions.

**Known gotcha in this environment:** the shadcn CLI's path-alias detection has been unreliable on this Windows setup - `shadcn add <component>` has written files to a literal `@/` folder instead of `src/components/ui/`. If that happens, move the generated file into place by hand rather than editing the CLI's output structure, and verify `components.json` and `tsconfig.app.json`'s `paths` mapping are both correct before retrying. Full detail: [docs/components/OVERVIEW.md](../components/OVERVIEW.md).

If a needed primitive genuinely has no shadcn equivalent, a secondary open-source component/icon source (e.g. the uilora MCP, if configured) may be checked before hand-building - but shadcn is the default, first-checked source for this project's design system.

## Filesystem

**Use for:** file operations when its specific capabilities are a better fit than the editor-native tools - structured directory trees, bulk multi-file reads, or move/rename operations that need to happen atomically.

**Prefer instead:** the editor-native Read/Edit/Write/Glob/Grep tools for everything else - they're integrated with the harness's diff and permission UI, which the Filesystem MCP is not. Don't reach for Filesystem MCP for a single file read or a simple grep.

## Chrome DevTools

**Use for:** verifying any UI-affecting change once real pages/components exist - console errors, accessibility tree structure, responsive layout, Lighthouse scores (performance, accessibility, best practices, SEO), Core Web Vitals.

**When:** after implementing any UI change - see [docs/testing/OVERVIEW.md](../testing/OVERVIEW.md) and the "start the dev server and use the feature in a browser" rule already in this project's engineering manual. Always audit a production build (`pnpm build && pnpm preview`), never the dev server, for Lighthouse/performance numbers - dev-mode HMR overhead skews the results.

**When not:** for pure logic/non-visual changes with no rendering surface (a documentation-only change, a type-only refactor).

## Sequential Thinking

**Use for:** breaking down a medium-to-large feature before implementing it - identifying which existing abstraction (an engine in `src/engines`, a shared component, a hook) a new piece of work should build on rather than duplicate, identifying edge cases, and identifying scalability implications for a change expected to repeat across many future lessons/exercises/tools.

**When not:** for small, well-scoped changes that follow an established pattern exactly (a copy fix, a straightforward bug fix, adding one more entry to an existing list). Forcing structured thinking onto a trivial task adds overhead without benefit.

## Parallel Search (web search / fetch)

**Use for:** comparing implementation strategies, researching current best practices that span multiple libraries or approaches, validating an accessibility or SEO recommendation, comparing packages before adding a dependency, or anything time-sensitive Context7 doesn't cover (a recent API change, current browser support).

**When not:** when Context7 already answers the question - a specific library's API is Context7's job, not a general web search.

**Workflow:** search first, read the returned excerpts, and only fetch a full page when the excerpts are insufficient or a specific URL/exact wording is needed. Cross-check more than one source before committing to a "best practice" claim, especially for anything security- or performance-relevant.

## Before adding a dependency

Combine Context7 (does the library's current API actually fit the need) and Parallel Search (bundle size, maintenance status, license, whether a lighter alternative or a browser-native API already solves it - see [docs/architecture/OVERVIEW.md](../architecture/OVERVIEW.md)) before adding anything to `package.json`. A new dependency that isn't justified this way needs an ADR - see [docs/decisions](../decisions).
