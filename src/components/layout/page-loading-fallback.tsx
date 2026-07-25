import { Skeleton } from '@/components/ui/skeleton'

/** Suspense fallback for lazy-loaded routes (see src/app/router.tsx). */
export function PageLoadingFallback() {
  return (
    <div
      className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10"
      role="status"
      aria-label="Loading page"
    >
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="mt-6 h-40 w-full" />
    </div>
  )
}
