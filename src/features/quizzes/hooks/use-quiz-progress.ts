import { useProgress } from '@/hooks/use-progress'

import type { QuizAttempt } from '../types'

/** Scopes the shared progress hook to a single quiz. */
export function useQuizProgress(slug: string) {
  const { isLoaded, isComplete, getRecord, recordQuizAttempt } = useProgress()

  return {
    isLoaded,
    isComplete: isComplete(slug),
    lastAttempt: getRecord(slug)?.data as QuizAttempt | undefined,
    recordAttempt: (attempt: QuizAttempt) => recordQuizAttempt(attempt),
  }
}
