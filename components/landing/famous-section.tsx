'use client'

import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { type Translations } from '@/lib/i18n/locales/lt'
import { useState, useMemo } from 'react'

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

const fetcher = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('memorials')
    .select('id, slug, name, birth_date, death_date, short_description, photo_url')
    .eq('is_famous', true)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as FamousMemorial[]
}

export function FamousSection({ t }: FamousSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4

  // 🔥 SWR MAGIC
  const { data: famousMemorials = [], isLoading } = useSWR(
    'famous-memorials',
    fetcher,
    {
      revalidateOnFocus: true,      // 👈 FIX back navigation bug
      dedupingInterval: 60000,      // 👈 avoids spam fetch
      revalidateOnReconnect: true,
    }
  )

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
    setCurrentPage((p) => (p > 0 ? p - 1 : p))
  }

  const goNext = () => {
    setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : p))
  }

  if (!isLoading && famousMemorials.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30 min-h-[600px]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl font-semibold text-primary italic md:text-3xl">
            {t.famousSection?.title || 'Žymūs Lietuviai'}
          </h2>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
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
              <button onClick={goPrev} className="absolute left-0 top-1/2">
                <ChevronLeft />
              </button>
            )}

            {/* Next */}
            {totalPages > 1 && (
              <button onClick={goNext} className="absolute right-0 top-1/2">
                <ChevronRight />
              </button>
            )}

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
              {currentItems.map((memorial) => (
                <Link key={memorial.id} href={`/memorial/${memorial.slug}`}>
                  <Card className="overflow-hidden border border-primary/30 bg-card hover:border-primary/60 transition-all duration-300">

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
                    </div>

                    <CardContent className="p-4 text-center">
                      <h3 className="font-serif font-semibold">
                        {memorial.name}
                      </h3>
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
