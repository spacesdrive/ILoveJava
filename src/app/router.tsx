import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { PageLoadingFallback } from '@/components/layout/page-loading-fallback'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

const LearningPathPage = React.lazy(() =>
  import('@/pages/learning-path-page').then((m) => ({ default: m.LearningPathPage })),
)
const LessonPage = React.lazy(() =>
  import('@/pages/lesson-page').then((m) => ({ default: m.LessonPage })),
)

function withSuspense(element: React.ReactNode) {
  return <React.Suspense fallback={<PageLoadingFallback />}>{element}</React.Suspense>
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'learn/java-fundamentals', element: withSuspense(<LearningPathPage />) },
      {
        path: 'learn/java-fundamentals/:lessonSlug',
        element: withSuspense(<LessonPage />),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
