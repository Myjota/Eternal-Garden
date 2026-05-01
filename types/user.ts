export type UserRole = 'guest' | 'user' | 'moderator' | 'admin' | 'family' 

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  preferred_language: 'lt' | 'en'
  role: UserRole
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  email_notifications: boolean
  candle_notifications: boolean
  condolence_notifications: boolean
  marketing_emails: boolean
}

export interface UserSubscription {
  id: string
  user_id: string
  plan: 'free' | 'premium' 
  status: 'active' | 'cancelled' | 'expired'
  started_at: string
  expires_at: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
}
