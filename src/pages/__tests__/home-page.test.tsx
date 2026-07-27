import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { HomePage } from '../home-page'

function renderHomePage() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders the hero heading', () => {
    renderHomePage()
    expect(
      screen.getByRole('heading', { name: 'Learn Java, one real program at a time.' }),
    ).toBeInTheDocument()
  })

  it('links to Java Fundamentals from both the hero and the closing call to action', () => {
    renderHomePage()
    const ctaLinks = screen.getAllByRole('link', { name: 'Start Java Fundamentals' })
    expect(ctaLinks.length).toBeGreaterThanOrEqual(2)
    for (const link of ctaLinks) {
      expect(link).toHaveAttribute('href', '/learn/java-fundamentals')
    }
  })

  it('renders the feature grid', () => {
    renderHomePage()
    expect(screen.getByRole('heading', { name: 'Why ILoveJava' })).toBeInTheDocument()
    expect(screen.getByText('Real Java, real output')).toBeInTheDocument()
    expect(screen.getByText('Nothing to install')).toBeInTheDocument()
    expect(screen.getByText('Built for complete beginners')).toBeInTheDocument()
    expect(screen.getByText('Free and open source')).toBeInTheDocument()
  })

  it('lists Java Fundamentals lesson titles in the curriculum preview', () => {
    renderHomePage()
    expect(screen.getByText('What is Java?')).toBeInTheDocument()
    expect(screen.getByText('Control Flow')).toBeInTheDocument()
  })
})
