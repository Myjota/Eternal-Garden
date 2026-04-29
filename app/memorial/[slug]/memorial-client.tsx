'use client'

import { MemorialHeader } from './components/MemorialHeader'
import { MemorialHero } from './components/MemorialHero'
import { MemorialStats } from './components/MemorialStats'
import { MemorialActions } from './components/MemorialActions'
import { MemorialTabs } from './tabs/MemorialTabs'

import { useCandles } from './hooks/useCandles'
import { useCondolences } from './hooks/useCondolences'

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

  // 🧠 CANDLES HOOK
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

  // 🧠 CONDOLENCES HOOK
  const {
    items: condolenceItems,
    isSubmitting,
    submitCondolence,
  } = useCondolences({
    memorialId: memorial.id,
    initialItems: initialCondolences,
    userId: currentUser?.id,
  })

  // 🔢 derived state
  const totalCandles =
    memorial.candle_count + (hasLitCandle ? 1 : 0)

  // 🔗 share handler
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

  // 🎨 UI ONLY
  return (
    <div data-theme={memorial.theme} className="min-h-screen">

      {/* HEADER */}
      <MemorialHeader onShare={handleShare} />

      {/* HERO */}
      <MemorialHero
        memorial={memorial}
        totalCandles={totalCandles}
      />

      {/* STATS */}
      <MemorialStats
        candles={totalCandles}
        views={memorial.view_count}
      />

      {/* ACTIONS */}
      <MemorialActions
        hasLitCandle={hasLitCandle}
        isLoading={isLoading}
        allowCandles={memorial.allow_candles}
        onLightCandle={lightCandle}
        onShare={handleShare}
      />

      {/* TABS */}
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
