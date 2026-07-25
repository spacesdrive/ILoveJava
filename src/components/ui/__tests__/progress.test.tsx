import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from '@/components/ui/progress'

describe('Progress', () => {
  it('exposes its value via the progressbar role', () => {
    render(<Progress value={40} aria-label="Quiz progress" />)

    const progressbar = screen.getByRole('progressbar', { name: 'Quiz progress' })
    expect(progressbar).toHaveAttribute('aria-valuenow', '40')
  })
})
