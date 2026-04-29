'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Flame, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import { famousLithuanians } from '@/lib/mock-data'

export default function MemoriesPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [searchQuery, setSearchQuery] = useState('')
  const t = getTranslations(locale)

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  // Filter memorials based on search
  const filteredMemorials = famousLithuanians.filter(memorial => {
    const fullName = `${memorial.firstName} ${memorial.lastName}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase())
  })

  // Placeholder images
  const placeholderImages = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&q=80&sat=-100&sepia=30',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop&q=80&sat=-100&sepia=30',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&q=80&sat=-100&sepia=30',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&q=80&sat=-100&sepia=30',
  ]

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">
        <Header locale={locale} t={t} onLocaleChange={handleLocaleChange} />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4 py-12 text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {t.nav.memories}
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Atraskite ir prisiminkite tuos, kurie paliko pėdsaką istorijoje ir mūsų širdyse.
              </p>
              
              {/* Search */}
              <div className="mt-8 max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base rounded-full"
                />
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                {searchQuery ? `Paieškos rezultatai (${filteredMemorials.length})` : 'Visi atminimai'}
              </h2>
            </div>

            {filteredMemorials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nerasta atminimų pagal jūsų paiešką.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Išvalyti paiešką
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredMemorials.map((memorial, index) => (
                  <Card
                    key={memorial.id}
                    className="overflow-hidden border-2 border-border/50 hover:border-primary/30 transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                      <Image
                        src={placeholderImages[index % placeholderImages.length]}
                        alt={`${memorial.firstName} ${memorial.lastName}`}
                        fill
                        className="object-cover sepia-[0.3] group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Stats overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center gap-4 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4" />
                            {memorial.candlesLit}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {memorial.visitors}
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 text-center">
                      <h3 className="font-serif font-semibold text-foreground">
                        {memorial.firstName} {memorial.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(memorial.birthDate).getFullYear()} – {new Date(memorial.deathDate).getFullYear()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {memorial.biography}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        asChild
                      >
                        <Link href={`/memorial/${memorial.slug}`}>
                          {t.famousSection.viewMemorial}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer t={t} />
      </div>
    </ThemeProvider>
  )
}
