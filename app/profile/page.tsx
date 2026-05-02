'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, LogOut, Pencil } from 'lucide-react'
import { Header } from '@/components/layout/header'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
}

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const load = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const currentUser = userData.user

      setUser(currentUser)

      if (currentUser) {
        const { data } = await supabase
          .from('profiles')
          .select('id, email, full_name')
          .eq('id', currentUser.id)
          .single()

        setProfile(data)
      }
    }

    load()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const displayName =
    profile?.full_name ||
    user?.email?.split('@')[0] ||
    'User'

  return (
    <>
      {/* HEADER */}
      <Header user={user} />

      {/* PAGE */}
      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Asmeninė Paskyra
        </h1>

        {/* ACCOUNT CARD */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Paskyros Informacija
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <p className="text-sm text-muted-foreground">
                Vardas
              </p>
              <p className="font-medium">
                {displayName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Elektroninis Paštas
              </p>
              <p className="font-medium">
                {user?.email ?? '-'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Naudotojo ID Numeris
              </p>
              <p className="text-xs font-mono break-all">
                {user?.id ?? '-'}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* ACTIONS */}
        <div className="space-y-3">

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => alert('Edit profile (TODO)')}
          >
            <Pencil className="h-4 w-4" />
            Redaguoti Paskyrą
          </Button>

          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>

        </div>

      </div>
    </>
  )
          }
