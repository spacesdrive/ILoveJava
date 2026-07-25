import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export interface LessonNavigationTarget {
  title: string
  href: string
}

export interface LessonNavigationProps {
  previous?: LessonNavigationTarget
  next?: LessonNavigationTarget
}

export function LessonNavigation({ previous, next }: LessonNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Lesson navigation"
      className="flex items-center justify-between gap-4 border-t pt-8"
    >
      {previous ? (
        <Button variant="outline" asChild>
          <Link to={previous.href}>
            <ArrowLeft aria-hidden="true" />
            {previous.title}
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild>
          <Link to={next.href}>
            {next.title}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  )
}
