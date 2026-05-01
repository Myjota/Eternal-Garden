'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Palette, Plus, Edit, Trash2, Eye, Sparkles } from 'lucide-react'
import { themeConfigs, type ThemeId, type ThemeConfig } from '@/lib/themes/config'

interface ThemeManagerProps {
  onCreateTheme?: () => void
  onEditTheme?: (themeId: ThemeId) => void
  onDeleteTheme?: (themeId: ThemeId) => void
  onTogglePremium?: (themeId: ThemeId, isPremium: boolean) => void
}

export function ThemeManager({
  onCreateTheme,
  onEditTheme,
  onDeleteTheme,
  onTogglePremium,
}: ThemeManagerProps) {
  const [search, setSearch] = useState('')
  const themes = Object.values(themeConfigs)

  const filteredThemes = themes.filter((theme) =>
    theme.name.toLowerCase().includes(search.toLowerCase())
  )

  const freeCount = themes.filter((t) => !t.isPremium).length
  const premiumCount = themes.filter((t) => t.isPremium).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{themes.length}</p>
                <p className="text-sm text-muted-foreground">Visos temos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{freeCount}</p>
                <p className="text-sm text-muted-foreground">Nemokamos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{premiumCount}</p>
                <p className="text-sm text-muted-foreground">Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Ieškoti temų..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button className="gap-2" onClick={onCreateTheme}>
          <Plus className="h-4 w-4" />
          Nauja tema
        </Button>
      </div>

      {/* Themes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThemes.map((theme) => (
          <Card key={theme.id} className="overflow-hidden">
            {/* Preview */}
            <div
              className="h-24 relative"
              style={{ backgroundColor: theme.colors.background }}
            >
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
              {theme.isPremium && (
                <Badge className="absolute top-2 right-2 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>

            {/* Info */}
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="font-medium">{theme.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {theme.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`premium-${theme.id}`}
                    checked={theme.isPremium}
                    onCheckedChange={(checked) =>
                      onTogglePremium?.(theme.id, checked)
                    }
                  />
                  <Label htmlFor={`premium-${theme.id}`} className="text-sm">
                    Premium
                  </Label>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditTheme?.(theme.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDeleteTheme?.(theme.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
