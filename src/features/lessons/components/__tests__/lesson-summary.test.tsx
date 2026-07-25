import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LessonSummary } from '../lesson-summary'

describe('LessonSummary', () => {
  it('renders each takeaway', () => {
    render(
      <LessonSummary
        takeaways={['Java compiles to bytecode.', 'The JVM runs bytecode.']}
      />,
    )

    expect(screen.getByText('Java compiles to bytecode.')).toBeInTheDocument()
    expect(screen.getByText('The JVM runs bytecode.')).toBeInTheDocument()
  })

  it('renders further reading links when provided', () => {
    render(
      <LessonSummary
        takeaways={['Java compiles to bytecode.']}
        furtherReading={[{ label: 'JVM spec', href: 'https://example.com/jvm' }]}
      />,
    )

    expect(screen.getByRole('link', { name: /JVM spec/ })).toHaveAttribute(
      'href',
      'https://example.com/jvm',
    )
  })

  it('omits the further reading section when none is provided', () => {
    render(<LessonSummary takeaways={['Java compiles to bytecode.']} />)
    expect(screen.queryByText('Further reading')).not.toBeInTheDocument()
  })
})
