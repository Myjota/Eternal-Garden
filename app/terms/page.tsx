'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'

export default function TermsPage() {
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
                Pirkimo taisyklės
              </h1>
              <p className="text-muted-foreground">
                Paskutinį kartą atnaujinta: 2024 m. sausio 1 d.
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Bendrosios nuostatos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Šios pirkimo taisyklės (toliau – &quot;Taisyklės&quot;) nustato asmens, įsigyjančio prekes 
                  ar paslaugas Eternal Garden platformoje (toliau – &quot;Pirkėjas&quot;), ir UAB &quot;Eternal Garden&quot; 
                  (toliau – &quot;Pardavėjas&quot;) tarpusavio teises, pareigas ir atsakomybę.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Paslaugų užsakymas</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Paslaugas galite užsisakyti:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Registruodamiesi platformoje ir pasirinkdami norimą paslaugų planą</li>
                  <li>Apmokėdami pasirinktą paslaugą per mūsų mokėjimo sistemą</li>
                  <li>Patvirtindami užsakymą el. paštu</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Kainos ir apmokėjimas</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Visos kainos nurodomos eurais ir apima PVM. Apmokėjimą galite atlikti:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Banko kortele (Visa, Mastercard)</li>
                  <li>Banko pavedimu</li>
                  <li>Kitomis palaikomomis mokėjimo sistemomis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Paslaugų teikimas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Prieiga prie įsigytų paslaugų suteikiama iš karto po apmokėjimo patvirtinimo. 
                  Premium funkcijos ir temos aktyvuojamos automatiškai jūsų paskyroje.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Atšaukimas ir pinigų grąžinimas</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Per 14 dienų nuo paslaugos įsigijimo galite atšaukti užsakymą ir susigrąžinti 
                  sumokėtus pinigus, jei paslaugomis dar nepradėjote naudotis. Norėdami atšaukti, 
                  susisiekite su mumis el. paštu.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Atsakomybė</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pardavėjas neatsako už žalą, atsiradusią dėl netinkamo paslaugų naudojimo ar 
                  trečiųjų šalių veiksmų. Pirkėjas įsipareigoja nenaudoti paslaugų neteisėtiems tikslams.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Kontaktai</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jei turite klausimų apie pirkimo taisykles, susisiekite su mumis 
                  el. paštu: <a href="mailto:info@eternalgarden.lt" className="text-primary hover:underline">info@eternalgarden.lt</a>
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
