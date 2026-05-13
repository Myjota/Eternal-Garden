import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eternal Garden | Skaitmeninė atminimo vieta',
  description:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms. Sukurkite gražų, interaktyvų memorialą jūsų mylimam žmogui.',
  keywords: [
    'atminimas',
    'memorialas',
    'elektroninis memorialas',
    'skaitmeninė atmintis',
    'šeimos archyvas',
  ],
  openGraph: {
    type: 'website',
    url: 'https://eternalgarden.eu',
    title: 'Eternal Garden | Skaitmeninė atminimo vieta',
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    siteName: 'Eternal Garden',
    locale: 'lt_LT',
    images: [
      {
        url: 'https://eternalgarden.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Skaitmeninė atminimo vieta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eternal Garden | Skaitmeninė atminimo vieta',
    description:
      'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
    images: ['https://eternalgarden.eu/og-image.png'],
  },
}

'use client'

import { useState, useEffect } from 'react'

import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { VisionSection } from '@/components/landing/vision-section'
import { FamousSection } from '@/components/landing/famous-section'

import { ThemeProvider } from '@/lib/themes/theme-context'

import { getTranslations } from '@/lib/i18n'

import { useLocaleContext } from '@/providers/locale-provider'

import { createClient } from '@/lib/supabase/client'

import type { User } from '@supabase/supabase-js'

export default function HomePage() {

  const [user, setUser] =
    useState<User | null>(null)

  const [isAdmin, setIsAdmin] =
    useState(false)

  // ✅ FIXED
  const { locale } = useLocaleContext()
  const t = getTranslations(locale)

  useEffect(() => {

    const supabase = createClient()

    const loadUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      if (user) {
        const { data: profile } =
          await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single()

        setIsAdmin(profile?.is_admin ?? false)
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        setUser(session?.user ?? null)

        setIsAdmin(false)
      }
    )

    return () => subscription.unsubscribe()

  }, [])

  return (
    <ThemeProvider initialTheme="garden">

      <div className="min-h-screen flex flex-col">

        <main className="flex-1">

          <HeroSection t={t} />
          <VisionSection t={t} />
          <FeaturesSection t={t} />
          <FamousSection t={t} />

        </main>

      </div>

    </ThemeProvider>
  )
}
