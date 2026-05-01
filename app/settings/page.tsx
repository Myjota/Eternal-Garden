'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Bell, Globe, Trash2, Lock } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [language, setLanguage] = useState('lt')
  const [isPrivate, setIsPrivate] = useState(false)

  return (
    <>
      <Header />

      <div className="container mx-auto py-10 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6">
          Settings
        </h1>

        {/* 🔒 MEMORIAL PRIVACY (NEW) */}
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
                    ? 'Hidden from search and public listings'
                    : 'Visible in search and public listings'}
                </p>
              </div>

              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🔔 NOTIFICATIONS (kept) */}
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
              />
            </div>
          </CardContent>
        </Card>

        {/* 🌍 LANGUAGE (kept) */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium">Interface language</p>
              <p className="text-sm text-muted-foreground">
                Current: {language.toUpperCase()}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setLanguage(language === 'lt' ? 'en' : 'lt')
              }
            >
              Switch
            </Button>
          </CardContent>
        </Card>

        {/* ⚠️ DANGER ZONE (kept) */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Danger zone
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => alert('Account deletion (mock)')}
            >
              Delete account
            </Button>
          </CardContent>
        </Card>

      </div>
    </>
  )
}
