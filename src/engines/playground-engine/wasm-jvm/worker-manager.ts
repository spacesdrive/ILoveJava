import type { WorkerRunRequest, WorkerRunResponse } from './cheerpj-worker'

export interface WorkerRunOutcome {
  timedOut: boolean
  result: WorkerRunResponse
}

let worker: Worker | null = null

function getWorker(): Worker {
  worker ??= new Worker(new URL('./cheerpj-worker.ts', import.meta.url))
  return worker
}

/** Discards the current worker so the next run starts a fresh one - used after a timeout, since a hung worker can't be reused. */
function discardWorker() {
  worker?.terminate()
  worker = null
}

/**
 * Runs code in the CheerpJ worker, enforcing timeoutMs by terminating the
 * worker outright if it doesn't respond in time - the only way to actually
 * stop code that's already running (see cheerpj-worker.ts). A terminated
 * worker is discarded; the next run pays CheerpJ's full init cost again,
 * which is the accepted cost of a real timeout guarantee.
 */
export function runInWorker(
  code: string,
  timeoutMs: number,
): Promise<WorkerRunOutcome> {
  return new Promise((resolve) => {
    const activeWorker = getWorker()
    let settled = false

    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      discardWorker()
      resolve({ timedOut: true, result: { stdout: '', stderr: '', exitCode: null } })
    }, timeoutMs)

    activeWorker.onmessage = (event: MessageEvent<WorkerRunResponse>) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve({ timedOut: false, result: event.data })
    }

    activeWorker.onerror = (event: ErrorEvent) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      discardWorker()
      resolve({
        timedOut: false,
        result: {
          stdout: '',
          stderr: event.message || 'The Java runtime crashed.',
          exitCode: null,
        },
      })
    }

    const request: WorkerRunRequest = { code }
    activeWorker.postMessage(request)
  })
}
