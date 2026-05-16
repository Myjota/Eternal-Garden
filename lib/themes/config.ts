export const themes = [
  'garden',
  'marble',
  'orthodox',
  'eternal-night',
  'rainbow-bridge',
  'sunny-window',
] as const

export type ThemeId = (typeof themes)[number]
