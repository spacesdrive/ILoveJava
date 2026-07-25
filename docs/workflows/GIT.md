# Git Workflow

## Repository

- URL: https://github.com/spacesdrive/ILoveJava
- Author name: spacesdrive
- Author email: valzorx7@gmail.com
- Default branch: main

Commits must use the spacesdrive author identity. The local git config for this repository is set to this - never override it per-commit with a different author.

Do not add "Co-Authored-By" lines referencing AI tools. Commits should show only the project author.

## Commit cadence

Commit after every meaningful, self-contained change. Do not accumulate unrelated changes into one large commit. Do not leave work uncommitted between sessions.

A meaningful change is one that:

- Adds a working feature (even a small one)
- Fixes a bug
- Updates documentation to reflect a real change
- Refactors without changing behavior

Do not commit work that breaks `pnpm build`. Use a feature branch if the work spans multiple sessions.

## Commit message format

Use Conventional Commits with an optional scope:

```
type(scope): short description in present tense

Optional body explaining WHY, not WHAT. Wrap at 72 characters.
Reference which docs were updated if any.
```

### Types

| Type       | When to use                                           |
| ---------- | ----------------------------------------------------- |
| `feat`     | New feature or capability                             |
| `fix`      | Bug fix                                               |
| `docs`     | Documentation only                                    |
| `refactor` | Code restructuring, no behavior change                |
| `style`    | Formatting or whitespace, no logic change             |
| `perf`     | Performance improvement                               |
| `test`     | Adding or updating tests only                         |
| `chore`    | Maintenance, dependency updates, tooling, scaffolding |
| `ci`       | CI/CD workflow changes                                |
| `release`  | Version bump and changelog update                     |

### Scope (optional)

Use scope to name the area affected: `feat(lesson-engine):`, `fix(theme):`, `docs(seo):`, `chore(deps):`.

### Subject line rules

- Present tense: "add" not "added", "fix" not "fixed"
- No period at the end
- Under 72 characters total, including type and scope
- Lowercase after the colon
- No emojis, no decorative characters

### Examples

```
feat(lesson-engine): render prose and code blocks

fix(theme): prevent flash of wrong theme on first paint

docs(architecture): document the browser-first folder structure

refactor(seo): extract head-tag upsert helpers

chore(deps): update react-router-dom to latest

release: v0.1.0 - engineering foundation
```

## What to commit together

Always group these in a single commit:

- A new component + its test + its usage in a page
- A new content-engine type + the template that demonstrates it
- A bug fix + updated docs, if the fix changes documented behavior
- A new feature + `CHANGELOG.md` update + relevant `docs/` updates

Never commit:

- `node_modules/`
- `dist/`
- `.env` files with real values
- Editor or OS metadata files (`.DS_Store`, `Thumbs.db`)

## Documentation in commits

A feature is not complete until `CHANGELOG.md` reflects it and the relevant `docs/` files are updated - see the Documentation Maintenance Policy in [CLAUDE.md](../../CLAUDE.md). Note in the commit body which docs were touched:

```
feat(quiz-engine): add fill-in question scoring

Docs updated: quiz-engine/OVERVIEW.md, CHANGELOG.md.
```

## Release tagging

Tag releases after shipping a meaningful set of changes.

| Change type     | Version bump   | Example          |
| --------------- | -------------- | ---------------- |
| Bug fix         | Patch: x.x.N+1 | v0.1.0 -> v0.1.1 |
| New feature     | Minor: x.N+1.0 | v0.1.1 -> v0.2.0 |
| Breaking change | Major: N+1.0.0 | v0.2.0 -> v1.0.0 |

```bash
git add CHANGELOG.md
git commit -m "release: v0.2.0 - lesson renderer"
git tag -a v0.2.0 -m "v0.2.0 - lesson renderer"
git push origin main --tags
```

## Branch strategy

Small changes and fixes go directly to `main`. For larger features spanning multiple sessions:

```bash
git checkout -b feat/lesson-renderer
# work, commit incrementally
git push origin feat/lesson-renderer
# merge to main when ready
git checkout main
git merge feat/lesson-renderer
git push origin main
```

Delete the branch after merging:

```bash
git push origin --delete feat/lesson-renderer
git branch -d feat/lesson-renderer
```

## Pre-commit checklist

Run before every commit:

1. `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` - all must pass
2. `git status` - verify only intended files are staged
3. `git diff --staged` - review the full diff before committing
4. Check no secrets or credentials appear in the diff
5. Verify `CHANGELOG.md` is updated if the commit adds a feature or fix

## Amending and history

Never rewrite history on `main` once it has been pushed and shared. Amending or force-pushing an already-shared commit is a destructive action - only do it if explicitly asked, and only on a local, unpushed commit. When a commit that was already pushed needs fixing, create a new commit instead.
