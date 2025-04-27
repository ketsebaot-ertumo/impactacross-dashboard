// /middleware.ts

import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  // Get the cookies from the incoming request
  const cookies = req.headers.get('cookie') || '';
  const token = cookies.split('; ').find(c => c.startsWith('token='))?.split('=')[1];

  // Check if the current request is for login or register page
  const isLoginPage = req.url.includes('/login');
  const isRegisterPage = req.url.includes('/register');

  // If no token and not on login or register page, redirect to login page
  if (!token && !isLoginPage && !isRegisterPage) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token exists, continue processing the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    "/dashboard/learning-journey/in-progress",
    "/dashboard/learning-journey/transcripts",
    "/dashboard/course-catalog",
    "/dashboard/resource-center",
    // '/((?!_next/static|_next/image|favicon.ico|api).*)'
  ],
};
