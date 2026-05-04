'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Empty } from '@/components/ui/empty'
import { ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  type: string
  url: string
  thumbnail_url: string | null
  caption: string | null
}

interface GalleryTabProps {
  items: GalleryItem[]
}

export function GalleryTab({ items }: GalleryTabProps) {
  if (!items || items.length === 0) {
    return (
      <Card className="theme-card">
        <CardContent className="p-12">
          <Empty
            icon={ImageIcon}
            title="Nėra nuotraukų"
            description="Nuotraukos dar nepridėtos"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="memorial-gallery">

      {items.map((item) => (
        <Card
          key={item.id}
          className="memorial-gallery-item"
        >

          {/* Media */}
          <div className="memorial-gallery-image">

            <Image
              src={item.thumbnail_url || item.url}
              alt={item.caption || 'Gallery image'}
              fill
              className="memorial-gallery-img"
            />

            {/* Theme-aware overlay */}
            <div className="memorial-gallery-overlay" />

          </div>

          {/* Caption */}
          {item.caption && (
            <CardContent className="p-3">
              <p className="memorial-gallery-caption">
                {item.caption}
              </p>
            </CardContent>
          )}

        </Card>
      ))}

    </div>
  )
}
