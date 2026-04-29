'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { lt } from 'date-fns/locale'
import { Flame, Eye, Share2, ChevronLeft, ImageIcon, Clock, MessageCircle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Empty } from '@/components/ui/empty'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { ThemeId } from '@/lib/themes/config'

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  epitaph: string | null
  profile_image_url: string | null
  cover_image_url: string | null
  theme: ThemeId
  privacy: string
  view_count: number
  candle_count: number
  allow_candles: boolean
  allow_condolences: boolean
}

interface TimelineEvent {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
  image_url: string | null
}

interface GalleryItem {
  id: string
  type: string
  url: string
  thumbnail_url: string | null
  caption: string | null
}

interface Candle {
  id: string
  message: string | null
  visitor_name: string | null
  lit_at: string
}

interface Condolence {
  id: string
  author_name: string
  message: string
  created_at: string
}

interface MemorialClientProps {
  memorial: Memorial
  timelineEvents: TimelineEvent[]
  galleryItems: GalleryItem[]
  candles: Candle[]
  condolences: Condolence[]
  currentUser: User | null
}

export function MemorialClient({
  memorial,
  timelineEvents,
  galleryItems,
  candles: initialCandles,
  condolences: initialCondolences,
  currentUser,
}: MemorialClientProps) {
  const [candles, setCandles] = useState(initialCandles)
  const [condolences, setCondolences] = useState(initialCondolences)
  const [hasLitCandle, setHasLitCandle] = useState(false)
  const [condolenceText, setCondolenceText] = useState('')
  const [condolenceName, setCondolenceName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const t = getTranslations(defaultLocale)
  const totalCandles = memorial.candle_count + (hasLitCandle ? 1 : 0)

  const handleLightCandle = async () => {
    if (hasLitCandle || !memorial.allow_candles) return
    
    setIsSubmitting(true)
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('candles')
      .insert({
        memorial_id: memorial.id,
        user_id: currentUser?.id || null,
        visitor_name: currentUser?.email?.split('@')[0] || 'Svečias',
      })
      .select()
      .single()

    if (!error && data) {
      setCandles(prev => [data, ...prev])
      setHasLitCandle(true)
    }
    setIsSubmitting(false)
  }

  const handleSubmitCondolence = async () => {
    if (!condolenceText.trim() || !condolenceName.trim() || !memorial.allow_condolences) return
    
    setIsSubmitting(true)
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('condolences')
      .insert({
        memorial_id: memorial.id,
        user_id: currentUser?.id || null,
        author_name: condolenceName,
        message: condolenceText,
      })
      .select()
      .single()

    if (!error && data) {
      setCondolences(prev => [data, ...prev])
      setCondolenceText('')
      setCondolenceName('')
    }
    setIsSubmitting(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${memorial.first_name} ${memorial.last_name} - Eternal Garden`,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Nuoroda nukopijuota!')
    }
  }

  const formatYear = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).getFullYear().toString()
  }

  const portraitImage = memorial.profile_image_url || 
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80&sat=-100&sepia=30'

  // Check if it's a pet memorial theme
  const isPetTheme = memorial.theme === 'rainbow-bridge'

  return (
    <div data-theme={memorial.theme} className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 theme-pattern" />
        <div className="absolute inset-0 theme-hero-bg" />
        
        {/* Theme-specific decorative elements */}
        {memorial.theme === 'eternal-night' && (
          <div className="theme-moon" />
        )}
        {memorial.theme === 'sunny-window' && (
          <div className="theme-sunray" />
        )}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChevronLeft className="h-5 w-5" />
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-serif text-lg font-semibold hidden sm:inline">Eternal Garden</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t.memorial.share}</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-border/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Orthodox Cross for Orthodox theme */}
            {memorial.theme === 'orthodox' && (
              <div className="text-4xl text-primary/60 mb-4">☦</div>
            )}
            
            {/* Portrait with theme-specific frame */}
            <div className="relative mb-8">
              <div className={`theme-portrait-frame rounded-lg overflow-hidden ${
                memorial.theme === 'rainbow-bridge' ? 'rounded-full' : ''
              }`}>
                <div className={`relative ${
                  memorial.theme === 'rainbow-bridge' 
                    ? 'w-48 h-48 md:w-56 md:h-56' 
                    : 'w-48 h-64 md:w-56 md:h-72'
                }`}>
                  <Image
                    src={portraitImage}
                    alt={`${memorial.first_name} ${memorial.last_name}`}
                    fill
                    className={`object-cover ${
                      memorial.theme === 'rainbow-bridge' ? 'rounded-full' : ''
                    }`}
                    priority
                  />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 theme-card-glow rounded-lg -z-10" />
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {memorial.first_name} {memorial.last_name}
            </h1>
            
            {/* Dates */}
            {(memorial.birth_date || memorial.death_date) && (
              <div className="mt-4 text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
                <span>{formatYear(memorial.birth_date)}</span>
                <span className="mx-3 text-primary/50">—</span>
                <span>{formatYear(memorial.death_date)}</span>
              </div>
            )}

            {/* Epitaph */}
            {memorial.epitaph && (
              <blockquote className="mt-6 text-lg md:text-xl text-muted-foreground italic max-w-xl">
                <span className="text-primary/40 text-2xl">"</span>
                {memorial.epitaph}
                <span className="text-primary/40 text-2xl">"</span>
              </blockquote>
            )}

            {/* Pet theme paw prints */}
            {isPetTheme && (
              <div className="mt-4 flex gap-2 text-2xl opacity-40">
                <span>🐾</span>
                <span>🐾</span>
                <span>🐾</span>
              </div>
            )}

            {/* Biography */}
            {memorial.biography && (
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-2xl">
                {memorial.biography}
              </p>
            )}

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Flame className="h-6 w-6 text-primary candle-glow" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">{totalCandles}</div>
                  <div className="text-sm text-muted-foreground">{t.memorial.candlesLit}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <Eye className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-foreground">{memorial.view_count}</div>
                  <div className="text-sm text-muted-foreground">{t.memorial.visitors}</div>
                </div>
              </div>
            </div>

            {/* Light Candle Button */}
            {memorial.allow_candles && (
              <div className="mt-10">
                <Button 
                  onClick={handleLightCandle}
                  disabled={hasLitCandle || isSubmitting}
                  size="lg"
                  className="gap-3 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Flame className={`h-6 w-6 ${hasLitCandle ? '' : 'candle-glow'}`} />
                  {hasLitCandle ? 'Žvakė uždegta' : t.memorial.lightCandle}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto bg-muted/50 backdrop-blur">
            <TabsTrigger value="timeline" className="gap-2 data-[state=active]:bg-card">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">{t.memorial.timeline}</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2 data-[state=active]:bg-card">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.memorial.gallery}</span>
            </TabsTrigger>
            <TabsTrigger value="condolences" className="gap-2 data-[state=active]:bg-card">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">{t.memorial.condolences}</span>
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-10">
            <div className="max-w-2xl mx-auto">
              {timelineEvents.length === 0 ? (
                <Card className="theme-card-glow border-border/50 bg-card/80 backdrop-blur">
                  <CardContent className="p-12">
                    <Empty
                      icon={Clock}
                      title="Nėra įvykių"
                      description="Gyvenimo įvykiai dar nepridėti"
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="relative pl-8">
                  {/* Timeline line */}
                  <div className="absolute left-[11px] top-0 bottom-0 w-0.5 timeline-line" />
                  
                  <div className="space-y-8">
                    {timelineEvents.map((event, index) => (
                      <div key={event.id} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-8 top-6 w-6 h-6 rounded-full timeline-dot" />
                        
                        <Card className="theme-card-glow border-border/50 bg-card/90 backdrop-blur overflow-hidden">
                          {event.image_url && (
                            <div className="relative h-48 w-full">
                              <Image
                                src={event.image_url}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            {event.event_date && (
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                                {new Date(event.event_date).getFullYear()}
                              </div>
                            )}
                            <h3 className="font-serif text-xl font-semibold text-foreground">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="text-muted-foreground mt-3 leading-relaxed">
                                {event.description}
                              </p>
                            )}
                            {event.location && (
                              <p className="text-muted-foreground/70 text-sm mt-3 flex items-center gap-2">
                                <span>📍</span> {event.location}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-10">
            {galleryItems.length === 0 ? (
              <Card className="theme-card-glow border-border/50 bg-card/80 backdrop-blur max-w-2xl mx-auto">
                <CardContent className="p-12">
                  <Empty
                    icon={ImageIcon}
                    title="Nėra nuotraukų"
                    description="Nuotraukos dar nepridėtos"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {galleryItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden border-border/50 bg-card/80 backdrop-blur group cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={item.url}
                        alt={item.caption || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {item.caption && (
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground text-center truncate">
                          {item.caption}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Condolences Tab */}
          <TabsContent value="condolences" className="mt-10">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Leave Condolence Form */}
              {memorial.allow_condolences && (
                <Card className="theme-card-glow border-border/50 bg-card/90 backdrop-blur">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {t.memorial.leaveCondolence}
                    </h3>
                    <Input
                      placeholder="Jūsų vardas"
                      value={condolenceName}
                      onChange={(e) => setCondolenceName(e.target.value)}
                      className="bg-background/50"
                    />
                    <Textarea
                      placeholder="Jūsų žinutė..."
                      value={condolenceText}
                      onChange={(e) => setCondolenceText(e.target.value)}
                      rows={4}
                      className="bg-background/50"
                    />
                    <Button 
                      onClick={handleSubmitCondolence}
                      disabled={!condolenceText.trim() || !condolenceName.trim() || isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Palikti žinutę
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Existing Condolences */}
              {condolences.length === 0 && !memorial.allow_condolences ? (
                <Card className="theme-card-glow border-border/50 bg-card/80 backdrop-blur">
                  <CardContent className="p-12">
                    <Empty
                      icon={MessageCircle}
                      title="Nėra žinučių"
                      description="Užuojautos šiam atminimui išjungtos"
                    />
                  </CardContent>
                </Card>
              ) : condolences.length === 0 ? null : (
                <div className="space-y-4">
                  {condolences.map((condolence) => (
                    <Card key={condolence.id} className="border-border/50 bg-card/80 backdrop-blur">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-foreground">
                            {condolence.author_name}
                          </span>
                          <time className="text-xs text-muted-foreground">
                            {format(new Date(condolence.created_at), 'yyyy-MM-dd', { locale: lt })}
                          </time>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {condolence.message}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 bg-card/30 backdrop-blur relative z-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Image
              src="/images/logo.png"
              alt="Eternal Garden"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-serif">Eternal Garden</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground/60">
            Amžinas atminimas • Gyvos istorijos
          </p>
        </div>
      </footer>
    </div>
  )
}
