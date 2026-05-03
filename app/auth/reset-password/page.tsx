'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle, Eye, EyeOff } from 'lucide-react'

function ResetPasswordContent() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const t = getTranslations(defaultLocale)

  // Check for error in URL (from Supabase redirect)
  useEffect(() => {
    const errorDescription = searchParams.get('error_description')
    if (errorDescription) {
      setError(decodeURIComponent(errorDescription))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      }
    } catch {
      setError('Įvyko netikėta klaida')
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
                Naujas slaptažodis
              </CardTitle>
              <CardDescription className="mt-2">
                Įveskite naują slaptažodį savo paskyrai
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Slaptažodis pakeistas!</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Jūsų slaptažodis sėkmingai atnaujintas. Būsite nukreipti į prisijungimo puslapį...
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Prisijungti dabar
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Naujas slaptažodis</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Pakartokite slaptažodį</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner className="h-4 w-4" /> : 'Pakeisti slaptažodį'}
                </Button>
              </form>
            )}
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

function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
