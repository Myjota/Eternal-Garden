'use client'

import {
  useState,
  useTransition,
  useEffect,
} from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Switch } from '@/components/ui/switch'

import {
  Bell,
  Globe,
  Lock,
  Loader2,
} from 'lucide-react'

import { getTranslations } from '@/lib/i18n'

import { useLocaleContext } from '@/providers/locale-provider'

import { createClient } from '@/lib/supabase/client'

import type { User } from '@supabase/supabase-js'

interface SettingsClientProps {
  user: User
  initialPreferredLanguage: string
}

export function SettingsClient({
  user,
  initialPreferredLanguage,
}: SettingsClientProps) {

  const { locale, setLocale } =
    useLocaleContext()

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [isLithuanian, setIsLithuanian] =
    useState(initialPreferredLanguage === 'lt')

  const [isPrivate, setIsPrivate] =
    useState(false)

  const [saveStatus, setSaveStatus] =
    useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const t = getTranslations(locale)

  const switchClass =
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40'

  // sync global locale → local UI
  useEffect(() => {
    setIsLithuanian(locale === 'lt')
  }, [locale])

  const handleLanguageChange = async (
    checked: boolean
  ) => {

    const newLanguage = checked ? 'lt' : 'en'

    setIsLithuanian(checked)
    setSaveStatus('saving')

    try {

      // 1. instant UI update
      await setLocale(newLanguage)

      // 2. persist to DB
      const supabase = createClient()

      const { error } = await supabase
        .from('profiles')
        .update({
          preferred_language: newLanguage,
        })
        .eq('id', user.id)

      if (error) throw error

      setSaveStatus('saved')

    } catch (err) {

      console.error(err)

      setSaveStatus('error')

      setIsLithuanian(!checked)
    }

    setTimeout(() => {
      setSaveStatus('idle')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto max-w-2xl py-10">

        <h1 className="mb-6 text-2xl font-semibold">
          {t('settings.title') || 'Nustatymai'}
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
                  {isPrivate
                    ? 'Privatus Atminimas'
                    : 'Viešas Atminimas'}
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
                <span className="text-xs text-green-600">
                  Issaugota
                </span>
              )}

              {saveStatus === 'error' && (
                <span className="text-xs text-red-500">
                  Klaida
                </span>
              )}

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="flex items-center justify-between">

              <div>

                <p className="font-medium">
                  {isLithuanian ? 'Lietuvių' : 'English'}
                </p>

                <p className="text-sm text-muted-foreground">
                  Sąsajos kalba
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

    </div>
  )
                  }
