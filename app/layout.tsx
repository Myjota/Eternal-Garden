import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from '@/lib/i18n'

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

const siteUrl = 'https://your-domain.com'
const siteName = 'Eternal Garden'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Skaitmeninė atminimo vieta`,
    template: `%s | ${siteName}`,
  },
  description:
    'Kurkime amžiną atminimą kartu. Išsaugokite savo artimųjų gyvenimo istorijas ateities kartoms.',
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
  const locale = 'lt'
  const t = getTranslations(locale)

  let user = null

  try {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    user = data?.user ?? null
  } catch {
    // ignore SSR auth errors
  }

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">

        <Header
          locale={locale}
          t={t}
          user={user}
          isAdmin={false}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer t={t} />

        <Analytics />
      </body>
    </html>
  )
}
