'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="container mx-auto py-10 max-w-2xl">

      <h1 className="text-2xl font-semibold mb-6">
        Settings
      </h1>

      <Card className="p-6 space-y-6">

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">
              Email notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Receive updates about memorial activity
            </p>
          </div>

          <Button
            variant={emailNotifications ? 'default' : 'outline'}
            onClick={() =>
              setEmailNotifications(!emailNotifications)
            }
          >
            {emailNotifications ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Theme placeholder */}
        <div>
          <p className="font-medium">
            Theme
          </p>
          <p className="text-sm text-muted-foreground">
            (coming soon)
          </p>
        </div>

      </Card>

    </div>
  )
}
