'use client'

import Image from 'next/image'

interface MemorialHeroProps {
  memorial: any
  theme?: string
}

export function MemorialHero({
  memorial,
  theme = 'garden',
}: MemorialHeroProps) {

  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null

  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  const epitaph =
    memorial.epitaph?.trim() || 'Visada liks mūsų širdyse'

  // ✅ SAFE CHECK
  const hasCover =
    typeof memorial.cover_image_url === 'string' &&
    memorial.cover_image_url.trim().length > 0

  const profileImage =
    typeof memorial.profile_image_url === 'string' &&
    memorial.profile_image_url.trim().length > 0
      ? memorial.profile_image_url
      : '/images/logo.png'

  return (
    <section className="relative min-h-[70vh] py-20 text-center overflow-hidden">

      {/* ============================================
         HERO BACKGROUND LAYER
         ============================================ */}
      <div className="absolute inset-0 memorial-cover">

        {hasCover && (
          <Image
            src={memorial.cover_image_url}
            alt=""
            fill
            priority
            className="object-cover scale-110 blur-sm opacity-40"
          />
        )}

      </div>

      {/* ============================================
         CONTENT (always above background)
         ============================================ */}
      <div className="relative z-10">

        {/* PROFILE IMAGE */}
        <div className="relative mx-auto mb-8 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56">
          <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-white shadow-2xl">

            <Image
              src={profileImage}
              alt={`${memorial.first_name} ${memorial.last_name}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(0,0,0,0.15)]" />
        </div>

        {/* NAME */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight">
          {memorial.first_name} {memorial.last_name}
        </h1>

        {/* EPITAPH */}
        <p className="mt-6 text-lg sm:text-xl italic text-muted-foreground max-w-xl mx-auto leading-relaxed">
          “{epitaph}”
        </p>

        {/* DATES */}
        {(birthDate || deathDate) && (
          <p className="mt-4 text-sm text-muted-foreground">
            {birthDate || '—'} – {deathDate || '—'}
          </p>
        )}

        {/* BIO */}
        {memorial.biography && (
          <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto line-clamp-3">
            {memorial.biography}
          </p>
        )}

      </div>
    </section>
  )
}
