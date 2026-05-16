'use client'

import { Check, Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { themes, type ThemeId } from '@/lib/themes/config'

interface ThemePickerProps {
  value: ThemeId
  onChange: (theme: ThemeId) => void
  className?: string
}

// minimal metadata (UI-only)
const themeMeta: Record<ThemeId, {
  name: string
  isPremium: boolean
  icon: string
  description: string
  features: string[]
}> = {
  garden: {
    name: 'Garden',
    isPremium: false,
    icon: '🌳',
    description: 'Klasikinė miško tema su natūraliais žaliais tonais',
    features: ['Lapų ornamentai', 'Natūralūs šešėliai', 'Ramus fonas'],
  },
  marble: {
    name: 'Marble',
    isPremium: false,
    icon: '🏛️',
    description: 'Elegantiškas marmuro stilius',
    features: ['Marmuro tekstūra', 'Auksiniai akcentai', 'Klasikinis grožis'],
  },
  orthodox: {
    name: 'Orthodox',
    isPremium: true,
    icon: '☦️',
    description: 'Tradicinė sakralinė tema',
    features: ['Bizantijos ornamentai', 'Auksiniai kryžiai', 'Sakralus stilius'],
  },
  'eternal-night': {
    name: 'Eternal Night',
    isPremium: true,
    icon: '🌙',
    description: 'Tamsi kosminė atmosfera',
    features: ['Žvaigždės', 'Mėnulio efektas', 'Kosmosas'],
  },
  'rainbow-bridge': {
    name: 'Rainbow Bridge',
    isPremium: true,
    icon: '🌈',
    description: 'Švelni atminimo tema',
    features: ['Pastelės', 'Švelni atmosfera', 'Augintinių tema'],
  },
  'sunny-window': {
    name: 'Sunny Window',
    isPremium: true,
    icon: '☀️',
    description: 'Šilta saulės tema',
    features: ['Saulės šviesa', 'Auksiniai tonai', 'Šiluma'],
  },
}

export function ThemePicker({ value, onChange, className }: ThemePickerProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {themes.map((themeId) => {
        const meta = themeMeta[themeId]
        const isSelected = value === themeId

        return (
          <button
            key={themeId}
            type="button"
            onClick={() => !meta.isPremium && onChange(themeId)}
            disabled={meta.isPremium}
            className={cn(
              'relative group rounded-xl border-2 p-4 text-left transition-all',
              isSelected
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50',
              meta.isPremium && 'opacity-70 cursor-not-allowed'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span>{meta.icon}</span>
                <h3 className="font-semibold">{meta.name}</h3>
              </div>

              {isSelected && <Check className="h-4 w-4 text-primary" />}
              {meta.isPremium && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3">
              {meta.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {meta.features.map((f) => (
                <span
                  key={f}
                  className="text-xs bg-muted px-2 py-0.5 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Premium overlay */}
            {meta.isPremium && (
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl">
                <div className="text-center">
                  <Sparkles className="mx-auto mb-1" />
                  <p className="text-sm font-medium">Premium</p>
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
