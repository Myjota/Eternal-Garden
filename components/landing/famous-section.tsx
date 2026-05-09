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
        const res = await fetch('/api/famous-memorials')
        const result = await res.json()

        if (!res.ok) throw new Error(result.error)

        if (isActive) {
          setFamousMemorials(result.data || [])
        }
      } catch (e) {
        console.error(e)
      }

      setIsLoading(false)
    }

    load()

    const onFocus = () => load()
    window.addEventListener('focus', onFocus)

    return () => {
      isActive = false
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [famousMemorials])

  const totalPages = Math.ceil(famousMemorials.length / itemsPerPage)

  const currentItems = useMemo(() => {
    return famousMemorials.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    )
  }, [currentPage, famousMemorials])

  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 0))
  const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages - 1))

  if (!isLoading && famousMemorials.length === 0) return null

  return (
    <section className="relative py-16 md:py-24 bg-[#f6f2ec] overflow-hidden">

      {/* 🌫 Soft ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(212,196,168,0.25), transparent 40%),
              radial-gradient(circle at 85% 30%, rgba(45,90,61,0.08), transparent 45%),
              radial-gradient(circle at 50% 90%, rgba(212,196,168,0.18), transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold italic text-[#2d5a3d]">
            {t.famousSection?.title || 'Žymūs Lietuviai'}
          </h2>

          <div className="flex justify-center mt-3">
            <div className="h-px w-16 bg-[#d4c4a8]" />
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1,2,3,4].map(i => (
              <Card
                key={i}
                className="animate-pulse bg-white/60 border border-[#d4c4a8]/30"
              >
                <div className="aspect-[3/4] bg-muted" />
                <CardContent className="p-4">
                  <div className="h-5 bg-muted mb-2" />
                  <div className="h-4 bg-muted w-1/2 mb-2" />
                  <div className="h-8 bg-muted" />
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4
                           w-10 h-10 rounded-full bg-[#2d5a3d] text-white
                           shadow-lg hover:bg-[#244a32] transition"
              >
                <ChevronLeft className="h-5 w-5 mx-auto" />
              </button>
            )}

            {/* Next */}
            {totalPages > 1 && (
              <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4
                           w-10 h-10 rounded-full bg-[#2d5a3d] text-white
                           shadow-lg hover:bg-[#244a32] transition"
              >
                <ChevronRight className="h-5 w-5 mx-auto" />
              </button>
            )}

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {currentItems.map(m => (
                <Link key={m.id} href={`/memorial/${m.slug}`} className="group">
                  <Card
                    className="
                      overflow-hidden bg-white/70 backdrop-blur-sm
                      border border-[#d4c4a8]/40
                      hover:-translate-y-1 hover:shadow-xl
                      transition-all duration-300
                    "
                  >

                    {/* Image */}
                    <div className="aspect-[3/4] relative bg-muted overflow-hidden">
                      {m.photo_url ? (
                        <Image
                          src={m.photo_url}
                          alt={m.name}
                          fill
                          className="object-cover sepia-[0.25] group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl font-serif text-[#2d5a3d]/40">
                            {m.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 text-center border-t border-[#d4c4a8]/30">
                      <h3 className="font-serif font-semibold text-[#1a1a1a] group-hover:text-[#2d5a3d] transition">
                        {m.name}
                      </h3>

                      <p className="text-sm text-[#4a4a4a] mt-1">
                        {m.birth_date ? new Date(m.birth_date).getFullYear() : '?'} – {m.death_date ? new Date(m.death_date).getFullYear() : '?'}
                      </p>

                      <p className="text-xs text-[#6a6a6a] mt-2 line-clamp-2">
                        {m.short_description || 'Žymus Lietuvos žmogus'}
                      </p>
                    </CardContent>

                  </Card>
                </Link>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  )
                      }
