import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  { label: 'Source code', file: 'Main.java' },
  { label: 'Compiler', file: 'javac' },
  { label: 'Bytecode', file: 'Main.class' },
  { label: 'JVM', file: 'java' },
  { label: 'Output', file: 'Program runs' },
]

export function JavaExecutionFlowDiagram() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <figure className="flex flex-col gap-3">
      <div
        className="bg-card flex flex-wrap items-center justify-center gap-2 rounded-lg border p-6"
        aria-hidden="true"
      >
        {STEPS.map((step, index) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              className="bg-background flex flex-col items-center gap-1 rounded-md border px-4 py-3 text-center"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <span className="text-sm font-medium">{step.label}</span>
              <span className="text-muted-foreground font-mono text-xs">
                {step.file}
              </span>
            </motion.div>
            {index < STEPS.length - 1 && (
              <ArrowRight className="text-muted-foreground size-4 shrink-0" />
            )}
          </div>
        ))}
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        Source code (Main.java) is compiled by javac into bytecode (Main.class), which
        the JVM then runs to produce the program&rsquo;s output.
      </figcaption>
    </figure>
  )
}
