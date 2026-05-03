'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const t = getTranslations(defaultLocale)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
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
                {t.auth.forgotPassword}
              </CardTitle>
              <CardDescription className="mt-2">
                Įveskite savo el. pašto adresą ir mes atsiųsime slaptažodžio atkūrimo nuorodą
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
                  <h3 className="font-medium text-foreground">Laiškas išsiųstas!</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Patikrinkite savo el. paštą <strong>{email}</strong> ir sekite nuorodą slaptažodžiui atkurti.
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/login">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Grįžti į prisijungimą
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner className="h-4 w-4" /> : 'Siųsti atkūrimo nuorodą'}
                </Button>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Grįžti į prisijungimą
                  </Link>
                </div>
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
