'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'

import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Shield,
  Users,
  FileText,
  Star,
  Settings,
  MoreVertical,
  Eye,
  Trash2,
  Check,
  X,
  Plus,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { User } from '@supabase/supabase-js'

const supabase = createClient()

interface Profile {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  is_admin: boolean
  created_at: string
}

interface Memorial {
  id: string
  slug: string
  name: string | null
  first_name: string
  last_name: string
  is_public: boolean
  is_famous: boolean
  created_at: string
  user_id: string
}

const tabs = [
  ['users', Users, 'Vartotojai'],
  ['memorials', FileText, 'Atminimai'],
  ['famous', Star, 'Žymūs'],
  ['settings', Settings, 'Nustatymai'],
] as const

const statusBadge = (value: boolean) => (
  <Badge variant={value ? 'default' : 'secondary'}>
    {value ? 'Viešas' : 'Privatus'}
  </Badge>
)

const formatName = (user: Profile) =>
  `${user.first_name || ''} ${user.last_name || ''}`.trim() || '-'

export default function AdminPage() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<Profile[]>([])
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [loading, setLoading] = useState(true)

  const { locale } = useLocale({ user })
  const t = getTranslations(locale)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data: auth } = await supabase.auth.getUser()

    if (!auth.user) {
      router.replace('/auth/login')
      return
    }

    setUser(auth.user)

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', auth.user.id)
      .single()

    if (!profile?.is_admin) {
      router.replace('/dashboard')
      return
    }

    const [usersRes, memorialsRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false }),

      supabase
        .from('memorials')
        .select('*')
        .order('created_at', { ascending: false }),
    ])

    setUsers(usersRes.data || [])
    setMemorials(memorialsRes.data || [])

    setLoading(false)
  }

  const stats = useMemo(() => {
    return [
      ['Viso vartotojų', users.length],
      ['Viso atminimų', memorials.length],
      ['Vieši', memorials.filter(m => m.is_public).length],
      ['Žymūs', memorials.filter(m => m.is_famous).length],
      ['Administratoriai', users.filter(u => u.is_admin).length],
    ]
  }, [users, memorials])

  const usersMap = useMemo(
    () => new Map(users.map(u => [u.id, u])),
    [users]
  )

  const famousMemorials = useMemo(
    () => memorials.filter(m => m.is_famous || m.is_public),
    [memorials]
  )

  const deleteMemorial = async (id: string) => {
    if (!confirm('Ištrinti atminimą?')) return

    await supabase
      .from('memorials')
      .delete()
      .eq('id', id)

    setMemorials(prev => prev.filter(m => m.id !== id))
  }

  const toggleFamous = async (id: string, current: boolean) => {
    await supabase
      .from('memorials')
      .update({ is_famous: !current })
      .eq('id', id)

    setMemorials(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, is_famous: !current }
          : m
      )
    )
  }

  const actions = (memorial: Memorial) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/memorial/${memorial.slug}`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Peržiūrėti
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteMemorial(memorial.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Ištrinti
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} t={t} locale={locale} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-serif font-semibold">
              Administravimas
            </h1>

            <p className="text-muted-foreground">
              Sistemos valdymas
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {stats.map(([label, value]) => (
            <Card key={label}>
              <CardHeader className="pb-2">
                <CardDescription>{label}</CardDescription>

                <CardTitle className="text-3xl">
                  {value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            {tabs.map(([value, Icon, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* USERS */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Vartotojai</CardTitle>
              </CardHeader>

              <CardContent className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      {['Vardas', 'El. paštas', 'Statusas', 'Data'].map(h => (
                        <th
                          key={h}
                          className="text-left py-3 px-2 text-sm text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {users.map(profile => (
                      <tr key={profile.id} className="border-b">
                        <td className="py-3 px-2">
                          {formatName(profile)}
                        </td>

                        <td className="py-3 px-2 text-muted-foreground">
                          {profile.email || '-'}
                        </td>

                        <td className="py-3 px-2">
                          <Badge
                            variant={profile.is_admin ? 'default' : 'secondary'}
                          >
                            {profile.is_admin ? 'Admin' : 'Vartotojas'}
                          </Badge>
                        </td>

                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString('lt-LT')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEMORIALS */}
          <TabsContent value="memorials">
            <Card>
              <CardHeader>
                <CardTitle>Atminimai</CardTitle>
              </CardHeader>

              <CardContent className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      {['Atminimas', 'Sukūrė', 'Statusas', 'Data', ''].map(h => (
                        <th
                          key={h}
                          className="text-left py-3 px-2 text-sm text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {memorials.map(memorial => (
                      <tr key={memorial.id} className="border-b">
                        <td className="py-3 px-2 font-medium">
                          {memorial.first_name} {memorial.last_name}
                        </td>

                        <td className="py-3 px-2 text-muted-foreground">
                          {usersMap.get(memorial.user_id)?.email || '-'}
                        </td>

                        <td className="py-3 px-2">
                          {statusBadge(memorial.is_public)}
                        </td>

                        <td className="py-3 px-2 text-sm text-muted-foreground">
                          {new Date(memorial.created_at).toLocaleDateString('lt-LT')}
                        </td>

                        <td className="py-3 px-2 text-right">
                          {actions(memorial)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAMOUS */}
          <TabsContent value="famous">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Žymūs žmonės</CardTitle>

                  <CardDescription>
                    Rodomi pagrindiniame puslapyje
                  </CardDescription>
                </div>

                <Button asChild>
                  <Link href="/create?famous=true">
                    <Plus className="h-4 w-4 mr-2" />
                    Sukurti
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {famousMemorials.map(memorial => (
                      <tr key={memorial.id} className="border-b">
                        <td className="py-3 px-2 font-medium">
                          {memorial.name || `${memorial.first_name} ${memorial.last_name}`}
                        </td>

                        <td className="py-3 px-2">
                          {statusBadge(memorial.is_public)}
                        </td>

                        <td className="py-3 px-2">
                          <Button
                            size="sm"
                            variant={memorial.is_famous ? 'default' : 'outline'}
                            onClick={() =>
                              toggleFamous(memorial.id, memorial.is_famous)
                            }
                          >
                            {memorial.is_famous ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </Button>
                        </td>

                        <td className="py-3 px-2 text-right">
                          {actions(memorial)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Nustatymai</CardTitle>

                <CardDescription>
                  Sistemos konfigūracija
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
                }
