# Content system

The content system is an engine, not a content library — it must support thousands of future lessons/exercises/quizzes without becoming unmaintainable. See the type contracts:

- [`src/content/types.ts`](../../src/content/types.ts) — `ContentMeta`, the base every content type extends (slug, title, description, difficulty, tags, path, updatedAt)
- [`src/engines/lesson-engine`](../../src/engines/lesson-engine) — `LessonContent`, block-based (prose/code/callout/visualization/check)
- [`src/engines/exercise-engine`](../../src/engines/exercise-engine) — `ExerciseContent`, prompt + starter/solution code + test cases
- [`src/engines/quiz-engine`](../../src/engines/quiz-engine) — `QuizContent`, MCQ/true-false/fill-in questions
- [`src/engines/playground-engine`](../../src/engines/playground-engine) — the Java execution contract (open question, see [../decisions](../decisions))

None of these are implemented yet — only the shapes exist. Rendering components, authoring format (hand-written TS modules vs. MDX vs. JSON), and storage/indexing are all decided when the first real feature is built, not before.

## Writing standards (for when content is added)

- **Slugs** are permanent — never renumber or reuse one. Renaming a lesson doesn't change its slug.
- **Difficulty** (`beginner`/`intermediate`/`advanced`) is judged by prerequisite knowledge required, not lesson length.
- **Titles** are sentence case, no trailing punctuation, no clickbait ("Learn loops" not "You won't believe what loops can do!").
- **Descriptions** are one sentence, written for both humans (search results, cards) and SEO — see [../seo](../seo).
- **Code examples** must compile and run as written — no pseudo-Java. If a snippet is intentionally incomplete, say so in a callout.
- **Explanations** teach the _why_, not just the _what_ — the same bar as code comments in this repo (see [CLAUDE.md](../../CLAUDE.md)).
