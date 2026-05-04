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

  heroImage?: string // 🌿 ADDED

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
    heroImage:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',

    colors: {
      primary: 'oklch(0.65 0.16 70)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.96 0.02 140)',
      secondaryForeground: 'oklch(0.35 0.02 55)',
      accent: 'oklch(0.45 0.08 55)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(0.99 0.005 120)',
      foreground: 'oklch(0.25 0.02 55)',
      muted: 'oklch(0.95 0.01 120)',
      mutedForeground: 'oklch(0.45 0.08 55)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.25 0.02 55)',
      border: 'oklch(0.85 0.03 120)',
    },
  },

  marble: {
    id: 'marble',
    name: 'Marble',
    nameKey: 'themes.marble',
    isPremium: false,
    description: 'Elegant white and gray marble aesthetic',
    heroImage:
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',

    colors: {
      primary: 'oklch(0.50 0.02 80)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.96 0.005 80)',
      secondaryForeground: 'oklch(0.35 0.01 80)',
      accent: 'oklch(0.65 0.10 80)',
      accentForeground: 'oklch(0.20 0.02 80)',
      background: 'oklch(0.985 0.002 80)',
      foreground: 'oklch(0.25 0.01 80)',
      muted: 'oklch(0.94 0.005 80)',
      mutedForeground: 'oklch(0.50 0.01 80)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.25 0.01 80)',
      border: 'oklch(0.88 0.01 80)',
    },
  },

  orthodox: {
    id: 'orthodox',
    name: 'Orthodox',
    nameKey: 'themes.orthodox',
    isPremium: false,
    description:
      'Traditional Orthodox Christian theme with gold and deep red',
    heroImage:
      'https://images.unsplash.com/photo-1600697394936-59934aa76a4f',

    colors: {
      primary: 'oklch(0.75 0.15 70)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.985 0.002 50)',
      secondaryForeground: 'oklch(0.25 0.03 45)',
      accent: 'oklch(0.65 0.16 70)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.25 0.03 45)',
      muted: 'oklch(0.99 0.005 50)',
      mutedForeground: 'oklch(0.45 0.05 30)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.25 0.03 45)',
      border: 'oklch(0.85 0.03 50)',
    },
  },

  'eternal-night': {
    id: 'eternal-night',
    name: 'Eternal Night',
    nameKey: 'themes.eternalNight',
    isPremium: true,
    description: 'Dark theme with starry night sky aesthetic',
    heroImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

    colors: {
      primary: 'oklch(0.70 0.12 260)',
      primaryForeground: 'oklch(0.98 0.03 260)',
      secondary: 'oklch(0.18 0.03 270)',
      secondaryForeground: 'oklch(0.85 0.02 260)',
      accent: 'oklch(0.60 0.10 280)',
      accentForeground: 'oklch(0.98 0.03 260)',
      background: 'oklch(0.15 0.04 280)',
      foreground: 'oklch(0.98 0.03 260)',
      muted: 'oklch(0.21 0.03 270)',
      mutedForeground: 'oklch(0.80 0.15 260)',
      card: 'oklch(0.18 0.03 270)',
      cardForeground: 'oklch(0.98 0.03 260)',
      border: 'oklch(0.50 0.10 260)',
    },
  },

  'rainbow-bridge': {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    nameKey: 'themes.rainbowBridge',
    isPremium: true,
    description: 'Soft pastel theme for pet memorials',
    heroImage:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',

    colors: {
      primary: 'oklch(0.75 0.14 290)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.995 0.01 280)',
      secondaryForeground: 'oklch(0.40 0.12 320)',
      accent: 'oklch(0.68 0.14 290)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(0.995 0.01 300)',
      foreground: 'oklch(0.40 0.12 320)',
      muted: 'oklch(0.995 0.01 300)',
      mutedForeground: 'oklch(0.55 0.06 320)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.40 0.12 320)',
      border: 'oklch(0.90 0.04 300)',
    },
  },

  'sunny-window': {
    id: 'sunny-window',
    name: 'Sunny Window',
    nameKey: 'themes.sunnyWindow',
    isPremium: true,
    description: 'Warm, bright theme with golden sunshine tones',
    heroImage:
      'https://images.unsplash.com/photo-1501973801540-537f08ccae7b',

    colors: {
      primary: 'oklch(0.68 0.16 75)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.985 0.002 85)',
      secondaryForeground: 'oklch(0.20 0.03 75)',
      accent: 'oklch(0.80 0.18 75)',
      accentForeground: 'oklch(0.98 0 0)',
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.20 0.03 75)',
      muted: 'oklch(0.99 0.01 80)',
      mutedForeground: 'oklch(0.50 0.04 75)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.20 0.03 75)',
      border: 'oklch(0.90 0.04 85)',
    },
  },
}

export const defaultTheme: ThemeId = 'garden'
