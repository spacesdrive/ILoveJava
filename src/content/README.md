# content/

The content layer: shared metadata contracts (`types.ts`) and, eventually, loading/indexing utilities (client-side search, tag/category lookups, learning-path resolution) that every content engine builds on.

This is not where lesson/exercise/quiz _content_ lives — that comes later, once the engines in `src/engines` are designed and the user provides topics. See the root instruction: lessons are added only after the foundation exists.

Responsibilities:

- Define `ContentMeta`, the base shape every content type extends.
- Provide content-agnostic utilities: search indexing, tag lookup, difficulty/path filtering.
- Stay framework-agnostic — no React here.
