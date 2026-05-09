export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  let preferredLanguage: 'lt' | 'en' = 'lt'

  try {
    if (authUser) {
      const { data } = await supabase
        .from('profiles')
        .select('preferred_language')
        .eq('id', authUser.id)
        .single()

      preferredLanguage =
        data?.preferred_language === 'en' ? 'en' : 'lt'
    }
  } catch {
    preferredLanguage = 'lt'
  }

  return (
    <html
      lang={preferredLanguage}
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <LocaleProvider user={authUser} initialLocale={preferredLanguage}>
          <Header user={authUser} isAdmin={false} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>

        <Analytics />
      </body>
    </html>
  )
}
