import {
  BookOpen,
  Gauge,
  History,
  Info,
  Lightbulb,
  Sparkles,
  TriangleAlert,
  Wrench,
} from 'lucide-react'
import type { ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { ExerciseContent } from '@/engines/exercise-engine/types'
import type { QuizContent } from '@/engines/quiz-engine/types'
import { cn } from '@/lib/utils'

import type { CalloutVariant, LessonBlock, LessonContent } from '../types'
import { DIAGRAM_REGISTRY } from './diagrams'
import { Flashcards } from './flashcards'
import { LessonCodeBlock } from './lesson-code-block'
import { LessonComparisonTable } from './lesson-comparison-table'
import { LessonExpandable } from './lesson-expandable'
import { LessonSteps } from './lesson-steps'
import { LessonSummary } from './lesson-summary'

export interface LessonRendererProps {
  lesson: LessonContent
  /** Renders a `quiz` block. Omitted renders an honest "not available" notice - see src/features/OVERVIEW.md on feature isolation for why this isn't imported directly here. */
  renderQuizBlock?: (quiz: QuizContent, key: string) => ReactNode
  /** Renders an `exercise` block. Same reasoning as renderQuizBlock. */
  renderExerciseBlock?: (exercise: ExerciseContent, key: string) => ReactNode
}

const CALLOUT_ICON: Record<CalloutVariant, typeof Info> = {
  note: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
  example: Sparkles,
  mistake: TriangleAlert,
  'best-practice': Wrench,
  performance: Gauge,
  history: History,
  insight: BookOpen,
}

const CALLOUT_LABEL: Record<CalloutVariant, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  example: 'Real-world example',
  mistake: 'Common mistake',
  'best-practice': 'Best practice',
  performance: 'Performance note',
  history: 'History',
  insight: 'Industry insight',
}

const CALLOUT_DESTRUCTIVE: ReadonlySet<CalloutVariant> = new Set(['warning', 'mistake'])

function ProseMarkdown({ markdown }: { markdown: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 leading-relaxed',
        '[&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:text-xl [&_h2]:font-semibold',
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h3]:text-lg [&_h3]:font-semibold',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6',
        '[&_blockquote]:border-border [&_blockquote]:text-muted-foreground [&_blockquote]:border-l-2 [&_blockquote]:pl-4',
        '[&_code]:bg-code [&_code]:text-code-foreground [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm',
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  )
}

function LessonBlockRenderer({
  block,
  index,
  renderQuizBlock,
  renderExerciseBlock,
}: {
  block: LessonBlock
  index: number
  renderQuizBlock?: (quiz: QuizContent, key: string) => ReactNode
  renderExerciseBlock?: (exercise: ExerciseContent, key: string) => ReactNode
}) {
  switch (block.type) {
    case 'prose':
      return <ProseMarkdown markdown={block.markdown} />
    case 'code':
      return (
        <LessonCodeBlock
          language={block.language}
          code={block.code}
          highlightLines={block.highlightLines}
        />
      )
    case 'callout': {
      const Icon = CALLOUT_ICON[block.variant]
      return (
        <Alert
          variant={CALLOUT_DESTRUCTIVE.has(block.variant) ? 'destructive' : 'default'}
        >
          <Icon />
          <AlertTitle>{CALLOUT_LABEL[block.variant]}</AlertTitle>
          <AlertDescription>
            <Markdown remarkPlugins={[remarkGfm]}>{block.markdown}</Markdown>
          </AlertDescription>
        </Alert>
      )
    }
    case 'visualization': {
      const Diagram = DIAGRAM_REGISTRY[block.component]
      if (!Diagram) {
        return (
          <Alert>
            <AlertTitle>Visualization not yet available</AlertTitle>
            <AlertDescription>
              This lesson references the &ldquo;{block.component}&rdquo; visualization,
              which hasn&rsquo;t been built yet.
            </AlertDescription>
          </Alert>
        )
      }
      return <Diagram />
    }
    case 'check':
      return (
        <Alert>
          <AlertTitle>Check-in not yet available</AlertTitle>
          <AlertDescription>
            This lesson references a check question (&ldquo;{block.questionSlug}&rdquo;)
            that isn&rsquo;t wired up yet.
          </AlertDescription>
        </Alert>
      )
    case 'comparison-table':
      return (
        <LessonComparisonTable
          caption={block.caption}
          headers={block.headers}
          rows={block.rows}
        />
      )
    case 'expandable':
      return <LessonExpandable title={block.title} markdown={block.markdown} />
    case 'steps':
      return (
        <LessonSteps
          heading={block.heading}
          variant={block.variant}
          steps={block.steps}
        />
      )
    case 'flashcards':
      return <Flashcards heading={block.heading} cards={block.cards} />
    case 'summary':
      return (
        <LessonSummary
          takeaways={block.takeaways}
          furtherReading={block.furtherReading}
        />
      )
    case 'quiz': {
      const key = `quiz-${index}`
      return (
        renderQuizBlock?.(block.quiz, key) ?? (
          <Alert>
            <AlertTitle>Knowledge check not available</AlertTitle>
            <AlertDescription>
              This lesson&rsquo;s knowledge check isn&rsquo;t wired up in this context.
            </AlertDescription>
          </Alert>
        )
      )
    }
    case 'exercise': {
      const key = `exercise-${index}`
      return (
        renderExerciseBlock?.(block.exercise, key) ?? (
          <Alert>
            <AlertTitle>Exercise not available</AlertTitle>
            <AlertDescription>
              This lesson&rsquo;s exercise isn&rsquo;t wired up in this context.
            </AlertDescription>
          </Alert>
        )
      )
    }
  }
}

/** Renders a lesson's blocks in order. Progress (completion) is handled by useLessonProgress, not here. */
export function LessonRenderer({
  lesson,
  renderQuizBlock,
  renderExerciseBlock,
}: LessonRendererProps) {
  return (
    <article className="flex flex-col gap-6">
      {lesson.blocks.map((block, index) => (
        <LessonBlockRenderer
          key={index}
          block={block}
          index={index}
          renderQuizBlock={renderQuizBlock}
          renderExerciseBlock={renderExerciseBlock}
        />
      ))}
    </article>
  )
}
