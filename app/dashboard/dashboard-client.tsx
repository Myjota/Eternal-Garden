'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Flame,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Empty } from '@/components/ui/empty'
import { Header } from '@/components/layout/header'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  profile_image_url: string | null
  view_count: number
  candle_count: number
}

interface Profile {
  id: string
  email: string | null
  full_name: string | null
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
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [memorials, setMemorials] = useState(initialMemorials)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const t = getTranslations(locale)

  const handleLocaleChange = (l: Locale) => setLocale(l)

  const handleDelete = async (id: string) => {
    if (!confirm('Ar tikrai norite ištrinti šį atminimą?')) return

    setDeletingId(id)

    const supabase = createClient()
    const { error } = await supabase
      .from('memorials')
      .delete()
      .eq('id', id)

    if (!error) {
      setMemorials((prev) => prev.filter((m) => m.id !== id))
    }

    setDeletingId(null)
  }

  const displayName =
    profile?.full_name ||
    user.email?.split('@')[0] ||
    'Vartotojas'

  const placeholder =
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80'

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
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold">
                {t.dashboard.title}
              </h1>
              <p className="text-muted-foreground">
                Sveiki, {displayName}
              </p>
            </div>

            {/* TABS */}
            <Tabs defaultValue="memorials">

              <TabsList className="mb-6">

                {/* 1. MEMORIALS */}
                <TabsTrigger value="memorials" className="gap-2">
                  <Flame className="h-4 w-4" />
                  {t.dashboard.myMemorials}
                </TabsTrigger>

                {/* 2. FAMILY */}
                <TabsTrigger value="family" className="gap-2">
                  <Users className="h-4 w-4" />
                  Mano šeima
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
                      <Link href="/create">
                        Create Memorial
                      </Link>
                    </Button>
                  </Empty>
                ) : (
                  <div className="grid gap-6 md:grid-cols-3">

                    {memorials.map((m) => (
                      <Card key={m.id}>

                        <div className="aspect-[4/3] relative">
                          <Image
                            src={m.profile_image_url || placeholder}
                            alt=""
                            fill
                            className="object-cover"
                          />

                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 flex gap-4">
                            <span className="flex items-center gap-1">
                              <Flame className="h-4 w-4" />
                              {m.candle_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {m.view_count}
                            </span>
                          </div>
                        </div>

                        <CardContent className="p-4">

                          <h3 className="font-semibold">
                            {m.first_name} {m.last_name}
                          </h3>

                          <div className="flex gap-2 mt-4">

                            <Button asChild size="sm" variant="outline">
                              <Link href={`/dashboard/memorial/${m.id}/edit`}>
                                <Edit className="h-3 w-3" />
                              </Link>
                            </Button>

                            <Button asChild size="sm" variant="outline">
                              <Link href={`/memorial/${m.slug}`}>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500"
                              onClick={() => handleDelete(m.id)}
                              disabled={deletingId === m.id}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>

                          </div>

                        </CardContent>

                      </Card>
                    ))}

                  </div>
                )}

              </TabsContent>

              {/* FAMILY */}
              <TabsContent value="family">

                <Card>
                  <CardContent className="p-6 text-center">

                    <Users className="mx-auto h-10 w-10 text-muted-foreground mb-3" />

                    <h3 className="text-lg font-semibold">
                      Mano šeima
                    </h3>

                    <p className="text-muted-foreground mt-2">
                      Čia bus rodoma jūsų šeimos struktūra ir nariai.
                    </p>

                    <Button className="mt-4">
                      Pridėti šeimos narį
                    </Button>

                  </CardContent>
                </Card>

              </TabsContent>

            </Tabs>

          </div>
        </main>

      </div>

    </ThemeProvider>
  )
              }
