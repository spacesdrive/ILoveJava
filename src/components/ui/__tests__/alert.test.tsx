import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

describe('Alert', () => {
  it('is announced via the alert role and renders its title/description', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Watch out</AlertTitle>
        <AlertDescription>Integer overflow wraps silently in Java.</AlertDescription>
      </Alert>,
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Watch out')
    expect(alert).toHaveTextContent('Integer overflow wraps silently in Java.')
  })
})
