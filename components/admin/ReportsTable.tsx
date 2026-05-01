'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye, Flag } from 'lucide-react'

type ReportStatus = 'pending' | 'resolved' | 'dismissed'
type ReportType = 'memorial' | 'condolence' | 'user'

interface Report {
  id: string
  type: ReportType
  reason: string
  status: ReportStatus
  reported_by: string
  target_id: string
  target_name: string
  created_at: string
}

interface ReportsTableProps {
  reports: Report[]
  onResolve?: (reportId: string) => void
  onDismiss?: (reportId: string) => void
  onView?: (reportId: string) => void
}

export function ReportsTable({
  reports,
  onResolve,
  onDismiss,
  onView,
}: ReportsTableProps) {
  const getStatusBadge = (status: ReportStatus) => {
    const variants: Record<ReportStatus, 'default' | 'secondary' | 'outline'> = {
      pending: 'default',
      resolved: 'secondary',
      dismissed: 'outline',
    }
    const labels: Record<ReportStatus, string> = {
      pending: 'Laukia',
      resolved: 'Išspręsta',
      dismissed: 'Atmesta',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  const getTypeBadge = (type: ReportType) => {
    const labels: Record<ReportType, string> = {
      memorial: 'Memorialas',
      condolence: 'Užuojauta',
      user: 'Vartotojas',
    }
    return (
      <Badge variant="outline" className="gap-1">
        <Flag className="h-3 w-3" />
        {labels[type]}
      </Badge>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipas</TableHead>
            <TableHead>Objektas</TableHead>
            <TableHead>Priežastis</TableHead>
            <TableHead>Būsena</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="w-[120px]">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{getTypeBadge(report.type)}</TableCell>
              <TableCell className="font-medium">{report.target_name}</TableCell>
              <TableCell className="text-muted-foreground max-w-[200px] truncate">
                {report.reason}
              </TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(report.created_at).toLocaleDateString('lt-LT')}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(report.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {report.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => onResolve?.(report.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDismiss?.(report.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {reports.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Pranešimų nėra
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
