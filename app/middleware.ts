// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Define which routes are public (accessible without authentication)
const PUBLIC_ROUTES = ['/', '/login', '/register'];

/**
 * Middleware function to protect routes and manage redirects.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If accessing a protected route without token, redirect to login
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Prevent authenticated users from visiting login or register pages again
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

/**
 * Define which paths this middleware should run on.
 * Excludes static files (_next), assets, API routes, etc.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets|api/public|.*\\..*).*)',
  ],
};
