'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Coffee, CreditCard, Gift, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'

const supportOptions = [
  {
    icon: Coffee,
    title: 'Vienkartinė parama',
    description: 'Paremkite projektą vienkartine auka',
    price: 'Nuo €5',
    popular: false,
  },
  {
    icon: Heart,
    title: 'Mėnesinė parama',
    description: 'Tapkite nuolatiniu rėmėju ir palaikykite projektą kas mėnesį',
    price: 'Nuo €3/mėn',
    popular: true,
  },
  {
    icon: Gift,
    title: 'Premium narystė',
    description: 'Gaukite prieigą prie visų premium temų ir funkcijų',
    price: '€9.99/mėn',
    popular: false,
  },
]

export default function SupportPage() {
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
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Paremkite Eternal Garden
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jūsų parama padeda mums tobulinti platformą ir išlaikyti atmintį gyva ateities kartoms.
              </p>
            </div>

            {/* Support Options */}
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12">
              {supportOptions.map((option) => (
                <Card
                  key={option.title}
                  className={`relative ${option.popular ? 'border-primary shadow-lg' : ''}`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                        Populiariausias
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pt-8">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-primary mb-4">
                      {option.price}
                    </p>
                    <Button
                      className="w-full"
                      variant={option.popular ? 'default' : 'outline'}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Paremti
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why Support */}
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Kodėl verta paremti?
              </h2>
              <div className="text-muted-foreground space-y-3">
                <p>
                  Eternal Garden yra sukurtas siekiant išsaugoti brangių žmonių atminimą skaitmeninėje erdvėje.
                </p>
                <p>
                  Jūsų parama padeda mums:
                </p>
                <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2">
                  <li>Tobulinti platformos funkcijas</li>
                  <li>Užtikrinti serverių veikimą</li>
                  <li>Kurti naujas temas ir dizainus</li>
                  <li>Teikti nemokamas paslaugas visiems</li>
                </ul>
              </div>
            </div>

            {/* Back Link */}
            <div className="text-center mt-12">
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
