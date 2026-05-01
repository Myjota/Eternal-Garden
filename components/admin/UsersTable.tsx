'use client'

import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Search, Shield, Ban, Mail, Eye } from 'lucide-react'
import type { Profile, UserRole } from '@/types/user'

interface UsersTableProps {
  users: Profile[]
  onRoleChange?: (userId: string, role: UserRole) => void
  onBan?: (userId: string) => void
  onViewDetails?: (userId: string) => void
}

export function UsersTable({
  users,
  onRoleChange,
  onBan,
  onViewDetails,
}: UsersTableProps) {
  const [search, setSearch] = useState('')

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  )

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      admin: 'destructive',
      moderator: 'default',
      user: 'secondary',
      guest: 'outline',
    }
    return <Badge variant={variants[role]}>{role}</Badge>
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ieškoti vartotojų..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vartotojas</TableHead>
              <TableHead>El. paštas</TableHead>
              <TableHead>Rolė</TableHead>
              <TableHead>Registracija</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.full_name || 'Nenurodyta'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email || '—'}
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString('lt-LT')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails?.(user.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Peržiūrėti
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Rašyti laišką
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onRoleChange?.(user.id, 'moderator')}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Padaryti moderatoriumi
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onBan?.(user.id)}
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Užblokuoti
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Vartotojų nerasta
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
