import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VariableMemoryBoxDiagram } from '../variable-memory-box'

describe('VariableMemoryBoxDiagram', () => {
  it('has an accessible caption describing variables as memory boxes', () => {
    render(<VariableMemoryBoxDiagram />)
    expect(screen.getByText(/reserves a labeled box in memory/)).toBeInTheDocument()
  })
})
