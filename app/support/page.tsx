'use client'

import Link from 'next/link'
import { ArrowLeft, Flower2, Leaf, Trees } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/i18n'
import { useLocaleContext } from '@/providers/locale-provider'

import SupportBox from '@/components/support-box'

export default function SupportPage() {
  const { locale } = useLocaleContext()
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
            {t.supportPage.title}
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.supportPage.description}
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
                {t.supportPage.whyTitle}
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-3xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/70 dark:bg-emerald-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Flower2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold">
                      {t.supportPage.benefits.newFeatures.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.supportPage.benefits.newFeatures.description}
                  </p>
                </div>

                <div className="rounded-3xl border border-green-100 dark:border-green-900/30 bg-green-50/70 dark:bg-green-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Trees className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">
                      {t.supportPage.benefits.stableServers.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.supportPage.benefits.stableServers.description}
                  </p>
                </div>

                <div className="rounded-3xl border border-teal-100 dark:border-teal-900/30 bg-teal-50/70 dark:bg-teal-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="h-5 w-5 text-teal-600" />
                    <h3 className="font-semibold">
                      {t.supportPage.benefits.newDesigns.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.supportPage.benefits.newDesigns.description}
                  </p>
                </div>

                <div className="rounded-3xl border border-lime-100 dark:border-lime-900/30 bg-lime-50/70 dark:bg-lime-950/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Flower2 className="h-5 w-5 text-lime-600" />
                    <h3 className="font-semibold">
                      {t.supportPage.benefits.freeServices.title}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.supportPage.benefits.freeServices.description}
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
              {t.supportPage.backButton}
            </Link>
          </Button>

        </div>

      </div>

    </div>
  )
}
