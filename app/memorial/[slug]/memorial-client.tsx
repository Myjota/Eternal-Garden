'use client'

import { MemorialHeader } from '@/components/memorial/MemorialHeader'
import { MemorialHero } from '@/components/memorial/MemorialHero'
import { MemorialStats } from '@/components/memorial/MemorialStats'
import { MemorialActions } from '@/components/memorial/MemorialActions'

// ✅ FIXED (local path)
import { MemorialTabs } from './tabs/MemorialTabs'

import { useCandles } from '@/memorial-client/hooks/useCandles'
import { useCondolences } from '@/memorial-client/hooks/useCondolences'

export function MemorialClient({
  memorial,
  timelineEvents,
  galleryItems,
  candles: initialCandles,
  condolences: initialCondolences,
  currentUser,
}: any) {

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

  const totalCandles =
    memorial.candle_count + (hasLitCandle ? 1 : 0)

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

  return (
    <div data-theme={memorial.theme}>

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
