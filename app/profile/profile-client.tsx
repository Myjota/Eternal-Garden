'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, LogOut, Pencil, Users } from 'lucide-react'
import { Header } from '@/components/layout/header'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
}

interface ProfileClientProps {
  user: SupabaseUser
  profile: Profile | null
}

export function ProfileClient({ user, profile }: ProfileClientProps) {
  const [currentProfile] = useState<Profile | null>(profile)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const displayName =
    currentProfile?.full_name ||
    user?.email?.split('@')[0] ||
    'User'

  return (
    <>
      <Header user={user} />

      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Profilis
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Paskyros informacija
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
                El. paštas
              </p>
              <p className="font-medium">
                {user?.email ?? '-'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Vartotojo ID
              </p>
              <p className="text-xs font-mono break-all">
                {user?.id ?? '-'}
              </p>
            </div>

            {/* 🧩 LAIKINAS PSEUDO LAUKAS */}
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                Šeima
              </p>
              <p className="font-medium text-muted-foreground">
                Pseudo (laikinas laukas)
              </p>
            </div>

          </CardContent>
        </Card>

        <div className="space-y-3">

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => alert('Redaguoti profilį (TODO)')}
          >
            <Pencil className="h-4 w-4" />
            Redaguoti profilį
          </Button>

          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Atsijungti
          </Button>

        </div>

      </div>
    </>
  )
}
