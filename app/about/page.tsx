import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apie mus | Eternal Garden',
  description:
    'Sužinokite apie Eternal Garden misiją - sukurti skaitmeninę atminimo erdvę šeimoms ir bendruomenėms. Mūsų vertybės, komanda ir vizija.',
  keywords: [
    'apie eternal garden',
    'misija',
    'vertybės',
    'atminimas',
    'bendruomenė',
  ],
  openGraph: {
    type: 'website',
    title: 'Apie mus | Eternal Garden',
    description:
      'Sužinokite apie Eternal Garden misiją - sukurti skaitmeninę atminimo erdvę šeimoms ir bendruomenėms.',
    url: 'https://eternalgarden.eu/about',
    images: [
      {
        url: 'https://eternalgarden.eu/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eternal Garden - Apie mus',
      },
    ],
  },
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, Shield, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocaleContext } from '@/providers/locale-provider'

const values = (t: any) => [
  {
    icon: Heart,
    title: t.aboutPage.values.respect.title,
    description: t.aboutPage.values.respect.description,
  },
  {
    icon: Users,
    title: t.aboutPage.values.community.title,
    description: t.aboutPage.values.community.description,
  },
  {
    icon: Shield,
    title: t.aboutPage.values.privacy.title,
    description: t.aboutPage.values.privacy.description,
  },
  {
    icon: Leaf,
    title: t.aboutPage.values.sustainability.title,
    description: t.aboutPage.values.sustainability.description,
  },
]

export default function AboutPage() {
  const { locale } = useLocaleContext()
  const t = getTranslations(locale)

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen bg-background flex flex-col">

        {/* CONTENT */}
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
                {t.aboutPage.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.aboutPage.description}
              </p>
            </div>

            {/* Mission */}
            <div className="max-w-3xl mx-auto mb-16">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-semibold mb-4 text-center">
                    {t.aboutPage.missionTitle}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed text-center">
                    {t.aboutPage.missionDescription}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-semibold mb-8 text-center">
                {t.aboutPage.valuesTitle}
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {values(t).map((value) => (
                  <Card key={value.title}>
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>

                      <h3 className="font-semibold mb-2">
                        {value.title}
                      </h3>

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
                  {t.aboutPage.backToHome}
                </Link>
              </Button>
            </div>

          </div>
        </main>

      </div>
    </ThemeProvider>
  )
}
