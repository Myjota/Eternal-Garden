'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame } from 'lucide-react'
import type { Candle } from '@/types/memorial'

interface CandleWallProps {
  candles: Candle[]
  maxDisplay?: number
}

export function CandleWall({ candles, maxDisplay = 12 }: CandleWallProps) {
  const displayCandles = candles.slice(0, maxDisplay)
  const remainingCount = Math.max(0, candles.length - maxDisplay)

  if (candles.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            Uždegtos žvakės
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Būkite pirmas uždegęs žvakę
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          Uždegtos žvakės ({candles.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {displayCandles.map((candle) => (
            <div
              key={candle.id}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title={candle.message || candle.user_name || 'Anonimas'}
            >
              <div className="relative">
                <Flame className="h-8 w-8 text-orange-400 group-hover:text-orange-500 transition-colors animate-pulse" />
              </div>
              <span className="text-xs text-muted-foreground truncate max-w-full">
                {candle.user_name || 'Anonimas'}
              </span>
            </div>
          ))}
        </div>
        {remainingCount > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            +{remainingCount} daugiau žvakių
          </p>
        )}
      </CardContent>
    </Card>
  )
}
