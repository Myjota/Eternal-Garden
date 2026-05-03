'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, defaultLocale, type Locale } from '@/lib/i18n'
import { Search, User, Calendar, Star, ArrowLeft } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Memorial {
  id: string
  slug: string
  name: string
  first_name: string
  last_name: string
  photo_url: string | null
  birth_date: string | null
  death_date: string | null
  short_description: string | null
  is_famous: boolean
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Memorial[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const t = getTranslations(locale)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('memorials')
      .select('id, slug, name, first_name, last_name, photo_url, birth_date, death_date, short_description, is_famous')
      .eq('is_public', true)
      .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,name.ilike.%${searchQuery}%`)
      .order('is_famous', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && data) {
      setResults(data)
    }

    setIsLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
    // Update URL without reload
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    return new Date(dateStr).getFullYear()
  }

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen bg-background flex flex-col">
        <Header locale={locale} t={t} onLocaleChange={setLocale} user={user} />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Grįžti į pradžią
          </Link>

          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-4">Paieška</h1>
            
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ieškoti atminimų pagal vardą..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner className="h-4 w-4" /> : 'Ieškoti'}
              </Button>
            </form>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="h-8 w-8" />
            </div>
          ) : hasSearched ? (
            <>
              <p className="text-muted-foreground mb-6">
                {results.length === 0 
                  ? `Nerasta rezultatų pagal "${initialQuery || query}"`
                  : `Rasta ${results.length} ${results.length === 1 ? 'rezultatas' : results.length < 10 ? 'rezultatai' : 'rezultatų'}`
                }
              </p>

              {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((memorial) => (
                    <Link key={memorial.id} href={`/memorial/${memorial.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardContent className="p-0">
                          {/* Photo */}
                          <div className="relative aspect-[4/3] bg-muted overflow-hidden rounded-t-lg">
                            {memorial.photo_url ? (
                              <Image
                                src={memorial.photo_url}
                                alt={memorial.name || `${memorial.first_name} ${memorial.last_name}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="h-16 w-16 text-muted-foreground/50" />
                              </div>
                            )}
                            {memorial.is_famous && (
                              <Badge 
                                variant="secondary" 
                                className="absolute top-3 right-3 gap-1 bg-amber-100 text-amber-800"
                              >
                                <Star className="h-3 w-3" />
                                Žymus
                              </Badge>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <h3 className="font-serif font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                              {memorial.name || `${memorial.first_name} ${memorial.last_name}`}
                            </h3>
                            
                            {(memorial.birth_date || memorial.death_date) && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                <Calendar className="h-3 w-3" />
                                {formatDate(memorial.birth_date)} - {formatDate(memorial.death_date)}
                              </p>
                            )}

                            {memorial.short_description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {memorial.short_description}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Įveskite vardą ar pavardę, kad rastumėte atminimo puslapį
              </p>
            </div>
          )}
        </main>

        <Footer t={t} />
      </div>
    </ThemeProvider>
  )
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  )
}
