// // /middleware.ts

import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Allow public routes
  const publicPaths = ['/','/login', '/register'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the cookies from the request
  const cookies = req.headers.get('cookie') || '';
  const userCookie = cookies
    .split('; ')
    .find(c => c.startsWith('user='))?.split('=')[1];

  // If no user cookie is found, redirect to the login page
  if (!userCookie) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  let user;
  try {
    user = JSON.parse(decodeURIComponent(userCookie));
  } catch (error) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = user.role;

  if (role === 'admin') {
    if (!pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else if (role === 'user') {
    if (!pathname.startsWith('/dashboard/user')) {
      return NextResponse.redirect(new URL('/dashboard/user', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:jpg|jpeg|png|svg|mp4|webm|css|js)).*)',
  ],
};
