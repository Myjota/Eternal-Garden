'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [candleAlerts, setCandleAlerts] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="container mx-auto py-10 max-w-2xl">

      <h1 className="text-2xl font-semibold mb-6">
        Settings
      </h1>

      <div className="space-y-4">

        {/* ACCOUNT */}
        <Card className="p-6 space-y-4">

          <h2 className="font-medium">
            Account preferences
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Email notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Receive updates about memorial activity
              </p>
            </div>

            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

        </Card>

        {/* MEMORIAL */}
        <Card className="p-6 space-y-4">

          <h2 className="font-medium">
            Memorial settings
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Candle alerts
              </p>
              <p className="text-sm text-muted-foreground">
                Notify when someone lights a candle
              </p>
            </div>

            <Switch
              checked={candleAlerts}
              onCheckedChange={setCandleAlerts}
            />
          </div>

        </Card>

        {/* APPEARANCE */}
        <Card className="p-6 space-y-4">

          <h2 className="font-medium">
            Appearance
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Dark mode
              </p>
              <p className="text-sm text-muted-foreground">
                Switch theme appearance
              </p>
            </div>

            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

        </Card>

        {/* SAVE (fake) */}
        <div className="flex justify-end">
          <Button onClick={() => alert('Settings saved (mock)')}>
            Save changes
          </Button>
        </div>

      </div>

    </div>
  )
          }
