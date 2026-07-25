import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'

// jsdom has no ResizeObserver; CodeMirror 6 (src/features/exercises) needs one to mount.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver
