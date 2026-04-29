'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Candle {
  id: string
  message: string | null
  visitor_name: string | null
  lit_at: string
}

interface UseCandlesProps {
  memorialId: string
  initialCandles: Candle[]
  userId?: string | null
  userEmail?: string | null
}

export function useCandles({
  memorialId,
  initialCandles,
  userId,
  userEmail,
}: UseCandlesProps) {

  const [candles, setCandles] = useState(initialCandles)
  const [hasLitCandle, setHasLitCandle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClient()

  const lightCandle = async () => {
    if (hasLitCandle || isLoading) return

    setIsLoading(true)

    const { data, error } = await supabase
      .from('candles')
      .insert({
        memorial_id: memorialId,
        user_id: userId || null,
        visitor_name: userEmail?.split('@')[0] || 'Svečias',
      })
      .select()
      .single()

    if (!error && data) {
      setCandles((prev) => [data, ...prev])
      setHasLitCandle(true)
    }

    setIsLoading(false)
  }

  return {
    candles,
    hasLitCandle,
    isLoading,
    lightCandle,
  }
}
