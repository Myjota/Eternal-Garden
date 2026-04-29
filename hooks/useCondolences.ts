'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Condolence {
  id: string
  author_name: string
  message: string
  created_at: string
}

interface UseCondolencesProps {
  memorialId: string
  initialItems: Condolence[]
  userId?: string | null
}

export function useCondolences({
  memorialId,
  initialItems,
  userId,
}: UseCondolencesProps) {

  const [items, setItems] = useState(initialItems)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClient()

  const submitCondolence = async (data: {
    name: string
    message: string
  }) => {

    if (!data.name.trim() || !data.message.trim()) return

    setIsSubmitting(true)

    // 🧠 optimistic UI (UX boost)
    const tempId = `temp-${Date.now()}`

    const optimisticItem: Condolence = {
      id: tempId,
      author_name: data.name,
      message: data.message,
      created_at: new Date().toISOString(),
    }

    setItems((prev) => [optimisticItem, ...prev])

    const { data: inserted, error } = await supabase
      .from('condolences')
      .insert({
        memorial_id: memorialId,
        user_id: userId || null,
        author_name: data.name,
        message: data.message,
      })
      .select()
      .single()

    if (error) {
      // rollback
      setItems((prev) => prev.filter((i) => i.id !== tempId))
      setIsSubmitting(false)
      return
    }

    // replace optimistic with real
    if (inserted) {
      setItems((prev) =>
        prev.map((i) => (i.id === tempId ? inserted : i))
      )
    }

    setIsSubmitting(false)
  }

  return {
    items,
    isSubmitting,
    submitCondolence,
  }
}
