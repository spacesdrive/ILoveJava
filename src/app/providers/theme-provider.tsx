import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeProviderState {
  theme: Theme
  /** The actual light/dark value in effect - resolves "system" against the OS preference. */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'ilovejava:theme'

const ThemeProviderContext = React.createContext<ThemeProviderState | null>(null)

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme !== 'system') return theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system'
  })
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'light' : resolveTheme(theme),
  )

  React.useEffect(() => {
    const applyResolvedTheme = (next: Theme) => {
      const resolved = resolveTheme(next)
      window.document.documentElement.classList.toggle('dark', resolved === 'dark')
      setResolvedTheme(resolved)
    }

    applyResolvedTheme(theme)

    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyResolvedTheme('system')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
