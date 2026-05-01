'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Sparkles } from 'lucide-react'

interface SupportBlockProps {
  memorialName: string
  onDonate?: () => void
  onBoost?: () => void
  showDonate?: boolean
  showBoost?: boolean
}

export function SupportBlock({
  memorialName,
  onDonate,
  onBoost,
  showDonate = true,
  showBoost = true,
}: SupportBlockProps) {
  if (!showDonate && !showBoost) return null

  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-primary" />
          Palaikymas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Padėkite išsaugoti {memorialName} atminimą amžiams.
        </p>
        <div className="flex flex-wrap gap-3">
          {showDonate && (
            <Button variant="outline" className="gap-2" onClick={onDonate}>
              <Heart className="h-4 w-4" />
              Paaukoti
            </Button>
          )}
          {showBoost && (
            <Button variant="secondary" className="gap-2" onClick={onBoost}>
              <Sparkles className="h-4 w-4" />
              Boost memorialą
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
