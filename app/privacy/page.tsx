'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'

export default function PrivacyPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const t = getTranslations(locale)

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">
        <Header
          locale={locale}
          t={t}
          onLocaleChange={setLocale}
        />

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
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Įvadas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Eternal Garden (toliau – &quot;mes&quot;, &quot;mūsų&quot;) gerbia jūsų privatumą ir įsipareigoja 
                  saugoti jūsų asmens duomenis. Ši privatumo politika paaiškina, kaip mes renkame, 
                  naudojame ir saugome jūsų informaciją.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Kokius duomenis renkame</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mes galime rinkti šią informaciją:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Vardas, pavardė ir el. pašto adresas</li>
                  <li>Paskyros informacija ir slaptažodis (šifruotas)</li>
                  <li>Atminimo puslapiuose įkelta informacija (nuotraukos, tekstai)</li>
                  <li>Naudojimosi statistika ir techninė informacija</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Kaip naudojame duomenis</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Jūsų duomenis naudojame:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Teikti ir tobulinti mūsų paslaugas</li>
                  <li>Sukurti ir valdyti jūsų paskyrą</li>
                  <li>Bendrauti su jumis apie paslaugas</li>
                  <li>Užtikrinti platformos saugumą</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Duomenų saugumas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mes taikome tinkamas technines ir organizacines priemones jūsų duomenų apsaugai. 
                  Visi duomenys yra šifruojami ir saugomi saugiuose serveriuose.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Jūsų teisės</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pagal GDPR turite šias teises:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Gauti prieigą prie savo duomenų</li>
                  <li>Ištaisyti netikslius duomenis</li>
                  <li>Ištrinti savo duomenis</li>
                  <li>Apriboti duomenų tvarkymą</li>
                  <li>Perkelti duomenis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Kontaktai</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jei turite klausimų apie mūsų privatumo politiką, susisiekite su mumis 
                  el. paštu: <a href="mailto:privacy@eternalgarden.lt" className="text-primary hover:underline">privacy@eternalgarden.lt</a>
                </p>
              </section>
            </div>

            {/* Back Link */}
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

        <Footer t={t} />
      </div>
    </ThemeProvider>
  )
}
