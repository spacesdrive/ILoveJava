import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { LessonContent } from '@/engines/lesson-engine/types'

import { LessonRenderer } from '../lesson-renderer'

const fixtureLesson: LessonContent = {
  slug: 'fixture-lesson',
  title: 'Fixture lesson',
  description: 'A lesson used only in tests.',
  difficulty: 'beginner',
  tags: ['fixture'],
  updatedAt: '2026-01-01',
  prerequisites: [],
  estimatedMinutes: 5,
  blocks: [
    { type: 'prose', markdown: 'Java is a **statically typed** language.' },
    { type: 'code', language: 'java', code: 'System.out.println("hi");' },
    { type: 'callout', variant: 'warning', markdown: 'Watch for integer overflow.' },
    {
      type: 'callout',
      variant: 'best-practice',
      markdown: 'Name constants in SCREAMING_SNAKE_CASE.',
    },
    { type: 'visualization', component: 'stack-frame-viewer' },
    { type: 'visualization', component: 'java-execution-flow' },
    { type: 'check', questionSlug: 'fixture-check' },
    {
      type: 'comparison-table',
      caption: 'IDE comparison',
      headers: ['IDE', 'Best for'],
      rows: [['VS Code', 'Lightweight editing']],
    },
    {
      type: 'expandable',
      title: 'Why bytecode?',
      markdown: 'It decouples Java from any one OS.',
    },
    {
      type: 'steps',
      heading: 'Installing the JDK',
      steps: [
        { title: 'Download', markdown: 'Get the installer from the vendor site.' },
      ],
    },
    {
      type: 'flashcards',
      heading: 'Key terms',
      cards: [{ front: 'JVM', back: 'Java Virtual Machine' }],
    },
    {
      type: 'summary',
      takeaways: ['Java compiles to bytecode.'],
      furtherReading: [{ label: 'JVM spec', href: 'https://example.com/jvm' }],
    },
    {
      type: 'quiz',
      quiz: {
        slug: 'fixture-quiz',
        title: 'Fixture quiz',
        description: 'Test quiz',
        difficulty: 'beginner',
        tags: [],
        updatedAt: '2026-01-01',
        passThreshold: 0.5,
        questions: [],
      },
    },
    {
      type: 'exercise',
      exercise: {
        slug: 'fixture-exercise',
        title: 'Fixture exercise',
        description: 'Test exercise',
        difficulty: 'beginner',
        tags: [],
        updatedAt: '2026-01-01',
        prompt: 'Print hi',
        starterCode: '',
        solutionCode: '',
        testCases: [],
        hints: [],
      },
    },
  ],
}

describe('LessonRenderer', () => {
  it('renders prose markdown', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('statically typed')).toBeInTheDocument()
  })

  it('renders a code block with its source text', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText(/System\.out\.println/)).toBeInTheDocument()
  })

  it('renders a callout with its variant label and message', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Watch for integer overflow.')).toBeInTheDocument()
  })

  it('renders the newly added callout variants', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Best practice')).toBeInTheDocument()
  })

  it('renders an honest placeholder for a visualization not in the diagram registry', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Visualization not yet available')).toBeInTheDocument()
  })

  it('renders the actual diagram for a visualization registered in the diagram registry', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText(/compiled by javac into bytecode/)).toBeInTheDocument()
  })

  it('renders an honest placeholder for check blocks', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Check-in not yet available')).toBeInTheDocument()
  })

  it('renders a comparison table', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('IDE comparison')).toBeInTheDocument()
  })

  it('renders an expandable section', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByRole('button', { name: 'Why bytecode?' })).toBeInTheDocument()
  })

  it('renders a steps block', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Installing the JDK')).toBeInTheDocument()
    expect(screen.getByText('Download')).toBeInTheDocument()
  })

  it('renders flashcards', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByRole('button', { name: /Term: JVM/ })).toBeInTheDocument()
  })

  it('renders a summary block with takeaways and further reading', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Java compiles to bytecode.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /JVM spec/ })).toHaveAttribute(
      'href',
      'https://example.com/jvm',
    )
  })

  it('renders an honest placeholder for a quiz block with no renderer supplied', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Knowledge check not available')).toBeInTheDocument()
  })

  it('renders an honest placeholder for an exercise block with no renderer supplied', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Exercise not available')).toBeInTheDocument()
  })

  it('delegates quiz and exercise blocks to the supplied renderers', () => {
    render(
      <LessonRenderer
        lesson={fixtureLesson}
        renderQuizBlock={(quiz) => <div>Quiz: {quiz.title}</div>}
        renderExerciseBlock={(exercise) => <div>Exercise: {exercise.title}</div>}
      />,
    )

    expect(screen.getByText('Quiz: Fixture quiz')).toBeInTheDocument()
    expect(screen.getByText('Exercise: Fixture exercise')).toBeInTheDocument()
  })
})
