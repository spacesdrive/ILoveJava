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
    { type: 'visualization', component: 'stack-frame-viewer' },
    { type: 'check', questionSlug: 'fixture-check' },
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

  it('renders an honest placeholder for visualization blocks', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Visualization not yet available')).toBeInTheDocument()
  })

  it('renders an honest placeholder for check blocks', () => {
    render(<LessonRenderer lesson={fixtureLesson} />)
    expect(screen.getByText('Check-in not yet available')).toBeInTheDocument()
  })
})
