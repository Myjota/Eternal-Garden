'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Check } from 'lucide-react'

interface UpgradeCardProps {
  onUpgrade?: () => void
}

const premiumFeatures = [
  'Visos premium temos',
  'Neribota galerija',
  'Custom URL adresas',
  'Šeimos ženklelis',
  'Prioritetinis palaikymas',
  'Išplėstinės žvakių funkcijos',
]

export function UpgradeCard({ onUpgrade }: UpgradeCardProps) {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Premium planas</h3>
            <p className="text-sm text-muted-foreground">
              Atrakinkite visas funkcijas
            </p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {premiumFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full gap-2" onClick={onUpgrade}>
          <Sparkles className="h-4 w-4" />
          Pereiti į Premium
        </Button>
      </CardContent>
    </Card>
  )
}
