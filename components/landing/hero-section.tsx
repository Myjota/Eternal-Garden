'use client'

import Image from 'next/image'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { type Translations } from '@/lib/i18n/locales/lt'
import { type ThemeId } from '@/lib/themes/config'

interface HeroSectionProps {
  t: Translations
  theme?: ThemeId
}

const heroImages: Record<ThemeId, string> = {
  garden: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=80',
  marble: '/images/themes/marble-hero.png',
  orthodox: '/images/themes/orthodox-hero.jpg',
  eternal_night: '/images/themes/night-hero.jpg',
  rainbow_bridge: '/images/themes/rainbow-hero.jpg',
  sunny_window: '/images/themes/sunny-hero.jpg',
}

export function HeroSection({ t, theme = 'garden' }: HeroSectionProps) {
  const heroImage = heroImages[theme] || heroImages.garden
  const isMarble = theme === 'marble'

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Theme-specific overlays */}
        {isMarble ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/95 via-[#faf8f5]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-xl">
          {/* Logo Icon */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={128}
              height={128}
              className="h-24 w-auto md:h-32 md:w-auto"
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

          {/* Search Box */}
          <div className="mt-8 relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder={t.hero.searchPlaceholder}
              className={`pl-12 pr-4 py-6 text-base backdrop-blur border-border rounded-full shadow-lg ${
                isMarble 
                  ? 'bg-white/90 border-[#d4c4a8]' 
                  : 'bg-background/90'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${
        isMarble ? 'from-[#faf8f5]' : 'from-background'
      } to-transparent`} />
    </section>
  )
}
