'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeConfig } from '@/lib/themes/config'

interface ThemePreviewCardProps {
  theme: ThemeConfig
  isSelected?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function ThemePreviewCard({
  theme,
  isSelected = false,
  onClick,
  size = 'md',
}: ThemePreviewCardProps) {
  const sizeClasses = {
    sm: 'h-20',
    md: 'h-32',
    lg: 'h-48',
  }

  return (
    <Card
      className={cn(
        'overflow-hidden cursor-pointer transition-all border-2',
        isSelected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-transparent hover:border-primary/50'
      )}
      onClick={onClick}
    >
      {/* Color preview */}
      <div
        className={cn('relative', sizeClasses[size])}
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
          {/* Portrait ring */}
          <div
            className="w-10 h-10 rounded-full shadow-sm flex-shrink-0"
            style={{
              background: theme.id === 'marble'
                ? 'conic-gradient(from 0deg, oklch(0.840 0.085 80), oklch(0.720 0.110 72), oklch(0.840 0.085 80))'
                : theme.colors.primary,
              padding: theme.id === 'marble' ? '2px' : '0',
            }}
          >
            {theme.id === 'marble' && (
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: theme.colors.background }}
              />
            )}
          </div>
          {/* Name lines */}
          <div className="flex flex-col gap-1 items-center">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: '2rem',
                backgroundColor: theme.id === 'marble' ? 'oklch(0.200 0.010 80)' : theme.colors.foreground,
              }}
            />
            <div
              className="h-1 rounded-full"
              style={{
                width: '1.25rem',
                backgroundColor: theme.id === 'marble' ? 'oklch(0.720 0.110 72)' : theme.colors.accent,
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}

        {/* Premium badge */}
        {theme.isPremium && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 text-xs gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Premium
          </Badge>
        )}
      </div>

      {/* Info */}
      <CardContent className="p-2">
        <p className="text-sm font-medium text-center truncate">{theme.name}</p>
      </CardContent>
    </Card>
  )
}
