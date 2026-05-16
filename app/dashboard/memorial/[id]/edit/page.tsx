'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Save, Loader2, Plus, Trash2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemePicker } from '@/components/theme-picker'
import { ThemeProvider } from '@/lib/themes/theme-context'
import { getTranslations } from '@/lib/i18n'
import { useLocale } from '@/lib/i18n/useLocale'
import { createClient } from '@/lib/supabase/client'
import { type ThemeId } from '@/lib/themes/config'

interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  birth_place: string | null
  death_place: string | null
  biography: string | null
  epitaph: string | null
  profile_image_url: string | null
  cover_image_url: string | null
  theme: string
  privacy: string
  allow_candles: boolean
  allow_condolences: boolean
  burial_place_id: string | null
}

interface BurialPlace {
  id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  cemetery_name: string | null
  section: string | null
  plot_number: string | null
}

interface TimelineEvent {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
  sort_order: number
}

export default function EditMemorialPage() {
  const router = useRouter()
  const params = useParams()
  const memorialId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [memorial, setMemorial] = useState<Memorial | null>(null)
  
  // Use locale hook - loads preferred language from Supabase
  const { locale, setLocale } = useLocale({ user })
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [burialPlace, setBurialPlace] = useState<BurialPlace | null>(null)
  const [burialFormData, setBurialFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    cemetery_name: '',
    section: '',
    plot_number: '',
  })
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    death_date: '',
    birth_place: '',
    death_place: '',
    biography: '',
    epitaph: '',
    theme: 'garden',
    privacy: 'public',
    allow_candles: true,
    allow_condolences: true,
  })
  
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  
  const t = getTranslations(locale)
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [memorialId])

  const loadData = async () => {
    setLoading(true)
    
    // Get user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    setUser(user)
    
    // Get memorial
    const { data: memorial, error } = await supabase
      .from('memorials')
      .select('*')
      .eq('id', memorialId)
      .eq('user_id', user.id)
      .single()
    
    if (error || !memorial) {
      router.push('/dashboard')
      return
    }
    
    setMemorial(memorial)
    setFormData({
      first_name: memorial.first_name || '',
      last_name: memorial.last_name || '',
      birth_date: memorial.birth_date || '',
      death_date: memorial.death_date || '',
      birth_place: memorial.birth_place || '',
      death_place: memorial.death_place || '',
      biography: memorial.biography || '',
      epitaph: memorial.epitaph || '',
      theme: memorial.theme || 'garden',
      privacy: memorial.privacy || 'public',
      allow_candles: memorial.allow_candles ?? true,
      allow_condolences: memorial.allow_condolences ?? true,
    })
    setProfileImage(memorial.profile_image_url)
    setCoverImage(memorial.cover_image_url)
    
    // Get timeline events
    const { data: events } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('memorial_id', memorialId)
      .order('sort_order', { ascending: true })
    
    if (events) {
      setTimelineEvents(events)
    }
    
    // Get burial place if exists
    if (memorial.burial_place_id) {
      const { data: burialData } = await supabase
        .from('burial_places')
        .select('*')
        .eq('id', memorial.burial_place_id)
        .single()
      
      if (burialData) {
        setBurialPlace(burialData)
        setBurialFormData({
          name: burialData.name || '',
          address: burialData.address || '',
          city: burialData.city || '',
          country: burialData.country || '',
          cemetery_name: burialData.cemetery_name || '',
          section: burialData.section || '',
          plot_number: burialData.plot_number || '',
        })
      }
    }
    
    setLoading(false)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProfileImage(file)
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const handleCoverImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCoverImage(file)
      setCoverImage(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (!user || !memorial) return
    
    setSaving(true)
    
    try {
      let profile_image_url = memorial.profile_image_url
      let cover_image_url = memorial.cover_image_url
      
      // Upload new profile image if selected
      if (newProfileImage) {
        const fileExt = newProfileImage.name.split('.').pop()
        const fileName = `${user.id}/${memorial.id}/profile.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('memorials')
          .upload(fileName, newProfileImage, { upsert: true })
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('memorials')
            .getPublicUrl(fileName)
          profile_image_url = publicUrl
        }
      }

      // Upload new cover image if selected
      if (newCoverImage) {
        const fileExt = newCoverImage.name.split('.').pop()
        const fileName = `${user.id}/${memorial.id}/cover.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('memorials')
          .upload(fileName, newCoverImage, { upsert: true })
        
        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('memorials')
            .getPublicUrl(fileName)
          cover_image_url = publicUrl
        }
      }
      
      // Handle burial place
      let burial_place_id = memorial.burial_place_id
      const hasBurialData = burialFormData.cemetery_name.trim() || burialFormData.address.trim()
      
      console.log('[v0] Burial save start:', { 
        hasBurialData, 
        burialFormData, 
        existingBurialPlace: burialPlace,
        currentBurialPlaceId: memorial.burial_place_id 
      })
      
      if (hasBurialData) {
        if (burialPlace) {
          // Update existing burial place
          console.log('[v0] Updating existing burial place:', burialPlace.id)
          const { error: updateError } = await supabase
            .from('burial_places')
            .update({
              name: burialFormData.cemetery_name || 'Kapavietė',
              address: burialFormData.address || null,
              city: burialFormData.city || null,
              country: burialFormData.country || null,
              cemetery_name: burialFormData.cemetery_name || null,
              section: burialFormData.section || null,
              plot_number: burialFormData.plot_number || null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', burialPlace.id)
          
          if (updateError) {
            console.error('[v0] Burial place update error:', updateError)
          } else {
            console.log('[v0] Burial place updated successfully')
          }
        } else {
          // Create new burial place
          console.log('[v0] Creating new burial place...')
          const { data: newBurial, error: burialError } = await supabase
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
          
          if (burialError) {
            console.error('[v0] Burial place insert error:', burialError)
            throw new Error(`Nepavyko išsaugoti kapavietės: ${burialError.message}`)
          }
          
          console.log('[v0] New burial place created:', newBurial)
          
          if (newBurial) {
            burial_place_id = newBurial.id
            console.log('[v0] Set burial_place_id to:', burial_place_id)
          }
        }
      } else if (burialPlace && !hasBurialData) {
        // Remove burial place if data was cleared
        await supabase
          .from('burial_places')
          .delete()
          .eq('id', burialPlace.id)
        burial_place_id = null
      }
      
      console.log('[v0] Final burial_place_id for memorial update:', burial_place_id)
      
      // Update memorial
      const { error } = await supabase
        .from('memorials')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          birth_date: formData.birth_date || null,
          death_date: formData.death_date || null,
          birth_place: formData.birth_place || null,
          death_place: formData.death_place || null,
          biography: formData.biography || null,
          epitaph: formData.epitaph || null,
          theme: formData.theme,
          privacy: formData.privacy,
          allow_candles: formData.allow_candles,
          allow_condolences: formData.allow_condolences,
          profile_image_url,
          cover_image_url,
          burial_place_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', memorialId)
      
      if (error) throw error
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving memorial:', error)
      alert('Klaida issaugant atminima')
    } finally {
      setSaving(false)
    }
  }

  // Timeline event handlers
  const addTimelineEvent = async () => {
    const { data, error } = await supabase
      .from('timeline_events')
      .insert({
        memorial_id: memorialId,
        title: 'Naujas ivykis',
        sort_order: timelineEvents.length,
      })
      .select()
      .single()
    
    if (data) {
      setTimelineEvents([...timelineEvents, data])
    }
  }

  const updateTimelineEvent = async (id: string, field: string, value: string) => {
    setTimelineEvents(events =>
      events.map(e => e.id === id ? { ...e, [field]: value } : e)
    )
    
    await supabase
      .from('timeline_events')
      .update({ [field]: value })
      .eq('id', id)
  }

  const deleteTimelineEvent = async (id: string) => {
    await supabase
      .from('timeline_events')
      .delete()
      .eq('id', id)
    
    setTimelineEvents(events => events.filter(e => e.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ThemeProvider initialTheme="garden">
      <div className="min-h-screen flex flex-col bg-background">
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground">
                  Redaguoti atminima
                </h1>
                <p className="text-muted-foreground">
                  {formData.first_name} {formData.last_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/memorial/${memorial?.slug}`}>
                  Perziureti
                </Link>
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Issaugoti
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="general" className="flex-1 min-w-fit text-xs sm:text-sm">Bendra info</TabsTrigger>
              <TabsTrigger value="burial" className="flex-1 min-w-fit text-xs sm:text-sm">Kapavietė</TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1 min-w-fit text-xs sm:text-sm">Istorija</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 min-w-fit text-xs sm:text-sm">Nustatymai</TabsTrigger>
            </TabsList>

            {/* General Info Tab */}
            <TabsContent value="general" className="space-y-6">
              {/* Cover Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Virsaus nuotrauka</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="aspect-[3/1] relative rounded-lg overflow-hidden bg-muted cursor-pointer group"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    {coverImage ? (
                      <>
                        <Image
                          src={coverImage}
                          alt="Cover"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Pasirinkti virsaus nuotrauka</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverImageSelect}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Rekomenduojama: 1200x400 pikselių arba 3:1 proporcija
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profilio nuotrauka</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="aspect-square relative rounded-lg overflow-hidden bg-muted cursor-pointer group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {profileImage ? (
                        <>
                          <Image
                            src={profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-sm">Pasirinkti nuotrauka</span>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </CardContent>
                </Card>

                {/* Basic Info */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Pagrindinė informacija</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Vardas *</Label>
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Pavardė *</Label>
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="birth_date">Gimimo data</Label>
                        <Input
                          id="birth_date"
                          type="date"
                          value={formData.birth_date}
                          onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="death_date">Mirties data</Label>
                        <Input
                          id="death_date"
                          type="date"
                          value={formData.death_date}
                          onChange={(e) => setFormData({ ...formData, death_date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="birth_place">Gimimo vieta</Label>
                        <Input
                          id="birth_place"
                          value={formData.birth_place}
                          onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="death_place">Mirties vieta</Label>
                        <Input
                          id="death_place"
                          value={formData.death_place}
                          onChange={(e) => setFormData({ ...formData, death_place: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="epitaph">Epitafija</Label>
                      <Input
                        id="epitaph"
                        value={formData.epitaph}
                        onChange={(e) => setFormData({ ...formData, epitaph: e.target.value })}
                        placeholder="Trumpa atminimo frazė..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="biography">Biografija</Label>
                      <Textarea
                        id="biography"
                        value={formData.biography}
                        onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                        rows={6}
                        placeholder="Papasakokite apie žmogaus gyvenimą..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Burial Place Tab */}
            <TabsContent value="burial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Kapavietės informacija
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pridėkite informaciją apie palaidojimo vietą. Ši informacija bus rodoma atminimo puslapyje.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cemetery_name">Kapinių pavadinimas</Label>
                    <Input
                      id="cemetery_name"
                      value={burialFormData.cemetery_name}
                      onChange={(e) => setBurialFormData({ ...burialFormData, cemetery_name: e.target.value })}
                      placeholder="Pvz.: Antakalnio kapinės"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="burial_address">Adresas</Label>
                    <Input
                      id="burial_address"
                      value={burialFormData.address}
                      onChange={(e) => setBurialFormData({ ...burialFormData, address: e.target.value })}
                      placeholder="Pvz.: Karių kapų g. 11"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="burial_city">Miestas</Label>
                      <Input
                        id="burial_city"
                        value={burialFormData.city}
                        onChange={(e) => setBurialFormData({ ...burialFormData, city: e.target.value })}
                        placeholder="Pvz.: Vilnius"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="burial_country">Šalis</Label>
                      <Input
                        id="burial_country"
                        value={burialFormData.country}
                        onChange={(e) => setBurialFormData({ ...burialFormData, country: e.target.value })}
                        placeholder="Pvz.: Lietuva"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="burial_section">Sekcija / Kvartalas</Label>
                      <Input
                        id="burial_section"
                        value={burialFormData.section}
                        onChange={(e) => setBurialFormData({ ...burialFormData, section: e.target.value })}
                        placeholder="Pvz.: A kvartalas"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="burial_plot">Kapavietės numeris</Label>
                      <Input
                        id="burial_plot"
                        value={burialFormData.plot_number}
                        onChange={(e) => setBurialFormData({ ...burialFormData, plot_number: e.target.value })}
                        placeholder="Pvz.: 15-27"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gyvenimo ivykiai</CardTitle>
                  <Button onClick={addTimelineEvent} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Pridėti ivyki
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {timelineEvents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Dar nėra pridėtų ivykių. Pridėkite pirmą!
                    </p>
                  ) : (
                    timelineEvents.map((event, index) => (
                      <div key={event.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-start justify-between">
                          <span className="text-sm text-muted-foreground">
                            Ivykis #{index + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => deleteTimelineEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Pavadinimas</Label>
                            <Input
                              value={event.title}
                              onChange={(e) => updateTimelineEvent(event.id, 'title', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Data</Label>
                            <Input
                              type="date"
                              value={event.event_date || ''}
                              onChange={(e) => updateTimelineEvent(event.id, 'event_date', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Vieta</Label>
                          <Input
                            value={event.location || ''}
                            onChange={(e) => updateTimelineEvent(event.id, 'location', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Aprasymas</Label>
                          <Textarea
                            value={event.description || ''}
                            onChange={(e) => updateTimelineEvent(event.id, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Isvaizda ir privatumas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Tema</Label>
                    <ThemePicker
                      value={formData.theme as ThemeId}
                      onChange={(theme) => setFormData({ ...formData, theme })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Privatumas</Label>
                    <Select
                      value={formData.privacy}
                      onValueChange={(value) => setFormData({ ...formData, privacy: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Viesai matomas</SelectItem>
                        <SelectItem value="unlisted">Tik su nuoroda</SelectItem>
                        <SelectItem value="private">Privatus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leisti uždegti žvakutes</Label>
                        <p className="text-sm text-muted-foreground">
                          Lankytojai galės uždegti virtualias žvakutes
                        </p>
                      </div>
                      <Switch
                        checked={formData.allow_candles}
                        onCheckedChange={(checked) => setFormData({ ...formData, allow_candles: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Leisti palikti užuojaautas</Label>
                        <p className="text-sm text-muted-foreground">
                          Lankytojai galės palikti komentarus ir užuojautas
                        </p>
                      </div>
                      <Switch
                        checked={formData.allow_condolences}
                        onCheckedChange={(checked) => setFormData({ ...formData, allow_condolences: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  )
}
