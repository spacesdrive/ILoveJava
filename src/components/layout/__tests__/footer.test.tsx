import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { GITHUB_URL, SITE_NAME } from '@/constants/site'

import { Footer } from '../footer'

function renderFooter() {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer', () => {
  it('links to the Java Fundamentals path', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Java Fundamentals' })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals',
    )
  })

  it('links to the GitHub repository and its issue tracker', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: /Source code/ })).toHaveAttribute(
      'href',
      GITHUB_URL,
    )
    expect(screen.getByRole('link', { name: 'Report an issue' })).toHaveAttribute(
      'href',
      `${GITHUB_URL}/issues`,
    )
  })

  it('shows the site name and current year in the copyright line', () => {
    renderFooter()
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`${year}.*${SITE_NAME}`))).toBeInTheDocument()
  })
})
