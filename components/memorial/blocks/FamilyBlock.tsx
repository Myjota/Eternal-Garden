'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

interface FamilyMember {
  id: string
  name: string
  relationship: string
  avatarUrl?: string | null
}

interface FamilyBlockProps {
  members: FamilyMember[]
}

export function FamilyBlock({ members }: FamilyBlockProps) {
  if (members.length === 0) return null

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-primary" />
          Šeima
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-primary">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="font-medium text-sm text-foreground">
                {member.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {member.relationship}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
