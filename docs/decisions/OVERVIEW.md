# Architecture Decision Records

A log of significant architecture decisions and why they were made - not a design doc, a record. Read [0001](0001-browser-first-csr-architecture.md) and [0002](0002-frontend-tech-stack.md) first; they're the foundation everything else builds on.

## When to write one

- Introducing a new core dependency (framework, state library, backend of any kind)
- Changing the folder structure at the `src/` root
- Anything that would contradict or narrow an existing ADR

## Index

| #                                              | Title                                            | Status   |
| ---------------------------------------------- | ------------------------------------------------ | -------- |
| [0001](0001-browser-first-csr-architecture.md) | Browser-first, client-side rendered architecture | accepted |
| [0002](0002-frontend-tech-stack.md)            | Frontend tech stack                              | accepted |
| [0003](0003-java-code-execution-strategy.md)   | Java code execution strategy                     | proposed |

New ADRs: copy [template.md](template.md), number sequentially, add a row above.
