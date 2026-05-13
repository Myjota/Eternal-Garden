'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

export default function PrivacyPage() {
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
                Privatumo politika
              </h1>
              <p className="text-muted-foreground">
                Paskutinį kartą atnaujinta: 2024 m. sausio 1 d.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8">

              <section>
                <h2 className="text-xl font-semibold mb-4">1. Įvadas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Eternal Garden gerbia jūsų privatumą ir įsipareigoja saugoti jūsų asmens duomenis.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Kokius duomenis renkame</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Vardas, pavardė ir el. pašto adresas</li>
                  <li>Paskyros informacija</li>
                  <li>Atminimo puslapių turinys</li>
                  <li>Naudojimosi statistika</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Kaip naudojame duomenis</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Paslaugų teikimui</li>
                  <li>Paskyros valdymui</li>
                  <li>Saugumui užtikrinti</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Duomenų saugumas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Duomenys saugomi šifruotuose serveriuose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Jūsų teisės</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Prieiga prie duomenų</li>
                  <li>Duomenų taisymas</li>
                  <li>Duomenų ištrynimas</li>
                  <li>GDPR teisės</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Kontaktai</h2>
                <p className="text-muted-foreground">
                  privacy@eternalgarden.lt
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
