'use client'

import Image from 'next/image'

export function MemorialHero({ memorial }) {
  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null

  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  const epitaph =
    memorial.epitaph?.trim() || 'Visada liks mūsų širdyse'

  return (
    <section className="relative py-20 text-center overflow-hidden">

      {/* 🌿 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={memorial.profile_image_url || '/images/logo.png'}
          alt=""
          fill
          className="object-cover blur-2xl scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />
      </div>

      {/* PROFILE IMAGE */}
      <div className="relative mx-auto mb-8 h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56">
        <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src={memorial.profile_image_url || '/images/logo.png'}
            alt={`${memorial.first_name} ${memorial.last_name}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ✨ subtle glow */}
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

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 rounded-full bg-green-700 text-white text-sm shadow-md hover:bg-green-800 transition">
          Uždegti žvakę
        </button>
      </div>

    </section>
  )
}
