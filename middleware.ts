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

  // ✅ Skip all public + SEO-critical routes immediately
  if (
    path === '/sitemap.xml' ||
    path === '/robots.txt' ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Optional: skip Next.js internals
  if (path.startsWith('/_next')) {
    return NextResponse.next()
  }

  // Check if route is protected
  const isProtected = PROTECTED_ROUTES.some((route) =>
    path.startsWith(route)
  )

  // Public routes → no auth check
  if (!isProtected) {
    return NextResponse.next()
  }

  // Protected routes → Supabase session check
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
      Run middleware on all routes except:
      - static assets
      - images
      - sitemap/robots (important for SEO + Google)
      - api routes for external access
    */
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
