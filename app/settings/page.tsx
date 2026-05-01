'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Lock, EyeOff, Eye } from 'lucide-react'

export default function SettingsPage() {
  const [isPrivateMemorials, setIsPrivateMemorials] = useState(false)

  const handleToggle = (value: boolean) => {
    setIsPrivateMemorials(value)

    // 🔥 HERE you would later:
    // supabase.from('profiles').update({ memorials_private: value })
  }

  return (
    <>
      <Header />

      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Settings
        </h1>

        {/* 🔒 CORE FEATURE */}
        <Card className="border-border">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Memorial privacy
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="flex items-center justify-between">

              <div>
                <p className="font-medium flex items-center gap-2">
                  {isPrivateMemorials ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}

                  {isPrivateMemorials
                    ? 'Private memorials'
                    : 'Public memorials'}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  {isPrivateMemorials
                    ? 'Your memorials are hidden from search and public listing'
                    : 'Your memorials are visible in search and public pages'}
                </p>
              </div>

              <Switch
                checked={isPrivateMemorials}
                onCheckedChange={handleToggle}
              />
            </div>

          </CardContent>

        </Card>

        {/* INFO NOTE */}
        <p className="text-xs text-muted-foreground mt-4">
          This setting applies to all memorials under your account.
        </p>

      </div>
    </>
  )
}
