import type {
  Metadata,
  Viewport,
} from 'next'

import {
  Inter,
  Playfair_Display,
} from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'

import './globals.css'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/server'
import { LocaleProvider } from '@/providers/locale-provider'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const siteUrl = 'https://eternalgarden.eu'
const siteName = 'Eternal Garden'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Skaitmeninė atminimo vieta`,
    template: `%s | ${siteName}`,
  },
  description:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
  verification: {
    google: 'bSkiHT-YJWJl9Dm5J3A5omcwFLdlIAvZyuj3bT8MfTw',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null
  let preferredLanguage: 'lt' | 'en' = 'lt'

  try {
    const supabase = createClient()

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser ?? null

    if (authUser) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('preferred_language')
        .eq('id', authUser.id)
        .single()

      if (profile?.preferred_language === 'en') {
        preferredLanguage = 'en'
      }
    }
  } catch {
    // ignore SSR auth issues
  }

  return (
    <html
      lang={preferredLanguage}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="
        flex
        min-h-screen
        flex-col
        bg-background
        font-sans
        text-foreground
        antialiased
      ">
        <LocaleProvider
          user={user}
          initialLocale={preferredLanguage}
        >
          <Header user={user} isAdmin={false} />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </LocaleProvider>

        <Analytics />
      </body>
    </html>
  )
}
