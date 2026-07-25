import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { LessonHero } from '../lesson-hero'

describe('LessonHero', () => {
  it('renders the title, description, difficulty, and estimated time', () => {
    render(
      <MemoryRouter>
        <LessonHero
          title="What is Java?"
          description="An introduction to Java."
          difficulty="beginner"
          estimatedMinutes={10}
          pathTitle="Java fundamentals"
          pathHref="/learn/java-fundamentals"
          lessonNumber={1}
          lessonCount={10}
          prerequisites={[]}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'What is Java?' })).toBeInTheDocument()
    expect(screen.getByText('An introduction to Java.')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('10 min')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Java fundamentals' })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals',
    )
  })

  it('links each prerequisite lesson', () => {
    render(
      <MemoryRouter>
        <LessonHero
          title="Variables"
          description="Declaring and using variables."
          difficulty="beginner"
          estimatedMinutes={15}
          pathTitle="Java fundamentals"
          pathHref="/learn/java-fundamentals"
          lessonNumber={6}
          lessonCount={10}
          prerequisites={[
            {
              slug: 'java-program-structure',
              title: 'Java Program Structure',
              href: '/learn/java-fundamentals/java-program-structure',
            },
          ]}
        />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: 'Java Program Structure' }),
    ).toHaveAttribute('href', '/learn/java-fundamentals/java-program-structure')
  })
})
