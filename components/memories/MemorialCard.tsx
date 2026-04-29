import Image from 'next/image'
import Link from 'next/link'
import { Flame, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function MemorialCard({
  memorial,
  image,
  viewLabel,
}: any) {
  return (
    <Card className="overflow-hidden border transition-all group">
      
      <div className="aspect-[3/4] relative">
        <Image
          src={image}
          alt={`${memorial.firstName} ${memorial.lastName}`}
          fill
          className="object-cover group-hover:scale-105 transition"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-3">
          <div className="flex gap-4 text-white text-sm">
            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {memorial.candlesLit}
            </span>

            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {memorial.visitors}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4 text-center">

        <h3 className="font-serif font-semibold">
          {memorial.firstName} {memorial.lastName}
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          {new Date(memorial.birthDate).getFullYear()} –{' '}
          {new Date(memorial.deathDate).getFullYear()}
        </p>

        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {memorial.biography}
        </p>

        <Button className="mt-4" variant="outline" asChild>
          <Link href={`/memorial/${memorial.slug}`}>
            {viewLabel}
          </Link>
        </Button>

      </CardContent>
    </Card>
  )
}
