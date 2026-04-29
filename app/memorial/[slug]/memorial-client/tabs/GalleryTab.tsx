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
      <Card className="border-border/50 bg-card/80 backdrop-blur max-w-2xl mx-auto">
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">

      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden border-border/50 bg-card/80 backdrop-blur group cursor-pointer hover:scale-[1.02] transition-transform"
        >

          {/* Media */}
          <div className="aspect-square relative">

            <Image
              src={item.thumbnail_url || item.url}
              alt={item.caption || 'Gallery image'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />

          </div>

          {/* Caption */}
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
  )
}
