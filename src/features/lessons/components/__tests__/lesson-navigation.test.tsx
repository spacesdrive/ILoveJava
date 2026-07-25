import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { LessonNavigation } from '../lesson-navigation'

describe('LessonNavigation', () => {
  it('renders previous and next links when both exist', () => {
    render(
      <MemoryRouter>
        <LessonNavigation
          previous={{
            title: 'How Java Works',
            href: '/learn/java-fundamentals/how-java-works',
          }}
          next={{
            title: 'Installing Java',
            href: '/learn/java-fundamentals/installing-java',
          }}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /How Java Works/ })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals/how-java-works',
    )
    expect(screen.getByRole('link', { name: /Installing Java/ })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals/installing-java',
    )
  })

  it('renders only a next link for the first lesson', () => {
    render(
      <MemoryRouter>
        <LessonNavigation
          next={{
            title: 'How Java Works',
            href: '/learn/java-fundamentals/how-java-works',
          }}
        />
      </MemoryRouter>,
    )

    expect(screen.queryByRole('link', { name: /How Java Works/ })).toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
  })

  it('renders nothing when there is no previous or next lesson', () => {
    const { container } = render(
      <MemoryRouter>
        <LessonNavigation />
      </MemoryRouter>,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
