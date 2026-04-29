import Image from 'next/image'

export function MemorialHero({
  memorial,
}) {
  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null
  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  return (
    <section className="memorial-hero relative py-16 text-center">
      <div className="profile-image profile-image-ornate mx-auto mb-8 h-64 w-48 sm:h-72 sm:w-56 md:h-80 md:w-64 shadow-lg">
        <div className="relative h-full w-full rounded-md overflow-hidden">
          <Image
            src={memorial.profile_image_url || '/images/logo.png'}
            alt={`${memorial.first_name} ${memorial.last_name}`}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      </div>

      <h1 className="memorial-hero-name">
        {memorial.first_name} {memorial.last_name}
      </h1>

      {(birthDate || deathDate) && (
        <p className="memorial-hero-dates">
          {birthDate || '—'} - {deathDate || '—'}
        </p>
      )}

      {memorial.biography && (
        <p className="memorial-hero-biography">
          {memorial.biography}
        </p>
      )}

    </section>
  )
}
