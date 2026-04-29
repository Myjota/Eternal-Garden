'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Empty } from '@/components/ui/empty'
import { Clock } from 'lucide-react'

interface TimelineEvent {
  id: string
  title: string
  description: string | null
  event_date: string | null
  location: string | null
  image_url: string | null
}

interface TimelineTabProps {
  events: TimelineEvent[]
}

export function TimelineTab({ events }: TimelineTabProps) {
  if (!events || events.length === 0) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur max-w-2xl mx-auto">
        <CardContent className="p-12">
          <Empty
            icon={Clock}
            title="Nėra įvykių"
            description="Gyvenimo įvykiai dar nepridėti"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto relative pl-8">

      {/* Timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border/50" />

      <div className="space-y-8">

        {events.map((event) => (
          <div key={event.id} className="relative">

            {/* Dot */}
            <div className="absolute -left-8 top-6 w-6 h-6 rounded-full bg-primary/20 border border-primary/40" />

            <Card className="border-border/50 bg-card/90 backdrop-blur overflow-hidden">

              {/* Optional image */}
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

                {/* Year badge */}
                {event.event_date && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    {new Date(event.event_date).getFullYear()}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    {event.description}
                  </p>
                )}

                {/* Location */}
                {event.location && (
                  <p className="text-muted-foreground/70 text-sm mt-3">
                    📍 {event.location}
                  </p>
                )}

              </CardContent>
            </Card>

          </div>
        ))}

      </div>
    </div>
  )
                }
