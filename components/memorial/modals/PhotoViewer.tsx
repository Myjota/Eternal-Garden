'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '@/types/memorial'

interface PhotoViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: GalleryItem[]
  initialIndex?: number
}

export function PhotoViewer({
  open,
  onOpenChange,
  items,
  initialIndex = 0,
}: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const currentItem = items[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onOpenChange(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  if (!currentItem) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
        <div className="relative aspect-[4/3] md:aspect-[16/10]">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/10"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Previous button */}
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={currentItem.url}
              alt={currentItem.caption || 'Nuotrauka'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Next button */}
          {items.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* Caption and counter */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {currentItem.caption && (
              <p className="text-white text-center mb-2">
                {currentItem.caption}
              </p>
            )}
            {items.length > 1 && (
              <p className="text-white/60 text-center text-sm">
                {currentIndex + 1} / {items.length}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
