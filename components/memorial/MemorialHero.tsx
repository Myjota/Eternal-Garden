import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function MemorialHero({
  memorial,
  totalCandles,
  onLightCandle,
}) {
  const birthDate = memorial.birth_date
    ? new Date(memorial.birth_date).toLocaleDateString('lt-LT')
    : null
  const deathDate = memorial.death_date
    ? new Date(memorial.death_date).toLocaleDateString('lt-LT')
    : null

  return (
    <section className="relative py-16 text-center">
      <div className="mx-auto mb-6 h-40 w-32 overflow-hidden rounded-lg border border-border bg-muted portrait-frame">
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

      <h1 className="text-4xl font-bold">
        {memorial.first_name} {memorial.last_name}
      </h1>

      {(birthDate || deathDate) && (
        <p className="mt-3 text-sm text-muted-foreground">
          {birthDate || '—'} - {deathDate || '—'}
        </p>
      )}

      {memorial.biography && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {memorial.biography}
        </p>
      )}

      <Button onClick={onLightCandle} disabled={!onLightCandle} className="mt-6">
        Light Candle ({totalCandles})
      </Button>

    </section>
  )
}
