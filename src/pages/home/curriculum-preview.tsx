import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Titles only, not the full LessonContent array - importing that here would pull
// lesson/exercise/quiz content into the eagerly-loaded home bundle. See
// docs/performance/OVERVIEW.md on keeping the home route's bundle minimal.
const LESSON_TITLES = [
  'What is Java?',
  'How Java Works',
  'Installing Java',
  'Your First Java Program',
  'Java Program Structure',
  'Variables',
  'Data Types',
  'Operators',
  'Input and Output',
  'Control Flow',
]

export function CurriculumPreview() {
  return (
    <section className="bg-muted/40 border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Start with Java Fundamentals
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
          Ten lessons covering everything a complete beginner needs before writing real
          programs.
        </p>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {LESSON_TITLES.map((title) => (
            <li key={title}>
              <Badge variant="outline" className="bg-background">
                {title}
              </Badge>
            </li>
          ))}
        </ul>

        <Button asChild variant="link" className="mt-6">
          <Link to="/learn/java-fundamentals">
            View the full curriculum
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
