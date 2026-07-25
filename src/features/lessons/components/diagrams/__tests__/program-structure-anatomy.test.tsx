import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgramStructureAnatomyDiagram } from '../program-structure-anatomy'

describe('ProgramStructureAnatomyDiagram', () => {
  it('has an accessible caption describing the file anatomy', () => {
    render(<ProgramStructureAnatomyDiagram />)
    expect(screen.getByText(/main method the JVM calls first/)).toBeInTheDocument()
  })
})
