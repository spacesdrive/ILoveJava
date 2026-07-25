import { describe, expect, it } from 'vitest'

import type { ExerciseTestCase } from '@/engines/exercise-engine/types'
import type { PlaygroundRunResult } from '@/engines/playground-engine/types'

import { evaluateRun } from '../evaluate-run'

const testCases: ExerciseTestCase[] = [
  { id: 'tc-1', description: 'prints hi', input: '', expectedOutput: 'hi' },
]

function makeRun(overrides: Partial<PlaygroundRunResult> = {}): PlaygroundRunResult {
  return {
    stdout: '',
    stderr: '',
    exitCode: 0,
    durationMs: 1,
    timedOut: false,
    ...overrides,
  }
}

describe('evaluateRun', () => {
  it('passes when stdout matches the expected output', () => {
    const result = evaluateRun(makeRun({ stdout: 'hi' }), testCases)
    expect(result.status).toBe('passed')
    expect(result.testCaseResults[0].passed).toBe(true)
  })

  it('fails when stdout does not match', () => {
    const result = evaluateRun(makeRun({ stdout: 'bye' }), testCases)
    expect(result.status).toBe('failed')
    expect(result.testCaseResults[0].passed).toBe(false)
  })

  it('reports an error when the run timed out', () => {
    const result = evaluateRun(makeRun({ timedOut: true }), testCases)
    expect(result.status).toBe('error')
    expect(result.errorMessage).toMatch(/timed out/i)
  })

  it('reports an error when the process exits non-zero', () => {
    const result = evaluateRun(makeRun({ exitCode: 1, stderr: 'boom' }), testCases)
    expect(result.status).toBe('error')
    expect(result.errorMessage).toBe('boom')
  })
})
