import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const PROTECTED_ROUTES = [
  '/dashboard',
  '/admin',
  '/settings',
  '/profile',
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for public routes
  const isProtected = PROTECTED_ROUTES.some((route) =>
    path.startsWith(route)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  // Only for protected routes we check session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run middleware on all routes except static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
