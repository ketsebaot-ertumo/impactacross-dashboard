// /pages/api/me.ts or /app/api/me/route.ts (depending on your setup)
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookies = request.headers.get('cookie');
  const userCookie = cookies?.split('; ').find((row) => row.startsWith('user='))?.split('=')[1];

  if (!userCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie));
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Failed to parse user cookie' }, { status: 400 });
  }
}
