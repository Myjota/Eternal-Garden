import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from './admin-client'

export const metadata = {
  title: 'Admin | Eternal Garden',
  description: 'Administravimo skydelis',
}

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch admin data
  const [
    { data: users },
    { data: memorials },
    { count: memorialCount },
    { count: userCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('memorials').select('*').order('created_at', { ascending: false }).limit(50),
    supabase.from('memorials').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  return (
    <AdminDashboard 
      users={users || []} 
      memorials={memorials || []}
      stats={{
        totalMemorials: memorialCount || 0,
        totalUsers: userCount || 0,
      }}
    />
  )
}
