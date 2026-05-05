'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TimelineTab } from './tabs/TimelineTab'
import { CondolencesTab } from './tabs/CondolencesTab'

import { Clock, Heart } from 'lucide-react'

interface MemorialTabsProps {
  timelineEvents: any[]
  condolences: any[]
}

export function MemorialTabs({
  timelineEvents,
  condolences,
}: MemorialTabsProps) {
  return (
    <section className="memorial-tabs-container">

      <Tabs defaultValue="timeline" className="w-full">

        {/* NAV */}
        <TabsList className="memorial-tabs-nav">

          <TabsTrigger value="timeline" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>

          <TabsTrigger value="condolences" className="gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>

        </TabsList>

        {/* CONTENT */}
        <TabsContent value="timeline">
          <TimelineTab events={timelineEvents} />
        </TabsContent>

        <TabsContent value="condolences">
          <CondolencesTab items={condolences} />
        </TabsContent>

      </Tabs>

    </section>
  )
}
