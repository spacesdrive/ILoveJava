import { motion, useReducedMotion } from 'framer-motion'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

export interface LessonStepItem {
  title: string
  markdown: string
}

export interface LessonStepsProps {
  heading?: string
  variant?: 'list' | 'timeline'
  steps: LessonStepItem[]
}

/** An ordered sequence, revealed on scroll (skipped entirely under prefers-reduced-motion). */
export function LessonSteps({ heading, variant = 'list', steps }: LessonStepsProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col gap-4">
      {heading && <h3 className="text-lg font-semibold">{heading}</h3>}
      <ol
        className={cn(
          'flex flex-col gap-6',
          variant === 'timeline' && 'border-border border-l-2 pl-6',
        )}
      >
        {steps.map((step, index) => (
          <motion.li
            key={index}
            className={cn(
              'relative',
              variant === 'timeline' &&
                "before:bg-primary before:absolute before:top-1.5 before:-left-[calc(1.5rem+5px)] before:size-2.5 before:rounded-full before:content-['']",
            )}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                {index + 1}.
              </span>
              <h4 className="font-medium">{step.title}</h4>
            </div>
            <div className="text-muted-foreground mt-1 text-sm leading-relaxed">
              <Markdown remarkPlugins={[remarkGfm]}>{step.markdown}</Markdown>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
