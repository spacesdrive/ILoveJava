import type { ContentMeta } from '@/content/types'

export type LessonBlock =
  | { type: 'prose'; markdown: string }
  | { type: 'code'; language: string; code: string; highlightLines?: number[] }
  | { type: 'callout'; variant: 'note' | 'warning' | 'tip'; markdown: string }
  | { type: 'visualization'; component: string; props?: Record<string, unknown> }
  | { type: 'check'; questionSlug: string }

export interface LessonContent extends ContentMeta {
  blocks: LessonBlock[]
  /** Slugs of lessons that must be completed first. */
  prerequisites: string[]
  estimatedMinutes: number
}
