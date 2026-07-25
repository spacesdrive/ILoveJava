export type PlaygroundExecutionMode = 'wasm-jvm' | 'server-sandbox'

export interface PlaygroundRunRequest {
  code: string
  stdin?: string
  timeoutMs: number
}

export interface PlaygroundRunResult {
  stdout: string
  stderr: string
  exitCode: number | null
  durationMs: number
  timedOut: boolean
}

/**
 * A PlaygroundRunner is the execution backend the UI talks to. Which mode
 * is active is an open architecture decision - see docs/decisions and this
 * folder's OVERVIEW.md. The UI must not assume either mode; it only depends
 * on this interface.
 */
export interface PlaygroundRunner {
  mode: PlaygroundExecutionMode
  run(request: PlaygroundRunRequest): Promise<PlaygroundRunResult>
}
