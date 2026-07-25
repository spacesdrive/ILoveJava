import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('associates with its control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="answer">Your answer</Label>
        <Input id="answer" />
      </>,
    )

    expect(screen.getByLabelText('Your answer')).toBeInTheDocument()
  })
})
