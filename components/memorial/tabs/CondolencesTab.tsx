'use client'

import { useState, useEffect } from 'react'
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
  memorialId: string
  allowCondolences?: boolean
}

export function CondolencesTab({
  items: initialItems,
  memorialId,
  allowCondolences = true,
}: CondolencesTabProps) {

  const [items, setItems] = useState(initialItems)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch condolences from API
  const fetchCondolences = async () => {
    try {
      const response = await fetch(`/api/condolences?memorial_id=${memorialId}`)
      if (response.ok) {
        const data = await response.json()
        setItems(data.data)
      }
    } catch (error) {
      console.error('Error fetching condolences:', error)
    }
  }

  useEffect(() => {
    if (memorialId) {
      fetchCondolences()
    }
  }, [memorialId])

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/condolences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memorialId,
          authorName: name.trim(),
          message: message.trim()
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Add new condolence to the list
        setItems(prev => [data.data, ...prev])
        setName('')
        setMessage('')
      } else {
        const error = await response.json()
        alert(error.error || 'Nepavyko išsiųsti žinutės')
      }
    } catch (error) {
      console.error('Error submitting condolence:', error)
      alert('Nepavyko išsiųsti žinutės')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!items.length && !allowCondolences) {
    return (
      <Card className="memorial-condolences-card">
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
    <div className="memorial-condolences">

      {/* FORM */}
      {allowCondolences && (
        <Card className="memorial-condolences-form">

          <CardContent className="p-6 space-y-4">

            <h3 className="memorial-condolences-title">
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
              className="memorial-condolences-submit"
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
          <Card className="memorial-condolences-card">
            <CardContent className="p-12 text-center text-muted-foreground">
              Dar nėra paliktų žinučių
            </CardContent>
          </Card>
        )
      ) : (
        <div className="memorial-condolences-list">

          {items.map((c) => (
            <Card key={c.id} className="memorial-condolences-item">

              <CardContent className="p-5">

                <div className="memorial-condolences-header">

                  <span className="memorial-condolences-author">
                    {c.author_name}
                  </span>

                  <time className="memorial-condolences-date">
                    {format(new Date(c.created_at), 'yyyy-MM-dd', { locale: lt })}
                  </time>

                </div>

                <p className="memorial-condolences-message">
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
