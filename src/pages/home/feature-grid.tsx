import { Cpu, GitBranch, GraduationCap, Laptop } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { useReveal } from './use-reveal'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Cpu,
    title: 'Real Java, real output',
    description:
      'Exercises compile and run actual Java code in your browser through a WebAssembly JVM, not a simulation.',
  },
  {
    icon: Laptop,
    title: 'Nothing to install',
    description:
      'No JDK, no IDE, no setup. Everything runs in the browser you already have open.',
  },
  {
    icon: GraduationCap,
    title: 'Built for complete beginners',
    description:
      'Java Fundamentals starts from what a program even is and builds up to control flow, one concept at a time.',
  },
  {
    icon: GitBranch,
    title: 'Free and open source',
    description:
      'MIT licensed, no paywalls, no account required. The full source is on GitHub.',
  },
]

function FeatureCard({ feature, delayMs }: { feature: Feature; delayMs: number }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        'transition-all duration-300 motion-safe:translate-y-4 motion-safe:opacity-0',
        isVisible && 'motion-safe:translate-y-0 motion-safe:opacity-100',
      )}
    >
      <Card className="h-full">
        <CardHeader>
          <feature.icon
            className="text-primary size-6"
            aria-hidden="true"
            strokeWidth={1.75}
          />
          <CardTitle className="mt-3 text-base">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{feature.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function FeatureGrid() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Why ILoveJava</h2>
          <p className="text-muted-foreground mt-3">
            A learning platform built around one idea: you learn Java by running Java,
            not by reading about it.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} delayMs={index * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
