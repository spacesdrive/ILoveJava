import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ThemeProvider } from '@/app/providers/theme-provider'
import { GITHUB_URL, SITE_NAME } from '@/constants/site'

import { Header } from '../header'

function renderHeader() {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('links the site name back home', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: SITE_NAME })).toHaveAttribute('href', '/')
  })

  it('links to the Java Fundamentals path', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Java Fundamentals' })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals',
    )
  })

  it('links to the GitHub repository', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'View source on GitHub' })).toHaveAttribute(
      'href',
      GITHUB_URL,
    )
  })

  it('has an accessible theme toggle', () => {
    renderHeader()
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
  })
})
