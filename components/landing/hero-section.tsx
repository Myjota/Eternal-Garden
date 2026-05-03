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
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: CONTENT */}
          <div className="max-w-xl">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/images/logo.png"
                alt="Eternal Garden"
                width={128}
                height={128}
                className="h-24 w-auto md:h-32"
              />
            </div>

            {/* Title */}
            <h1 className={`font-serif text-4xl font-bold md:text-5xl lg:text-6xl ${isMarble ? 'text-[#1a1a1a]' : 'text-foreground'}`}>
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className={`mt-2 font-serif text-xl italic md:text-2xl ${isMarble ? 'text-[#2d5a3d]' : 'text-primary'}`}>
              {t.hero.subtitle}
            </p>

            {/* Description */}
            <p className={`mt-6 text-lg leading-relaxed ${isMarble ? 'text-[#4a4a4a]' : 'text-muted-foreground'}`}>
              {t.hero.description}
            </p>

            {/* Search */}
            <MemorialSearch 
              placeholder={t.hero.searchPlaceholder}
              variant="hero"
              className="mt-8 max-w-md"
            />
          </div>

          {/* RIGHT: IMAGE */}
          <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={heroImage}
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />

            {/* Optional soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  )
}
