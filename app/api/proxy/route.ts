// /api/proxy/route.ts

import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }
  if (!API_URL) {
    return NextResponse.json({ error: 'Invalid api-url on environment.' }, { status: 400 });
  }

  // 🚀 NEW: Build the rest of the query params
  const forwardedSearchParams = new URLSearchParams(searchParams);
  forwardedSearchParams.delete('path'); // remove 'path' itself
  const queryString = forwardedSearchParams.toString(); // like "limit=2&page=3"

  // 🚀 NEW: Build full backend URL
  const apiUrl = `${API_URL}${path}${queryString ? `&${queryString}` : ''}`;

  // console.log("\n\n Forwarding to backend:", apiUrl, "\n\n");

  try {
    const cookie = request.headers.get('cookie') || '';

    const response = await axios.get(apiUrl, {
      headers: {
        'Cookie': cookie,
      },
      withCredentials: true,
    });

    const setCookie = response.headers['set-cookie'];
    const nextRes = NextResponse.json(response.data);

    if (setCookie) {
      nextRes.headers.set('Set-Cookie', setCookie.toString());
    }

    return nextRes; 
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      error.response ? error.response.data : error.message,
      { status: error.response ? error.response.status : 500 }
    );
  }
}

// POST request
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }
  if (!API_URL) {
    return NextResponse.json({ error: 'Invalid api-url on environment.' }, { status: 400 });
  }

  try {
    // 🔥 Extract cookie from incoming request
    const cookie = request.headers.get('cookie') || '';

    const body = await request.json();
    const response = await axios.post(`${API_URL}${path}`, body, {
      headers: {
        'Cookie': cookie, // ✅ Forward the token cookie to backend
        // withCredentials: true
      },
      withCredentials: true,
    });

    // Get set-cookie header from backend
    const setCookie = response.headers['set-cookie'];
    const { token, user } = response.data;

    // Build the NextResponse and attach the cookies
    const nextRes = NextResponse.json(response.data);
    // if (setCookie) {
    //   nextRes.headers.set('Set-Cookie', setCookie.toString());
    // } 
     
    if (token) {
        nextRes.cookies.set('token', response.data.token, {
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 6 * 60 * 60 * 1000,
        });
    }

    if (user) {
      const { password, confirmation_code, resetCode, ...safeUser } = user;
      nextRes.cookies.set('user', JSON.stringify(safeUser), {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 6 * 60 * 60 * 1000,
      });
    }

    return nextRes;    
    // return NextResponse.json(response.data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      error.response ? error.response.data : error.message,
      { status: error.response ? error.response.status : 500 }
    );
  }
}


// PUT request (Update existing entity)
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }
  if (!API_URL) {
    return NextResponse.json({ error: 'Invalid api-url on environment.' }, { status: 400 });
  }

  try {
    const cookie = request.headers.get('cookie') || '';
    const body = await request.json();  // Extract request body for PUT

    const response = await axios.put(`${API_URL}${path}`, body, {
      headers: {
        'Cookie': cookie, // ✅ Forward the token cookie to backend
      },
      withCredentials: true,
    });

    const setCookie = response.headers['set-cookie'];

    const nextRes = NextResponse.json(response.data);
    if (setCookie) {
      nextRes.headers.set('Set-Cookie', setCookie.toString());
    }

    return nextRes;    
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: error.response ? error.response.status : 500 }
    );
  }
}

// DELETE request (Delete existing entity)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }
  if (!API_URL) {
    return NextResponse.json({ error: 'Invalid api-url on environment.' }, { status: 400 });
  }

  try {
    const cookie = request.headers.get('cookie') || '';
    
    const response = await axios.delete(`${API_URL}${path}`, {
      headers: {
        'Cookie': cookie, // ✅ Forward the token cookie to backend
      },
      withCredentials: true,
    });

    const setCookie = response.headers['set-cookie'];

    const nextRes = NextResponse.json(response.data);
    if (setCookie) {
      nextRes.headers.set('Set-Cookie', setCookie.toString());
    }

    return nextRes;    
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: error.response ? error.response.status : 500 }
    );
  }
}
