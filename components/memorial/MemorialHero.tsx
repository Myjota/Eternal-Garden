'use client'

import Image from 'next/image'
import { ThemeId } from '@/lib/themes/config'

interface MemorialHeroProps {
  memorial: any
  theme?: ThemeId
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

  return (
    <section className={`memorial-hero hero--${theme}`}>

      {/* 🌿 BACKGROUND LAYER (CSS THEME ONLY) */}
      <div className="memorial-hero__bg" />

      {/* optional memorial cover overlay (ONLY if exists) */}
      {memorial.cover_image_url && (
        <div className="memorial-hero__cover">
          <Image
            src={memorial.cover_image_url}
            alt=""
            fill
            priority
            className="object-cover scale-110 blur-sm opacity-30"
          />
        </div>
      )}

      {/* PROFILE IMAGE */}
      <div className="memorial-hero__avatar">
        <div className="memorial-hero__avatarInner">
          <Image
            src={memorial.profile_image_url || '/images/logo.png'}
            alt={`${memorial.first_name} ${memorial.last_name}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* CONTENT */}
      <h1 className="memorial-hero__name">
        {memorial.first_name} {memorial.last_name}
      </h1>

      <p className="memorial-hero__epitaph">
        “{epitaph}”
      </p>

      {(birthDate || deathDate) && (
        <p className="memorial-hero__dates">
          {birthDate || '—'} – {deathDate || '—'}
        </p>
      )}

      {memorial.biography && (
        <p className="memorial-hero__bio">
          {memorial.biography}
        </p>
      )}
    </section>
  )
      }
