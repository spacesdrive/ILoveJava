import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  it('toggles checked state on click', async () => {
    render(<Checkbox aria-label="Task done" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Task done' })
    expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('cannot be toggled when disabled', async () => {
    render(<Checkbox aria-label="Task done" disabled />)

    const checkbox = screen.getByRole('checkbox', { name: 'Task done' })
    await userEvent.click(checkbox)

    expect(checkbox).not.toBeChecked()
    expect(checkbox).toBeDisabled()
  })
})
