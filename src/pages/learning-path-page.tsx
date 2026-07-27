import { CheckCircle2, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Seo } from '@/components/seo/seo'
import { SITE_URL } from '@/constants/site'
import type { Difficulty } from '@/content/types'
import {
  JAVA_FUNDAMENTALS_PATH_SLUG,
  JAVA_FUNDAMENTALS_PATH_TITLE,
  javaFundamentalsLessons,
} from '@/features/lessons'
import { useProgress } from '@/hooks/use-progress'

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const PATH_DESCRIPTION =
  'The ten foundational lessons every Java learner starts with: what Java is, how it runs, and the core syntax you need before writing real programs.'

export function LearningPathPage() {
  const { isComplete } = useProgress()
  const completedCount = javaFundamentalsLessons.filter((lesson) =>
    isComplete(lesson.slug),
  ).length

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex max-w-3xl flex-col gap-8">
        <Seo
          title={JAVA_FUNDAMENTALS_PATH_TITLE}
          description={PATH_DESCRIPTION}
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: JAVA_FUNDAMENTALS_PATH_TITLE,
            description: PATH_DESCRIPTION,
            url: `${SITE_URL}/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}`,
            hasCourseInstance: javaFundamentalsLessons.map((lesson) => ({
              '@type': 'CourseInstance',
              name: lesson.title,
              url: `${SITE_URL}/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}/${lesson.slug}`,
            })),
          }}
        />

        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {JAVA_FUNDAMENTALS_PATH_TITLE}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{PATH_DESCRIPTION}</p>
          <p className="text-muted-foreground text-sm">
            {completedCount} of {javaFundamentalsLessons.length} lessons complete
          </p>
        </header>

        <ol className="flex flex-col gap-4">
          {javaFundamentalsLessons.map((lesson, index) => {
            const complete = isComplete(lesson.slug)
            return (
              <li key={lesson.slug}>
                <Link to={`/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}/${lesson.slug}`}>
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        {lesson.title}
                        {complete && (
                          <CheckCircle2
                            className="text-primary size-4"
                            aria-label="Complete"
                          />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-3">
                      <p className="text-muted-foreground flex-1 text-sm">
                        {lesson.description}
                      </p>
                      <Badge variant="secondary">
                        {DIFFICULTY_LABEL[lesson.difficulty]}
                      </Badge>
                      <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
                        <Clock className="size-4" aria-hidden="true" />
                        {lesson.estimatedMinutes} min
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
