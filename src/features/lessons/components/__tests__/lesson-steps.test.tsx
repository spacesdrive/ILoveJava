import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LessonSteps } from '../lesson-steps'

describe('LessonSteps', () => {
  it('renders each step in order with its title and content', () => {
    render(
      <LessonSteps
        heading="Installing the JDK"
        steps={[
          { title: 'Download', markdown: 'Get the installer.' },
          { title: 'Run the installer', markdown: 'Follow the prompts.' },
        ]}
      />,
    )

    expect(screen.getByText('Installing the JDK')).toBeInTheDocument()
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Download')
    expect(items[1]).toHaveTextContent('Run the installer')
  })
})
