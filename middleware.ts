// /middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  // Get the cookies from the incoming request
  const cookies = req.headers.get('cookie') || '';
  const token = cookies.split('; ').find(c => c.startsWith('token='))?.split('=')[1];

  // Check if the current request is already for the login page
  const isLoginPage = req.url.includes('/login');

  // If no token and not already on the login page, redirect to login page
  if (!token && !isLoginPage) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, continue processing the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', "/dashboard/blog", "/dashboard/user", "/dashboard/publication", "/dashboard/multimedia", "/dashboard/training",
    '/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

