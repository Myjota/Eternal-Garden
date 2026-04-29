'use client'

import { Flame, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MemorialActionsProps {
  hasLitCandle: boolean
  isLoading?: boolean
  allowCandles: boolean

  onLightCandle: () => void
  onShare: () => void

  lightLabel?: string
  alreadyLitLabel?: string
}

export function MemorialActions({
  hasLitCandle,
  isLoading = false,
  allowCandles,
  onLightCandle,
  onShare,
  lightLabel = 'Uždegti žvakę',
  alreadyLitLabel = 'Žvakė jau uždegta',
}: MemorialActionsProps) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

      {/* Candle button */}
      {allowCandles && (
        <Button
          onClick={onLightCandle}
          disabled={hasLitCandle || isLoading}
          size="lg"
          className="gap-3 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          {/* Theme-driven effect ONLY via CSS */}
          <Flame className="h-6 w-6 candle-glow" />

          {hasLitCandle ? alreadyLitLabel : lightLabel}
        </Button>
      )}

      {/* Share button */}
      <Button
        variant="ghost"
        size="lg"
        onClick={onShare}
        className="gap-2"
      >
        <Share2 className="h-5 w-5" />
        Share
      </Button>

    </div>
  )
}
