import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { JdkJreJvmDiagram } from '../jdk-jre-jvm'

describe('JdkJreJvmDiagram', () => {
  it('has an accessible caption describing the JDK/JRE/JVM relationship', () => {
    render(<JdkJreJvmDiagram />)
    expect(screen.getByText(/The JVM runs bytecode/)).toBeInTheDocument()
  })
})
