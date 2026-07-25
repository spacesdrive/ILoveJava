# Frontend

## Stack

React 19, TypeScript (strict), Vite, React Router (data-router API via `createBrowserRouter`), Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide icons.

## Component conventions

- One component per file; file name is `kebab-case.tsx`, component name is `PascalCase`.
- Function components only, no class components.
- Props typed with an `interface` named `<Component>Props`, defined above the component.
- Keep components small; extract a hook when logic exceeds ~1 screen of the render function.
- `src/components/ui` holds shadcn-generated/pattern-matched primitives — treat them as generated code: prefer composing over editing, and if you must edit, keep the diff minimal and consistent with shadcn's own conventions so future `shadcn add` runs stay mergeable.

## Imports

- Use the `@/` alias for anything under `src/`; no relative `../../../` chains.
- Import order: external packages, then `@/` absolute imports, then relative imports — enforced loosely by convention (see `eslint.config.js` for what's actually linted).

## Naming

- Files: `kebab-case.tsx` / `kebab-case.ts`
- Components, types, interfaces: `PascalCase`
- Functions, variables, hooks: `camelCase` (hooks additionally prefixed `use`)
- Constants that are truly constant: `SCREAMING_SNAKE_CASE`

## Routing

Routes are declared in [`src/app/router.tsx`](../../src/app/router.tsx) using `createBrowserRouter`. Route-level components live in `src/pages`; they compose feature components, they don't contain feature logic themselves. Lazy-load route components once there's more than a couple of routes (`React.lazy` + `<Suspense>`), so route-splitting stays real as the app grows.

## Error handling

- Use React Router's `errorElement` for route-level failures.
- Add an error boundary around any subtree that renders user- or content-authored data that could throw (e.g. a lesson block renderer once it exists).
- Don't swallow errors silently; surface a user-facing fallback and (once available) log to whatever error-tracking is in place.

## Forms

Prefer uncontrolled forms with native validation (`required`, `pattern`, etc.) where sufficient; reach for a form library only when validation complexity justifies it, and document that choice as an ADR.
