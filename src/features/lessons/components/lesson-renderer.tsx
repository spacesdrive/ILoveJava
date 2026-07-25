import { Info, Lightbulb, TriangleAlert } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

import type { LessonBlock, LessonContent } from '../types'
import { LessonCodeBlock } from './lesson-code-block'

export interface LessonRendererProps {
  lesson: LessonContent
}

const CALLOUT_ICON = {
  note: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
} as const

const CALLOUT_LABEL = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
} as const

function LessonBlockRenderer({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case 'prose':
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
          <Markdown remarkPlugins={[remarkGfm]}>{block.markdown}</Markdown>
        </div>
      )
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
        <Alert variant={block.variant === 'warning' ? 'destructive' : 'default'}>
          <Icon />
          <AlertTitle>{CALLOUT_LABEL[block.variant]}</AlertTitle>
          <AlertDescription>
            <Markdown remarkPlugins={[remarkGfm]}>{block.markdown}</Markdown>
          </AlertDescription>
        </Alert>
      )
    }
    case 'visualization':
      return (
        <Alert>
          <AlertTitle>Visualization not yet available</AlertTitle>
          <AlertDescription>
            This lesson references the &ldquo;{block.component}&rdquo; visualization,
            which hasn&rsquo;t been built yet.
          </AlertDescription>
        </Alert>
      )
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
  }
}

/** Renders a lesson's blocks in order. Progress (completion) is handled by useLessonProgress, not here. */
export function LessonRenderer({ lesson }: LessonRendererProps) {
  return (
    <article className="flex flex-col gap-6">
      {lesson.blocks.map((block, index) => (
        <LessonBlockRenderer key={index} block={block} />
      ))}
    </article>
  )
}
