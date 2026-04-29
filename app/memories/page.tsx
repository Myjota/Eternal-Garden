'use client'

import { ThemeProvider } from '@/lib/themes/theme-context'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

import { getTranslations } from '@/lib/i18n'
import { useMemories } from '@/hooks/useMemories'

import { MemoriesHero } from '@/components/memories/MemoriesHero'
import { MemoriesSearch } from '@/components/memories/MemoriesSearch'
import { MemoriesGrid } from '@/components/memories/MemoriesGrid'

export default function MemoriesPage() {
  const {
    locale,
    setLocale,
    searchQuery,
    setSearchQuery,
    filteredMemorials,
  } = useMemories()

  const t = getTranslations(locale)

  return (
    <ThemeProvider initialTheme="garden">

      <div className="min-h-screen flex flex-col bg-background">

        <Header
          locale={locale}
          t={t}
          onLocaleChange={setLocale}
        />

        <main className="flex-1">

          {/* HERO */}
          <MemoriesHero
            title={t.nav.memories}
            description="Atraskite ir prisiminkite tuos, kurie paliko pėdsaką istorijoje ir mūsų širdyse."
          />

          {/* SEARCH */}
          <MemoriesSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t.hero.searchPlaceholder}
          />

          {/* GRID */}
          <MemoriesGrid
            items={filteredMemorials}
            t={t}
          />

        </main>

        <Footer t={t} />

      </div>

    </ThemeProvider>
  )
}
