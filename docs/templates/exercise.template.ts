// Template for an ExerciseContent entry. Copy, fill in, delete this comment block.
import type { ExerciseContent } from '@/engines/exercise-engine/types'

export const exercise: ExerciseContent = {
  slug: 'replace-with-permanent-slug',
  title: 'Sentence case title, no trailing punctuation',
  description: 'One sentence, unique, written for both humans and SEO.',
  difficulty: 'beginner',
  tags: [],
  updatedAt: '2026-01-01',
  prompt: 'What the learner needs to implement, in plain language.',
  starterCode: '// starter code',
  solutionCode: '// reference solution',
  testCases: [
    {
      id: 'case-1',
      description: 'What this case checks.',
      input: '',
      expectedOutput: '',
    },
  ],
  hints: [],
}
