import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Flashcards } from '../flashcards'

describe('Flashcards', () => {
  it('starts showing the term, not the definition', () => {
    render(<Flashcards cards={[{ front: 'JVM', back: 'Java Virtual Machine' }]} />)
    expect(screen.getByRole('button')).toHaveAccessibleName(/Term: JVM/)
  })

  it('flips to the definition on click and back on a second click', async () => {
    render(<Flashcards cards={[{ front: 'JVM', back: 'Java Virtual Machine' }]} />)
    const card = screen.getByRole('button')

    await userEvent.click(card)
    expect(card).toHaveAccessibleName(/Definition: Java Virtual Machine/)
    expect(card).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(card)
    expect(card).toHaveAccessibleName(/Term: JVM/)
    expect(card).toHaveAttribute('aria-pressed', 'false')
  })

  it('is operable from the keyboard', async () => {
    render(<Flashcards cards={[{ front: 'JVM', back: 'Java Virtual Machine' }]} />)
    const card = screen.getByRole('button')

    card.focus()
    await userEvent.keyboard('{Enter}')

    expect(card).toHaveAccessibleName(/Definition: Java Virtual Machine/)
  })

  it('renders one card per entry', () => {
    render(
      <Flashcards
        heading="Key terms"
        cards={[
          { front: 'JVM', back: 'Java Virtual Machine' },
          { front: 'JRE', back: 'Java Runtime Environment' },
        ]}
      />,
    )

    expect(screen.getByText('Key terms')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
