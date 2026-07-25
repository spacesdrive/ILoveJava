# Components (`src/components/ui`)

Primitives here follow the [shadcn/ui](https://ui.shadcn.com) pattern: Radix UI primitives (accessibility/behavior) + `class-variance-authority` (variants) + Tailwind (styling), composed with the `cn()` helper from `src/lib/utils.ts`.

## Adding a new primitive

Preferred: use the shadcn CLI (`pnpm dlx shadcn@latest add <component>`) so the generated code matches upstream conventions and future updates stay mergeable. In this environment the CLI's Vite path-alias detection has been unreliable - if `add` writes files to the wrong location (a literal `@/` folder instead of `src/`), move the generated file into place by hand rather than editing the CLI's output structure.

If hand-writing a primitive (no shadcn equivalent exists):

- Match the existing pattern: `cva` for variants, `React.ComponentProps<'element'>` for prop typing, `data-slot="<name>"` on the root element.
- Support `asChild` (via `@radix-ui/react-slot`) when the component might need to render as a different element (e.g. a `Button` rendering as a `Link`).
- Every variant must be reachable via Tailwind's semantic color tokens (see [../design](../design)) - no one-off colors.

## Testing

Primitives get a component test (Testing Library) covering: renders with its accessible name, responds to interaction, and reflects disabled/invalid states where applicable. See [`src/components/ui/__tests__/button.test.tsx`](../../src/components/ui/__tests__/button.test.tsx) for the pattern.
