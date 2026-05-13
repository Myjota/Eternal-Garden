'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'myjota@zohomail.eu'

export default function ContactPage() {
  const { locale } = useLocale({})
  const t = getTranslations(locale)

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                {t.contactPage.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.contactPage.description}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">
                {t.contactPage.getInTouchTitle}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.contactPage.contactInstructions}
              </p>

              <div className="rounded-2xl bg-muted/50 p-6">
                <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-2">
                  {t.contactPage.emailLabel}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg font-semibold text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.contactPage.backButton}
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
