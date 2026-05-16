'use client'

import { useState, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { type ThemeId } from '@/lib/themes/config'
import { getTranslations, defaultLocale } from '@/lib/i18n'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'
import {
  StepInformation,
  StepTimeline,
  StepBurial,
  StepTheme,
  StepReview,
  type TimelineEvent,
  type BurialFormData,
} from './steps'

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
  const coverFileInputRef = useRef<HTMLInputElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [burialFormData, setBurialFormData] = useState<BurialFormData>({
    cemetery_name: '',
    address: '',
    city: '',
    country: '',
    section: '',
    plot_number: '',
  })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    deathDate: '',
    biography: '',
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
      if (file.size > 5 * 1024 * 1024) {
        setError('Nuotrauka per didele. Maksimalus dydis 5MB.')
        return
      }
      
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

  const handleCoverImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Nuotrauka per didele. Maksimalus dydis 5MB.')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Pasirinkite tik nuotraukos failus (PNG, JPG).')
        return
      }

      setCoverImage(file)
      setCoverImagePreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  const handleRemoveCoverImage = () => {
    setCoverImage(null)
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview)
    }
    setCoverImagePreview(null)
    if (coverFileInputRef.current) {
      coverFileInputRef.current.value = ''
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
      
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        setError('Turite buti prisijunges, kad galetumete kurti atminima.')
        router.push('/auth/login')
        return
      }

      const slug = generateSlug(formData.firstName, formData.lastName)

      let profileImageUrl: string | null = null
      if (profileImage) {
        setUploadingImage(true)
        profileImageUrl = await uploadImage(profileImage, user.id)
        
        if (!profileImageUrl) {
          setError('Nepavyko ikelti nuotraukos. Bandykite dar karta.')
          setLoading(false)
          setUploadingImage(false)
          return
        }
      }

      let coverImageUrl: string | null = null
      if (coverImage) {
        setUploadingImage(true)
        coverImageUrl = await uploadImage(coverImage, user.id)
        setUploadingImage(false)
        
        if (!coverImageUrl) {
          setError('Nepavyko ikelti virselio nuotraukos. Bandykite dar karta.')
          setLoading(false)
          return
        }
      } else {
        setUploadingImage(false)
      }

      let burialPlaceId: string | null = null
      const hasBurialData = burialFormData.cemetery_name.trim() || burialFormData.address.trim()
      
      if (hasBurialData) {
        const { data: burialPlace, error: burialError } = await supabase
          .from('burial_places')
          .insert({
            name: burialFormData.cemetery_name || 'Kapavietė',
            address: burialFormData.address || null,
            city: burialFormData.city || null,
            country: burialFormData.country || null,
            cemetery_name: burialFormData.cemetery_name || null,
            section: burialFormData.section || null,
            plot_number: burialFormData.plot_number || null,
          })
          .select()
          .single()
        
        if (!burialError && burialPlace) {
          burialPlaceId = burialPlace.id
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
          epitaph: formData.epitaph || null,
          theme: formData.theme,
          privacy: formData.isPublic ? 'public' : 'private',
          is_public: formData.isPublic,
          is_famous: isFamous,
          photo_url: profileImageUrl,
          profile_image_url: profileImageUrl,
          cover_image_url: coverImageUrl,
          burial_place_id: burialPlaceId,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Insert error:', insertError)
        setError(insertError.message)
        return
      }

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
          }
        }
      }

      router.push(`/memorial/${slug}`)
      router.refresh()
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Ivyko netiiketa klaida. Bandykite dar karta.')
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    if (step === 1) {
      const basicFieldsFilled = formData.firstName && formData.lastName && formData.birthDate && formData.deathDate
      if (isFamous) {
        return basicFieldsFilled && formData.epitaph
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
              <span>Grizti</span>
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
                {isFamous ? 'Zymaus zmogaus atminimas' : 'Naujas atminimas'}
              </span>
              {isFamous && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  Zymus
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
              {[1, 2, 3, 4, 5].map((s) => (
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
                    {s === 1 ? 'Informacija' : s === 2 ? 'Gyvenimas' : s === 3 ? 'Kapaviete' : s === 4 ? 'Tema' : 'Perziura'}
                  </span>
                  {s < 5 && <div className="w-4 sm:w-8 h-px bg-border mx-1 sm:mx-2" />}
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
              <StepInformation
                formData={formData}
                updateFormData={updateFormData}
                isFamous={isFamous}
                profileImagePreview={profileImagePreview}
                coverImagePreview={coverImagePreview}
                onImageSelect={handleImageSelect}
                onCoverImageSelect={handleCoverImageSelect}
                onRemoveImage={handleRemoveImage}
                onRemoveCoverImage={handleRemoveCoverImage}
                fileInputRef={fileInputRef}
                coverFileInputRef={coverFileInputRef}
              />
            )}

            {/* Step 2: Timeline */}
            {step === 2 && (
              <StepTimeline
                timelineEvents={timelineEvents}
                onAddEvent={addTimelineEvent}
                onUpdateEvent={updateTimelineEvent}
                onRemoveEvent={removeTimelineEvent}
              />
            )}

            {/* Step 3: Burial Place */}
            {step === 3 && (
              <StepBurial
                burialFormData={burialFormData}
                onUpdate={setBurialFormData}
              />
            )}

            {/* Step 4: Theme Selection */}
            {step === 4 && (
              <StepTheme
                value={formData.theme}
                onChange={(theme) => updateFormData('theme', theme)}
              />
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <StepReview
                formData={formData}
                profileImagePreview={profileImagePreview}
                isFamous={isFamous}
                timelineEvents={timelineEvents}
                burialFormData={burialFormData}
              />
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

              {step < 5 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                  {step === 4 ? 'Perziureti' : t.common.next}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      {uploadingImage ? 'Ikeliama nuotrauka...' : 'Kuriama...'}
                    </>
                  ) : (
                    'Sukurti atminima'
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
