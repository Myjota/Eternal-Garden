'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TreeIcon, CandleIcon, FamilyTreeIcon } from '@/components/icons'
import { type Translations } from '@/lib/i18n/locales/lt'

interface VisionSectionProps {
  t: Translations
}

const visionPillars = (t: Translations) => [
  {
    icon: TreeIcon,
    title: t.visionSection.pillars.memory.title,
    description: t.visionSection.pillars.memory.description,
  },
  {
    icon: CandleIcon,
    title: t.visionSection.pillars.tribute.title,
    description: t.visionSection.pillars.tribute.description,
  },
  {
    icon: FamilyTreeIcon,
    title: t.visionSection.pillars.community.title,
    description: t.visionSection.pillars.community.description,
  },
]

export function VisionSection({ t }: VisionSectionProps) {
  return (
    <section className="relative py-16 md:py-24 bg-[#edf5ed] overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.32em] text-[#5d6d5a]">
              {t.visionSection.label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1d3324] mb-6">
              {t.visionSection.title}
            </h2>
            <p className="max-w-2xl text-[#3c4a3b] leading-relaxed text-base md:text-lg">
              {t.visionSection.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visionPillars(t).map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={index}
                  className="border border-[#d4c4a8]/40 bg-white/90 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#f2f3ee] border border-[#d4c4a8]/40 flex items-center justify-center text-[#2d5a3d]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#1b2f22] mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-[#536153] leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
