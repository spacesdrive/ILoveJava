# Content system

The content system is an engine, not a content library - it must support thousands of future lessons/exercises/quizzes without becoming unmaintainable. See the type contracts:

- [`src/content/types.ts`](../../src/content/types.ts) - `ContentMeta`, the base every content type extends (slug, title, description, difficulty, tags, path, updatedAt)
- [`src/engines/lesson-engine`](../../src/engines/lesson-engine) - `LessonContent`, block-based - see its `OVERVIEW.md` for the full list of block types
- [`src/engines/exercise-engine`](../../src/engines/exercise-engine) - `ExerciseContent`, prompt + starter/solution code + test cases
- [`src/engines/quiz-engine`](../../src/engines/quiz-engine) - `QuizContent`, MCQ/true-false/fill-in questions
- [`src/engines/playground-engine`](../../src/engines/playground-engine) - the Java execution contract (open question, see [../decisions](../decisions))

## Rendering and progress persistence

- [`src/features/lessons`](../../src/features/lessons) - `LessonRenderer` renders `LessonBlock[]`, delegating `quiz`/`exercise` blocks to the caller (see the feature's `OVERVIEW.md` for why - feature isolation). Visualizations resolve against a diagram registry (`src/features/lessons/components/diagrams`).
- [`src/features/exercises`](../../src/features/exercises) - `ExerciseRunner`, an editable code exercise UI. It accepts an optional `PlaygroundRunner`; none is wired up anywhere yet (see [ADR 0003](../decisions/0003-java-code-execution-strategy.md)), so running an exercise today reports execution as unavailable rather than faking a result.
- [`src/features/quizzes`](../../src/features/quizzes) - `QuizRenderer`, one question at a time, scored against `passThreshold`.
- [`src/hooks/use-progress.ts`](../../src/hooks/use-progress.ts) and [`src/lib/idb.ts`](../../src/lib/idb.ts) - shared IndexedDB-backed completion/attempt tracking used by all three features.

## Real content: the Java Fundamentals path

The first ten lessons exist, authored as plain TypeScript modules (not MDX or JSON - full type-checking against `LessonContent`, no new parser/build step):

- [`src/features/lessons/content/java-fundamentals/`](../../src/features/lessons/content/java-fundamentals) - one file per lesson, plus `index.ts` exporting the ordered `javaFundamentalsLessons` array (array order = prerequisite chain, previous/next navigation, and roadmap position) and `getLessonSitemapEntries()`.
- Served at `/learn/java-fundamentals` (path overview, [`src/pages/learning-path-page.tsx`](../../src/pages/learning-path-page.tsx)) and `/learn/java-fundamentals/<slug>` (a single lesson, [`src/pages/lesson-page.tsx`](../../src/pages/lesson-page.tsx)), matching the URL pattern in [../seo](../seo). Both routes are lazy-loaded.
- `lesson-page.tsx` is where `LessonRenderer` gets composed with `QuizRenderer`/`ExerciseRunner` - the one place allowed to import all three features, since pages (not features) compose across feature boundaries.

Adding an eleventh lesson: write a new `LessonContent` module (copy [`docs/templates/lesson.template.ts`](../templates/lesson.template.ts)), add it to `javaFundamentalsLessons` in the order it should appear, done - routing, navigation, progress tracking, and the sitemap all pick it up automatically.

## Writing standards

- **Slugs** are permanent - never renumber or reuse one. Renaming a lesson doesn't change its slug.
- **Difficulty** (`beginner`/`intermediate`/`advanced`) is judged by prerequisite knowledge required, not lesson length.
- **Titles** are sentence case, no trailing punctuation, no clickbait ("Learn loops" not "You won't believe what loops can do!").
- **Descriptions** are one sentence, written for both humans (search results, cards) and SEO - see [../seo](../seo).
- **Code examples** must compile and run as written - no pseudo-Java. If a snippet is intentionally incomplete, say so in a callout.
- **Explanations** teach the _why_, not just the _what_ - the same bar as code comments in this repo (see [CLAUDE.md](../../CLAUDE.md)).
