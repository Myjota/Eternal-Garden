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

export default function SignupPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const locale: Locale = defaultLocale
  const t = getTranslations(locale)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa')
      return
    }

    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simbolių')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/auth/signup-success')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">

      {/* 🌿 logo background pattern */}
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
                className="h-16 w-16 object-contain"
              />
            </Link>

            <div>
              <CardTitle className="font-serif text-2xl text-foreground">
                {t.auth.signup}
              </CardTitle>
              <CardDescription className="mt-2">
                Sukurkite paskyrą ir pradėkite kurti atminimus
              </CardDescription>
            </div>

          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.auth.firstName}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jonas"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.auth.lastName}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Jonaitis"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

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
                <Label htmlFor="password">{t.auth.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              {/* Confirm */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner className="h-4 w-4" /> : t.auth.signupButton}
              </Button>

              {/* Login link */}
              <div className="text-center text-sm text-muted-foreground">
                {t.auth.hasAccount}{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  {t.auth.login}
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
