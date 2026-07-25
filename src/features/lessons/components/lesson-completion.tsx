import { PartyPopper } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { LessonNavigationTarget } from './lesson-navigation'

export interface LessonCompletionProps {
  isComplete: boolean
  onMarkComplete: () => void
  next?: LessonNavigationTarget
}

export function LessonCompletion({
  isComplete,
  onMarkComplete,
  next,
}: LessonCompletionProps) {
  if (!isComplete) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            Finished reading through this lesson?
          </p>
          <Button onClick={onMarkComplete}>Mark lesson complete</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <PartyPopper className="text-primary size-8" aria-hidden="true" />
        <CardTitle>Lesson complete</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <Badge>Completed</Badge>
        {next && (
          <Button asChild>
            <Link to={next.href}>Continue to {next.title}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
