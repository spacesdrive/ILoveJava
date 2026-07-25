# Documentation

Start here. Each section covers one concern; nothing is duplicated across sections - if you're unsure where something belongs, it belongs in exactly one of these.

## Reading order for a new change

1. [CLAUDE.md](../CLAUDE.md) - project identity, hard rules, this doc map
2. [WRITING_STANDARDS.md](WRITING_STANDARDS.md) - typography, icons, writing style, UI copy, commit messages
3. [architecture](architecture) - system shape and constraints
4. The section below matching what you're touching
5. [workflows/GIT.md](workflows/GIT.md) before committing

## Sections

| Section                        | Covers                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [architecture](architecture)   | Browser-first architecture, CSR SPA rules, state management, folder structure                                             |
| [frontend](frontend)           | React/TypeScript conventions, component patterns, routing                                                                 |
| [design](design)               | Design tokens, typography, spacing, component visual language                                                             |
| [components](components)       | Conventions for `src/components/ui` (shadcn-based primitives)                                                             |
| [content](content)             | Content/engine contracts - lessons, exercises, quizzes, playground                                                        |
| [seo](seo)                     | Metadata, structured data, crawlability for a CSR app                                                                     |
| [testing](testing)             | Unit, component, and e2e testing strategy                                                                                 |
| [performance](performance)     | Bundle size, Lighthouse targets, loading strategy                                                                         |
| [security](security)           | XSS, dependency, and (future) secrets handling                                                                            |
| [accessibility](accessibility) | WCAG AA baseline and per-component checklist                                                                              |
| [backend](backend)             | When a backend is allowed, and how it must be justified                                                                   |
| [cloudflare](cloudflare)       | Deployment target once one exists (Pages/Workers) - currently empty                                                       |
| [workflows](workflows)         | Day-to-day dev workflow, git conventions, branching, PRs, releases                                                        |
| [templates](templates)         | Copy-paste templates: ADR, lesson/exercise/quiz, GitHub issue/PR                                                          |
| [decisions](decisions)         | Architecture Decision Records (ADRs) - the log of why                                                                     |
| [mcp](mcp)                     | When and how to use each MCP server (Context7, shadcn, Filesystem, Chrome DevTools, Sequential Thinking, Parallel Search) |
| [reference](reference)         | Quick lookups: scripts, env vars, glossary                                                                                |
| [guides](guides)               | Longer how-tos that don't fit a single section above                                                                      |

## How documentation stays honest

- [CLAUDE.md](../CLAUDE.md) is the concise entry point; it links here instead of duplicating.
- Every `src/*` folder has its own `OVERVIEW.md` describing that folder's responsibility - read those before adding files to a folder.
- Architecture-affecting changes (new dependency, new top-level folder, anything that touches the browser-first rule) get an ADR in [decisions](decisions) before they land.
- See the Documentation Maintenance Policy in [CLAUDE.md](../CLAUDE.md) for exactly which doc to update when something changes.
