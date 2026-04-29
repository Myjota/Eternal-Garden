'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type ThemeId, themeConfigs, defaultTheme } from './config'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ 
  children,
  initialTheme = defaultTheme,
}: { 
  children: ReactNode
  initialTheme?: ThemeId
}) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme)

  useEffect(() => {
    const config = themeConfigs[theme]
    if (!config) return

    const root = document.documentElement
    const { colors } = config

    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--primary-foreground', colors.primaryForeground)
    root.style.setProperty('--secondary', colors.secondary)
    root.style.setProperty('--secondary-foreground', colors.secondaryForeground)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--accent-foreground', colors.accentForeground)
    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--foreground', colors.foreground)
    root.style.setProperty('--muted', colors.muted)
    root.style.setProperty('--muted-foreground', colors.mutedForeground)
    root.style.setProperty('--card', colors.card)
    root.style.setProperty('--card-foreground', colors.cardForeground)
    root.style.setProperty('--border', colors.border)
    root.style.setProperty('--popover', colors.card)
    root.style.setProperty('--popover-foreground', colors.cardForeground)
    root.style.setProperty('--input', colors.border)
    root.style.setProperty('--ring', colors.primary)

    // Add theme class to body for theme-specific styles
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim()
    document.body.classList.add(`theme-${theme}`)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
