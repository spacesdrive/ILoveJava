import type {
  ExerciseRunResult,
  ExerciseTestCase,
} from '@/engines/exercise-engine/types'
import type { PlaygroundRunResult } from '@/engines/playground-engine/types'

/**
 * Turns a raw PlaygroundRunResult into an ExerciseRunResult by comparing stdout
 * against each test case's expected output. Exact-match only, no normalization
 * beyond trimming trailing whitespace - real diffing (partial credit, whitespace
 * tolerance) is out of scope until a real PlaygroundRunner exists.
 */
export function evaluateRun(
  run: PlaygroundRunResult,
  testCases: ExerciseTestCase[],
): ExerciseRunResult {
  if (run.timedOut) {
    return {
      status: 'error',
      testCaseResults: [],
      errorMessage: 'Execution timed out.',
    }
  }
  if (run.exitCode !== 0) {
    return {
      status: 'error',
      testCaseResults: [],
      errorMessage: run.stderr || `Process exited with code ${run.exitCode}.`,
    }
  }

  const actualOutput = run.stdout.trimEnd()
  const testCaseResults = testCases.map((testCase) => ({
    testCaseId: testCase.id,
    passed: actualOutput === testCase.expectedOutput.trimEnd(),
    actualOutput,
  }))

  return {
    status: testCaseResults.every((r) => r.passed) ? 'passed' : 'failed',
    testCaseResults,
  }
}
