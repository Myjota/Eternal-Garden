'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

export default function TermsPage() {
  const { locale } = useLocale({})
  const t = getTranslations(locale)

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">

        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 max-w-3xl">

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Pirkimo taisyklės
              </h1>
              <p className="text-muted-foreground">
                Paskutinį kartą atnaujinta: 2024 m. sausio 1 d.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">

              <section>
                <h2 className="text-xl font-semibold mb-4">1. Bendrosios nuostatos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Taisyklės nustato pirkėjo ir Eternal Garden tarpusavio teises ir pareigas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Paslaugų užsakymas</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Registracija platformoje</li>
                  <li>Plano pasirinkimas</li>
                  <li>Apmokėjimo patvirtinimas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Kainos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Visos kainos nurodomos eurais su PVM.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Paslaugų teikimas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Prieiga suteikiama iš karto po apmokėjimo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Grąžinimai</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Galimas pinigų grąžinimas per 14 dienų.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Atsakomybė</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Paslaugos naudojamos vartotojo atsakomybe.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Kontaktai</h2>
                <p className="text-muted-foreground">
                  info@eternalgarden.lt
                </p>
              </section>

            </div>

            {/* Back */}
            <div className="mt-12 text-center">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Grįžti į pradžią
                </Link>
              </Button>
            </div>

          </div>
        </main>

      </div>
    </ThemeProvider>
  )
      }
