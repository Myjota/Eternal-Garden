import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagalba ir palaikymas | Eternal Garden',
  description:
    'Skaitykite Eternal Garden pagalbos ir paramos informaciją. Susisiekite su mūsų komanda, jei turite klausimų arba problemų.',
  keywords: [
    'pagalba',
    'paramos',
    'kontaktai',
    'eternal garden',
  ],
  openGraph: {
    type: 'website',
    title: 'Pagalba ir palaikymas | Eternal Garden',
    description:
      'Susisiekite su Eternal Garden pagalbos komanda, jei reikalinga pagalba.',
    url: 'https://eternalgarden.eu/support',
  },
}

'use client'

import Link from 'next/link'
import { ArrowLeft, Flower2, Leaf, Trees } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

import SupportBox from '@/components/support-box'

export default function SupportPage() {
  const { locale } = useLocale({})
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-background dark:from-emerald-950/20 dark:via-background dark:to-background">

      <div className="container mx-auto px-4 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">

          <div className="flex items-center justify-center gap-3 mb-6">

            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Flower2 className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>

            <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <Trees className="h-6 w-6 text-teal-600" />
            </div>

          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Eternal Garden
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Jūsų parama padeda puoselėti skaitmeninį atminties sodą —
            vietą, kur prisiminimai, istorijos ir meilė išlieka gyvi
            ateities kartoms.
          </p>

        </div>

        {/* SUPPORT BOX */}
        <div className="mb-20">
          <SupportBox />
        </div>

        {/* WHY */}
        <div className="max-w-4xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/40 dark:border-emerald-900/30 bg-white/70 dark:bg-background/60 backdrop-blur-xl p-8 md:p-12 shadow-xl">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%)]" />

            <div className="relative">

              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-10 text-emerald-800 dark:text-emerald-300">
                Kodėl verta paremti?
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-3xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/70 dark:bg-emerald-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Flower2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold">
                      Naujos funkcijos
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kuriame naujus būdus saugoti prisiminimus,
                    istorijas ir šeimos paveldą.
                  </p>
                </div>

                <div className="rounded-3xl border border-green-100 dark:border-green-900/30 bg-green-50/70 dark:bg-green-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Trees className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">
                      Stabilūs serveriai
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Užtikriname, kad memorialai ir prisiminimai
                    išliktų saugūs ilgus metus.
                  </p>
                </div>

                <div className="rounded-3xl border border-teal-100 dark:border-teal-900/30 bg-teal-50/70 dark:bg-teal-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="h-5 w-5 text-teal-600" />
                    <h3 className="font-semibold">
                      Nauji dizainai
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kuriame jaukią ir estetišką aplinką,
                    primenančią tikrą atminties sodą.
                  </p>
                </div>

                <div className="rounded-3xl border border-lime-100 dark:border-lime-900/30 bg-lime-50/70 dark:bg-lime-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Flower2 className="h-5 w-5 text-lime-600" />
                    <h3 className="font-semibold">
                      Nemokamos paslaugos
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Siekiame, kad Eternal Garden būtų prieinamas
                    visiems žmonėms.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* BACK */}
        <div className="text-center mt-16">

          <Button
            variant="ghost"
            asChild
            className="rounded-2xl px-6 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Grįžti į pradžią
            </Link>
          </Button>

        </div>

      </div>

    </div>
  )
}
