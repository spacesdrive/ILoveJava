import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('is decorative by default, hidden from assistive tech', () => {
    render(<Separator data-testid="separator" />)
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })

  it('is exposed to assistive tech when explicitly non-decorative', () => {
    render(<Separator decorative={false} />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
