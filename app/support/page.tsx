'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

import SupportBox from '@/components/support-box'

export default function SupportPage() {
  const { locale } = useLocale({})
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Paremkite Eternal Garden
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Jūsų parama padeda mums išlaikyti platformą gyvą,
            kurti naujas funkcijas ir išsaugoti brangių žmonių
            atminimą ateities kartoms.
          </p>

        </div>

        {/* SUPPORT BOX */}
        <div className="mb-16">
          <SupportBox />
        </div>

        {/* WHY */}
        <div className="max-w-3xl mx-auto">

          <div className="rounded-3xl border bg-card/50 backdrop-blur p-8 md:p-10">

            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-8">
              Kodėl verta paremti?
            </h2>

            <div className="grid gap-4 text-muted-foreground">

              <div className="rounded-2xl bg-muted/40 p-4">
                💡 Tobulinti platformos funkcijas
              </div>

              <div className="rounded-2xl bg-muted/40 p-4">
                ☁️ Užtikrinti serverių veikimą ir saugumą
              </div>

              <div className="rounded-2xl bg-muted/40 p-4">
                🎨 Kurti naujas temas ir dizainus
              </div>

              <div className="rounded-2xl bg-muted/40 p-4">
                ❤️ Teikti nemokamas paslaugas visiems
              </div>

            </div>

          </div>

        </div>

        {/* BACK */}
        <div className="text-center mt-16">

          <Button
            variant="ghost"
            asChild
            className="rounded-2xl px-6"
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
