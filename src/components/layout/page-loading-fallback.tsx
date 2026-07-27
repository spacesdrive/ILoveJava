import { Skeleton } from '@/components/ui/skeleton'

/** Suspense fallback for lazy-loaded routes (see src/app/router.tsx). */
export function PageLoadingFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div
        className="flex max-w-3xl flex-col gap-4"
        role="status"
        aria-label="Loading page"
      >
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    </div>
  )
}
