# types/

Shared TypeScript types used across two or more features.

Rules:

- If a type is only used inside one feature, it belongs in that feature's own `types.ts`, not here.
- Prefer `interface` for object shapes that might be extended; `type` for unions, tuples, and mapped types.
- Do not put runtime code (functions, classes, constants) here - types only.
