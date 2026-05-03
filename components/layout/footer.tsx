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
    <footer className="border-t border-border bg-muted/30">
      {/* Decorative leaf pattern at top */}
      <div className="h-8 bg-primary/5 leaf-decoration" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Eternal Garden"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-serif text-xl font-semibold text-foreground">
                Eternal Garden
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@eternalgarden.lt"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.main}
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.aboutUs}
              </Link>
              <Link
                href="/faq"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.faq}
              </Link>
            </nav>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <nav className="flex flex-col gap-3">
              <Link
                href="/support"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.donate}
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {t.footer.terms}
              </Link>
            </nav>
          </div>

          {/* Empty column for spacing on desktop */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>

      {/* Bottom decorative leaves */}
      <div className="h-4 bg-primary/5 leaf-decoration" />
    </footer>
  )
}
