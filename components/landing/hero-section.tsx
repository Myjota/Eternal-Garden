'use client'

import Image from 'next/image'
import { type Translations } from '@/lib/i18n/locales/lt'
import { type ThemeId } from '@/lib/themes/config'
import { MemorialSearch } from '@/components/search/memorial-search'

interface HeroSectionProps {
  t: Translations
  theme?: ThemeId
}

const heroImages: Record<ThemeId, string> = {
  garden: '/tree.jpeg',
  marble: '/images/themes/marble-hero.png',
  orthodox: '/images/themes/orthodox-hero.jpg',
  'eternal-night': '/images/themes/night-hero.jpg',
  'rainbow-bridge': '/images/themes/rainbow-hero.jpg',
  'sunny-window': '/images/themes/sunny-hero.jpg',
}

export function HeroSection({ t, theme = 'garden' }: HeroSectionProps) {
  const heroImage = heroImages[theme] || heroImages.garden
  const isMarble = theme === 'marble'

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">

        {/* NO GAP = seamless surface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch md:min-h-[500px]">

          {/* LEFT */}
          <div className="relative max-w-xl flex flex-col justify-center pr-12">

            {/* RIGHT EDGE FADE (removes line perception) */}
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-background md:to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Eternal Garden"
                  width={128}
                  height={128}
                  className="h-24 w-auto md:h-32"
                />
              </div>

              <h1 className={`font-serif text-4xl font-bold md:text-5xl lg:text-6xl ${isMarble ? 'text-[#1a1a1a]' : 'text-foreground'}`}>
                {t.hero.title}
              </h1>

              <p className={`mt-2 font-serif text-xl italic md:text-2xl ${isMarble ? 'text-[#2d5a3d]' : 'text-primary'}`}>
                {t.hero.subtitle}
              </p>

              <p className={`mt-6 text-lg leading-relaxed ${isMarble ? 'text-[#4a4a4a]' : 'text-muted-foreground'}`}>
                {t.hero.description}
              </p>

              <MemorialSearch 
                placeholder={t.hero.searchPlaceholder}
                variant="hero"
                className="mt-8 max-w-md"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative w-full h-full min-h-[300px] md:min-h-full overflow-hidden">

            <Image
              src={heroImage}
              alt="Hero image"
              fill
              className="object-cover object-center"
              priority
            />

            {/* LEFT FADE INTO TEXT */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background md:to-transparent" />

            {/* subtle bottom cinematic fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  )
}
