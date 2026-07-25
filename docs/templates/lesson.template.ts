// Template for a LessonContent entry. Copy, fill in, delete this comment block.
// Do not add real lessons until a learning path has been designed - see ROADMAP.md.
import type { LessonContent } from '@/engines/lesson-engine/types'

export const lesson: LessonContent = {
  slug: 'replace-with-permanent-slug',
  title: 'Sentence case title, no trailing punctuation',
  description: 'One sentence, unique, written for both humans and SEO.',
  difficulty: 'beginner',
  tags: [],
  updatedAt: '2026-01-01',
  prerequisites: [],
  estimatedMinutes: 5,
  blocks: [
    { type: 'prose', markdown: 'Explain the *why*, not just the *what*.' },
    { type: 'code', language: 'java', code: 'System.out.println("Hello, world!");' },
  ],
}
