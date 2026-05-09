'use client'

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'

import { type ThemeId, themeConfigs } from './config'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  themeConfig: (typeof themeConfigs)[ThemeId]
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // ✅ hard default inside state ONLY
  const [theme, setTheme] = useState<ThemeId>('garden')

  const themeConfig = themeConfigs[theme]

  // apply theme to DOM
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themeConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
