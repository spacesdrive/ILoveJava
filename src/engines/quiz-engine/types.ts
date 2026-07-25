import type { ContentMeta } from '@/content/types'

export type QuizQuestion =
  | {
      type: 'mcq'
      id: string
      prompt: string
      choices: string[]
      correctChoiceIndex: number
      explanation: string
    }
  | {
      type: 'true-false'
      id: string
      prompt: string
      correctAnswer: boolean
      explanation: string
    }
  | {
      type: 'fill-in'
      id: string
      prompt: string
      acceptedAnswers: string[]
      explanation: string
    }

export interface QuizContent extends ContentMeta {
  questions: QuizQuestion[]
  /** Fraction (0-1) of correct answers required to consider the quiz passed. */
  passThreshold: number
}

export interface QuizAttempt {
  quizSlug: string
  answers: Record<string, string | number | boolean>
  score: number
  completedAt: string
}
