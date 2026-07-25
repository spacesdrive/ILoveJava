# Content system

The content system is an engine, not a content library - it must support thousands of future lessons/exercises/quizzes without becoming unmaintainable. See the type contracts:

- [`src/content/types.ts`](../../src/content/types.ts) - `ContentMeta`, the base every content type extends (slug, title, description, difficulty, tags, path, updatedAt)
- [`src/engines/lesson-engine`](../../src/engines/lesson-engine) - `LessonContent`, block-based (prose/code/callout/visualization/check)
- [`src/engines/exercise-engine`](../../src/engines/exercise-engine) - `ExerciseContent`, prompt + starter/solution code + test cases
- [`src/engines/quiz-engine`](../../src/engines/quiz-engine) - `QuizContent`, MCQ/true-false/fill-in questions
- [`src/engines/playground-engine`](../../src/engines/playground-engine) - the Java execution contract (open question, see [../decisions](../decisions))

## Rendering (implemented) and progress persistence

`ROADMAP.md` Phase 1 added rendering components and IndexedDB-backed progress on top of these contracts:

- [`src/features/lessons`](../../src/features/lessons) - `LessonRenderer` renders `LessonBlock[]` (markdown prose/callouts, syntax-highlighted code; `visualization`/`check` blocks render an honest "not yet available" notice, not a fake one).
- [`src/features/exercises`](../../src/features/exercises) - `ExerciseRunner`, an editable code exercise UI. It accepts an optional `PlaygroundRunner`; none is wired up anywhere yet (see [ADR 0003](../decisions/0003-java-code-execution-strategy.md)), so running an exercise today reports execution as unavailable rather than faking a result.
- [`src/features/quizzes`](../../src/features/quizzes) - `QuizRenderer`, one question at a time, scored against `passThreshold`.
- [`src/hooks/use-progress.ts`](../../src/hooks/use-progress.ts) and [`src/lib/idb.ts`](../../src/lib/idb.ts) - shared IndexedDB-backed completion/attempt tracking used by all three features. New runtime dependencies this required (`react-markdown`, `shiki`, `idb`, `@uiw/react-codemirror`) are recorded in [ADR 0004](../decisions/0004-phase-1-content-engine-dependencies.md).

**No real lesson/exercise/quiz content exists yet.** Every test for the above uses fixture data defined inline in its test file. Authoring format (hand-written TS modules vs. MDX vs. JSON), storage/indexing of real content, and the routes/pages that serve it are still undecided - see `ROADMAP.md` Phase 2 ("topics provided by the project owner").

## Writing standards (for when content is added)

- **Slugs** are permanent - never renumber or reuse one. Renaming a lesson doesn't change its slug.
- **Difficulty** (`beginner`/`intermediate`/`advanced`) is judged by prerequisite knowledge required, not lesson length.
- **Titles** are sentence case, no trailing punctuation, no clickbait ("Learn loops" not "You won't believe what loops can do!").
- **Descriptions** are one sentence, written for both humans (search results, cards) and SEO - see [../seo](../seo).
- **Code examples** must compile and run as written - no pseudo-Java. If a snippet is intentionally incomplete, say so in a callout.
- **Explanations** teach the _why_, not just the _what_ - the same bar as code comments in this repo (see [CLAUDE.md](../../CLAUDE.md)).
