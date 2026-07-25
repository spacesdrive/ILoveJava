import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageLoadingFallback } from '../page-loading-fallback'

describe('PageLoadingFallback', () => {
  it('is announced to assistive tech as a loading status', () => {
    render(<PageLoadingFallback />)
    expect(screen.getByRole('status', { name: 'Loading page' })).toBeInTheDocument()
  })
})
