# features/quizzes

Renders `QuizContent` (`src/engines/quiz-engine`) one question at a time and scores attempts.

- `components/quiz-renderer.tsx` - handles all three `QuizQuestion` variants (`mcq` via `radio-group`, `true-false` via two radio options, `fill-in` via case-insensitive/trimmed match against `acceptedAnswers`). Shows the question's `explanation` after the learner checks their answer, then a final pass/fail summary scored against `passThreshold`. Calls `onComplete` exactly once, with a `QuizAttempt`.
- `hooks/use-quiz-progress.ts` - thin wrapper around `src/hooks/use-progress.ts`, scoped to one quiz slug.

No real quiz content exists yet (see [ROADMAP.md](../../../ROADMAP.md) Phase 2) - tests use fixture `QuizContent` objects.
