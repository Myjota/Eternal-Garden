export const themes = [
  'garden',
  'marble', 
  'orthodox',
  'eternal-night',
  'rainbow-bridge',
  'sunny-window',
] as const

export type ThemeId = (typeof themes)[number]

export interface ThemeConfig {
  id: ThemeId
  name: string
  nameKey: string
  isPremium: boolean
  description: string
  colors: {
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
}

export const themeConfigs: Record<ThemeId, ThemeConfig> = {
  garden: {
    id: 'garden',
    name: 'Garden',
    nameKey: 'themes.garden',
    isPremium: false,
    description: 'Classic forest green theme with natural oak tree imagery',
    colors: {
      primary: 'oklch(0.35 0.12 145)', // Forest green
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.95 0.02 145)',
      secondaryForeground: 'oklch(0.25 0.08 145)',
      accent: 'oklch(0.45 0.10 145)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(0.99 0.005 145)',
      foreground: 'oklch(0.20 0.02 145)',
      muted: 'oklch(0.96 0.01 145)',
      mutedForeground: 'oklch(0.45 0.05 145)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.20 0.02 145)',
      border: 'oklch(0.90 0.02 145)',
    },
  },
  marble: {
    id: 'marble',
    name: 'Marble',
    nameKey: 'themes.marble',
    isPremium: false,
    description: 'Elegant white and gray marble aesthetic',
    colors: {
      primary: 'oklch(0.40 0.01 250)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.95 0.005 250)',
      secondaryForeground: 'oklch(0.30 0.01 250)',
      accent: 'oklch(0.55 0.02 250)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(0.98 0.002 250)',
      foreground: 'oklch(0.25 0.01 250)',
      muted: 'oklch(0.94 0.005 250)',
      mutedForeground: 'oklch(0.50 0.01 250)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.25 0.01 250)',
      border: 'oklch(0.88 0.01 250)',
    },
  },
  orthodox: {
    id: 'orthodox',
    name: 'Orthodox',
    nameKey: 'themes.orthodox',
    isPremium: true,
    description: 'Traditional Orthodox Christian theme with gold and deep red',
    colors: {
      primary: 'oklch(0.55 0.15 50)', // Gold
      primaryForeground: 'oklch(0.15 0.02 30)',
      secondary: 'oklch(0.35 0.12 25)', // Deep red
      secondaryForeground: 'oklch(0.95 0.02 50)',
      accent: 'oklch(0.60 0.12 50)',
      accentForeground: 'oklch(0.15 0.02 30)',
      background: 'oklch(0.97 0.01 50)',
      foreground: 'oklch(0.20 0.03 30)',
      muted: 'oklch(0.93 0.02 50)',
      mutedForeground: 'oklch(0.45 0.05 30)',
      card: 'oklch(0.99 0.005 50)',
      cardForeground: 'oklch(0.20 0.03 30)',
      border: 'oklch(0.85 0.03 50)',
    },
  },
  'eternal-night': {
    id: 'eternal-night',
    name: 'Eternal Night',
    nameKey: 'themes.eternalNight',
    isPremium: true,
    description: 'Dark theme with starry night sky aesthetic',
    colors: {
      primary: 'oklch(0.70 0.15 250)', // Soft blue
      primaryForeground: 'oklch(0.15 0.02 250)',
      secondary: 'oklch(0.30 0.05 280)',
      secondaryForeground: 'oklch(0.90 0.02 250)',
      accent: 'oklch(0.75 0.10 280)',
      accentForeground: 'oklch(0.15 0.02 280)',
      background: 'oklch(0.15 0.02 260)',
      foreground: 'oklch(0.92 0.01 250)',
      muted: 'oklch(0.22 0.03 260)',
      mutedForeground: 'oklch(0.65 0.03 250)',
      card: 'oklch(0.18 0.025 260)',
      cardForeground: 'oklch(0.92 0.01 250)',
      border: 'oklch(0.28 0.04 260)',
    },
  },
  'rainbow-bridge': {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    nameKey: 'themes.rainbowBridge',
    isPremium: true,
    description: 'Soft pastel theme for pet memorials',
    colors: {
      primary: 'oklch(0.65 0.15 280)', // Soft lavender
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.85 0.10 200)', // Soft blue
      secondaryForeground: 'oklch(0.30 0.05 200)',
      accent: 'oklch(0.80 0.12 340)', // Soft pink
      accentForeground: 'oklch(0.25 0.05 340)',
      background: 'oklch(0.98 0.01 280)',
      foreground: 'oklch(0.30 0.03 280)',
      muted: 'oklch(0.94 0.02 280)',
      mutedForeground: 'oklch(0.50 0.04 280)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.30 0.03 280)',
      border: 'oklch(0.90 0.03 280)',
    },
  },
  'sunny-window': {
    id: 'sunny-window',
    name: 'Sunny Window',
    nameKey: 'themes.sunnyWindow',
    isPremium: true,
    description: 'Warm, bright theme with golden sunshine tones',
    colors: {
      primary: 'oklch(0.65 0.16 70)', // Warm amber
      primaryForeground: 'oklch(0.15 0.03 70)',
      secondary: 'oklch(0.92 0.06 80)',
      secondaryForeground: 'oklch(0.30 0.06 70)',
      accent: 'oklch(0.70 0.14 50)', // Soft orange
      accentForeground: 'oklch(0.15 0.03 50)',
      background: 'oklch(0.99 0.01 80)',
      foreground: 'oklch(0.25 0.04 70)',
      muted: 'oklch(0.95 0.02 80)',
      mutedForeground: 'oklch(0.50 0.04 70)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.25 0.04 70)',
      border: 'oklch(0.88 0.04 80)',
    },
  },
}

export const defaultTheme: ThemeId = 'garden'
