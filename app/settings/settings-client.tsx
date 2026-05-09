import { SettingsClient } from './settings-client'
import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Not logged in</div>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('preferred_language')
    .eq('id', user.id)
    .single()

  return (
    <SettingsClient
      user={user}
      initialPreferredLanguage={
        profile?.preferred_language ?? 'lt'
      }
    />
  )
}
