// Template for a QuizContent entry. Copy, fill in, delete this comment block.
import type { QuizContent } from '@/engines/quiz-engine/types'

export const quiz: QuizContent = {
  slug: 'replace-with-permanent-slug',
  title: 'Sentence case title, no trailing punctuation',
  description: 'One sentence, unique, written for both humans and SEO.',
  difficulty: 'beginner',
  tags: [],
  updatedAt: '2026-01-01',
  passThreshold: 0.7,
  questions: [
    {
      type: 'mcq',
      id: 'q1',
      prompt: 'Question text.',
      choices: ['Option A', 'Option B', 'Option C'],
      correctChoiceIndex: 0,
      explanation: 'Why the correct answer is correct.',
    },
  ],
}
