import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('accepts typed text', async () => {
    render(<Input aria-label="Answer" />)

    const input = screen.getByRole('textbox', { name: 'Answer' })
    await userEvent.type(input, 'polymorphism')

    expect(input).toHaveValue('polymorphism')
  })

  it('cannot be edited when disabled', () => {
    render(<Input aria-label="Answer" disabled />)
    expect(screen.getByRole('textbox', { name: 'Answer' })).toBeDisabled()
  })
})
