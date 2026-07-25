import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useIsDarkMode } from '../use-is-dark-mode'

afterEach(() => {
  document.documentElement.classList.remove('dark')
})

describe('useIsDarkMode', () => {
  it('reflects the initial dark class on <html>', () => {
    document.documentElement.classList.add('dark')
    const { result } = renderHook(() => useIsDarkMode())
    expect(result.current).toBe(true)
  })

  it('defaults to false when the dark class is absent', () => {
    const { result } = renderHook(() => useIsDarkMode())
    expect(result.current).toBe(false)
  })

  it('updates when the dark class is toggled after mount', async () => {
    const { result } = renderHook(() => useIsDarkMode())
    expect(result.current).toBe(false)

    await act(async () => {
      document.documentElement.classList.add('dark')
      // MutationObserver callbacks run as microtasks - flush them.
      await Promise.resolve()
    })

    expect(result.current).toBe(true)
  })
})
