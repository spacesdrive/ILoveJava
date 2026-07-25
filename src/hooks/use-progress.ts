import * as React from 'react'

import type { ExerciseRunResult } from '@/engines/exercise-engine/types'
import type { QuizAttempt } from '@/engines/quiz-engine/types'
import {
  getAllProgressRecords,
  isIndexedDBAvailable,
  putProgressRecord,
  type ProgressRecord,
} from '@/lib/idb'

/**
 * Shared progress-persistence hook (used by the lessons, exercises, and quizzes
 * features). Backed by IndexedDB via src/lib/idb.ts; degrades to a read-only,
 * always-incomplete state when indexedDB isn't available, per src/hooks/OVERVIEW.md.
 */
export function useProgress() {
  const [records, setRecords] = React.useState<Map<string, ProgressRecord>>(new Map())
  const available = isIndexedDBAvailable()
  const [isLoaded, setIsLoaded] = React.useState(() => !available)

  React.useEffect(() => {
    if (!available) return

    let cancelled = false
    getAllProgressRecords()
      .then((all) => {
        if (cancelled) return
        setRecords(new Map(all.map((record) => [record.slug, record])))
        setIsLoaded(true)
      })
      .catch(() => {
        if (!cancelled) setIsLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [available])

  const persist = React.useCallback(
    async (record: ProgressRecord) => {
      setRecords((prev) => new Map(prev).set(record.slug, record))
      if (!available) return
      await putProgressRecord(record)
    },
    [available],
  )

  const markLessonComplete = React.useCallback(
    (slug: string) =>
      persist({ slug, kind: 'lesson', completedAt: new Date().toISOString() }),
    [persist],
  )

  const recordExerciseResult = React.useCallback(
    (slug: string, result: ExerciseRunResult) =>
      persist({
        slug,
        kind: 'exercise',
        completedAt: new Date().toISOString(),
        data: { ...result },
      }),
    [persist],
  )

  const recordQuizAttempt = React.useCallback(
    (attempt: QuizAttempt) =>
      persist({
        slug: attempt.quizSlug,
        kind: 'quiz',
        completedAt: attempt.completedAt,
        data: { ...attempt },
      }),
    [persist],
  )

  const getRecord = React.useCallback((slug: string) => records.get(slug), [records])
  const isComplete = React.useCallback((slug: string) => records.has(slug), [records])

  return {
    isLoaded,
    isAvailable: available,
    getRecord,
    isComplete,
    markLessonComplete,
    recordExerciseResult,
    recordQuizAttempt,
  }
}
