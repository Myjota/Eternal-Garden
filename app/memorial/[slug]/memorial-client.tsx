'use client'

import { useState } from 'react'

import { MemorialHeader } from '@/memorial-client/components/MemorialHeader'
import { MemorialHero } from '@/memorial-client/components/MemorialHero'
import { MemorialStats } from '@/memorial-client/components/MemorialStats'
import { MemorialActions } from '@/memorial-client/components/MemorialActions'
import { MemorialTabs } from '@/memorial-client/tabs/MemorialTabs'

import { useCandles } from '@/memorial-client/hooks/useCandles'
import { useCondolences } from '@/memorial-client/hooks/useCondolences'

interface Props {
  memorial: any
  timelineEvents: any[]
  galleryItems: any[]
  candles: any[]
  condolences: any[]
  currentUser: any
}

export function MemorialClient({
  memorial,
  timelineEvents,
  galleryItems,
  candles: initialCandles,
  condolences: initialCondolences,
  currentUser,
}: Props) {

  // ─────────────────────────────
  // 1. Hooks (business logic layer)
  // ─────────────────────────────
  const {
    candles,
    hasLitCandle,
    isLoading,
    lightCandle,
  } = useCandles({
    memorialId: memorial.id,
    initialCandles,
    userId: currentUser?.id,
    userEmail: currentUser?.email,
  })

  const {
    items: condolenceItems,
    isSubmitting,
    submitCondolence,
  } = useCondolences({
    memorialId: memorial.id,
    initialItems: initialCondolences,
    userId: currentUser?.id,
  })

  // ─────────────────────────────
  // 2. Derived state
  // ─────────────────────────────
  const totalCandles =
    memorial.candle_count + (hasLitCandle ? 1 : 0)

  // ─────────────────────────────
  // 3. UI actions
  // ─────────────────────────────
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${memorial.first_name} ${memorial.last_name}`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  // ─────────────────────────────
  // 4. Render (PURE UI COMPOSITION)
  // ─────────────────────────────
  return (
    <div data-theme={memorial.theme} className="min-h-screen">

      <MemorialHeader onShare={handleShare} />

      <MemorialHero
        memorial={memorial}
        totalCandles={totalCandles}
      />

      <MemorialStats
        candles={totalCandles}
        views={memorial.view_count}
      />

      <MemorialActions
        hasLitCandle={hasLitCandle}
        isLoading={isLoading}
        allowCandles={memorial.allow_candles}
        onLightCandle={lightCandle}
        onShare={handleShare}
      />

      <MemorialTabs
        timelineEvents={timelineEvents}
        galleryItems={galleryItems}
        condolences={condolenceItems}
        onSubmitCondolence={submitCondolence}
        isSubmittingCondolence={isSubmitting}
      />

    </div>
  )
}
