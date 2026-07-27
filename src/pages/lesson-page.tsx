import { useParams } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Seo } from '@/components/seo/seo'
import { SITE_URL } from '@/constants/site'
import type { ExerciseContent } from '@/engines/exercise-engine/types'
import { wasmJvmRunner } from '@/engines/playground-engine/wasm-jvm/wasm-jvm-runner'
import type { QuizContent } from '@/engines/quiz-engine/types'
import { useExerciseProgress, ExerciseRunner } from '@/features/exercises'
import {
  JAVA_FUNDAMENTALS_PATH_SLUG,
  JAVA_FUNDAMENTALS_PATH_TITLE,
  LessonCompletion,
  LessonHero,
  LessonNavigation,
  LessonRenderer,
  javaFundamentalsLessons,
  useLessonProgress,
} from '@/features/lessons'
import { QuizRenderer, useQuizProgress } from '@/features/quizzes'

import { NotFoundPage } from './not-found-page'

function lessonHref(slug: string) {
  return `/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}/${slug}`
}

function LessonQuizBlock({ quiz }: { quiz: QuizContent }) {
  const { recordAttempt } = useQuizProgress(quiz.slug)
  return <QuizRenderer quiz={quiz} onComplete={recordAttempt} />
}

function LessonExerciseBlock({ exercise }: { exercise: ExerciseContent }) {
  const { recordResult } = useExerciseProgress(exercise.slug)
  return (
    <ExerciseRunner
      exercise={exercise}
      runner={wasmJvmRunner}
      onRunComplete={recordResult}
    />
  )
}

export function LessonPage() {
  const { lessonSlug } = useParams<{ lessonSlug: string }>()
  const index = javaFundamentalsLessons.findIndex(
    (lesson) => lesson.slug === lessonSlug,
  )
  const lesson = javaFundamentalsLessons[index] as
    (typeof javaFundamentalsLessons)[number] | undefined

  // Hooks must run unconditionally on every render, so useLessonProgress is called
  // before the not-found branch below, using a fallback slug when there's no lesson.
  const { isComplete, markComplete } = useLessonProgress(lesson?.slug ?? '')

  if (!lesson) {
    return <NotFoundPage />
  }

  const previousLesson = javaFundamentalsLessons[index - 1]
  const nextLesson = javaFundamentalsLessons[index + 1]

  const prerequisites = lesson.prerequisites
    .map((slug) => javaFundamentalsLessons.find((candidate) => candidate.slug === slug))
    .filter((candidate) => candidate !== undefined)
    .map((candidate) => ({
      slug: candidate.slug,
      title: candidate.title,
      href: lessonHref(candidate.slug),
    }))

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10">
      <Seo
        title={lesson.title}
        description={lesson.description}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: lesson.title,
          description: lesson.description,
          educationalLevel: lesson.difficulty,
          timeRequired: `PT${lesson.estimatedMinutes}M`,
          isPartOf: {
            '@type': 'Course',
            name: JAVA_FUNDAMENTALS_PATH_TITLE,
            url: `${SITE_URL}/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}`,
          },
          url: `${SITE_URL}${lessonHref(lesson.slug)}`,
        }}
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}`}>
              {JAVA_FUNDAMENTALS_PATH_TITLE}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <LessonHero
        title={lesson.title}
        description={lesson.description}
        difficulty={lesson.difficulty}
        estimatedMinutes={lesson.estimatedMinutes}
        pathTitle={JAVA_FUNDAMENTALS_PATH_TITLE}
        pathHref={`/learn/${JAVA_FUNDAMENTALS_PATH_SLUG}`}
        lessonNumber={index + 1}
        lessonCount={javaFundamentalsLessons.length}
        prerequisites={prerequisites}
      />

      <LessonRenderer
        lesson={lesson}
        renderQuizBlock={(quiz, key) => <LessonQuizBlock key={key} quiz={quiz} />}
        renderExerciseBlock={(exercise, key) => (
          <LessonExerciseBlock key={key} exercise={exercise} />
        )}
      />

      <LessonCompletion
        isComplete={isComplete}
        onMarkComplete={markComplete}
        next={
          nextLesson
            ? { title: nextLesson.title, href: lessonHref(nextLesson.slug) }
            : undefined
        }
      />

      <LessonNavigation
        previous={
          previousLesson
            ? { title: previousLesson.title, href: lessonHref(previousLesson.slug) }
            : undefined
        }
        next={
          nextLesson
            ? { title: nextLesson.title, href: lessonHref(nextLesson.slug) }
            : undefined
        }
      />
    </div>
  )
}
