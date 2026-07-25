import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  it('renders as a placeholder block hidden from assistive tech', () => {
    render(<Skeleton data-testid="skeleton" aria-hidden="true" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true')
  })
})
