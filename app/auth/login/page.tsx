'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { getTranslations, type Locale, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const locale: Locale = defaultLocale
  const t = getTranslations(locale)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">

      {/* subtle logo background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/logo.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '140px',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl backdrop-blur">

          <CardHeader className="text-center space-y-4">

            {/* ✅ UPDATED LOGO */}
            <Link href="/" className="flex justify-center">
              <Image
                src="/images/logo.png"
                alt="Eternal Garden"
                width={64}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div>
              <CardTitle className="font-serif text-2xl text-foreground">
                {t.auth.login}
              </CardTitle>
              <CardDescription className="mt-2">
                Eternal Garden
              </CardDescription>
            </div>

          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vardas@pavyzdys.lt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    {t.auth.forgotPassword}
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner className="h-4 w-4" /> : t.auth.loginButton}
              </Button>

              {/* Signup */}
              <div className="text-center text-sm text-muted-foreground">
                {t.auth.noAccount}{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline font-medium"
                >
                  {t.auth.signup}
                </Link>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative text-center py-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t.common.back} &larr; Eternal Garden
        </Link>
      </div>

    </div>
  )
                  }
