'use client'

import { MemorialHeader } from '@/components/memorial/MemorialHeader'
import { MemorialHero } from '@/components/memorial/MemorialHero'
import { MemorialStats } from '@/components/memorial/MemorialStats'
import { MemorialActions } from '@/components/memorial/MemorialActions'
import { MemorialTabs } from '@/components/memorial/MemorialTabs'

import { useCandles } from '@/hooks/useCandles'
import { useCondolences } from '@/hooks/useCondolences'

import type { User } from '@supabase/supabase-js'
import type { ThemeId } from '@/lib/themes/config'

/* ================= TYPES ================= */

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  epitaph: string | null
  profile_image_url: string | null
  cover_image_url: string | null
  theme: ThemeId
  privacy: string
  view_count: number
  candle_count: number
  allow_candles: boolean
  allow_condolences: boolean
}

interface MemorialClientProps {
  memorial: Memorial
  timelineEvents: any[]
  galleryItems: any[]
  candles: any[]
  condolences: any[]
  currentUser: User | null
}

/* ================= COMPONENT ================= */

export function MemorialClient({
  memorial,
  timelineEvents,
  galleryItems,
  candles: initialCandles,
  condolences: initialCondolences,
  currentUser,
}: MemorialClientProps) {

  /* 🧠 HOOKS */

  const {
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

  /* 🔢 DERIVED */

  const totalCandles =
    memorial.candle_count + (hasLitCandle ? 1 : 0)

  /* 🔗 ACTIONS */

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

  /* 🎨 UI */

  return (
    <div
      data-theme={memorial.theme}
      className="min-h-screen bg-background relative overflow-hidden"
    >

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
