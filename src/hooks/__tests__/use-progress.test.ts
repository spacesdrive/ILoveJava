import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useProgress } from '@/hooks/use-progress'

// Tests share one fake IndexedDB instance for the file (module-level connection cache
// in src/lib/idb.ts) - each test uses a distinct slug so results can't collide.
describe('useProgress', () => {
  it('starts empty and reports nothing complete until loaded', async () => {
    const { result } = renderHook(() => useProgress())

    await waitFor(() => expect(result.current.isLoaded).toBe(true))

    expect(result.current.isComplete('never-recorded-slug')).toBe(false)
  })

  it('marks a lesson complete and persists it across hook instances', async () => {
    const { result } = renderHook(() => useProgress())
    await waitFor(() => expect(result.current.isLoaded).toBe(true))

    await act(async () => {
      await result.current.markLessonComplete('loops-basics')
    })

    expect(result.current.isComplete('loops-basics')).toBe(true)

    const { result: second } = renderHook(() => useProgress())
    await waitFor(() => expect(second.current.isLoaded).toBe(true))
    expect(second.current.isComplete('loops-basics')).toBe(true)
  })

  it('records a quiz attempt with its score', async () => {
    const { result } = renderHook(() => useProgress())
    await waitFor(() => expect(result.current.isLoaded).toBe(true))

    await act(async () => {
      await result.current.recordQuizAttempt({
        quizSlug: 'loops-quiz',
        answers: { q1: 0 },
        score: 1,
        completedAt: new Date().toISOString(),
      })
    })

    expect(result.current.getRecord('loops-quiz')?.data?.score).toBe(1)
  })
})
