# Design system

Tokens are defined once in [`src/index.css`](../../src/index.css) as CSS variables (OKLCH color space) and mapped into Tailwind via `@theme inline`, following the shadcn/ui "new-york" style convention. Never hardcode a color, radius, or font outside these tokens.

## Color

Semantic tokens only — `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, plus `code`/`code-foreground` for code blocks. Each has a light and dark value (`:root` and `.dark`). Component code should use `bg-primary`, `text-muted-foreground`, etc. — never raw hex/oklch values.

## Typography

- Sans: Inter Variable (`font-sans`) — self-hosted via `@fontsource-variable/inter`, no external font requests.
- Mono: JetBrains Mono Variable (`font-mono`) — self-hosted via `@fontsource-variable/jetbrains-mono`, used for code blocks.
- Both are variable fonts: one file covers the full weight range, keeping the font payload small.

## Radius

`--radius` is the single source of truth (`0.625rem`); `sm`/`md`/`lg`/`xl` are derived from it via `@theme inline`. Use the Tailwind `rounded-*` scale, not a custom value.

## Motion

Framer Motion for anything beyond a CSS transition (page/section enter-exit, drag interactions, orchestrated sequences). Plain CSS `transition`/`animate-*` (via `tw-animate-css`) for simple hover/focus states — don't reach for Framer Motion for a hover color change.

All motion must respect `prefers-reduced-motion` — see [../accessibility](../accessibility).

## Components

Empty/loading/error states are not optional add-ons — every data-bearing component design must define all three before it's built. Component-level conventions live in [../components](../components).
