'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Bell, Globe, Lock } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [isLithuanian, setIsLithuanian] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)

  const switchClass =
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40'

  return (
    <>
      <Header />

      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Settings
        </h1>

        {/* 🔒 PRIVACY */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Memorial privacy
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {isPrivate ? 'Private memorial' : 'Public memorial'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPrivate
                    ? 'Hidden from search and listings'
                    : 'Visible in search and public pages'}
                </p>
              </div>

              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                className={switchClass}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🔔 NOTIFICATIONS */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>

          <CardContent>
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
                className={switchClass}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🌍 LANGUAGE */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {isLithuanian ? 'Lietuvių' : 'English'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Interface language
                </p>
              </div>

              <Switch
                checked={isLithuanian}
                onCheckedChange={setIsLithuanian}
                className={switchClass}
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  )
}
