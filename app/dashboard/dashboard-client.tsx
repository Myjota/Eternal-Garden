'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Flame,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Empty } from '@/components/ui/empty'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  profile_image_url: string | null
  theme: string
  privacy: string
  view_count: number
  candle_count: number
  created_at: string
}

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  preferred_language: string | null
}

interface DashboardClientProps {
  user: User
  profile: Profile | null
  memorials: Memorial[]
}

export function DashboardClient({
  user,
  profile,
  memorials: initialMemorials,
}: DashboardClientProps) {
  const router = useRouter()

  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [memorials, setMemorials] =
    useState<Memorial[]>(initialMemorials)

  const [deletingId, setDeletingId] =
    useState<string | null>(null)

  const t = getTranslations(locale)

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Ar tikrai norite ištrinti šį atminimą?'))
      return

    setDeletingId(id)

    const supabase = createClient()
    const { error } = await supabase
      .from('memorials')
      .delete()
      .eq('id', id)

    if (!error) {
      setMemorials((prev) =>
        prev.filter((m) => m.id !== id)
      )
    }

    setDeletingId(null)
  }

  const placeholderPortrait =
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80&sat=-100'

  const displayName =
    profile?.full_name ||
    user.email?.split('@')[0] ||
    'Vartotojas'

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">

        <Header
          locale={locale}
          t={t}
          onLocaleChange={handleLocaleChange}
          user={user}
        />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

              <div>
                <h1 className="font-serif text-3xl font-bold">
                  {t.dashboard.title}
                </h1>

                <p className="text-muted-foreground mt-1">
                  Sveiki, {displayName}!
                </p>
              </div>

              <div className="flex items-center gap-2">

                <Button asChild>
                  <Link href="/create" className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t.dashboard.createNew}
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>

              </div>
            </div>

            {/* ONLY ONE TAB */}
            <Tabs defaultValue="memorials">

              <TabsList className="mb-6">
                <TabsTrigger value="memorials" className="gap-2">
                  <Flame className="h-4 w-4" />
                  {t.dashboard.myMemorials}
                </TabsTrigger>
              </TabsList>

              {/* MEMORIALS */}
              <TabsContent value="memorials">

                {memorials.length === 0 ? (
                  <Empty
                    icon={Flame}
                    title={t.dashboard.noMemorials}
                    description={t.dashboard.createFirst}
                  >
                    <Button asChild className="mt-4">
                      <Link href="/create" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t.dashboard.createNew}
                      </Link>
                    </Button>
                  </Empty>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {memorials.map((memorial) => (
                      <Card
                        key={memorial.id}
                        className="overflow-hidden"
                      >
                        <div className="aspect-[4/3] relative bg-muted">

                          <Image
                            src={
                              memorial.profile_image_url ||
                              placeholderPortrait
                            }
                            alt={`${memorial.first_name} ${memorial.last_name}`}
                            fill
                            className="object-cover"
                          />

                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex gap-4 text-white text-sm">

                            <span className="flex items-center gap-1">
                              <Flame className="h-4 w-4" />
                              {memorial.candle_count}
                            </span>

                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {memorial.view_count}
                            </span>

                          </div>

                        </div>

                        <CardContent className="p-4">

                          <h3 className="font-semibold">
                            {memorial.first_name}{' '}
                            {memorial.last_name}
                          </h3>

                          <div className="flex gap-2 mt-4">

                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="flex-1"
                            >
                              <Link href={`/dashboard/memorial/${memorial.id}/edit`}>
                                <Edit className="h-3 w-3" />
                              </Link>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <Link href={`/memorial/${memorial.slug}`}>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500"
                              onClick={() =>
                                handleDelete(memorial.id)
                              }
                              disabled={
                                deletingId === memorial.id
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>

                          </div>

                        </CardContent>
                      </Card>
                    ))}

                    {/* ADD NEW */}
                    <Card className="border-dashed">
                      <Link
                        href="/create"
                        className="flex flex-col items-center justify-center h-full min-h-[250px]"
                      >
                        <Plus className="h-10 w-10 text-muted-foreground" />
                        <p className="mt-2 text-sm">
                          {t.dashboard.createNew}
                        </p>
                      </Link>
                    </Card>

                  </div>
                )}

              </TabsContent>

            </Tabs>

          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
