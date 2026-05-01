'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeConfig } from '@/lib/themes/config'

interface ThemeCardProps {
  theme: ThemeConfig
  isSelected?: boolean
  hasAccess?: boolean
  onSelect?: (themeId: string) => void
  onPreview?: (themeId: string) => void
}

export function ThemeCard({
  theme,
  isSelected = false,
  hasAccess = true,
  onSelect,
  onPreview,
}: ThemeCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden border-2 transition-all cursor-pointer group',
        isSelected
          ? 'border-primary shadow-lg'
          : 'border-border/50 hover:border-primary/50'
      )}
      onClick={() => hasAccess && onSelect?.(theme.id)}
    >
      {/* Preview */}
      <div
        className="aspect-[4/3] relative"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Preview content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div
            className="w-12 h-12 rounded-full mb-2"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div
            className="h-3 w-20 rounded"
            style={{ backgroundColor: theme.colors.foreground }}
          />
          <div
            className="h-2 w-16 rounded mt-1"
            style={{ backgroundColor: theme.colors.muted }}
          />
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        )}

        {/* Premium badge */}
        {theme.isPremium && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Premium
          </Badge>
        )}

        {/* Locked overlay */}
        {!hasAccess && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-medium text-sm truncate">{theme.name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {theme.description}
            </p>
          </div>
          {onPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onPreview(theme.id)
              }}
            >
              Peržiūra
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
