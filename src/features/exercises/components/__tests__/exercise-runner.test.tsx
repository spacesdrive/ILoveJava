import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { ExerciseContent } from '@/engines/exercise-engine/types'
import type { PlaygroundRunner } from '@/engines/playground-engine/types'

import { ExerciseRunner } from '../exercise-runner'

const fixtureExercise: ExerciseContent = {
  slug: 'fixture-exercise',
  title: 'Print a greeting',
  description: 'A exercise used only in tests.',
  difficulty: 'beginner',
  tags: ['fixture'],
  updatedAt: '2026-01-01',
  prompt: 'Print "hi" to stdout.',
  starterCode: '// write code here',
  solutionCode: 'System.out.println("hi");',
  testCases: [
    { id: 'tc-1', description: 'prints hi', input: '', expectedOutput: 'hi' },
  ],
  hints: ['Use System.out.println.'],
}

describe('ExerciseRunner', () => {
  it('shows an honest unavailable state when no runner is provided', async () => {
    render(<ExerciseRunner exercise={fixtureExercise} />)

    expect(screen.getByText('Execution unavailable')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Run' }))

    expect(screen.getByText('Could not run this exercise')).toBeInTheDocument()
    expect(screen.getByText(/execution isn't available yet/i)).toBeInTheDocument()
  })

  it('runs against a provided runner and reports pass/fail per test case', async () => {
    const runner: PlaygroundRunner = {
      mode: 'server-sandbox',
      run: vi.fn().mockResolvedValue({
        stdout: 'hi',
        stderr: '',
        exitCode: 0,
        durationMs: 5,
        timedOut: false,
      }),
    }
    const onRunComplete = vi.fn()

    render(
      <ExerciseRunner
        exercise={fixtureExercise}
        runner={runner}
        onRunComplete={onRunComplete}
      />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Run' }))

    expect(await screen.findByText('All test cases passed')).toBeInTheDocument()
    expect(onRunComplete).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'passed' }),
    )
  })

  it('reveals a hint when its trigger is expanded', async () => {
    render(<ExerciseRunner exercise={fixtureExercise} />)

    await userEvent.click(screen.getByRole('button', { name: 'Hint 1' }))

    expect(screen.getByText('Use System.out.println.')).toBeVisible()
  })
})
