import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LessonComparisonTable } from '../lesson-comparison-table'

describe('LessonComparisonTable', () => {
  it('renders headers and rows', () => {
    render(
      <LessonComparisonTable
        caption="IDE comparison"
        headers={['IDE', 'Best for']}
        rows={[
          ['VS Code', 'Lightweight editing'],
          ['IntelliJ IDEA', 'Large Java projects'],
        ]}
      />,
    )

    expect(screen.getByText('IDE comparison')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Best for' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'IntelliJ IDEA' })).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(3)
  })
})
