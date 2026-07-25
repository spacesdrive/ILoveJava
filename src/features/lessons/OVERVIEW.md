# features/lessons

Renders `LessonContent` (`src/engines/lesson-engine`) and tracks per-lesson completion. Owns the real content for the Java Fundamentals path.

## Rendering

- `components/lesson-renderer.tsx` - maps each `LessonBlock` to a sub-renderer. `prose`/`callout` go through `react-markdown` + `remark-gfm` (never raw HTML - see [docs/security](../../../docs/security)); `code` goes through `components/lesson-code-block.tsx` (fine-grained Shiki bundle - see `components/lesson-code-highlighter.ts` and [ADR 0004](../../../docs/decisions/0004-phase-1-content-engine-dependencies.md)); `comparison-table`, `expandable`, `steps`, `flashcards`, and `summary` each have their own small component; `visualization` resolves against `components/diagrams`.
- `quiz` and `exercise` blocks are **not** rendered directly here - `LessonRenderer` accepts `renderQuizBlock`/`renderExerciseBlock` props and falls back to an honest "not available" notice if they're omitted. This is deliberate: rendering a `QuizContent`/`ExerciseContent` means importing `src/features/quizzes`/`src/features/exercises`, and features must not depend on each other directly (see [`src/features/OVERVIEW.md`](../OVERVIEW.md)). `src/pages/lesson-page.tsx` supplies both, since composing across features is a page's job, not a feature's.
- `components/diagrams/` - one small SVG/Tailwind/Framer-Motion component per concept (`java-execution-flow`, `jdk-jre-jvm`, `program-structure-anatomy`, `variable-memory-box`, `control-flow-if-else`), registered in `diagrams/index.ts`. A `visualization` block referencing an unregistered id still renders the old honest placeholder, not a broken import.
- `components/lesson-hero.tsx`, `lesson-navigation.tsx`, `lesson-completion.tsx` - the page-level chrome around a lesson's blocks (title/difficulty/prerequisites, previous/next, the completion screen). Composed by `lesson-page.tsx`, not by `LessonRenderer`.
- `components/glossary-term.tsx` - an inline hover/focus term definition (wraps the shared `Tooltip` primitive). Not currently used inside lesson prose, since `react-markdown` doesn't render custom components inline without a `components` override - available for future use.
- `components/flashcards.tsx` - flip-card review UI, keyboard-operable (a native `<button>`, flips on click or Enter/Space), respects `prefers-reduced-motion`.
- `hooks/use-lesson-progress.ts` - thin wrapper around the shared `useProgress` hook (`src/hooks/use-progress.ts`), scoped to one lesson slug.

## Content

- `content/java-fundamentals/` - the ten Java Fundamentals lessons, one `LessonContent` module per file, plus `index.ts` exporting the ordered `javaFundamentalsLessons` array and `getLessonSitemapEntries()`. See [docs/content/OVERVIEW.md](../../../docs/content/OVERVIEW.md) for how a new lesson gets added and how it reaches the sitemap.
- Pure data, no JSX - safe to import from build tooling (`vite-sitemap-plugin.ts`) as well as app code.

## Testing

Component tests use fixture data inline in the test file, except `src/pages/__tests__/lesson-page.test.tsx` and `learning-path-page.test.tsx`, which render against the real `javaFundamentalsLessons` content - the only place real lesson content is asserted against directly, so a content edit that breaks rendering fails a test close to the content itself.
