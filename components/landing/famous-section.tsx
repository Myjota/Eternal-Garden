'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { type Translations } from '@/lib/i18n/locales/lt'

interface FamousMemorial {
  id: string
  slug: string
  name: string
  birth_date: string | null
  death_date: string | null
  short_description: string | null
  photo_url: string | null
}

interface FamousSectionProps {
  t: Translations
}

export function FamousSection({ t }: FamousSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [famousMemorials, setFamousMemorials] = useState<FamousMemorial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFamousMemorials = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('memorials')
        .select('id, slug, name, birth_date, death_date, short_description, photo_url')
        .eq('is_famous', true)
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setFamousMemorials(data)
      }
      setIsLoading(false)
    }

    fetchFamousMemorials()
  }, [])

  const itemsPerPage = 4
  const totalPages = Math.ceil(famousMemorials.length / itemsPerPage)

  const currentItems = useMemo(() => {
    return famousMemorials.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    )
  }, [currentPage, famousMemorials])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)))
  }

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  if (!isLoading && famousMemorials.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl font-semibold text-primary italic md:text-3xl">
            {t.famousSection?.title || 'Žymūs Lietuviai'}
          </h2>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                className="overflow-hidden border border-primary/20 bg-card animate-pulse rounded-none p-0"
              >
                <div className="aspect-[3/4] bg-muted" />
                <CardContent className="p-4">
                  <div className="h-5 bg-muted w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-muted w-1/2 mx-auto mb-2" />
                  <div className="h-8 bg-muted w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="relative">

            {/* Prev */}
            {totalPages > 1 && (
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-40 md:-translate-x-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next */}
            {totalPages > 1 && (
              <button
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-40 md:translate-x-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
              {currentItems.map((memorial) => (
                <Card
                  key={memorial.id}
                  className="overflow-hidden border border-primary/30 bg-card 
                             hover:border-primary/60 transition-all duration-300
                             rounded-none p-0 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted m-0 p-0">
                    {memorial.photo_url ? (
                      <Image
                        src={memorial.photo_url}
                        alt={memorial.name}
                        fill
                        className="object-cover sepia-[0.3]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <span className="text-6xl font-serif text-primary/50">
                          {memorial.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Double frame */}
                    <div className="absolute inset-0 border border-black/20 pointer-events-none" />
                    <div className="absolute inset-[6px] border border-primary/20 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 text-center border-t border-primary/20">
                    <h3 className="font-serif font-semibold text-foreground">
                      {memorial.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : '?'} – {memorial.death_date ? new Date(memorial.death_date).getFullYear() : '?'}
                    </p>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {memorial.short_description || 'Žymus Lietuvos žmogus'}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <Link href={`/memorial/${memorial.slug}`}>
                        {t.famousSection?.viewMemorial || 'Peržiūrėti'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 transition-colors ${
                      currentPage === index
                        ? 'bg-primary'
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  )
        }
