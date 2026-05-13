'use client'

import { useState } from 'react'
import { Coffee, Copy, Check, Heart, QrCode, Leaf } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/i18n'
import { useLocaleContext } from '@/providers/locale-provider'

const DATA = {
  iban: 'LT12 3456 7890 1234 5678',
  receiver: 'Eternal Garden',
  bank: 'Revolut Bank',
  purpose: 'Parama Eternal Garden projektui',
}

export default function SupportBox() {
  const [copied, setCopied] = useState(false)
  const { locale } = useLocaleContext()
  const t = getTranslations(locale)

  const copyIBAN = async () => {
    await navigator.clipboard.writeText(DATA.iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-md mx-auto">

      <Card className="relative overflow-hidden rounded-3xl border border-emerald-200/20 shadow-2xl bg-gradient-to-b from-emerald-950 via-zinc-900 to-black text-white">

        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_45%)]" />

        <CardContent className="relative p-8">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-400/20">
                <Leaf className="h-6 w-6 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs text-emerald-300/70">
                  {t.supportPage.supportBoxSubtitle}
                </p>

                <h2 className="text-2xl font-semibold">
                  {t.supportPage.supportBoxTitle}
                </h2>
              </div>

            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-400/20">
              <Coffee className="h-5 w-5 text-emerald-300" />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <p className="text-emerald-100/70 text-sm leading-relaxed">
              {t.supportPage.supportBoxDescription}
            </p>
          </div>

          {/* BANK INFO */}
          <div className="space-y-3 mb-6 text-sm">

            <div className="flex justify-between text-emerald-200/70">
              <span>{t.supportPage.supportBox.receiverLabel}</span>
              <span className="text-emerald-100">{DATA.receiver}</span>
            </div>

            <div className="flex justify-between text-emerald-200/70">
              <span>{t.supportPage.supportBox.bankLabel}</span>
              <span className="text-emerald-100">{DATA.bank}</span>
            </div>

            <div className="flex justify-between text-emerald-200/70">
              <span>{t.supportPage.supportBox.purposeLabel}</span>
              <span className="text-emerald-100 text-right max-w-[180px]">
                {DATA.purpose}
              </span>
            </div>

          </div>

          {/* IBAN BOX */}
          <div className="rounded-2xl border border-emerald-400/20 bg-black/30 backdrop-blur p-5 mb-6">

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-300/60">
                {t.supportPage.supportBox.ibanLabel}
              </span>
              <QrCode className="h-4 w-4 text-emerald-400/60" />
            </div>

            <p className="text-lg font-semibold tracking-wider break-all text-emerald-100">
              {DATA.iban}
            </p>

          </div>

          {/* COPY BUTTON */}
          <Button
            onClick={copyIBAN}
            className="w-full h-12 rounded-2xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-black"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                {t.supportPage.supportBox.copied}
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                {t.supportPage.supportBox.copyIban}
              </>
            )}
          </Button>

          {/* FOOTER */}
          <p className="text-center text-xs text-emerald-300/50 mt-6">
            {t.supportPage.supportBox.thankYou}
          </p>

        </CardContent>
      </Card>

    </div>
  )
}
