'use client'

import { MemorialHero } from '@/components/memorial/MemorialHero'
import { MemorialBiography } from '@/components/memorial/MemorialBiography'
import { MemorialTabs } from '@/components/memorial/MemorialTabs'
import { CandleSection } from '@/components/candle/CandleSection'
import { BurialPlace } from '@/components/memorial/BurialPlace'

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

interface BurialPlaceData {
  id: string
  name: string
  address?: string | null
  city?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
  cemetery_name?: string | null
  section?: string | null
  plot_number?: string | null
}

interface MemorialClientProps {
  memorial: Memorial
  timelineEvents: any[]
  candles: any[]
  condolences: any[]
  burialPlace: BurialPlaceData | null
  currentUser: User | null
  locale: Locale
  t: Translations
}

/* ================= COMPONENT ================= */

export function MemorialClient({
  memorial,
  timelineEvents,
  candles: initialCandles,
  condolences: initialCondolences,
  burialPlace,
  currentUser,
  locale,
  t,
}: MemorialClientProps) {

  return (
    <div
      data-theme={memorial.theme}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* HERO */}
      <MemorialHero memorial={memorial} />

      {/* 🕯️ CANDLE SYSTEM */}
      {memorial.allow_candles && (
        <CandleSection memorialId={memorial.id} initialLit={false} />
      )}

      {/* 🧩 BIOGRAPHY */}
      <MemorialBiography biography={memorial.biography || undefined} />

      {/* 🪦 BURIAL PLACE */}
      {burialPlace && <BurialPlace burialPlace={burialPlace} />}

      {/* TABS */}
      <MemorialTabs
        timelineEvents={timelineEvents}
        condolences={initialCondolences}
        memorialId={memorial.id}
      />
    </div>
  )
        }
