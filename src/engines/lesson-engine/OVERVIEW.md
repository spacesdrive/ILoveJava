# lesson-engine

Renders `LessonContent` (see `types.ts`): an ordered list of typed blocks rather than a single markdown blob, so lessons can mix explanation, code, tables, and interactive elements without ad hoc per-lesson components. Rendered by [`src/features/lessons`](../../features/lessons).

## Block types

- `prose` - markdown (via `react-markdown`, never raw HTML - see [docs/security](../../../docs/security)).
- `code` - syntax-highlighted (Shiki), optional `highlightLines`.
- `callout` - one of `note`/`warning`/`tip`/`example`/`mistake`/`best-practice`/`performance`/`history`/`insight`. One mechanism (icon + label per variant) covers real-world motivation, common mistakes, best practices, performance notes, tips, industry insight, and history - not a separate block type per label.
- `comparison-table` - a simple headers/rows table (e.g. primitive type ranges, IDE comparisons).
- `expandable` - a single collapsible section (wraps the shared `Accordion` primitive) for optional deeper-dive content.
- `steps` - an ordered sequence (`variant: 'list' | 'timeline'`) for procedural or historical content.
- `flashcards` - front/back term cards for reviewing key vocabulary.
- `quiz` - embeds a full `QuizContent`, rendered inline via the existing `QuizRenderer` (`src/features/quizzes`) - not a second quiz UI.
- `exercise` - embeds a full `ExerciseContent`, rendered inline via the existing `ExerciseRunner` (`src/features/exercises`), which compiles and runs real Java code via `wasmJvmRunner` - see [ADR 0003](../../../docs/decisions/0003-java-code-execution-strategy.md).
- `summary` - key takeaways plus optional further-reading links, for the end of a lesson.
- `visualization` - resolves against the diagram registry in `src/features/lessons/components/diagrams`.
- `check` - defined but unused by current content; a lightweight alternative to a full `quiz` block, kept for future lessons that want a single inline question without a full `QuizContent`.

Prerequisite gating (blocking navigation into a lesson whose prerequisites aren't complete) is not implemented - `prerequisites` is currently informational only, surfaced by `LessonHero`.
