'use client'

import Image from 'next/image'

interface MemorialHeroProps {
  memorial: any
  theme?: string
}

export function MemorialHero({
  memorial,
}: MemorialHeroProps) {

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
    <section className="memorial-cover memorial-section-top">

      {/* BACKGROUND */}
      <div className="memorial-bg-wrapper">

        <div className="theme-glow-bg" />

        {coverImage && (
          <div className="memorial-bg-image">
            <Image
              src={coverImage}
              alt=""
              fill
              priority
              className="memorial-bg-image-elem"
              sizes="100vw"
            />
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="memorial-content memorial-font-base">

        {/* PROFILE IMAGE */}
        <div className="memorial-profile-container">
          <div className="portrait-frame theme-card-glow">

            <Image
              src={profileImage}
              alt={`${memorial.first_name} ${memorial.last_name}`}
              fill
              className="portrait-image"
              priority
              sizes="200px"
            />
          </div>
        </div>

        {/* NAME */}
        <h1 className="memorial-name memorial-font-heading">
          {memorial.first_name} {memorial.last_name}
        </h1>

        {/* LOCATION */}
        {memorial.location && (
          <p className="memorial-location memorial-font-accent">
            📍 {memorial.location}
          </p>
        )}

        {/* DATES */}
        {(birthDate || deathDate) && (
          <p className="memorial-dates memorial-font-accent">
            {birthDate || '—'} – {deathDate || '—'}
          </p>
        )}

        {/* EPITAPH */}
        <p className="memorial-epitaph memorial-font-body">
          "{epitaph}"
        </p>

      </div>
    </section>
  )
}
