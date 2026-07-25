import { Clock, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import type { Difficulty } from '@/content/types'

export interface LessonHeroPrerequisite {
  slug: string
  title: string
  href: string
}

export interface LessonHeroProps {
  title: string
  description: string
  difficulty: Difficulty
  estimatedMinutes: number
  pathTitle: string
  pathHref: string
  lessonNumber: number
  lessonCount: number
  prerequisites: LessonHeroPrerequisite[]
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export function LessonHero({
  title,
  description,
  difficulty,
  estimatedMinutes,
  pathTitle,
  pathHref,
  lessonNumber,
  lessonCount,
  prerequisites,
}: LessonHeroProps) {
  return (
    <header className="flex flex-col gap-4 border-b pb-8">
      <p className="text-muted-foreground text-sm">
        Lesson {lessonNumber} of {lessonCount} in{' '}
        <Link to={pathHref} className="text-primary underline underline-offset-4">
          {pathTitle}
        </Link>
      </p>

      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{DIFFICULTY_LABEL[difficulty]}</Badge>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          <Clock className="size-4" aria-hidden="true" />
          {estimatedMinutes} min
        </span>
      </div>

      {prerequisites.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground inline-flex items-center gap-1.5">
            <GraduationCap className="size-4" aria-hidden="true" />
            Prerequisites:
          </span>
          {prerequisites.map((prerequisite) => (
            <Link
              key={prerequisite.slug}
              to={prerequisite.href}
              className="text-primary underline underline-offset-4"
            >
              {prerequisite.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
