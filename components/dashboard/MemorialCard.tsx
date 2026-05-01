'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Flame, Eye, Edit, ExternalLink, Trash2, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Memorial } from '@/types/memorial'

interface MemorialCardProps {
  memorial: Memorial
  onDelete?: (id: string) => void
  isDeleting?: boolean
}

export function MemorialCard({
  memorial,
  onDelete,
  isDeleting = false,
}: MemorialCardProps) {
  const birthYear = memorial.birth_date
    ? new Date(memorial.birth_date).getFullYear()
    : null
  const deathYear = memorial.death_date
    ? new Date(memorial.death_date).getFullYear()
    : null

  return (
    <Card className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="aspect-[4/3] relative bg-muted">
        <Image
          src={memorial.profile_image_url || '/images/logo.png'}
          alt={`${memorial.first_name} ${memorial.last_name}`}
          fill
          className="object-cover"
        />
        
        {/* Privacy badge */}
        {memorial.privacy !== 'public' && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2"
          >
            {memorial.privacy === 'private' ? 'Privatus' : 'Neįtrauktas'}
          </Badge>
        )}

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-4 text-white text-sm">
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {memorial.candle_count}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {memorial.view_count}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-lg text-foreground truncate">
              {memorial.first_name} {memorial.last_name}
            </h3>
            {(birthYear || deathYear) && (
              <p className="text-sm text-muted-foreground">
                {birthYear || '—'} – {deathYear || '—'}
              </p>
            )}
          </div>

          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/memorial/${memorial.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Redaguoti
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/memorial/${memorial.slug}`} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Peržiūrėti
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(memorial.id)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Ištrinti
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {memorial.biography && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {memorial.biography}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
