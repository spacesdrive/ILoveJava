// Template for a LessonContent entry. Copy, fill in, delete this comment block.
// See src/features/lessons/content/java-fundamentals/ for real examples of every
// block type in use, and src/engines/lesson-engine/OVERVIEW.md for the full list.
import type { LessonContent } from '@/engines/lesson-engine/types'

export const lesson: LessonContent = {
  slug: 'replace-with-permanent-slug',
  title: 'Sentence case title, no trailing punctuation',
  description: 'One sentence, unique, written for both humans and SEO.',
  difficulty: 'beginner',
  tags: [],
  pathSlug: 'replace-with-the-learning-path-slug',
  updatedAt: '2026-01-01',
  prerequisites: [],
  estimatedMinutes: 5,
  blocks: [
    { type: 'prose', markdown: 'Explain the *why*, not just the *what*.' },
    { type: 'code', language: 'java', code: 'System.out.println("Hello, world!");' },
    {
      type: 'callout',
      variant: 'tip',
      markdown:
        'note/warning/tip/example/mistake/best-practice/performance/history/insight',
    },
    { type: 'comparison-table', headers: ['A', 'B'], rows: [['1', '2']] },
    { type: 'expandable', title: 'An optional deeper dive', markdown: '...' },
    { type: 'steps', steps: [{ title: 'First', markdown: '...' }] },
    { type: 'flashcards', cards: [{ front: 'Term', back: 'Definition' }] },
    {
      type: 'quiz',
      quiz: {
        slug: 'replace-with-a-quiz-slug',
        title: 'Quick check: ...',
        description: '...',
        difficulty: 'beginner',
        tags: [],
        updatedAt: '2026-01-01',
        passThreshold: 0.7,
        questions: [],
      },
    },
    {
      type: 'summary',
      takeaways: ['...'],
      furtherReading: [{ label: '...', href: 'https://...' }],
    },
  ],
}
