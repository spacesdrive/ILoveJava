# features/

Feature-first modules. Each feature owns its full vertical slice: components, hooks, types, and logic specific to it.

```
features/
  <feature-name>/
    components/
    hooks/
    lib/
    types.ts
    index.ts        # public API of the feature — everything else imports from here
```

Rules:

- Nothing outside a feature imports from inside it except through `index.ts`.
- Features may depend on `src/components/ui`, `src/hooks`, `src/lib`, `src/types`, `src/constants`, and the engines in `src/engines`. Features must not depend on each other directly — share through the engines or `src/` shared layers instead.
- This directory is intentionally empty until the first feature (lessons) is designed. See [ROADMAP.md](../../ROADMAP.md).
