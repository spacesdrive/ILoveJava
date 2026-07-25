# Security Policy

## Reporting a vulnerability

If you find a security issue in ILoveJava, please email valzorx7@gmail.com instead of opening a public issue. Include:

- A description of the issue and its impact
- Steps to reproduce
- Affected version/commit

We'll acknowledge reports within a few days and keep you updated as the issue is investigated and fixed.

## Scope and posture

ILoveJava is a client-side application: as of this writing there is no backend, no user accounts, and no server-held user data. The primary risks in scope are:

- **XSS** - anywhere user- or lesson-authored content is rendered as HTML/markdown (code blocks, MDX-like lesson blocks). All such content must be sanitized before rendering.
- **Supply chain** - dependencies pulled into the client bundle. Keep dependencies minimal and audited (`pnpm audit`); avoid low-reputation or unmaintained packages.
- **Secrets** - none should ever exist in client code. If a backend is introduced later (see [docs/decisions](docs/decisions)), its secrets are deployment configuration, never committed to the repo.

## Supported versions

Pre-1.0: only the latest commit on `main` is supported.
