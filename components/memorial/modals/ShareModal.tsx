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
import { 
  Share2, 
  Copy, 
  Check,
  Facebook,
  Mail,
} from 'lucide-react'

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  title: string
}

export function ShareModal({
  open,
  onOpenChange,
  url,
  title,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Dalintis memorialu
          </DialogTitle>
          <DialogDescription>
            Pasidalinkite šiuo memorialu su draugais ir šeima
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* URL Copy */}
          <div className="flex gap-2">
            <Input
              value={url}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleFacebookShare}
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleEmailShare}
            >
              <Mail className="h-4 w-4" />
              El. paštu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
