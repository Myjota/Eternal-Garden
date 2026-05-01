'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    loadUser()
  }, [])

  return (
    <>
      {/* HEADER */}
      <Header user={user} />

      {/* PAGE */}
      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Profile
        </h1>

        <Card className="p-6 space-y-4">

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>
            <p className="font-medium">
              {user?.email ?? 'Guest user'}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              User ID
            </p>
            <p className="text-xs break-all font-mono">
              {user?.id ?? 'No session'}
            </p>
          </div>

        </Card>

      </div>
    </>
  )
}
