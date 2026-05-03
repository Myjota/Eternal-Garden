import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  // IMPORTANT: redirect to neutral page, NOT /auth/login
  return NextResponse.redirect(
    new URL('/', SITE_URL),
    { status: 302 }
  )
}

export async function GET() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  // same behavior for GET
  return NextResponse.redirect(
    new URL('/', SITE_URL),
    { status: 302 }
  )
}
