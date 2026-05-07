'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TimelineTab } from './tabs/TimelineTab'
import { CondolencesTab } from './tabs/CondolencesTab'

import { Clock, Heart } from 'lucide-react'

interface MemorialTabsProps {
  timelineEvents: any[]
  condolences: any[]
  memorialId: string
}

export function MemorialTabs({
  timelineEvents,
  condolences,
  memorialId,
}: MemorialTabsProps) {
  return (
    <section className="memorial-section memorial-tabs-section">
      
      <div className="memorial-container">

        <Tabs defaultValue="timeline" className="memorial-tabs-w-full">

        {/* NAV */}
        <TabsList className="memorial-tabs-nav">

          <TabsTrigger value="timeline" className="memorial-tabs-trigger">
            <Clock className="memorial-tabs-icon" />
            <span className="memorial-tabs-text">Timeline</span>
          </TabsTrigger>

          <TabsTrigger value="condolences" className="memorial-tabs-trigger">
            <Heart className="memorial-tabs-icon" />
            <span className="memorial-tabs-text">Messages</span>
          </TabsTrigger>

        </TabsList>

        {/* CONTENT */}
        <TabsContent value="timeline">
          <TimelineTab events={timelineEvents} />
        </TabsContent>

        <TabsContent value="condolences">
          <CondolencesTab items={condolences} memorialId={memorialId} />
        </TabsContent>

      </Tabs>

      </div>

    </section>
  )
}
