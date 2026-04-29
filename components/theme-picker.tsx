'use client'

import { Check, Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { themeConfigs, type ThemeId } from '@/lib/themes/config'

interface ThemePickerProps {
  value: ThemeId
  onChange: (theme: ThemeId) => void
  className?: string
}

// Theme preview images/patterns for each theme
const themePreviewStyles: Record<ThemeId, { 
  background: string
  accent: string
  pattern?: string
  icon?: string
}> = {
  garden: {
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
    accent: '#2e7d32',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5c-2 4-6 8-12 10 6 2 10 6 12 10 2-4 6-8 12-10-6-2-10-6-12-10z\' fill=\'%232e7d3220\' /%3E%3C/svg%3E")',
    icon: '🌳',
  },
  marble: {
    background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 25%, #eeeeee 50%, #e0e0e0 75%, #f5f5f5 100%)',
    accent: '#9e9e9e',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 Q25 10 50 5 T100 10 L100 15 Q75 20 50 15 T0 20 Z\' fill=\'%239e9e9e15\' /%3E%3Cpath d=\'M0 40 Q30 50 60 45 T100 50 L100 55 Q70 60 40 55 T0 60 Z\' fill=\'%239e9e9e10\' /%3E%3C/svg%3E")',
    icon: '🏛️',
  },
  orthodox: {
    background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe082 100%)',
    accent: '#bf360c',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 2v36M2 20h36M20 8v4M20 28v4M8 20h4M28 20h4\' stroke=\'%23bf360c20\' stroke-width=\'1\' fill=\'none\' /%3E%3C/svg%3E")',
    icon: '☦️',
  },
  'eternal-night': {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#e94560',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23ffffff40\' /%3E%3Ccircle cx=\'50\' cy=\'30\' r=\'0.5\' fill=\'%23ffffff30\' /%3E%3Ccircle cx=\'80\' cy=\'20\' r=\'1.5\' fill=\'%23ffffff50\' /%3E%3Ccircle cx=\'30\' cy=\'70\' r=\'1\' fill=\'%23ffffff40\' /%3E%3Ccircle cx=\'70\' cy=\'80\' r=\'0.5\' fill=\'%23ffffff30\' /%3E%3Ccircle cx=\'90\' cy=\'60\' r=\'1\' fill=\'%23ffffff40\' /%3E%3C/svg%3E")',
    icon: '🌙',
  },
  'rainbow-bridge': {
    background: 'linear-gradient(135deg, #fce4ec 0%, #e1f5fe 33%, #f3e5f5 66%, #fff3e0 100%)',
    accent: '#7b1fa2',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M15 45 Q20 35 30 35 Q40 35 45 45\' stroke=\'%237b1fa215\' stroke-width=\'3\' fill=\'none\' /%3E%3Ccircle cx=\'30\' cy=\'20\' r=\'8\' fill=\'%237b1fa210\' /%3E%3C/svg%3E")',
    icon: '🌈',
  },
  'sunny-window': {
    background: 'linear-gradient(135deg, #fffde7 0%, #fff9c4 50%, #fff59d 100%)',
    accent: '#ff6f00',
    pattern: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'15\' fill=\'%23ff6f0010\' /%3E%3Cpath d=\'M40 10v10M40 60v10M10 40h10M60 40h10M18 18l7 7M55 55l7 7M18 62l7-7M55 25l7-7\' stroke=\'%23ff6f0015\' stroke-width=\'2\' /%3E%3C/svg%3E")',
    icon: '☀️',
  },
}

const themeDescriptions: Record<ThemeId, { lt: string; features: string[] }> = {
  garden: {
    lt: 'Klasikinė miško tema su natūraliais žaliais tonais',
    features: ['Lapų ornamentai', 'Natūralūs šešėliai', 'Ramus fonas'],
  },
  marble: {
    lt: 'Elegantiškas marmuro stilius su subtiliais raštais',
    features: ['Marmuro tekstūra', 'Auksiniai akcentai', 'Klasikinis grožis'],
  },
  orthodox: {
    lt: 'Tradicinė stačiatikių tema su aukso ir raudonos deriniais',
    features: ['Bizantijos ornamentai', 'Auksiniai kryžiai', 'Sakralus stilius'],
  },
  'eternal-night': {
    lt: 'Tamsi tema su žvaigždėtu nakties dangumi',
    features: ['Animuotos žvaigždės', 'Mėnulio efektas', 'Kosminė atmosfera'],
  },
  'rainbow-bridge': {
    lt: 'Švelni pastelinė tema augintinių atminimui',
    features: ['Vaivorykštės gradientai', 'Pėdutės dekoracija', 'Švelni atmosfera'],
  },
  'sunny-window': {
    lt: 'Šilta tema su saulės spindulių efektais',
    features: ['Saulės spinduliai', 'Auksiniai tonai', 'Šviesi nuotaika'],
  },
}

export function ThemePicker({ value, onChange, className }: ThemePickerProps) {
  const themes = Object.values(themeConfigs)

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {themes.map((theme) => {
        const isSelected = value === theme.id
        const preview = themePreviewStyles[theme.id]
        const description = themeDescriptions[theme.id]
        
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => !theme.isPremium && onChange(theme.id)}
            disabled={theme.isPremium}
            className={cn(
              'relative group rounded-xl overflow-hidden border-2 transition-all duration-300 text-left',
              isSelected 
                ? 'border-primary ring-2 ring-primary/20 scale-[1.02]' 
                : 'border-border hover:border-primary/50',
              theme.isPremium && 'opacity-75 cursor-not-allowed'
            )}
          >
            {/* Theme Preview */}
            <div 
              className="h-32 relative overflow-hidden"
              style={{ 
                background: preview.background,
                backgroundSize: 'cover',
              }}
            >
              {/* Pattern overlay */}
              <div 
                className="absolute inset-0 opacity-50"
                style={{ 
                  backgroundImage: preview.pattern,
                  backgroundRepeat: 'repeat',
                }}
              />
              
              {/* Mini memorial preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center text-2xl"
                  style={{ 
                    backgroundColor: theme.id === 'eternal-night' ? '#1e1e2e' : 'white',
                    border: `2px solid ${preview.accent}40`,
                  }}
                >
                  <span className="opacity-80">{preview.icon}</span>
                </div>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              {/* Premium badge */}
              {theme.isPremium && (
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  <Sparkles className="h-3 w-3" />
                  Premium
                </div>
              )}
              
              {/* Free badge */}
              {!theme.isPremium && (
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Nemokama
                </div>
              )}
            </div>
            
            {/* Theme Info */}
            <div className="p-4 bg-card">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">
                  {theme.name}
                </h3>
                {theme.isPremium && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {description.lt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {description.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Hover overlay for premium */}
            {theme.isPremium && (
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-4">
                  <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium text-foreground">Premium tema</p>
                  <p className="text-sm text-muted-foreground">Greitai bus prieinama</p>
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
