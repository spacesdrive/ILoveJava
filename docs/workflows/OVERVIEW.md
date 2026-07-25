# Workflow

## Branching

- `main` is always deployable. No direct commits to `main` except by the maintainer for trivial doc fixes.
- Branch names: `type/short-description` (`feat/lesson-renderer`, `fix/theme-flash`, `docs/seo-guide`).

## Commits

See [GIT.md](GIT.md) for the full commit format, cadence, and authorship rules.

## Pull requests

See [CONTRIBUTING.md](../../CONTRIBUTING.md#pull-requests). CI (`.github/workflows/ci.yml`) runs `typecheck`, `lint`, `format:check`, `test`, and `build` on every PR - all must pass before merge.

## Releases

Pre-1.0: no formal release process yet. Once the project ships its first real content, releases will follow semantic versioning and this section will document the tagging/changelog process.

## Architecture changes

Any change to the folder structure at the `src/` root, a new core dependency, or anything that touches the browser-first/no-SSR rules requires an ADR first - see [../decisions](../decisions).
