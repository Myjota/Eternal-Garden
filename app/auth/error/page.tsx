import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EternalGardenLogo } from '@/components/icons'
import { AlertTriangle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background decoration */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=80')`,
        }}
      />
      
      <div className="relative flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-xl text-center">
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center">
              <EternalGardenLogo className="h-16 w-16 text-primary" />
            </Link>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <div>
              <CardTitle className="font-serif text-2xl text-foreground">
                Autentifikacijos klaida
              </CardTitle>
              <CardDescription className="mt-2">
                Kažkas nepavyko
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Įvyko klaida bandant prisijungti arba registruotis. 
              Bandykite dar kartą arba susisiekite su mumis.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/auth/login">
                  Bandyti prisijungti dar kartą
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Grįžti į pradžią
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
