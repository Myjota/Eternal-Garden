'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'

const faqs = [
  {
    question: 'Kas yra Eternal Garden?',
    answer: 'Eternal Garden yra skaitmeninė atminimo platforma, leidžianti sukurti ilgalaikius atminimo puslapius jūsų artimiesiems. Čia galite dalintis nuotraukomis, gyvenimo istorijomis ir prisiminimais.',
  },
  {
    question: 'Kiek kainuoja sukurti atminimo puslapį?',
    answer: 'Pagrindinės funkcijos yra nemokamos. Galite sukurti atminimo puslapį, pridėti nuotraukų ir gyvenimo įvykių nemokamai. Premium funkcijos ir temos yra mokamos.',
  },
  {
    question: 'Ar mano duomenys yra saugūs?',
    answer: 'Taip, jūsų duomenų saugumas mums yra prioritetas. Naudojame šiuolaikinius šifravimo metodus ir laikomės GDPR reikalavimų.',
  },
  {
    question: 'Ar galiu valdyti, kas mato atminimo puslapį?',
    answer: 'Taip, galite pasirinkti ar atminimo puslapis bus viešas ar privatus. Privačius puslapius matys tik tie, kuriems suteiksite prieigą.',
  },
  {
    question: 'Kaip veikia žvakučių uždegimas?',
    answer: 'Lankytojai gali uždegti virtualią žvakutę atminimo puslapyje, taip parodydami pagarbą ir palaikymą. Tai nemokama funkcija.',
  },
  {
    question: 'Ar galiu redaguoti atminimo puslapį vėliau?',
    answer: 'Taip, galite bet kada redaguoti ir papildyti atminimo puslapį naujomis nuotraukomis, istorijomis ir informacija.',
  },
  {
    question: 'Kiek laiko išliks atminimo puslapis?',
    answer: 'Atminimo puslapiai yra kuriami amžinai. Mes įsipareigojame išsaugoti jūsų prisiminimus ilgalaikėje perspektyvoje.',
  },
  {
    question: 'Kaip susisiekti su jumis?',
    answer: 'Galite susisiekti su mumis el. paštu info@eternalgarden.lt arba per kontaktų formą mūsų svetainėje.',
  },
]

export default function FAQPage() {
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
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Dažniausiai užduodami klausimai
              </h1>
              <p className="text-lg text-muted-foreground">
                Atsakymai į dažniausiai užduodamus klausimus apie Eternal Garden
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="mb-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact CTA */}
            <div className="text-center bg-muted/50 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Neradote atsakymo?
              </h2>
              <p className="text-muted-foreground mb-4">
                Susisiekite su mumis ir mielai atsakysime į jūsų klausimus
              </p>
              <Button asChild>
                <a href="mailto:info@eternalgarden.lt">
                  Susisiekti
                </a>
              </Button>
            </div>

            {/* Back Link */}
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
