'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { FamousSection } from '@/components/landing/famous-section'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        setIsAdmin(profile?.is_admin ?? false)
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAdmin(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <HeroSection isAdmin={isAdmin} />
      <FeaturesSection isAdmin={isAdmin} />
      <FamousSection isAdmin={isAdmin} />
    </>
  )
}
