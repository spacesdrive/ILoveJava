import { BookOpen, SquareCode, Terminal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { useReveal } from './use-reveal'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    icon: BookOpen,
    title: 'Read',
    description:
      'Work through a lesson at your own pace, with diagrams and real code examples.',
  },
  {
    icon: SquareCode,
    title: 'Practice',
    description:
      'Answer knowledge checks and review flashcards for the terms that matter.',
  },
  {
    icon: Terminal,
    title: 'Run',
    description:
      'Write real Java in the browser editor and watch it actually compile and execute.',
  },
]

function StepItem({ step, index }: { step: Step; index: number }) {
  const { ref, isVisible } = useReveal<HTMLLIElement>()

  return (
    <li
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={cn(
        'flex flex-col items-center gap-3 text-center transition-all duration-300 motion-safe:translate-y-4 motion-safe:opacity-0',
        isVisible && 'motion-safe:translate-y-0 motion-safe:opacity-100',
      )}
    >
      <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-full text-sm font-semibold">
        {index + 1}
      </div>
      <step.icon
        className="text-primary size-6"
        aria-hidden="true"
        strokeWidth={1.75}
      />
      <h3 className="font-medium">{step.title}</h3>
      <p className="text-muted-foreground max-w-xs text-sm">{step.description}</p>
    </li>
  )
}

export function HowItWorks() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">How a lesson works</h2>
          <p className="text-muted-foreground mt-3">
            Every lesson in Java Fundamentals follows the same three steps.
          </p>
        </div>

        <ol className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <StepItem key={step.title} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  )
}
