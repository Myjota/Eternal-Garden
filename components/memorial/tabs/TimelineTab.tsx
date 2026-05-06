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
      <Card className="memorial-timeline-empty-card">
        <CardContent className="memorial-timeline-empty-content">
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
    <div className="memorial-timeline">

      {/* Timeline line (theme-driven) */}
      <div className="memorial-timeline-line" />

      <div className="memorial-timeline-events">

        {events.map((event) => (
          <div key={event.id} className="memorial-timeline-item">

            {/* Dot (theme-driven) */}
            <div className="memorial-timeline-dot" />

            <Card className="memorial-timeline-card">

              {/* Optional image */}
              {event.image_url && (
                <div className="memorial-timeline-image">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <CardContent className="memorial-timeline-card-content">

                {/* Year badge */}
                {event.event_date && (
                  <div className="memorial-timeline-year">
                    {new Date(event.event_date).getFullYear()}
                  </div>
                )}

                {/* Title */}
                <h3 className="memorial-timeline-title">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="memorial-timeline-description">
                    {event.description}
                  </p>
                )}

                {/* Location */}
                {event.location && (
                  <p className="memorial-timeline-location">
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
