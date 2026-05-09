'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
  theme?: string
}

export function FamousSection({ t }: FamousSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [famousMemorials, setFamousMemorials] = useState<FamousMemorial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 4

  useEffect(() => {
    let isActive = true

    const load = async () => {
      setIsLoading(true)

      try {
        const response = await fetch('/api/famous-memorials')
        const result = await response.json()

        if (!response.ok) {
          console.error('FamousSection - API error:', result.error)
          throw new Error(result.error || 'Failed to fetch famous memorials')
        }

        if (!isActive) return

        if (result.data) {
          setFamousMemorials(result.data)
        }
      } catch (error) {
        console.error('FamousSection - Error:', error)
      }

      setIsLoading(false)
    }

    load()

    const onFocus = () => load()
    const onPageShow = () => load()

    window.addEventListener('focus', onFocus)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      isActive = false
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [famousMemorials])

  const totalPages = Math.ceil(famousMemorials.length / itemsPerPage)

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(0)
    }
  }, [totalPages, currentPage])

  const currentItems = useMemo(() => {
    if (!famousMemorials.length) return []

    return famousMemorials.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    )
  }, [currentPage, famousMemorials])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)))
  }

  const goPrev = () => setCurrentPage(p => (p > 0 ? p - 1 : p))
  const goNext = () => setCurrentPage(p => (p < totalPages - 1 ? p + 1 : p))

  if (!isLoading && famousMemorials.length === 0) return null

  return (
    <section className="relative py-16 md:py-24 bg-muted/30 min-h-[600px] overflow-hidden">

      {/* 🌫 BACKGROUND */}
<div className="absolute inset-0 pointer-events-none opacity-100">
  <div
    className="absolute inset-0"
    style={{
      backgroundColor: '#f6f2ec',
      backgroundImage: `
        linear-gradient(0deg, rgba(212,196,168,0.06), rgba(212,196,168,0.06)),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")
      `,
    }}
  />
</div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header (UNCHANGED) */}
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

            {/* Grid (UNCHANGED) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
              {currentItems.map((memorial) => (
                <Link key={memorial.id} href={`/memorial/${memorial.slug}`} className="group block">
                  <Card
                    className="overflow-hidden border border-primary/30 bg-card 
                               hover:border-primary/60 transition-all duration-300
                               rounded-none p-0 shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                               hover:-translate-y-1 cursor-pointer"
                  >

                    <div className="aspect-[3/4] relative overflow-hidden bg-muted">
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

                      <div className="absolute inset-0 border border-black/20 pointer-events-none" />
                      <div className="absolute inset-[6px] border border-primary/20 pointer-events-none" />
                    </div>

                    <CardContent className="p-4 text-center border-t border-primary/20">
                      <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                        {memorial.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        {memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : '?'} – {memorial.death_date ? new Date(memorial.death_date).getFullYear() : '?'}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {memorial.short_description || 'Žymus Lietuvos žmogus'}
                      </p>
                    </CardContent>

                  </Card>
                </Link>
              ))}
            </div>

            {/* Dots (UNCHANGED) */}
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
