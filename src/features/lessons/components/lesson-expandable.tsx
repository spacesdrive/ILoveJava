import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface LessonExpandableProps {
  title: string
  markdown: string
}

/** A single collapsible section for optional deeper-dive content. */
export function LessonExpandable({ title, markdown }: LessonExpandableProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
