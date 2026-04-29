import { Flame, Eye } from 'lucide-react'

interface MemorialStatsProps {
  candles: number
  views: number
  candlesLabel?: string
  viewsLabel?: string
}

export function MemorialStats({
  candles,
  views,
  candlesLabel = 'Žvakės',
  viewsLabel = 'Peržiūros',
}: MemorialStatsProps) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8">

      {/* Candles */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10">
          <Flame className="h-6 w-6 text-primary" />
        </div>

        <div className="text-left">
          <div className="text-2xl font-bold text-foreground">
            {candles}
          </div>
          <div className="text-sm text-muted-foreground">
            {candlesLabel}
          </div>
        </div>
      </div>

      {/* Views */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-muted">
          <Eye className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="text-left">
          <div className="text-2xl font-bold text-foreground">
            {views}
          </div>
          <div className="text-sm text-muted-foreground">
            {viewsLabel}
          </div>
        </div>
      </div>

    </div>
  )
}
