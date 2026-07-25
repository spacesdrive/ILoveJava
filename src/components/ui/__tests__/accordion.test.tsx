import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

describe('Accordion', () => {
  it('reveals hint content when its trigger is expanded', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="hint-1">
          <AccordionTrigger>Hint 1</AccordionTrigger>
          <AccordionContent>Check the loop condition.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByRole('button', { name: 'Hint 1' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Check the loop condition.')).toBeVisible()
  })
})
