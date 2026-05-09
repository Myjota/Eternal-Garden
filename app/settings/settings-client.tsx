'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Bell, Globe, Lock, Loader2 } from 'lucide-react'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface SettingsClientProps {
  user: User
  initialPreferredLanguage: string
}

export function SettingsClient({ user, initialPreferredLanguage }: SettingsClientProps) {
  // Use locale hook - loads preferred language from Supabase
  const { locale, setLocale } = useLocale({ user })
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [isLithuanian, setIsLithuanian] = useState(initialPreferredLanguage === 'lt')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const t = getTranslations(locale)

  const switchClass =
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40'

  const handleLanguageChange = async (checked: boolean) => {
    setIsLithuanian(checked)
    setSaveStatus('saving')

    const supabase = createClient()
    const newLanguage = checked ? 'lt' : 'en'

    const { error } = await supabase
      .from('profiles')
      .update({ preferred_language: newLanguage })
      .eq('id', user.id)

    if (error) {
      setSaveStatus('error')
      // Revert on error
      setIsLithuanian(!checked)
      setTimeout(() => setSaveStatus('idle'), 2000)
    } else {
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }

  return (
    <>
      <Header
        locale={locale}
        t={t}
        onLocaleChange={setLocale}
        user={user}
      />

      <div className="container mx-auto py-10 max-w-2xl">

        <h1 className="text-2xl font-semibold mb-6">
          Nustatymai
        </h1>

        {/* PRIVACY */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Privatumas
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {isPrivate ? 'Privatus Atminimas' : 'Viešas Atminimas'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPrivate
                    ? 'Nebus rodomas per paieškas'
                    : 'Viešas Atminimas'}
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

        {/* NOTIFICATIONS */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Pranešimai
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  El. pašto pranešimai
                </p>
                <p className="text-sm text-muted-foreground">
                  Gaukite naujausius pranešimus el. paštu
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

        {/* LANGUAGE */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Kalba
              {saveStatus === 'saving' && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {saveStatus === 'saved' && (
                <span className="text-xs text-green-600 font-normal">Issaugota</span>
              )}
              {saveStatus === 'error' && (
                <span className="text-xs text-destructive font-normal">Klaida</span>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {isLithuanian ? 'Lietuviu' : 'English'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sasajos kalba
                </p>
              </div>

              <Switch
                checked={isLithuanian}
                onCheckedChange={handleLanguageChange}
                className={switchClass}
                disabled={saveStatus === 'saving'}
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  )
}
