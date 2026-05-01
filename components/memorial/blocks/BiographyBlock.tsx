'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

interface BiographyBlockProps {
  biography: string | null
  epitaph?: string | null
}

export function BiographyBlock({ biography, epitaph }: BiographyBlockProps) {
  if (!biography && !epitaph) return null

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          Biografija
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {epitaph && (
          <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
            &ldquo;{epitaph}&rdquo;
          </blockquote>
        )}
        {biography && (
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {biography}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
