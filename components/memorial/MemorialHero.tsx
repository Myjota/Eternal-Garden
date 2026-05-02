'use client'

import Image from 'next/image'

export function MemorialHero({ memorial }) {
  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null

  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  // ✨ Epitaph fallback (labai svarbu UX)
  const epitaph =
    memorial.epitaph?.trim() || 'Visada liks mūsų širdyse'

  return (
    <section className="memorial-hero relative py-16 text-center">
      
      {/* PROFILE IMAGE */}
      <div className="profile-image profile-image-ornate mx-auto mb-8 h-64 w-48 sm:h-72 sm:w-56 md:h-80 md:w-64 shadow-lg">
        <div className="relative h-full w-full rounded-md overflow-hidden">
          <Image
            src={memorial.profile_image_url || '/images/logo.png'}
            alt={`${memorial.first_name} ${memorial.last_name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 256px"
            priority
          />
        </div>
      </div>

      {/* NAME */}
      <h1 className="memorial-hero-name text-2xl sm:text-3xl md:text-4xl font-serif font-semibold">
        {memorial.first_name} {memorial.last_name}
      </h1>

      {/* ✨ EPITAPH (core element) */}
      <p className="mt-6 text-xl italic text-muted-foreground max-w-xl mx-auto leading-relaxed">
        “{epitaph}”
      </p>

      {/* DATES */}
      {(birthDate || deathDate) && (
        <p className="memorial-hero-dates mt-4 text-sm text-muted-foreground">
          {birthDate || '—'} – {deathDate || '—'}
        </p>
      )}

      {/* OPTIONAL: SHORT BIO (trimmed) */}
      {memorial.biography && (
        <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto line-clamp-3">
          {memorial.biography}
        </p>
      )}

    </section>
  )
}
