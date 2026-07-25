import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { LessonExpandable } from '../lesson-expandable'

describe('LessonExpandable', () => {
  it('reveals its content when expanded', async () => {
    render(
      <LessonExpandable
        title="Why bytecode?"
        markdown="It decouples Java from any one OS."
      />,
    )

    const trigger = screen.getByRole('button', { name: 'Why bytecode?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('It decouples Java from any one OS.')).toBeVisible()
  })
})
