import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { QuizContent } from '@/engines/quiz-engine/types'

import { QuizRenderer } from '../quiz-renderer'

const fixtureQuiz: QuizContent = {
  slug: 'fixture-quiz',
  title: 'Fixture quiz',
  description: 'A quiz used only in tests.',
  difficulty: 'beginner',
  tags: ['fixture'],
  updatedAt: '2026-01-01',
  passThreshold: 0.6,
  questions: [
    {
      type: 'mcq',
      id: 'q1',
      prompt: 'Which keyword declares a constant in Java?',
      choices: ['var', 'final', 'const'],
      correctChoiceIndex: 1,
      explanation: '`final` prevents reassignment.',
    },
    {
      type: 'true-false',
      id: 'q2',
      prompt: 'Java arrays have a fixed length once created.',
      correctAnswer: true,
      explanation: 'Correct - arrays cannot be resized.',
    },
    {
      type: 'fill-in',
      id: 'q3',
      prompt: 'What keyword starts a class definition?',
      acceptedAnswers: ['class'],
      explanation: '`class` starts a class definition.',
    },
  ],
}

async function answerAllCorrectly() {
  await userEvent.click(screen.getByRole('radio', { name: 'final' }))
  await userEvent.click(screen.getByRole('button', { name: 'Check answer' }))
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))

  await userEvent.click(screen.getByRole('radio', { name: 'True' }))
  await userEvent.click(screen.getByRole('button', { name: 'Check answer' }))
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))

  await userEvent.type(screen.getByRole('textbox', { name: 'Your answer' }), 'class')
  await userEvent.click(screen.getByRole('button', { name: 'Check answer' }))
  await userEvent.click(screen.getByRole('button', { name: 'Finish' }))
}

describe('QuizRenderer', () => {
  it('disables checking an answer until one is selected', () => {
    render(<QuizRenderer quiz={fixtureQuiz} />)
    expect(screen.getByRole('button', { name: 'Check answer' })).toBeDisabled()
  })

  it('shows the explanation after checking an mcq answer', async () => {
    render(<QuizRenderer quiz={fixtureQuiz} />)

    await userEvent.click(screen.getByRole('radio', { name: 'final' }))
    await userEvent.click(screen.getByRole('button', { name: 'Check answer' }))

    expect(screen.getByText('Correct')).toBeInTheDocument()
    expect(screen.getByText('`final` prevents reassignment.')).toBeInTheDocument()
  })

  it('scores a perfect run as passed and calls onComplete once', async () => {
    const onComplete = vi.fn()
    render(<QuizRenderer quiz={fixtureQuiz} onComplete={onComplete} />)

    await answerAllCorrectly()

    expect(screen.getByText('Quiz passed')).toBeInTheDocument()
    expect(screen.getByText('3 of 3 correct (100%).')).toBeInTheDocument()
    expect(onComplete).toHaveBeenCalledOnce()
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ quizSlug: 'fixture-quiz', score: 1 }),
    )
  })
})
