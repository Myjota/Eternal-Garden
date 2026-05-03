'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  FileText, 
  Settings, 
  Shield,
  Eye,
  Trash2,
  MoreVertical,
  AlertTriangle,
  Star,
  Plus,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  name: string
  first_name: string
  last_name: string
  is_public: boolean
  is_famous: boolean
  photo_url: string | null
  created_at: string
  user_id: string
  profiles?: {
    email: string | null
    first_name: string | null
    last_name: string | null
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [locale] = useState<Locale>(defaultLocale)
  const t = getTranslations(locale)

  // Data states
  const [users, setUsers] = useState<Profile[]>([])
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMemorials: 0,
    publicMemorials: 0,
    famousMemorials: 0,
    adminCount: 0
  })

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      const supabase = createClient()
      
      // Check auth
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        router.push('/auth/login')
        return
      }
      
      setUser(userData.user)

      // Check if admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userData.user.id)
        .single()

      if (!profile?.is_admin) {
        router.push('/dashboard')
        return
      }

      setIsAdmin(true)

      // Load all users
      const { data: allUsers } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (allUsers) {
        setUsers(allUsers)
      }

      // Load all memorials with creator info
      const { data: allMemorials } = await supabase
        .from('memorials')
        .select(`
          id,
          slug,
          name,
          first_name,
          last_name,
          is_public,
          is_famous,
          photo_url,
          created_at,
          user_id,
          profiles:user_id (
            email,
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })

      if (allMemorials) {
        setMemorials(allMemorials as Memorial[])
      }

      // Calculate stats
      setStats({
        totalUsers: allUsers?.length || 0,
        totalMemorials: allMemorials?.length || 0,
        publicMemorials: allMemorials?.filter(m => m.is_public).length || 0,
        famousMemorials: allMemorials?.filter(m => m.is_famous).length || 0,
        adminCount: allUsers?.filter(u => u.is_admin).length || 0
      })

      setLoading(false)
    }

    checkAdminAndLoadData()
  }, [router])

  const handleDeleteMemorial = async (id: string) => {
    if (!confirm('Ar tikrai norite ištrinti šį atminimą? Šis veiksmas negrįžtamas.')) {
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('memorials')
      .delete()
      .eq('id', id)

    if (!error) {
      setMemorials(memorials.filter(m => m.id !== id))
      setStats(prev => ({
        ...prev,
        totalMemorials: prev.totalMemorials - 1
      }))
    }
  }

  const handleToggleFamous = async (id: string, currentValue: boolean) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('memorials')
      .update({ is_famous: !currentValue })
      .eq('id', id)

    if (!error) {
      setMemorials(memorials.map(m => 
        m.id === id ? { ...m, is_famous: !currentValue } : m
      ))
      setStats(prev => ({
        ...prev,
        famousMemorials: currentValue 
          ? prev.famousMemorials - 1 
          : prev.famousMemorials + 1
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} t={t} locale={locale} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif font-semibold">
              Administravimas
            </h1>
          </div>
          <p className="text-muted-foreground">
            Valdykite vartotojus, atminimus ir sistemos nustatymus
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Viso vartotojų</CardDescription>
              <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Viso atminimų</CardDescription>
              <CardTitle className="text-3xl">{stats.totalMemorials}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Vieši atminimai</CardDescription>
              <CardTitle className="text-3xl">{stats.publicMemorials}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Žymūs žmonės</CardDescription>
              <CardTitle className="text-3xl">{stats.famousMemorials}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Administratoriai</CardDescription>
              <CardTitle className="text-3xl">{stats.adminCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Vartotojai
            </TabsTrigger>
            <TabsTrigger value="memorials" className="gap-2">
              <FileText className="h-4 w-4" />
              Atminimai
            </TabsTrigger>
            <TabsTrigger value="famous" className="gap-2">
              <Star className="h-4 w-4" />
              Žymūs žmonės
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Nustatymai
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Vartotojai</CardTitle>
                <CardDescription>
                  Visi registruoti vartotojai sistemoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vardas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">El. paštas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Statusas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Registracija</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((profile) => (
                        <tr key={profile.id} className="border-b last:border-0">
                          <td className="py-3 px-2">
                            {profile.first_name || profile.last_name 
                              ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
                              : '-'}
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">
                            {profile.email || '-'}
                          </td>
                          <td className="py-3 px-2">
                            {profile.is_admin ? (
                              <Badge variant="default" className="gap-1">
                                <Shield className="h-3 w-3" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Vartotojas</Badge>
                            )}
                          </td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">
                            {profile.created_at 
                              ? new Date(profile.created_at).toLocaleDateString('lt-LT')
                              : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {users.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">
                      Nėra registruotų vartotojų
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memorials Tab */}
          <TabsContent value="memorials">
            <Card>
              <CardHeader>
                <CardTitle>Atminimai</CardTitle>
                <CardDescription>
                  Visi sukurti atminimai sistemoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Atminimas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Sukūrė</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Statusas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Data</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Veiksmai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memorials.map((memorial) => (
                        <tr key={memorial.id} className="border-b last:border-0">
                          <td className="py-3 px-2 font-medium">
                            {memorial.first_name} {memorial.last_name}
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">
                            {memorial.profiles?.email || '-'}
                          </td>
                          <td className="py-3 px-2">
                            {memorial.is_public ? (
                              <Badge variant="default">Viešas</Badge>
                            ) : (
                              <Badge variant="secondary">Privatus</Badge>
                            )}
                          </td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">
                            {new Date(memorial.created_at).toLocaleDateString('lt-LT')}
                          </td>
                          <td className="py-3 px-2 text-right">
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
                                  onClick={() => handleDeleteMemorial(memorial.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Ištrinti
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {memorials.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">
                      Nėra sukurtų atminimų
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Famous Tab */}
          <TabsContent value="famous">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Žymūs Lietuviai
                    </CardTitle>
                    <CardDescription>
                      Valdykite žymių žmonių atminimus, kurie rodomi pagrindiniame puslapyje
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/create?famous=true">
                      <Plus className="h-4 w-4 mr-2" />
                      Sukurti žymaus žmogaus atminimą
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vardas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Statusas</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Žymus</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Veiksmai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memorials.filter(m => m.is_famous || m.is_public).map((memorial) => (
                        <tr key={memorial.id} className="border-b last:border-0">
                          <td className="py-3 px-2 font-medium">
                            {memorial.name || `${memorial.first_name} ${memorial.last_name}`}
                          </td>
                          <td className="py-3 px-2">
                            {memorial.is_public ? (
                              <Badge variant="default">Viešas</Badge>
                            ) : (
                              <Badge variant="secondary">Privatus</Badge>
                            )}
                          </td>
                          <td className="py-3 px-2">
                            <Button
                              variant={memorial.is_famous ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleFamous(memorial.id, memorial.is_famous)}
                              className="gap-1"
                            >
                              {memorial.is_famous ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Žymus
                                </>
                              ) : (
                                <>
                                  <X className="h-3 w-3" />
                                  Ne
                                </>
                              )}
                            </Button>
                          </td>
                          <td className="py-3 px-2 text-right">
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
                                  onClick={() => handleDeleteMemorial(memorial.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Ištrinti
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {memorials.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">
                      Nėra sukurtų atminimų. Sukurkite pirmąjį žymaus žmogaus atminimą.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Sistemos nustatymai</CardTitle>
                <CardDescription>
                  Bendri sistemos konfigūracijos nustatymai
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                  <div>
                    <h3 className="font-medium">Admin valdymas</h3>
                    <p className="text-sm text-muted-foreground">
                      Norėdami pridėti ar pašalinti administratorius, tiesiogiai redaguokite
                      <code className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">profiles</code>
                      lentelę Supabase ir pakeiskite
                      <code className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">is_admin</code>
                      lauką į <code className="px-1 py-0.5 bg-muted rounded text-xs">true</code>.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Duomenų bazė</h3>
                      <p className="text-sm text-muted-foreground">Supabase PostgreSQL</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Prisijungta
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer t={t} />
    </div>
  )
}
