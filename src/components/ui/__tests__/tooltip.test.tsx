import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

describe('Tooltip', () => {
  it('reveals its content when the trigger is hovered', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>bytecode</TooltipTrigger>
          <TooltipContent>
            Compiled, platform-independent Java instructions.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )

    expect(
      screen.queryByText('Compiled, platform-independent Java instructions.'),
    ).not.toBeInTheDocument()

    await userEvent.hover(screen.getByText('bytecode'))

    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Compiled, platform-independent Java instructions.',
    )
  })
})
