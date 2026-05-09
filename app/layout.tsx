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
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#166534' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ server-side user (global auth state)
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // default locale (vėliau gali jungti cookie)
  const locale = 'lt'
  const t = getTranslations(locale)

  return (
    <html lang="lt" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">

        {/* GLOBAL HEADER */}
        <Header
          locale={locale}
          t={t}
          user={user}
          isAdmin={false}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

        {/* GLOBAL FOOTER (GREEN THEME READY) */}
        <Footer t={t} />

        {/* SEO STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              url: siteUrl,
              description:
                'Skaitmeninė atminimo platforma šeimos istorijoms ir prisiminimams išsaugoti.',
            }),
          }}
        />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
