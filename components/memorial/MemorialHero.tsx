'use client'

import Image from 'next/image'

interface MemorialHeroProps {
  memorial: any
  theme?: string
}

export function MemorialHero({ memorial }: MemorialHeroProps) {
  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null

  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  const epitaph =
    memorial.epitaph?.trim() || 'Visada liks mūsų širdyse'

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
  const profileImage =
    normalizeImage(memorial.profile_image_url) || '/images/logo.png'

  return (
    <section className="relative min-h-[70vh] py-20 text-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* PROFILE IMAGE */}
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt={`${memorial.first_name} ${memorial.last_name}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* NAME */}
        <h1>
          {memorial.first_name} {memorial.last_name}
        </h1>

        {/* EPITAPH */}
        <p>
          “{epitaph}”
        </p>

        {/* DATES */}
        {(birthDate || deathDate) && (
          <p>
            {birthDate || '—'} – {deathDate || '—'}
          </p>
        )}

        {/* BIO */}
        {memorial.biography && (
          <p>
            {memorial.biography}
          </p>
        )}

      </div>
    </section>
  )
}
