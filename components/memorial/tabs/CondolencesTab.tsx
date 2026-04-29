'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { lt } from 'date-fns/locale'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/ui/empty'

import { MessageCircle, Heart } from 'lucide-react'

interface Condolence {
  id: string
  author_name: string
  message: string
  created_at: string
}

interface CondolencesTabProps {
  items: Condolence[]

  allowCondolences?: boolean
  isSubmitting?: boolean

  onSubmit?: (data: { name: string; message: string }) => void
}

export function CondolencesTab({
  items,
  allowCondolences = true,
  isSubmitting = false,
  onSubmit,
}: CondolencesTabProps) {

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return

    onSubmit?.({ name, message })

    setName('')
    setMessage('')
  }

  // ❌ Empty state
  if (!items.length && !allowCondolences) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur max-w-2xl mx-auto">
        <CardContent className="p-12">
          <Empty
            icon={MessageCircle}
            title="Nėra žinučių"
            description="Užuojautos šiame memoriale išjungtos"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* FORM */}
      {allowCondolences && (
        <Card className="border-border/50 bg-card/90 backdrop-blur">

          <CardContent className="p-6 space-y-4">

            <h3 className="font-serif text-xl font-semibold">
              Palikti žinutę
            </h3>

            <Input
              placeholder="Jūsų vardas"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              placeholder="Jūsų žinutė..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="w-full sm:w-auto gap-2"
            >
              <Heart className="h-4 w-4" />
              Siųsti
            </Button>

          </CardContent>
        </Card>
      )}

      {/* LIST */}
      {items.length === 0 ? (
        allowCondolences ? null : (
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardContent className="p-12 text-center text-muted-foreground">
              Dar nėra paliktų žinučių
            </CardContent>
          </Card>
        )
      ) : (
        <div className="space-y-4">

          {items.map((c) => (
            <Card key={c.id} className="border-border/50 bg-card/80 backdrop-blur">

              <CardContent className="p-5">

                <div className="flex items-center justify-between mb-3">

                  <span className="font-semibold">
                    {c.author_name}
                  </span>

                  <time className="text-xs text-muted-foreground">
                    {format(new Date(c.created_at), 'yyyy-MM-dd', { locale: lt })}
                  </time>

                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {c.message}
                </p>

              </CardContent>

            </Card>
          ))}

        </div>
      )}

    </div>
  )
                }
