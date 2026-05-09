import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react'
import { type Translations } from '@/lib/i18n/locales/lt'
import { getTranslations, defaultLocale } from '@/lib/i18n'

interface FooterProps {
  t?: Translations
}

export function Footer({ t: providedT }: FooterProps) {
  const t = providedT ?? getTranslations(defaultLocale)

  return (
    <footer className="relative border-t border-[#d4c4a8]/30 bg-[#1f3d2a] text-white overflow-hidden">

      {/* 🌿 green atmospheric background */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(45,90,61,0.35), transparent 45%),
              radial-gradient(circle at 80% 40%, rgba(212,196,168,0.12), transparent 50%),
              radial-gradient(circle at 50% 90%, rgba(0,0,0,0.25), transparent 60%)
            `,
          }}
        />
      </div>

      {/* Top decorative line */}
      <div className="h-6 bg-white/5" />

      <div className="container mx-auto px-4 py-12 relative z-10">

        <div className="grid gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Eternal Garden"
                width={40}
                height={40}
                className="h-10 w-auto"
              />

              <span className="font-serif text-xl font-semibold text-white">
                Eternal Garden
              </span>
            </Link>

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              {t.footer.tagline}
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">

              <a className="text-white/60 hover:text-[#d4c4a8] transition-colors" href="#">
                <Facebook className="h-5 w-5" />
              </a>

              <a className="text-white/60 hover:text-[#d4c4a8] transition-colors" href="#">
                <Instagram className="h-5 w-5" />
              </a>

              <a className="text-white/60 hover:text-[#d4c4a8] transition-colors" href="#">
                <Youtube className="h-5 w-5" />
              </a>

              <a className="text-white/60 hover:text-[#d4c4a8] transition-colors" href="mailto:info@eternalgarden.lt">
                <Mail className="h-5 w-5" />
              </a>

            </div>

          </div>

          {/* Nav 1 */}
          <div>
            <nav className="flex flex-col gap-3 text-white/80">
              <Link href="/" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.main}
              </Link>
              <Link href="/about" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.aboutUs}
              </Link>
              <Link href="/faq" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.faq}
              </Link>
            </nav>
          </div>

          {/* Nav 2 */}
          <div>
            <nav className="flex flex-col gap-3 text-white/80">
              <Link href="/support" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.donate}
              </Link>
              <Link href="/privacy" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.privacyPolicy}
              </Link>
              <Link href="/terms" className="hover:text-[#d4c4a8] transition-colors">
                {t.footer.terms}
              </Link>
            </nav>
          </div>

          <div className="hidden md:block" />

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-white/60">
            {t.footer.copyright}
          </p>
        </div>
      </div>

      {/* bottom fade */}
      <div className="h-6 bg-gradient-to-t from-black/20 to-transparent" />

    </footer>
  )
}
