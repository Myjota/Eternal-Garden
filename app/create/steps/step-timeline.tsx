'use client'

import { Calendar, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface TimelineEvent {
  id: string
  title: string
  event_date: string
  location: string
  description: string
}

interface StepTimelineProps {
  timelineEvents: TimelineEvent[]
  onAddEvent: () => void
  onUpdateEvent: (id: string, field: keyof TimelineEvent, value: string) => void
  onRemoveEvent: (id: string) => void
}

export function StepTimeline({
  timelineEvents,
  onAddEvent,
  onUpdateEvent,
  onRemoveEvent,
}: StepTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Gyvenimo ivykiai
            </CardTitle>
            <CardDescription>
              Pridekite svarbius gyvenimo momentus (nebutina)
            </CardDescription>
          </div>
          <Button onClick={onAddEvent} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Prideti
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {timelineEvents.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-2">
              Dar neprideta jokiu gyvenimo ivykiu
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Galite prideti svarbius gyvenimo momentus: gimimas, mokslai, vestuves, pasiekimai ir kt.
            </p>
            <Button onClick={onAddEvent} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Prideti pirmaji ivyki
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="border border-border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemoveEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="pr-10 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                      {index + 1}
                    </span>
                    Ivykis
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Pavadinimas *</Label>
                      <Input
                        value={event.title}
                        onChange={(e) => onUpdateEvent(event.id, 'title', e.target.value)}
                        placeholder="Pvz.: Gimimas, Vestuves"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={event.event_date}
                        onChange={(e) => onUpdateEvent(event.id, 'event_date', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Vieta</Label>
                    <Input
                      value={event.location}
                      onChange={(e) => onUpdateEvent(event.id, 'location', e.target.value)}
                      placeholder="Pvz.: Vilnius, Lietuva"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Aprasymas</Label>
                    <Textarea
                      value={event.description}
                      onChange={(e) => onUpdateEvent(event.id, 'description', e.target.value)}
                      placeholder="Trumpas ivykio aprasymas..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button onClick={onAddEvent} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Prideti dar viena ivyki
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
