'use client'

import { ThemePicker } from '@/components/theme-picker'
import { type ThemeId } from '@/lib/themes/config'

interface StepThemeProps {
  value: ThemeId
  onChange: (theme: ThemeId) => void
}

export function StepTheme({ value, onChange }: StepThemeProps) {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
          Pasirinkite temą
        </h2>
        <p className="text-muted-foreground">
          Tema nustato atminimo puslapio išvaizdą ir nuotaiką
        </p>
      </div>
      <ThemePicker value={value} onChange={onChange} />
    </div>
  )
}
