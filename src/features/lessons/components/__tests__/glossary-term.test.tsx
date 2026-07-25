import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { TooltipProvider } from '@/components/ui/tooltip'

import { GlossaryTerm } from '../glossary-term'

describe('GlossaryTerm', () => {
  it('reveals its definition on hover', async () => {
    render(
      <TooltipProvider>
        <GlossaryTerm
          term="bytecode"
          definition="Compiled, platform-independent Java instructions."
        />
      </TooltipProvider>,
    )

    await userEvent.hover(screen.getByRole('button', { name: 'bytecode' }))

    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Compiled, platform-independent Java instructions.',
    )
  })
})
