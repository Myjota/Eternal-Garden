'use client'

import { createContext, useContext, useLayoutEffect, useState, useRef, type ReactNode } from 'react'
import { type ThemeId, themeConfigs, defaultTheme } from './config'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyThemeColors(theme: ThemeId) {
  const config = themeConfigs[theme]
  if (!config) return

  const root = document.documentElement
  const { colors } = config

  // Apply all CSS variables in a single batch
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
  root.style.setProperty('--destructive', 'oklch(0.55 0.2 25)')
  root.style.setProperty('--destructive-foreground', 'oklch(0.98 0 0)')
  root.style.setProperty('--radius', '0.625rem')

  // Set data-theme attribute for CSS selectors
  root.setAttribute('data-theme', theme)
}

export function ThemeProvider({ 
  children,
  initialTheme = defaultTheme,
}: { 
  children: ReactNode
  initialTheme?: ThemeId
}) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme)
  const isInitialMount = useRef(true)

  // Use useLayoutEffect to apply theme synchronously before paint
  useLayoutEffect(() => {
    applyThemeColors(theme)
    
    // Only skip the initial mount if the theme hasn't changed
    if (isInitialMount.current) {
      isInitialMount.current = false
    }
  }, [theme])

  // Also apply on initialTheme change (for SSR hydration)
  useLayoutEffect(() => {
    if (initialTheme !== theme) {
      setTheme(initialTheme)
    }
  }, [initialTheme])

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
