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

  // 🔥 HARD SAFE NORMALIZER (Supabase-proof)
  const normalizeImage = (url: any) => {
    if (typeof url !== 'string') return null

    const cleaned = url.trim().toLowerCase()

    if (
      !cleaned ||
      cleaned === 'null' ||
      cleaned === 'undefined' ||
      cleaned === 'false'
    ) return null

    return url
  }

  const coverImage = normalizeImage(memorial.cover_image_url)
  const profileImage = normalizeImage(memorial.profile_image_url) || '/images/logo.png'

  return (
    <section className="relative min-h-[70vh] py-20 text-center overflow-hidden">

      {/* ============================================
          HERO BACKGROUND (ALWAYS HAS VISUAL)
          ============================================ */}
      <div className="absolute inset-0 z-0">

        {/* 🔥 FALLBACK ALWAYS FIRST (NEVER DEPENDS ON DATA) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(20,80,50,0.25),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(10,60,40,0.18),transparent_65%),linear-gradient(to_bottom,#f7faf7,#eaf3ee)]" />

        {/* OPTIONAL IMAGE OVERLAY */}
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            className="object-cover scale-110 blur-sm opacity-40"
          />
        )}

      </div>

      {/* ============================================
          CONTENT
          ============================================ */}
      <div className="relative z-20">

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
