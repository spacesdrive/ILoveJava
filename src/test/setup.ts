import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'

// jsdom has no ResizeObserver; CodeMirror 6 (src/features/exercises) needs one to mount.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver

// jsdom has no IntersectionObserver; Framer Motion's `whileInView` (src/features/lessons)
// needs one to mount. The stub never fires a callback - scroll-reveal tests assert on
// the element's initial/base state, not the post-reveal animated state.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
globalThis.IntersectionObserver ??=
  IntersectionObserverStub as unknown as typeof IntersectionObserver
