'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react'
import { type Translations } from '@/lib/i18n/locales/lt'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { useLocaleContext } from '@/providers/locale-provider'

interface FooterProps {
  t?: Translations
}

// ✅ Contact email (env + fallback)
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'myjota@zohomail.eu'

export function Footer({ t: providedT }: FooterProps) {
  const { locale } = useLocaleContext()
  const t = providedT ?? getTranslations(locale)

  return (
    <footer className="border-t border-[#d4c4a8]/30 bg-[#1f3d2a] text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Top section: Brand + Nav */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-serif text-lg font-semibold text-white">
              Eternal Garden
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">
              {t.footer.main}
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              {t.footer.aboutUs}
            </Link>
            <Link href="/kontaktai" className="hover:text-white transition-colors">
              {t.footer.contact}
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
          </nav>

        </div>

        {/* Bottom section: Copyright + Social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
          
          <p className="text-xs text-white/60">
            {t.footer.copyright}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a className="text-white/60 hover:text-white transition-colors" href="#">
              <Facebook className="h-4 w-4" />
            </a>
            <a className="text-white/60 hover:text-white transition-colors" href="#">
              <Instagram className="h-4 w-4" />
            </a>
            <a className="text-white/60 hover:text-white transition-colors" href="#">
              <Youtube className="h-4 w-4" />
            </a>
            <a className="text-white/60 hover:text-white transition-colors" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail className="h-4 w-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}
