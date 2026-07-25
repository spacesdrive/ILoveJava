# Reference

Quick lookups. If it needs explanation beyond a table, it belongs in a guide or a proper doc section, not here.

## Scripts

See the table in [README.md](../../README.md#getting-started).

## Environment variables

None yet - this is a fully client-side app with no configuration required to run it. This section will list any `VITE_*` variables introduced later (Vite only exposes env vars prefixed `VITE_` to client code - never put a secret behind that prefix).

## Path aliases

`@/*` → `src/*` (configured in `tsconfig.app.json` and `vite.config.ts`).

## Glossary

- **ADR** - Architecture Decision Record, see [../decisions](../decisions).
- **Content engine** - a `src/engines/*` module defining the typed shape of one content kind (lesson, exercise, quiz, playground) - see [../content](../content).
- **CSR** - client-side rendering; this app has no SSR, see [../architecture](../architecture).
