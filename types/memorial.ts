import type { ThemeId } from '@/lib/themes/config'

export interface Memorial {
  id: string
  slug: string
  first_name: string
  last_name: string
  birth_date: string | null
  death_date: string | null
  biography: string | null
  epitaph: string | null
  profile_image_url: string | null
  cover_image_url: string | null
  theme: ThemeId
  privacy: 'public' | 'private'
  view_count: number
  candle_count: number
  allow_candles: boolean
  allow_condolences: boolean
  created_at: string
  updated_at: string
  owner_id: string
}

export interface TimelineEvent {
  id: string
  memorial_id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  image_url: string | null
  created_at: string
}

export interface GalleryItem {
  id: string
  memorial_id: string
  type: 'image' | 'video'
  url: string
  caption: string | null
  order: number
  created_at: string
}

export interface Candle {
  id: string
  memorial_id: string
  user_id: string | null
  user_name: string | null
  message: string | null
  lit_at: string
}

export interface Condolence {
  id: string
  memorial_id: string
  user_id: string | null
  author_name: string
  message: string
  is_approved: boolean
  created_at: string
}
