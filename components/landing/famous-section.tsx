'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { famousLithuanians } from '@/lib/mock-data'
import { type Translations } from '@/lib/i18n/locales/lt'

interface FamousSectionProps {
  t: Translations
}

export function FamousSection({ t }: FamousSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 4
  const totalPages = Math.ceil(famousLithuanians.length / itemsPerPage)

  const currentItems = useMemo(() => {
    return famousLithuanians.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    )
  }, [currentPage])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)))
  }

  const goPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const goNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl font-semibold text-primary italic md:text-3xl">
            {t.famousSection.title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Prev */}
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-40 md:-translate-x-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-40 md:translate-x-6"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
            {currentItems.map((person) => (
              <Card
                key={person.id}
                className="overflow-hidden border-2 border-primary/20 bg-card hover:border-primary/40 transition-all duration-300"
              >
                {/* IMAGE FIX: using profileImage from mock data */}
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <Image
                    src={person.profileImage}
                    alt={`${person.firstName} ${person.lastName}`}
                    fill
                    className="object-cover sepia-[0.3]"
                  />
                  <div className="absolute inset-2 border border-primary/20 pointer-events-none" />
                </div>

                <CardContent className="p-4 text-center">
                  <h3 className="font-serif font-semibold text-foreground">
                    {person.firstName} {person.lastName}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(person.birthDate).getFullYear()} – {new Date(person.deathDate).getFullYear()}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {person.biography}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <Link href={`/memorial/${person.slug}`}>
                      {t.famousSection.viewMemorial}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentPage === index
                    ? 'bg-primary'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
