import type { ContentMeta } from '@/content/types'

export interface ExerciseTestCase {
  id: string
  description: string
  input: string
  expectedOutput: string
  hidden?: boolean
}

export interface ExerciseContent extends ContentMeta {
  prompt: string
  starterCode: string
  solutionCode: string
  testCases: ExerciseTestCase[]
  hints: string[]
}

export type ExerciseRunStatus = 'idle' | 'running' | 'passed' | 'failed' | 'error'

export interface ExerciseRunResult {
  status: ExerciseRunStatus
  testCaseResults: Array<{ testCaseId: string; passed: boolean; actualOutput?: string }>
  errorMessage?: string
}
