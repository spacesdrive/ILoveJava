import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

export interface FlashcardItem {
  front: string
  back: string
}

export interface FlashcardsProps {
  heading?: string
  cards: FlashcardItem[]
}

/** A grid of flip-cards for reviewing key terms. Each card is a button, flippable by click or keyboard. */
export function Flashcards({ heading, cards }: FlashcardsProps) {
  return (
    <div className="flex flex-col gap-4">
      {heading && <h3 className="text-lg font-semibold">{heading}</h3>}
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, index) => (
          <Flashcard key={index} front={card.front} back={card.back} />
        ))}
      </div>
    </div>
  )
}

function Flashcard({ front, back }: FlashcardItem) {
  const [flipped, setFlipped] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      className="focus-visible:ring-ring rounded-lg text-left [perspective:1000px] focus-visible:ring-2 focus-visible:outline-none"
    >
      <span className="sr-only">
        {flipped
          ? `Definition: ${back}. Activate to show the term again.`
          : `Term: ${front}. Activate to reveal the definition.`}
      </span>
      <motion.div
        aria-hidden="true"
        className="relative h-32 [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div className="bg-card absolute inset-0 flex items-center justify-center rounded-lg border p-4 text-center font-medium [backface-visibility:hidden]">
          {front}
        </div>
        <div className="bg-card text-muted-foreground absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-lg border p-4 text-center text-sm [backface-visibility:hidden]">
          {back}
        </div>
      </motion.div>
    </button>
  )
}
