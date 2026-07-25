import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders its title, description, and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Loops</CardTitle>
          <CardDescription>Learn how for-loops work.</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    )

    expect(screen.getByText('Loops')).toBeInTheDocument()
    expect(screen.getByText('Learn how for-loops work.')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
