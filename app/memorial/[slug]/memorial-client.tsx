'use client'

import { Header } from '@/components/layout/header'
import { MemorialHero } from '@/components/memorial/MemorialHero'
import { MemorialTabs } from '@/components/memorial/MemorialTabs'
import { CandleSection } from '@/components/candle/CandleSection'

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

  return (
    <div
      data-theme={memorial.theme}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* HEADER */}
      <Header locale={locale} t={t} user={currentUser} />

      {/* HERO */}
      <MemorialHero memorial={memorial} />

      {/* 🕯️ SINGLE CANDLE SYSTEM (NEW CORE UX) */}
      {memorial.allow_candles && (
        <CandleSection initialLit={false} />
      )}

      {/* TABS */}
      <MemorialTabs
        timelineEvents={timelineEvents}
        galleryItems={galleryItems}
        condolences={initialCondolences}
      />
    </div>
  )
}
