import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { javaFundamentalsLessons } from '@/features/lessons'

import { LearningPathPage } from '../learning-path-page'

describe('LearningPathPage', () => {
  it('renders the path title and every lesson', () => {
    render(
      <MemoryRouter>
        <LearningPathPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Java Fundamentals' }),
    ).toBeInTheDocument()
    for (const lesson of javaFundamentalsLessons) {
      expect(screen.getByText(lesson.title)).toBeInTheDocument()
    }
  })

  it('links the first lesson to its lesson page', () => {
    render(
      <MemoryRouter>
        <LearningPathPage />
      </MemoryRouter>,
    )

    const [firstLesson] = javaFundamentalsLessons
    expect(
      screen.getByRole('link', { name: new RegExp(firstLesson.title) }),
    ).toHaveAttribute('href', `/learn/java-fundamentals/${firstLesson.slug}`)
  })

  it('shows 0 of N complete before any progress exists', async () => {
    render(
      <MemoryRouter>
        <LearningPathPage />
      </MemoryRouter>,
    )

    expect(
      await screen.findByText(
        `0 of ${javaFundamentalsLessons.length} lessons complete`,
      ),
    ).toBeInTheDocument()
  })
})
