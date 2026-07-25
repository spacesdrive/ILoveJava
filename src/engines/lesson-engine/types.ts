import type { ContentMeta } from '@/content/types'
import type { ExerciseContent } from '@/engines/exercise-engine/types'
import type { QuizContent } from '@/engines/quiz-engine/types'

export type CalloutVariant =
  | 'note'
  | 'warning'
  | 'tip'
  | 'example'
  | 'mistake'
  | 'best-practice'
  | 'performance'
  | 'history'
  | 'insight'

export interface StepItem {
  title: string
  markdown: string
}

export interface FlashcardItem {
  front: string
  back: string
}

export interface FurtherReadingLink {
  label: string
  href: string
}

export type LessonBlock =
  | { type: 'prose'; markdown: string }
  | { type: 'code'; language: string; code: string; highlightLines?: number[] }
  | { type: 'callout'; variant: CalloutVariant; markdown: string }
  | { type: 'visualization'; component: string; props?: Record<string, unknown> }
  | { type: 'check'; questionSlug: string }
  | { type: 'comparison-table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'expandable'; title: string; markdown: string }
  | {
      type: 'steps'
      heading?: string
      variant?: 'list' | 'timeline'
      steps: StepItem[]
    }
  | { type: 'flashcards'; heading?: string; cards: FlashcardItem[] }
  | { type: 'summary'; takeaways: string[]; furtherReading?: FurtherReadingLink[] }
  | { type: 'quiz'; quiz: QuizContent }
  | { type: 'exercise'; exercise: ExerciseContent }

export interface LessonContent extends ContentMeta {
  blocks: LessonBlock[]
  /** Slugs of lessons that must be completed first. */
  prerequisites: string[]
  estimatedMinutes: number
}
