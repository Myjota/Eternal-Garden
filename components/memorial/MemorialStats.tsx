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
    <div className="memorial-stats">

      {/* Candles */}
      <div className="memorial-stat-item">
        <div className="memorial-stat-icon">
          <Flame className="h-6 w-6" />
        </div>

        <div className="memorial-stat-content">
          <div className="memorial-stat-number">
            {candles}
          </div>
          <div className="memorial-stat-label">
            {candlesLabel}
          </div>
        </div>
      </div>

      {/* Views */}
      <div className="memorial-stat-item">
        <div className="memorial-stat-icon">
          <Eye className="h-6 w-6" />
        </div>

        <div className="memorial-stat-content">
          <div className="memorial-stat-number">
            {views}
          </div>
          <div className="memorial-stat-label">
            {viewsLabel}
          </div>
        </div>
      </div>

    </div>
  )
}
