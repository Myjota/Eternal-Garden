'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  firstName: string
  lastName: string
  birthDate: string
  deathDate: string
  biography: string
  epitaph: string
  theme: string
  isPublic: boolean
}

interface StepInformationProps {
  formData: FormData
  updateFormData: (field: string, value: string | boolean) => void
  isFamous: boolean
  profileImagePreview: string | null
  coverImagePreview: string | null
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCoverImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
  onRemoveCoverImage: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  coverFileInputRef: React.RefObject<HTMLInputElement | null>
}

export function StepInformation({
  formData,
  updateFormData,
  isFamous,
  profileImagePreview,
  coverImagePreview,
  onImageSelect,
  onCoverImageSelect,
  onRemoveImage,
  onRemoveCoverImage,
  fileInputRef,
  coverFileInputRef,
}: StepInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Pagrindinė informacija</CardTitle>
        <CardDescription>
          Įveskite artimojo duomenis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Vardas *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              placeholder="Jonas"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Pavardė *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              placeholder="Jonaitis"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate">Gimimo data *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => updateFormData('birthDate', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deathDate">Mirties data *</Label>
            <Input
              id="deathDate"
              type="date"
              value={formData.deathDate}
              onChange={(e) => updateFormData('deathDate', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="biography">Biografija</Label>
          <Textarea
            id="biography"
            value={formData.biography}
            onChange={(e) => updateFormData('biography', e.target.value)}
            placeholder="Papasakokite apie šį žmogų..."
            rows={4}
          />
        </div>

        {isFamous && (
          <div className="space-y-2">
            <Label htmlFor="epitaph">Epitafija / Trumpas aprašymas *</Label>
            <Textarea
              id="epitaph"
              value={formData.epitaph}
              onChange={(e) => updateFormData('epitaph', e.target.value)}
              placeholder="Pvz.: Lietuvos poetas, rašytojas, visuomenininkas"
              required={isFamous}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Šis aprašymas bus rodomas žymių žmonių kortelėje pagrindiniame puslapyje
            </p>
          </div>
        )}

        {!isFamous && (
          <div className="space-y-2">
            <Label htmlFor="epitaph">Epitafija</Label>
            <Textarea
              id="epitaph"
              value={formData.epitaph}
              onChange={(e) => updateFormData('epitaph', e.target.value)}
              placeholder="Pvz.: Amžinai gyvas mūsų širdyse..."
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Trumpa frazė ar citata, kuri bus rodoma atminimo puslapyje
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label>Profilio nuotrauka</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
          />
          
          {profileImagePreview ? (
            <div className="relative w-48 h-64 mx-auto">
              <Image
                src={profileImagePreview}
                alt="Pasirinkta nuotrauka"
                fill
                className="object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={onRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Spustelekite arba vilkite nuotrauka
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG iki 5MB
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Virselio nuotrauka (Cover)</Label>
          <input
            ref={coverFileInputRef}
            type="file"
            accept="image/*"
            onChange={onCoverImageSelect}
            className="hidden"
          />
          
          {coverImagePreview ? (
            <div className="relative w-full h-40 mx-auto">
              <Image
                src={coverImagePreview}
                alt="Virselio nuotrauka"
                fill
                className="object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={onRemoveCoverImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => coverFileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Pasirinkite virselio nuotrauka
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Rekomenduojama: 1200x400px, PNG arba JPG
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
