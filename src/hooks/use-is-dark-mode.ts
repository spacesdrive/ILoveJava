import * as React from 'react'

/**
 * Tracks whether dark mode is active by watching the `dark` class on
 * `<html>` (set by ThemeProvider in src/app/providers/theme-provider.tsx).
 * Reads the DOM directly instead of the theme context so components outside
 * src/app - features, which must not import from it - can still react to
 * theme changes for things React state can't reach (e.g. a third-party
 * editor's own `theme` prop, like CodeMirror in src/features/exercises).
 */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  )

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const observer = new MutationObserver(() =>
      setIsDark(root.classList.contains('dark')),
    )
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return isDark
}
