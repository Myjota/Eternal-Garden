'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, Shield, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'

const values = [
  {
    icon: Heart,
    title: 'Pagarba',
    description: 'Kiekvienas atminimas yra unikalus ir vertas pagarbos. Mes kuriame erdvę, kurioje prisiminimai išlieka gyvai.',
  },
  {
    icon: Users,
    title: 'Bendruomenė',
    description: 'Tikime, kad dalintis prisiminimais padeda išgyventi netektį ir išsaugoti ryšį su prarastais artimaisiais.',
  },
  {
    icon: Shield,
    title: 'Privatumas',
    description: 'Jūsų duomenys ir prisiminimai yra saugūs. Mes užtikriname aukščiausią privatumo lygį.',
  },
  {
    icon: Leaf,
    title: 'Tvarumas',
    description: 'Kuriame ilgalaikę platformą, kuri išliks ateities kartoms ir padės išsaugoti šeimų istorijas.',
  },
]

export default function AboutPage() {
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
          <div className="container mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Eternal Garden"
                  width={80}
                  height={80}
                  className="h-20 w-auto"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Apie Eternal Garden
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Skaitmeninė atminimo vieta, skirta išsaugoti jūsų artimųjų gyvenimo istorijas ir prisiminimus ateities kartoms.
              </p>
            </div>

            {/* Mission */}
            <div className="max-w-3xl mx-auto mb-16">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-semibold mb-4 text-center">
                    Mūsų misija
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Mes tikime, kad kiekvienas žmogus nusipelno būti prisimintas. Eternal Garden sukuria 
                    erdvę, kurioje šeimos ir draugai gali dalintis prisiminimais, fotografijomis ir 
                    gyvenimo istorijomis, kad brangių žmonių atmintis išliktų gyva per kartas.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-semibold mb-8 text-center">
                Mūsų vertybės
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value) => (
                  <Card key={value.title}>
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
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
