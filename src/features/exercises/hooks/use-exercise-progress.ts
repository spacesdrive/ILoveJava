import { useProgress } from '@/hooks/use-progress'

import type { ExerciseRunResult } from '../types'

/** Scopes the shared progress hook to a single exercise. */
export function useExerciseProgress(slug: string) {
  const { isLoaded, isComplete, getRecord, recordExerciseResult } = useProgress()

  return {
    isLoaded,
    isComplete: isComplete(slug),
    lastResult: getRecord(slug)?.data as ExerciseRunResult | undefined,
    recordResult: (result: ExerciseRunResult) => recordExerciseResult(slug, result),
  }
}
