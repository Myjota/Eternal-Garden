'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FamousSection } from '@/components/landing/famous-section'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import { type ThemeId } from '@/lib/themes/config'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [theme, setTheme] = useState<ThemeId>('garden')
  const [user, setUser] = useState<User | null>(null)
  const t = getTranslations(locale)

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme)
  }

  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`min-h-screen flex flex-col theme-${theme}`}>
        <Header 
          locale={locale} 
          t={t} 
          onLocaleChange={handleLocaleChange} 
          theme={theme}
          onThemeChange={handleThemeChange}
          user={user} 
        />
        <main className="flex-1">
          <HeroSection t={t} theme={theme} />
          <FeaturesSection t={t} theme={theme} />
          <FamousSection t={t} theme={theme} />
        </main>
        <Footer t={t} theme={theme} />
      </div>
    </ThemeProvider>
  )
}
