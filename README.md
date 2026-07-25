# ILoveJava

A free, open source, interactive platform for learning Java - lessons, exercises, playgrounds, quizzes, projects, and interview prep, built to run entirely in your browser.

**Status:** engineering foundation. No lessons or Java content yet - see [ROADMAP.md](ROADMAP.md).

## Why browser-first

ILoveJava executes locally whenever possible: no account, no server round-trip to read a lesson, works offline once cached. The one open question is Java code execution, which has no mainstream in-browser runtime - see [src/engines/playground-engine](src/engines/playground-engine) and [docs/decisions](docs/decisions). Everything else - progress, settings, search - is designed to work without a backend. Full rationale in [docs/architecture](docs/architecture).

## Tech stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS v4 · shadcn/ui · Framer Motion · Vitest · Playwright · pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

| Command             | Purpose                             |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start the dev server                |
| `pnpm build`        | Type-check and build for production |
| `pnpm preview`      | Preview the production build        |
| `pnpm typecheck`    | Type-check without emitting         |
| `pnpm lint`         | Lint with ESLint                    |
| `pnpm lint:fix`     | Lint and auto-fix                   |
| `pnpm format`       | Format with Prettier                |
| `pnpm format:check` | Check formatting without writing    |
| `pnpm test`         | Run unit/component tests (Vitest)   |
| `pnpm test:watch`   | Run unit tests in watch mode        |
| `pnpm test:e2e`     | Run end-to-end tests (Playwright)   |

## Documentation

Start at [docs/index.md](docs/index.md). [CLAUDE.md](CLAUDE.md) is the entry point for AI-assisted work in this repo.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please also read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
