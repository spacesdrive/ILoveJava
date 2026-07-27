import { java } from '@codemirror/lang-java'
import CodeMirror from '@uiw/react-codemirror'
import * as React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PlaygroundRunner } from '@/engines/playground-engine/types'
import { useIsDarkMode } from '@/hooks/use-is-dark-mode'

import { evaluateRun } from '../lib/evaluate-run'
import type { ExerciseContent, ExerciseRunResult } from '../types'

/** The worst-case time budget for a run, generous enough to cover a cold CheerpJ worker (runtime download + init) on a slow connection - see ADR 0003. Warm runs finish in a fraction of this. */
const RUN_TIMEOUT_MS = 60_000

export interface ExerciseRunnerProps {
  exercise: ExerciseContent
  /** Omit to render the honest "execution unavailable" state - e.g. no PlaygroundRunner is passed at all. */
  runner?: PlaygroundRunner
  onRunComplete?: (result: ExerciseRunResult) => void
}

const UNAVAILABLE_RESULT: ExerciseRunResult = {
  status: 'error',
  testCaseResults: [],
  errorMessage:
    "Java execution isn't available yet - the execution strategy is still an open decision (see ADR 0003).",
}

export function ExerciseRunner({
  exercise,
  runner,
  onRunComplete,
}: ExerciseRunnerProps) {
  const [code, setCode] = React.useState(exercise.starterCode)
  const [result, setResult] = React.useState<ExerciseRunResult | null>(null)
  const [isRunning, setIsRunning] = React.useState(false)
  const isDarkMode = useIsDarkMode()
  // Reset the editor/result when switching to a different exercise, via React's
  // "adjust state during render" pattern rather than an effect (avoids an extra
  // render pass and a synchronous setState-in-effect).
  const [renderedSlug, setRenderedSlug] = React.useState(exercise.slug)
  if (exercise.slug !== renderedSlug) {
    setRenderedSlug(exercise.slug)
    setCode(exercise.starterCode)
    setResult(null)
  }

  const handleRun = async () => {
    if (!runner) {
      setResult(UNAVAILABLE_RESULT)
      onRunComplete?.(UNAVAILABLE_RESULT)
      return
    }

    setIsRunning(true)
    try {
      const run = await runner.run({ code, timeoutMs: RUN_TIMEOUT_MS })
      const evaluated = evaluateRun(run, exercise.testCases)
      setResult(evaluated)
      onRunComplete?.(evaluated)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{exercise.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{exercise.prompt}</p>
        </CardContent>
      </Card>

      <CodeMirror
        value={code}
        height="300px"
        theme={isDarkMode ? 'dark' : 'light'}
        extensions={[java()]}
        onChange={(value) => setCode(value)}
        aria-label="Exercise code editor"
      />

      <div className="flex items-center gap-3">
        <Button onClick={handleRun} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run'}
        </Button>
        {!runner && <Badge variant="outline">Execution unavailable</Badge>}
        {isRunning && (
          <span className="text-muted-foreground text-sm">
            The first run on this page downloads a Java runtime - this can take a
            moment.
          </span>
        )}
      </div>

      {result && (
        <Alert variant={result.status === 'passed' ? 'default' : 'destructive'}>
          <AlertTitle>
            {result.status === 'passed' && 'All test cases passed'}
            {result.status === 'failed' && 'Some test cases failed'}
            {result.status === 'error' && 'Could not run this exercise'}
          </AlertTitle>
          {result.errorMessage && (
            <AlertDescription>{result.errorMessage}</AlertDescription>
          )}
        </Alert>
      )}

      <div>
        <h3 className="mb-2 text-sm font-medium">Test cases</h3>
        <ul className="flex flex-col gap-2">
          {exercise.testCases.map((testCase) => {
            const testResult = result?.testCaseResults.find(
              (r) => r.testCaseId === testCase.id,
            )
            return (
              <li
                key={testCase.id}
                className="flex items-center justify-between text-sm"
              >
                <span>
                  {testCase.hidden ? 'Hidden test case' : testCase.description}
                </span>
                {testResult && (
                  <Badge variant={testResult.passed ? 'default' : 'destructive'}>
                    {testResult.passed ? 'Passed' : 'Failed'}
                  </Badge>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {exercise.hints.length > 0 && (
        <Accordion type="single" collapsible>
          {exercise.hints.map((hint, index) => (
            <AccordionItem key={index} value={`hint-${index}`}>
              <AccordionTrigger>Hint {index + 1}</AccordionTrigger>
              <AccordionContent>{hint}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
