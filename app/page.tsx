'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FamousSection } from '@/components/landing/famous-section'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'
import type { ThemeId } from '@/lib/themes/config'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const theme: ThemeId = 'garden'

  const { locale, setLocale } = useLocale({ user })
  const t = getTranslations(locale)

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        setIsAdmin(profile?.is_admin ?? false)
      }
    }

    loadUser()

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null)
        setIsAdmin(false)
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <ThemeProvider initialTheme={theme}>
      <div className="min-h-screen flex flex-col" data-theme={theme}>
        <Header
          locale={locale}
          t={t}
          onLocaleChange={setLocale}
          user={user}
          isAdmin={isAdmin}
        />

        <main className="flex-1">
          <HeroSection t={t} theme={theme} />
          <FeaturesSection t={t} theme={theme} />
          <FamousSection t={t} theme={theme} />
        </main>

        <Footer t={t} />
      </div>
    </ThemeProvider>
  )
}
