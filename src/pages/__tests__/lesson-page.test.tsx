import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { LessonPage } from '../lesson-page'

function renderLessonPage(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/learn/java-fundamentals/${slug}`]}>
      <Routes>
        <Route path="/learn/java-fundamentals/:lessonSlug" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LessonPage', () => {
  it('renders the lesson title, breadcrumb, and content for a real lesson', () => {
    renderLessonPage('what-is-java')

    expect(screen.getByRole('heading', { name: 'What is Java?' })).toBeInTheDocument()
    const breadcrumb = screen.getByRole('navigation', { name: 'breadcrumb' })
    expect(
      within(breadcrumb).getByRole('link', { name: 'Java Fundamentals' }),
    ).toHaveAttribute('href', '/learn/java-fundamentals')
    expect(screen.getByText(/James Gosling/)).toBeInTheDocument()
  })

  it('renders a quiz block via the real QuizRenderer', () => {
    renderLessonPage('what-is-java')
    expect(
      screen.getByText('Which company originally created Java?'),
    ).toBeInTheDocument()
  })

  it('renders an exercise block via the real ExerciseRunner', () => {
    renderLessonPage('your-first-java-program')
    expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument()
  })

  it('links to the next lesson but not a previous one on the first lesson', () => {
    renderLessonPage('what-is-java')
    const nav = screen.getByRole('navigation', { name: 'Lesson navigation' })
    expect(
      within(nav).getByRole('link', { name: /How Java Works/ }),
    ).toBeInTheDocument()
    expect(
      within(nav).queryByRole('link', { name: /What is Java\?/ }),
    ).not.toBeInTheDocument()
  })

  it('links to the previous lesson on the last lesson', () => {
    renderLessonPage('control-flow')
    const nav = screen.getByRole('navigation', { name: 'Lesson navigation' })
    expect(
      within(nav).getByRole('link', { name: /Input and Output/ }),
    ).toBeInTheDocument()
  })

  it('falls back to the not-found page for an unknown slug', () => {
    renderLessonPage('this-lesson-does-not-exist')
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })
})
