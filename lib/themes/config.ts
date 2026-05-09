export const themeConfigs = [
  'garden',
  'marble',
  'orthodox',
  'eternal-night',
  'rainbow-bridge',
  'sunny-window',
] as const

export interface ThemeConfig {
  id: ThemeId
  name: string
  nameKey: string
  isPremium: boolean
  description: string
}
