'use client'

import Image from 'next/image'
import { type Translations } from '@/lib/i18n/locales/lt'
import { MemorialSearch } from '@/components/search/memorial-search'

interface HeroSectionProps {
  t: Translations
}

export function HeroSection({ t }: HeroSectionProps) {
  return (
    <section className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4)), linear-gradient(to top, rgba(255, 255, 255, 1), transparent)'
        }}
      >
        <Image
          src="/tree.jpeg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-xl">
          
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={128}
              height={128}
              className="h-24 w-auto md:h-32"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2 font-serif text-xl italic md:text-2xl text-primary">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t.hero.description}
          </p>

          {/* Search */}
          <MemorialSearch
            placeholder={t.hero.searchPlaceholder}
            variant="hero"
            className="mt-8 max-w-md"
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
