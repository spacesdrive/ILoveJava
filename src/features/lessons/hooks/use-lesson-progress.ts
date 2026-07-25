import { useProgress } from '@/hooks/use-progress'

/** Scopes the shared progress hook to a single lesson. */
export function useLessonProgress(slug: string) {
  const { isLoaded, isComplete, markLessonComplete } = useProgress()

  return {
    isLoaded,
    isComplete: isComplete(slug),
    markComplete: () => markLessonComplete(slug),
  }
}
