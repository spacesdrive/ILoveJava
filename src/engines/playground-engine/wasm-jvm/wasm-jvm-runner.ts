import type {
  PlaygroundRunner,
  PlaygroundRunRequest,
  PlaygroundRunResult,
} from '../types'
import { runInWorker } from './worker-manager'

/**
 * The wasm-jvm PlaygroundRunner (ADR 0003): compiles and runs Java entirely
 * client-side via CheerpJ (https://cheerpj.com), a WebAssembly JVM, inside a
 * dedicated Web Worker - see cheerpj-worker.ts and worker-manager.ts for why
 * a worker (not the main thread) is required for the timeout to mean
 * anything. No backend, no code ever leaves the browser.
 *
 * Known limitations, honestly: `stdin` is not wired to the running program
 * (no current exercise needs interactive input); stdout/stderr separation is
 * a heuristic (CheerpJ doesn't document a stronger guarantee - see
 * cheerpj-worker.ts); first run pays CheerpJ's real download/init cost
 * (tens of MB, lazy-loaded only when Run is first pressed).
 */
export const wasmJvmRunner: PlaygroundRunner = {
  mode: 'wasm-jvm',
  async run(request: PlaygroundRunRequest): Promise<PlaygroundRunResult> {
    const start = performance.now()
    const outcome = await runInWorker(request.code, request.timeoutMs)
    const durationMs = Math.round(performance.now() - start)

    if (outcome.timedOut) {
      return {
        stdout: '',
        stderr: 'Execution timed out.',
        exitCode: null,
        durationMs,
        timedOut: true,
      }
    }

    return { ...outcome.result, durationMs, timedOut: false }
  },
}
