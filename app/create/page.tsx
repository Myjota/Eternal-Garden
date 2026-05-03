'use client'

import { useState, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, Upload, Check, X, Star, Plus, Trash2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { ThemePicker } from '@/components/theme-picker'
import { type ThemeId } from '@/lib/themes/config'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'

interface TimelineEvent {
  id: string
  title: string
  event_date: string
  location: string
  description: string
}

function generateSlug(firstName: string, lastName: string): string {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  return `${base}-${randomSuffix}`
}

function CreateMemorialContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isFamous = searchParams.get('famous') === 'true'
  const t = getTranslations(defaultLocale)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    deathDate: '',
    biography: '',
    shortDescription: '',
    epitaph: '',
    theme: 'garden' as ThemeId,
    isPublic: true,
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Nuotrauka per didelė. Maksimalus dydis 5MB.')
        return
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Pasirinkite tik nuotraukos failus (PNG, JPG).')
        return
      }

      setProfileImage(file)
      setProfileImagePreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    if (profileImagePreview) {
      URL.revokeObjectURL(profileImagePreview)
    }
    setProfileImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const addTimelineEvent = () => {
    const newEvent: TimelineEvent = {
      id: crypto.randomUUID(),
      title: '',
      event_date: '',
      location: '',
      description: ''
    }
    setTimelineEvents([...timelineEvents, newEvent])
  }

  const updateTimelineEvent = (id: string, field: keyof TimelineEvent, value: string) => {
    setTimelineEvents(events => 
      events.map(event => 
        event.id === id ? { ...event, [field]: value } : event
      )
    )
  }

  const removeTimelineEvent = (id: string) => {
    setTimelineEvents(events => events.filter(event => event.id !== id))
  }

  const uploadImage = async (file: File, userId: string): Promise<string | null> => {
    const supabase = createClient()
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('memorials')
      .upload(fileName, file)
    
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return null
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('memorials')
      .getPublicUrl(fileName)
    
    return publicUrl
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        setError('Turite būti prisijungęs, kad galėtumėte kurti atminimą.')
        router.push('/auth/login')
        return
      }

      const slug = generateSlug(formData.firstName, formData.lastName)

      // Upload image if selected
      let profileImageUrl: string | null = null
      if (profileImage) {
        setUploadingImage(true)
        profileImageUrl = await uploadImage(profileImage, user.id)
        setUploadingImage(false)
        
        if (!profileImageUrl) {
          setError('Nepavyko įkelti nuotraukos. Bandykite dar kartą.')
          setLoading(false)
          return
        }
      }

      const { data: memorial, error: insertError } = await supabase
        .from('memorials')
        .insert({
          user_id: user.id,
          slug,
          name: `${formData.firstName} ${formData.lastName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          birth_date: formData.birthDate || null,
          death_date: formData.deathDate || null,
          biography: formData.biography || null,
          short_description: formData.shortDescription || null,
          epitaph: formData.epitaph || null,
          theme: formData.theme,
          privacy: formData.isPublic ? 'public' : 'private',
          is_public: formData.isPublic,
          is_famous: isFamous,
          photo_url: profileImageUrl,
          profile_image_url: profileImageUrl,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(insertError.message)
        return
      }

      // Insert timeline events if any
      if (timelineEvents.length > 0 && memorial) {
        const validEvents = timelineEvents.filter(e => e.title.trim())
        if (validEvents.length > 0) {
          const { error: timelineError } = await supabase
            .from('timeline_events')
            .insert(
              validEvents.map((event, index) => ({
                memorial_id: memorial.id,
                title: event.title,
                event_date: event.event_date || null,
                location: event.location || null,
                description: event.description || null,
                sort_order: index
              }))
            )

          if (timelineError) {
            console.error('Timeline insert error:', timelineError)
            // Don't block the redirect, timeline can be added later
          }
        }
      }

      router.push(`/memorial/${slug}`)
      router.refresh()
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Įvyko netikėta klaida. Bandykite dar kartą.')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    if (step === 1) {
      const basicFieldsFilled = formData.firstName && formData.lastName && formData.birthDate && formData.deathDate
      if (isFamous) {
        return basicFieldsFilled && formData.shortDescription
      }
      return basicFieldsFilled
    }
    return true
  }

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
              <span>Grįžti</span>
            </Link>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Eternal Garden"
                width={24}
                height={24}
                style={{ width: 'auto', height: '24px' }}
              />
              <span className="font-serif text-lg font-semibold">
                {isFamous ? 'Žymaus žmogaus atminimas' : 'Naujas atminimas'}
              </span>
              {isFamous && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  Žymus
                </Badge>
              )}
            </div>
            <div className="w-20" />
          </div>
        </header>

        {/* Progress Steps */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    step > s 
                      ? 'bg-primary text-primary-foreground' 
                      : step === s 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : s}
                  </div>
                  <span className={`text-xs sm:text-sm hidden md:block ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s === 1 ? 'Informacija' : s === 2 ? 'Tema' : s === 3 ? 'Gyvenimas' : 'Peržiūra'}
                  </span>
                  {s < 4 && <div className="w-4 sm:w-8 h-px bg-border mx-1 sm:mx-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Pagrindinė informacija</CardTitle>
                  <CardDescription>
                    Įveskite artimojo duomenis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vardas *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        placeholder="Jonas"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Pavardė *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        placeholder="Jonaitis"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Gimimo data *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => updateFormData('birthDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deathDate">Mirties data *</Label>
                      <Input
                        id="deathDate"
                        type="date"
                        value={formData.deathDate}
                        onChange={(e) => updateFormData('deathDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {isFamous && (
                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">Trumpas aprašymas (rodomas kortelėje) *</Label>
                      <Input
                        id="shortDescription"
                        value={formData.shortDescription}
                        onChange={(e) => updateFormData('shortDescription', e.target.value)}
                        placeholder="Pvz.: Lietuvos poetas, rašytojas, visuomenininkas"
                        required={isFamous}
                      />
                      <p className="text-xs text-muted-foreground">
                        Šis aprašymas bus rodomas žymių žmonių kortelėje pagrindiniame puslapyje
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="biography">Biografija</Label>
                    <Textarea
                      id="biography"
                      value={formData.biography}
                      onChange={(e) => updateFormData('biography', e.target.value)}
                      placeholder="Papasakokite apie šį žmogų..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="epitaph">Epitafija</Label>
                    <Textarea
                      id="epitaph"
                      value={formData.epitaph}
                      onChange={(e) => updateFormData('epitaph', e.target.value)}
                      placeholder="Pvz.: Amžinai gyvas mūsų širdyse..."
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Trumpa frazė ar citata, kuri bus rodoma atminimo puslapyje
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Nuotrauka</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    
                    {profileImagePreview ? (
                      <div className="relative w-48 h-64 mx-auto">
                        <Image
                          src={profileImagePreview}
                          alt="Pasirinkta nuotrauka"
                          fill
                          className="object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Spustelėkite arba vilkite nuotrauką
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG iki 5MB
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

{/* Step 2: Theme Selection */}
            {step === 2 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Pasirinkite temą
                  </h2>
                  <p className="text-muted-foreground">
                    Tema nustato atminimo puslapio išvaizdą ir nuotaiką
                  </p>
                </div>
                <ThemePicker
                  value={formData.theme}
                  onChange={(theme) => updateFormData('theme', theme)}
                />
              </div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-serif flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Gyvenimo įvykiai
                      </CardTitle>
                      <CardDescription>
                        Pridėkite svarbius gyvenimo momentus (nebūtina)
                      </CardDescription>
                    </div>
                    <Button onClick={addTimelineEvent} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Pridėti
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {timelineEvents.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground mb-2">
                        Dar nepridėta jokių gyvenimo įvykių
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Galite pridėti svarbius gyvenimo momentus: gimimas, mokslai, vestuvės, pasiekimai ir kt.
                      </p>
                      <Button onClick={addTimelineEvent} variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Pridėti pirmąjį įvykį
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {timelineEvents.map((event, index) => (
                        <div key={event.id} className="border border-border rounded-lg p-4 relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeTimelineEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          <div className="pr-10 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                                {index + 1}
                              </span>
                              Įvykis
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Pavadinimas *</Label>
                                <Input
                                  value={event.title}
                                  onChange={(e) => updateTimelineEvent(event.id, 'title', e.target.value)}
                                  placeholder="Pvz.: Gimimas, Vestuvės"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Data</Label>
                                <Input
                                  type="date"
                                  value={event.event_date}
                                  onChange={(e) => updateTimelineEvent(event.id, 'event_date', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Vieta</Label>
                              <Input
                                value={event.location}
                                onChange={(e) => updateTimelineEvent(event.id, 'location', e.target.value)}
                                placeholder="Pvz.: Vilnius, Lietuva"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Aprašymas</Label>
                              <Textarea
                                value={event.description}
                                onChange={(e) => updateTimelineEvent(event.id, 'description', e.target.value)}
                                placeholder="Trumpas įvykio aprašymas..."
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button onClick={addTimelineEvent} variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Pridėti dar vieną įvykį
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Peržiūra</CardTitle>
                  <CardDescription>
                    Patikrinkite informaciją prieš kuriant atminimą
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image Preview */}
                  {profileImagePreview && (
                    <div className="flex justify-center">
                      <div className="relative w-32 h-40">
                        <Image
                          src={profileImagePreview}
                          alt="Nuotrauka"
                          fill
                          className="object-cover rounded-lg border border-border"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Vardas, pavardė</span>
                      <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Gimimo data</span>
                      <span className="font-medium">{formData.birthDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Mirties data</span>
                      <span className="font-medium">{formData.deathDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Tema</span>
                      <span className="font-medium capitalize">{formData.theme.replace('-', ' ')}</span>
                    </div>
                    {isFamous && (
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-muted-foreground">Tipas</span>
                        <Badge variant="secondary" className="gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          Žymus žmogus
                        </Badge>
                      </div>
                    )}
                    {formData.shortDescription && (
                      <div className="py-3 border-b border-border">
                        <span className="text-muted-foreground block mb-2">Trumpas aprašymas</span>
                        <p className="text-sm">{formData.shortDescription}</p>
                      </div>
                    )}
                    {formData.epitaph && (
                      <div className="py-3 border-b border-border">
                        <span className="text-muted-foreground block mb-2">Epitafija</span>
                        <p className="text-sm italic">&quot;{formData.epitaph}&quot;</p>
                      </div>
                    )}
                    {formData.biography && (
                      <div className="py-3 border-b border-border">
                        <span className="text-muted-foreground block mb-2">Biografija</span>
                        <p className="text-sm">{formData.biography}</p>
                      </div>
                    )}
                    {timelineEvents.length > 0 && (
                      <div className="py-3">
                        <span className="text-muted-foreground block mb-2">
                          Gyvenimo įvykiai ({timelineEvents.length})
                        </span>
                        <div className="space-y-2">
                          {timelineEvents.filter(e => e.title).map((event, index) => (
                            <div key={event.id} className="flex items-start gap-2 text-sm">
                              <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs">
                                {index + 1}
                              </span>
                              <div>
                                <span className="font-medium">{event.title}</span>
                                {event.event_date && (
                                  <span className="text-muted-foreground ml-2">
                                    ({event.event_date})
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Sukūrus atminimą, galėsite pridėti nuotraukų ir 
                      daugiau informacijos per redagavimo puslapį.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  {t.common.previous}
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/dashboard">{t.common.cancel}</Link>
                </Button>
              )}

              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                  {step === 3 ? 'Peržiūrėti' : t.common.next}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Įkeliama nuotrauka...' : 'Kuriama...'}
                    </>
                  ) : (
                    'Sukurti atminimą'
                  )}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

function CreateMemorialLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export default function CreateMemorialPage() {
  return (
    <Suspense fallback={<CreateMemorialLoading />}>
      <CreateMemorialContent />
    </Suspense>
  )
}
