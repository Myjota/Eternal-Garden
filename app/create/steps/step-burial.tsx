'use client'

import { MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface BurialFormData {
  cemetery_name: string
  address: string
  city: string
  country: string
  section: string
  plot_number: string
}

interface StepBurialProps {
  burialFormData: BurialFormData
  onUpdate: (data: BurialFormData) => void
}

export function StepBurial({ burialFormData, onUpdate }: StepBurialProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle className="font-serif">Kapavietė</CardTitle>
            <CardDescription>
              Pridėkite informaciją apie palaidojimo vietą (nebūtina)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cemetery_name">Kapinių pavadinimas</Label>
          <Input
            id="cemetery_name"
            value={burialFormData.cemetery_name}
            onChange={(e) => onUpdate({ ...burialFormData, cemetery_name: e.target.value })}
            placeholder="Pvz.: Antakalnio kapinės"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="burial_address">Adresas</Label>
          <Input
            id="burial_address"
            value={burialFormData.address}
            onChange={(e) => onUpdate({ ...burialFormData, address: e.target.value })}
            placeholder="Pvz.: Karių kapų g. 11"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="burial_city">Miestas</Label>
            <Input
              id="burial_city"
              value={burialFormData.city}
              onChange={(e) => onUpdate({ ...burialFormData, city: e.target.value })}
              placeholder="Pvz.: Vilnius"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="burial_country">Šalis</Label>
            <Input
              id="burial_country"
              value={burialFormData.country}
              onChange={(e) => onUpdate({ ...burialFormData, country: e.target.value })}
              placeholder="Pvz.: Lietuva"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="burial_section">Sekcija / Kvartalas</Label>
            <Input
              id="burial_section"
              value={burialFormData.section}
              onChange={(e) => onUpdate({ ...burialFormData, section: e.target.value })}
              placeholder="Pvz.: A kvartalas"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="burial_plot">Kapavietės numeris</Label>
            <Input
              id="burial_plot"
              value={burialFormData.plot_number}
              onChange={(e) => onUpdate({ ...burialFormData, plot_number: e.target.value })}
              placeholder="Pvz.: 15-27"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
