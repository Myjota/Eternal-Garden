import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function MemorialHero({
  memorial,
  totalCandles,
  onLightCandle,
}) {
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

      <p className="mt-4">
        {memorial.biography}
      </p>

      <Button onClick={onLightCandle} disabled={!onLightCandle}>
        Light Candle ({totalCandles})
      </Button>

    </section>
  )
}
