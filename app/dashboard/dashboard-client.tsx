'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, Settings, User, Flame, Eye, Edit, Trash2, ExternalLink, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

export function DashboardClient({ user, profile, memorials: initialMemorials }: DashboardClientProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [memorials, setMemorials] = useState<Memorial[]>(initialMemorials)
  const [deletingId, setDeletingId] = useState<string | null>(null)
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
    if (!confirm('Ar tikrai norite ištrinti šį atminimą?')) return
    
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase
      .from('memorials')
      .delete()
      .eq('id', id)
    
    if (!error) {
      setMemorials(prev => prev.filter(m => m.id !== id))
    }
    setDeletingId(null)
  }

  // Placeholder portrait
  const placeholderPortrait = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80&sat=-100'

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Vartotojas'

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">
        <Header locale={locale} t={t} onLocaleChange={handleLocaleChange} user={user} />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-foreground">
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
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="memorials" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="memorials" className="gap-2">
                  <Flame className="h-4 w-4" />
                  {t.dashboard.myMemorials}
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  {t.dashboard.profile}
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  {t.dashboard.settings}
                </TabsTrigger>
              </TabsList>

              {/* My Memorials Tab */}
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
                      <Card key={memorial.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/3] relative bg-muted">
                          <Image
                            src={memorial.profile_image_url || placeholderPortrait}
                            alt={`${memorial.first_name} ${memorial.last_name}`}
                            fill
                            className="object-cover"
                          />
                          {/* Overlay with stats */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex items-center gap-4 text-white text-sm">
                              <div className="flex items-center gap-1">
                                <Flame className="h-4 w-4" />
                                {memorial.candle_count}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {memorial.view_count}
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-serif font-semibold text-lg text-foreground">
                            {memorial.first_name} {memorial.last_name}
                          </h3>
                          {memorial.birth_date && memorial.death_date && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(memorial.birth_date).getFullYear()} – {new Date(memorial.death_date).getFullYear()}
                            </p>
                          )}
                          {memorial.biography && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {memorial.biography}
                            </p>
                          )}
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-4">
                            <Button variant="outline" size="sm" asChild className="flex-1">
                              <Link href={`/dashboard/memorial/${memorial.id}/edit`} className="gap-1">
                                <Edit className="h-3 w-3" />
                                {t.common.edit}
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/memorial/${memorial.slug}`}>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(memorial.id)}
                              disabled={deletingId === memorial.id}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Add New Card */}
                    <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors cursor-pointer group">
                      <Link href="/create" className="flex flex-col items-center justify-center h-full min-h-[300px] p-6">
                        <div className="w-16 h-16 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                          <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <p className="mt-4 font-medium text-muted-foreground group-hover:text-foreground">
                          {t.dashboard.createNew}
                        </p>
                      </Link>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>{t.dashboard.profile}</CardTitle>
                    <CardDescription>
                      Tvarkykite savo paskyros informacija
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {displayName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Vardas</label>
                        <p className="text-muted-foreground">{profile?.full_name || '-'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">El. pastas</label>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <Button variant="outline">
                      Redaguoti profili
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>{t.dashboard.settings}</CardTitle>
                    <CardDescription>
                      Tvarkykite savo paskyros nustatymus
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">El. pasto pranesimai</h4>
                          <p className="text-sm text-muted-foreground">
                            Gaukite pranesimus apie naujus komentarus ir zvakes
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Ijungta
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Kalba</h4>
                          <p className="text-sm text-muted-foreground">
                            Pasirinkite sasajos kalba
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Lietuviu
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                        <div>
                          <h4 className="font-medium text-destructive">Istrinti paskyra</h4>
                          <p className="text-sm text-muted-foreground">
                            Negriztamai istrinkite savo paskyra ir visus duomenis
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Istrinti
                        </Button>
                      </div>
                    </div>
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
