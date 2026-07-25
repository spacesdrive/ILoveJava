import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export interface GlossaryTermProps {
  term: string
  definition: string
}

/** An inline term with a hover/focus definition - for a quick reminder without leaving the sentence. */
export function GlossaryTerm({ term, definition }: GlossaryTermProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="border-muted-foreground text-foreground cursor-help border-b border-dotted font-medium"
        >
          {term}
        </button>
      </TooltipTrigger>
      <TooltipContent>{definition}</TooltipContent>
    </Tooltip>
  )
}
