# Accessibility

Baseline: WCAG 2.1 AA. Not optional, not a follow-up pass - built into each component as it's written.

## Per-component checklist

- **Keyboard**: every interactive element reachable and operable via keyboard alone; visible focus state (the design system's `focus-visible:ring-*` tokens - see [Button](../../src/components/ui/button.tsx) for the pattern).
- **Semantic HTML first**: use the native element (`button`, `a`, `nav`, `main`, headings in order) before reaching for ARIA. ARIA only fills gaps native HTML can't.
- **Labels**: every form control has a programmatic label (`<label>`, `aria-label`, or `aria-labelledby`); every icon-only control has an accessible name (see the theme toggle in [Header](../../src/components/layout/header.tsx) for the pattern: `aria-label` + decorative icon).
- **Focus management**: route changes and modal/dialog open-close move focus sensibly; nothing traps focus unintentionally.
- **Color contrast**: text/interactive elements meet AA contrast against their background - verify against both light and dark tokens (see [../design](../design)).
- **Reduced motion**: animation respects `prefers-reduced-motion` - Framer Motion's `useReducedMotion` hook, or the CSS media query for pure-CSS animation.
- **Skip link**: present at the top of every page (see [Layout](../../src/components/layout/layout.tsx)) - don't remove it.

## Testing

Prefer Testing Library's role/label queries (see [../testing](../testing)) - if a component can't be queried by role or accessible name, that's an accessibility gap to fix, not a reason to fall back to `data-testid`.
