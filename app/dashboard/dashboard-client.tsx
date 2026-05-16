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
  Plus,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Empty } from '@/components/ui/empty'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'
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
  const [memorials, setMemorials] = useState(initialMemorials)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { locale } = useLocale({ user })
  const t = getTranslations(locale)

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

      {/* SaaS page wrapper */}
      <div className="min-h-screen bg-background">

        {/* CONTENT */}
        <main className="container mx-auto px-4 py-10 max-w-6xl">

          {/* HEADER BLOCK */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold">
                {t.dashboard.title}
              </h1>

              <p className="text-muted-foreground mt-1">
                Sveiki, <span className="text-foreground font-medium">{displayName}</span>
              </p>
            </div>
            
            <Button asChild>
              <Link href="/create">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sukurti naują</span>
                <span className="sm:hidden">Naujas</span>
              </Link>
            </Button>
          </div>

          {/* TABS */}
          <Tabs defaultValue="memorials" className="space-y-6">

            <TabsList className="bg-muted/40 border border-border">

              <TabsTrigger value="memorials" className="gap-2">
                <Flame className="h-4 w-4" />
                {t.dashboard.myMemorials}
              </TabsTrigger>

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
                    <Link href="/create">Create Memorial</Link>
                  </Button>
                </Empty>
              ) : (
                <div className="grid gap-6 md:grid-cols-3">

                  {memorials.map((m) => (
                    <Card
                      key={m.id}
                      className="overflow-hidden border border-border shadow-sm hover:shadow-md transition"
                    >

                      {/* IMAGE */}
                      <div className="aspect-[4/3] relative bg-muted">
                        <Image
                          src={m.profile_image_url || placeholder}
                          alt=""
                          fill
                          className="object-cover"
                        />

                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2 flex gap-4">
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {m.candle_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {m.view_count}
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <CardContent className="p-4">

                        <h3 className="font-semibold flex justify-between items-center">
                          {m.first_name} {m.last_name}

                          <span className="text-[10px] text-muted-foreground font-mono">
                            #{m.id.slice(0, 8)}
                          </span>
                        </h3>

                        {/* ACTIONS */}
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

              <Card className="border border-border">
                <CardContent className="p-10 text-center">

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

        </main>

      </div>

    </ThemeProvider>
  )
}
