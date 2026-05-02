'use client'

import { Header } from '@/components/layout/header'
import { MemorialHero } from '@/components/memorial/MemorialHero'
import { MemorialStats } from '@/components/memorial/MemorialStats'
import { MemorialActions } from '@/components/memorial/MemorialActions'
import { MemorialTabs } from '@/components/memorial/MemorialTabs'
import { CandleSection } from '@/components/memorial/CandleSection' // 🕯️ ADDED

import { useCandles } from '@/hooks/useCandles'
import { useCondolences } from '@/hooks/useCondolences'

import type { User } from '@supabase/supabase-js'
import type { ThemeId } from '@/lib/themes/config'

import type { Locale } from '@/lib/i18n/config'
import type { Translations } from '@/lib/i18n/locales/lt'

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
  locale: Locale
  t: Translations
}

/* ================= COMPONENT ================= */

export function MemorialClient({
  memorial,
  timelineEvents,
  galleryItems,
  candles: initialCandles,
  condolences: initialCondolences,
  currentUser,
  locale,
  t,
}: MemorialClientProps) {
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

  const totalCandles =
    memorial.candle_count + (hasLitCandle ? 1 : 0)

  return (
    <div
      data-theme={memorial.theme}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* HEADER */}
      <Header
        locale={locale}
        t={t}
        user={currentUser}
      />

      {/* HERO */}
      <MemorialHero memorial={memorial} />

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
      />

      {/* 🕯️ CANDLE SECTION (ADDED - EMOTIONAL LAYER) */}
      {memorial.allow_candles && (
        <CandleSection candles={initialCandles} />
      )}

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
