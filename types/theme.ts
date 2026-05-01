export type ThemeCategory = 'free' | 'premium' | 'special'

export interface ThemeColors {
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  border: string
}

export interface ThemeDefinition {
  id: string
  name: string
  nameKey: string
  category: ThemeCategory
  isPremium: boolean
  description: string
  previewImage: string
  colors: ThemeColors
}

export interface ThemeAccess {
  themeId: string
  hasAccess: boolean
  reason: 'free' | 'premium' | 'purchased' | 'trial'
}
