import { createClient } from '@/lib/supabase/server'
import { ServicesClient } from './services-client'

export default async function ServicesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ServicesClient user={user} />
}
