import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ControlFlowIfElseDiagram } from '../control-flow-if-else'

describe('ControlFlowIfElseDiagram', () => {
  it('has an accessible caption describing branching execution', () => {
    render(<ControlFlowIfElseDiagram />)
    expect(screen.getByText(/exactly one path runs/)).toBeInTheDocument()
  })
})
