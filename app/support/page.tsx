'use client'

import Link from 'next/link'
import { Coffee, CreditCard, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

export default function SupportPage() {
  const { locale } = useLocale({})
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Paremkite Eternal Garden
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jūsų parama padeda mums tobulinti platformą ir išlaikyti atmintį gyva ateities kartoms.
          </p>
        </div>

        {/* SINGLE SUPPORT OPTION */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="border-primary shadow-lg">
            <CardHeader className="text-center pt-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Coffee className="h-6 w-6 text-primary" />
              </div>

              <CardTitle>Vienkartinė parama</CardTitle>

              <CardDescription>
                Paremkite projektą vienkartine auka
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-2xl font-bold text-primary mb-4">
                Nuo €5
              </p>

              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Paremti
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* WHY */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Kodėl verta paremti?
          </h2>

          <div className="text-muted-foreground space-y-3">
            <p>
              Eternal Garden yra sukurtas siekiant išsaugoti brangių žmonių atminimą skaitmeninėje erdvėje.
            </p>

            <p>Jūsų parama padeda mums:</p>

            <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2">
              <li>Tobulinti platformos funkcijas</li>
              <li>Užtikrinti serverių veikimą</li>
              <li>Kurti naujas temas ir dizainus</li>
              <li>Teikti nemokamas paslaugas visiems</li>
            </ul>
          </div>
        </div>

        {/* BACK */}
        <div className="text-center mt-12">
          <Button variant="ghost" asChild>
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
