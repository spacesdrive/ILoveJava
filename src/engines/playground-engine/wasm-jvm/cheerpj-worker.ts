/**
 * Runs inside a dedicated Web Worker (see worker-manager.ts) - never on the
 * main thread. This is what makes the timeout in PlaygroundRunRequest
 * actually enforceable: a learner's infinite loop hangs this worker forever,
 * but worker.terminate() kills it outright without freezing the page. A
 * main-thread implementation could not offer that guarantee - CheerpJ gives
 * no way to interrupt code once it starts running.
 *
 * Deliberately dependency-free (no ES imports) - classic worker script,
 * loaded via `importScripts`, per CheerpJ's own documented worker support.
 */

export {}

// Minimal ambient shape for this worker's own global scope, kept intentionally
// small rather than pulling in TypeScript's "webworker" lib - that lib defines
// its own `self`, incompatible with the "dom" lib the rest of this project's
// tsconfig uses (window-scoped code needs `self: Window`).
declare const self: {
  onmessage: ((event: MessageEvent<WorkerRunRequest>) => void) | null
  postMessage(message: WorkerRunResponse): void
}

declare function importScripts(...urls: string[]): void

interface CheerpJWorkerGlobal {
  cheerpjInit(options?: Record<string, unknown>): Promise<void>
  cheerpjRunMain(
    className: string,
    classPath: string,
    ...args: string[]
  ): Promise<number>
  cheerpOSAddStringFile(path: string, data: string): void
}

declare const cheerpjInit: CheerpJWorkerGlobal['cheerpjInit']
declare const cheerpjRunMain: CheerpJWorkerGlobal['cheerpjRunMain']
declare const cheerpOSAddStringFile: CheerpJWorkerGlobal['cheerpOSAddStringFile']

const CHEERPJ_LOADER_URL = 'https://cjrtnc.leaningtech.com/4.3/loader.js'
// tools.jar is fetched by scripts/fetch-tools-jar.mjs (postinstall) into
// public/, so it's reachable at the site root - CheerpJ's /app/ mount.
const JAVAC_CLASSPATH = '/app/tools.jar:/files/'

export interface WorkerRunRequest {
  code: string
}

export interface WorkerRunResponse {
  stdout: string
  stderr: string
  exitCode: number | null
}

let initPromise: Promise<void> | null = null

function initCheerpJ(): Promise<void> {
  initPromise ??= new Promise<void>((resolve, reject) => {
    try {
      importScripts(CHEERPJ_LOADER_URL)
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)))
      return
    }
    cheerpjInit().then(resolve, reject)
  })
  return initPromise
}

/**
 * CheerpJ's own status chatter, observed by capturing raw output during
 * development - logged via console.log on every cheerpjRunMain call (both
 * the javac step and the actual program run), so it has to be filtered out
 * or it corrupts the program's real stdout. Not documented anywhere; this is
 * exactly what CheerpJ 4.3 was observed to print, not a guarantee future
 * versions won't add more.
 */
const CHEERPJ_STATUS_LINES = new Set([
  'CheerpJ runtime ready',
  'Class is loaded, main is starting',
])

/**
 * Console output is the only channel CheerpJ routes Java's System.out/System.err
 * through. There's no documented way to separate the two streams more
 * precisely, so this is a heuristic, not a guarantee: console.log -> stdout,
 * console.warn/console.error -> stderr - with CheerpJ's own status lines
 * (see CHEERPJ_STATUS_LINES) dropped from both.
 */
function captureConsole() {
  const stdout: string[] = []
  const stderr: string[] = []
  const original = { log: console.log, warn: console.warn, error: console.error }

  const format = (args: unknown[]) =>
    args.map((arg) => (typeof arg === 'string' ? arg : String(arg))).join(' ')

  console.log = (...args: unknown[]) => {
    const line = format(args)
    if (!CHEERPJ_STATUS_LINES.has(line.trim())) stdout.push(line)
    original.log.apply(console, args)
  }
  console.warn = (...args: unknown[]) => {
    const line = format(args)
    if (!CHEERPJ_STATUS_LINES.has(line.trim())) stderr.push(line)
    original.warn.apply(console, args)
  }
  console.error = (...args: unknown[]) => {
    const line = format(args)
    if (!CHEERPJ_STATUS_LINES.has(line.trim())) stderr.push(line)
    original.error.apply(console, args)
  }

  return {
    stdout,
    stderr,
    release() {
      console.log = original.log
      console.warn = original.warn
      console.error = original.error
    },
  }
}

async function compileAndRun(code: string): Promise<WorkerRunResponse> {
  await initCheerpJ()

  const match = code.match(/(?:public\s+)?(?:final\s+)?class\s+([A-Za-z_$][\w$]*)/)
  const mainClass = match ? match[1] : 'Main'
  const sourcePath = `/str/${mainClass}.java`
  cheerpOSAddStringFile(sourcePath, code)

  const compile = captureConsole()
  let compileExitCode: number
  try {
    compileExitCode = await cheerpjRunMain(
      'com.sun.tools.javac.Main',
      JAVAC_CLASSPATH,
      '-d',
      '/files/',
      sourcePath,
    )
  } finally {
    compile.release()
  }

  if (compileExitCode !== 0) {
    return {
      stdout: '',
      stderr: compile.stderr.concat(compile.stdout).join('\n') || 'Compilation failed.',
      exitCode: compileExitCode,
    }
  }

  const run = captureConsole()
  let runExitCode: number | null = null
  try {
    runExitCode = await cheerpjRunMain(mainClass, '/files/')
  } catch (error) {
    run.stderr.push(error instanceof Error ? error.message : String(error))
  } finally {
    run.release()
  }

  return {
    stdout: run.stdout.join('\n'),
    stderr: run.stderr.join('\n'),
    exitCode: runExitCode,
  }
}

self.onmessage = (event: MessageEvent<WorkerRunRequest>) => {
  compileAndRun(event.data.code)
    .then((result) => self.postMessage(result))
    .catch((error: unknown) => {
      const response: WorkerRunResponse = {
        stdout: '',
        stderr: error instanceof Error ? error.message : String(error),
        exitCode: null,
      }
      self.postMessage(response)
    })
}
