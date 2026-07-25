import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders its label and responds to clicks', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Continue</Button>)

    const button = screen.getByRole('button', { name: 'Continue' })
    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Continue</Button>)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
  })
})
