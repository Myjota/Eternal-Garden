'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Flame } from 'lucide-react'

interface CandleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; message: string }) => void
  isLoading?: boolean
  memorialName: string
}

export function CandleModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  memorialName,
}: CandleModalProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, message })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Uždegti žvakę
          </DialogTitle>
          <DialogDescription>
            Uždekite virtualią žvakę {memorialName} atminimui
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Jūsų vardas</Label>
            <Input
              id="name"
              placeholder="Įveskite savo vardą"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Žinutė (neprivaloma)</Label>
            <Textarea
              id="message"
              placeholder="Parašykite trumpą žinutę..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Atšaukti
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Flame className="h-4 w-4" />
              {isLoading ? 'Degama...' : 'Uždegti žvakę'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
