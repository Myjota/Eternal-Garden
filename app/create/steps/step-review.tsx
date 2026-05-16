'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TimelineEvent } from './step-timeline'
import type { BurialFormData } from './step-burial'

interface FormData {
  firstName: string
  lastName: string
  birthDate: string
  deathDate: string
  biography: string
  epitaph: string
  theme: string
  isPublic: boolean
}

interface StepReviewProps {
  formData: FormData
  profileImagePreview: string | null
  isFamous: boolean
  timelineEvents: TimelineEvent[]
  burialFormData: BurialFormData
}

export function StepReview({
  formData,
  profileImagePreview,
  isFamous,
  timelineEvents,
  burialFormData,
}: StepReviewProps) {
  return (
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
            <div className="py-3 border-b border-border">
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
          {(burialFormData.cemetery_name || burialFormData.address) && (
            <div className="py-3">
              <span className="text-muted-foreground block mb-2">Kapavietė</span>
              <div className="text-sm space-y-1">
                {burialFormData.cemetery_name && (
                  <p className="font-medium">{burialFormData.cemetery_name}</p>
                )}
                {burialFormData.address && <p>{burialFormData.address}</p>}
                {(burialFormData.city || burialFormData.country) && (
                  <p className="text-muted-foreground">
                    {[burialFormData.city, burialFormData.country].filter(Boolean).join(', ')}
                  </p>
                )}
                {(burialFormData.section || burialFormData.plot_number) && (
                  <p className="text-muted-foreground">
                    {[burialFormData.section, burialFormData.plot_number].filter(Boolean).join(', ')}
                  </p>
                )}
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
  )
}
