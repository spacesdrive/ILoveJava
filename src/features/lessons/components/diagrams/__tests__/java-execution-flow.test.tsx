import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { JavaExecutionFlowDiagram } from '../java-execution-flow'

describe('JavaExecutionFlowDiagram', () => {
  it('has an accessible caption describing the flow', () => {
    render(<JavaExecutionFlowDiagram />)
    expect(screen.getByText(/compiled by javac into bytecode/)).toBeInTheDocument()
  })
})
