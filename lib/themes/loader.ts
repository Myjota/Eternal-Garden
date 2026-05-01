import { themeConfigs, defaultTheme, type ThemeId, type ThemeConfig } from './config'

/**
 * Load theme configuration by ID
 */
export function loadTheme(themeId: ThemeId | string | null): ThemeConfig {
  if (!themeId || !(themeId in themeConfigs)) {
    return themeConfigs[defaultTheme]
  }
  return themeConfigs[themeId as ThemeId]
}

/**
 * Get theme config or default if not found
 */
export function getThemeConfig(themeId: ThemeId | string | null): ThemeConfig {
  return loadTheme(themeId)
}

/**
 * Generate CSS variables from theme colors
 */
export function generateThemeCSSVariables(theme: ThemeConfig): Record<string, string> {
  const { colors } = theme
  
  return {
    '--primary': colors.primary,
    '--primary-foreground': colors.primaryForeground,
    '--secondary': colors.secondary,
    '--secondary-foreground': colors.secondaryForeground,
    '--accent': colors.accent,
    '--accent-foreground': colors.accentForeground,
    '--background': colors.background,
    '--foreground': colors.foreground,
    '--muted': colors.muted,
    '--muted-foreground': colors.mutedForeground,
    '--card': colors.card,
    '--card-foreground': colors.cardForeground,
    '--border': colors.border,
  }
}

/**
 * Get inline style object for a theme
 */
export function getThemeStyles(themeId: ThemeId | string | null): React.CSSProperties {
  const theme = loadTheme(themeId)
  const variables = generateThemeCSSVariables(theme)
  
  return variables as unknown as React.CSSProperties
}

/**
 * Validate if a theme ID is valid
 */
export function isValidTheme(themeId: string | null | undefined): themeId is ThemeId {
  return !!themeId && themeId in themeConfigs
}

/**
 * Get all available theme IDs
 */
export function getAllThemeIds(): ThemeId[] {
  return Object.keys(themeConfigs) as ThemeId[]
}

/**
 * Get all theme configs as an array
 */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(themeConfigs)
}
