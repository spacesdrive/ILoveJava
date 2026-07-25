import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import { LessonCompletion } from '../lesson-completion'

describe('LessonCompletion', () => {
  it('shows a mark-complete call to action when not yet complete', async () => {
    const onMarkComplete = vi.fn()
    render(
      <MemoryRouter>
        <LessonCompletion isComplete={false} onMarkComplete={onMarkComplete} />
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Mark lesson complete' }))
    expect(onMarkComplete).toHaveBeenCalledOnce()
  })

  it('shows the completion state and a continue link once complete', () => {
    render(
      <MemoryRouter>
        <LessonCompletion
          isComplete
          onMarkComplete={vi.fn()}
          next={{
            title: 'Installing Java',
            href: '/learn/java-fundamentals/installing-java',
          }}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Lesson complete')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Installing Java/ })).toHaveAttribute(
      'href',
      '/learn/java-fundamentals/installing-java',
    )
  })

  it('omits the continue link when there is no next lesson', () => {
    render(
      <MemoryRouter>
        <LessonCompletion isComplete onMarkComplete={vi.fn()} />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
