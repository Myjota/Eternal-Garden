'use client'

import { useUser } from '@supabase/auth-helpers-react'
import { Card } from '@/components/ui/card'

export default function ProfilePage() {
  const user = useUser()

  return (
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
            {user?.email ?? 'Not logged in'}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            User ID
          </p>
          <p className="font-mono text-xs break-all">
            {user?.id}
          </p>
        </div>

      </Card>

    </div>
  )
}
