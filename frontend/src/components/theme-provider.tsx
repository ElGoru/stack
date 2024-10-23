import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProperties = Readonly<{
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}>

// eslint-disable-next-line functional/no-mixed-types
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ThemeProviderContext = createContext<ThemeProviderState>(undefined!)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...properties
}: ThemeProviderProperties) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme)

  useEffect(() => {
    const root = globalThis.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...properties} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  // eslint-disable-next-line functional/no-throw-statements
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
