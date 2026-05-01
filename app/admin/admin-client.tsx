'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  Flame, 
  Palette, 
  Flag, 
  Settings,
  ChevronLeft,
  BarChart3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UsersTable } from '@/components/admin/UsersTable'
import { ThemeManager } from '@/components/admin/ThemeManager'
import type { Profile } from '@/types/user'
import type { Memorial } from '@/types/memorial'

interface AdminDashboardProps {
  users: Profile[]
  memorials: Memorial[]
  stats: {
    totalMemorials: number
    totalUsers: number
  }
}

export function AdminDashboard({ users, memorials, stats }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Grįžti
            </Link>
            <h1 className="font-serif text-lg font-semibold">Admin Panel</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-2" />
              Nustatymai
            </Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Apžvalga
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Vartotojai
            </TabsTrigger>
            <TabsTrigger value="memorials" className="gap-2">
              <Flame className="h-4 w-4" />
              Memorialai
            </TabsTrigger>
            <TabsTrigger value="themes" className="gap-2">
              <Palette className="h-4 w-4" />
              Temos
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Flag className="h-4 w-4" />
              Pranešimai
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{stats.totalUsers}</p>
                      <p className="text-sm text-muted-foreground">Vartotojai</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{stats.totalMemorials}</p>
                      <p className="text-sm text-muted-foreground">Memorialai</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Peržiūros šiandien</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Flag className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Pranešimai</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Naujausi vartotojai
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.full_name || 'Nenurodyta'}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString('lt-LT')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5" />
                    Naujausi memorialai
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {memorials.slice(0, 5).map((memorial) => (
                      <div key={memorial.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {memorial.first_name} {memorial.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {memorial.view_count} peržiūros
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(memorial.created_at).toLocaleDateString('lt-LT')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UsersTable users={users} />
          </TabsContent>

          {/* Memorials Tab */}
          <TabsContent value="memorials">
            <Card>
              <CardHeader>
                <CardTitle>Visi memorialai</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Memorialų valdymas bus pridėtas netrukus.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Themes Tab */}
          <TabsContent value="themes">
            <ThemeManager />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Pranešimai</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Pranešimų nėra
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
