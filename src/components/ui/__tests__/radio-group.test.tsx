import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

describe('RadioGroup', () => {
  it('allows exactly one option to be selected', async () => {
    render(
      <RadioGroup aria-label="Answer">
        <RadioGroupItem value="a" id="a" />
        <RadioGroupItem value="b" id="b" />
      </RadioGroup>,
    )

    const [optionA, optionB] = screen.getAllByRole('radio')

    await userEvent.click(optionA)
    expect(optionA).toHaveAttribute('aria-checked', 'true')
    expect(optionB).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(optionB)
    expect(optionA).toHaveAttribute('aria-checked', 'false')
    expect(optionB).toHaveAttribute('aria-checked', 'true')
  })
})
