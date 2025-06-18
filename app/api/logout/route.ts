import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' });

  // Expire cookies
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  res.cookies.set('user', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return res;
}
