'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MemorialHeaderProps {
  onShare: () => void
}

export function MemorialHeader({ onShare }: MemorialHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Left side */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />

          <Image
            src="/images/logo.png"
            alt="Eternal Garden"
            width={28}
            height={28}
            className="h-7 w-auto"
          />

          <span className="font-serif text-lg font-semibold hidden sm:inline">
            Eternal Garden
          </span>
        </Link>

        {/* Right side */}
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share</span>
        </Button>

      </div>
    </header>
  )
}
