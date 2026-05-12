'use client'

import { useState } from 'react'
import {
  Coffee,
  Copy,
  Check,
  Heart,
  QrCode,
} from 'lucide-react'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

const IBAN = 'LT12 3456 7890 1234 5678'

export default function SupportBox() {
  const [copied, setCopied] = useState(false)

  const copyIBAN = async () => {
    await navigator.clipboard.writeText(IBAN)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto">

      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white rounded-3xl">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />

        <CardContent className="relative p-8">

          {/* Top */}
          <div className="flex items-center justify-between mb-8">

            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <Heart className="h-7 w-7 text-pink-400" />
              </div>

              <div>
                <p className="text-sm text-zinc-400">
                  Parama projektui
                </p>

                <h2 className="text-2xl font-bold">
                  Eternal Garden
                </h2>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-3">
              <Coffee className="h-5 w-5 text-amber-300" />
            </div>

          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-zinc-300 leading-relaxed">
              Jūsų parama padeda išlaikyti platformą gyvą,
              kurti naujas funkcijas ir saugoti brangių žmonių atminimą.
            </p>
          </div>

          {/* IBAN BOX */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 mb-6">

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">
                Banko sąskaita
              </span>

              <QrCode className="h-4 w-4 text-zinc-500" />
            </div>

            <p className="text-lg font-semibold tracking-wide break-all">
              {IBAN}
            </p>

            <p className="text-sm text-zinc-400 mt-3">
              Revolut Bank
            </p>

          </div>

          {/* BUTTON */}
          <Button
            onClick={copyIBAN}
            className="w-full h-12 rounded-2xl text-base font-semibold"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Nukopijuota
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Kopijuoti IBAN
              </>
            )}
          </Button>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 mt-6">
            Ačiū už jūsų palaikymą ❤️
          </p>

        </CardContent>
      </Card>

    </div>
  )
}
