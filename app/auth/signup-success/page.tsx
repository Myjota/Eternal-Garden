import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EternalGardenLogo } from '@/components/icons'
import { Mail } from 'lucide-react'

export default function SignupSuccessPage() {
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
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="font-serif text-2xl text-foreground">
                Patikrinkite el. paštą
              </CardTitle>
              <CardDescription className="mt-2">
                Registracija sėkminga!
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Išsiuntėme patvirtinimo nuorodą į jūsų el. pašto adresą. 
              Paspauskite nuorodą, kad aktyvuotumėte paskyrą.
            </p>
            
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Negavote laiško? Patikrinkite šlamšto aplanką arba bandykite dar kartą.
              </p>
              <Button variant="outline" asChild>
                <Link href="/auth/login">
                  Grįžti į prisijungimą
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer link back to home */}
      <div className="relative text-center py-6">
        <Link 
          href="/" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Eternal Garden
        </Link>
      </div>
    </div>
  )
}
