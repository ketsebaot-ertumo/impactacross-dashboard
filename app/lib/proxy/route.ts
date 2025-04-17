// /lib/proxy/route.ts

import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }

  const apiUrl = `${API_URL}${path}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
        // 'Authorization': `token ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (err: unknown) {
    const error = err as AxiosError;
    return NextResponse.json(
      { error: error.message },
      { status: error.response ? error.response.status : 500 }
    );
  }
}

// post request
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return NextResponse.json({ error: 'Missing path query param' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const response = await axios.post(`${API_URL}${path}`, body, {
      headers: {
        'Content-Type': 'application/json',
        // Include tokens if needed here
        withCredentials: true
      },
    });
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const err = error as AxiosError;
    return NextResponse.json({ error: err.message }, { status: err.response?.status || 500 });
  }
}



// // /lib/proxy/route.ts
// import axios from 'axios';
// import { NextResponse } from 'next/server';
// import API from '../api';

// // export const API = axios.create({
// //   baseURL: '/lib/proxy?path=',
// //   withCredentials: true,
// //   // headers: { 'Content-Type': 'application/json' },
// // });

// export const fetchData = async <T = any>(url: string, options = {}): Promise<T> => {
//   try {
//     const { searchParams } = new URL(url);
//     const path = searchParams.get('path');
//     const API_URL = process.env.NEXT_PUBLIC_API_URL;
//     const apiUrl = `${API_URL}${path}`;
//     console.log("\n\nAPI URL:", apiUrl, "\n\n")
//     const response = await API.get(apiUrl, options);
//     return response.data as T;
//   } catch (error: unknown) {
//     console.error(error);
//     throw error; // Let the caller handle error instead of returning null
//   }
// };


// export const fetchData = async (url: string, options = {}) => {
//   try{
//     const response = await API.get(url, options);
//     return response.data;
//   } catch (error: unknown) {
//     console.error(error);
//     return null
//   }
// };





// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const path = searchParams.get('path');
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const apiUrl = `${API_URL}${path}`;
  
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//           // 'Content-Type': 'application/json',
//         // withCredintials: true,
//         // 'Authorization': `token ${process.env.NEXT_PUBLIC_ERP_NEXT_API_KEY}:${process.env.NEXT_PUBLIC_ERP_NEXT_API_SECRET}`,
//       },
//     });
//     return NextResponse.json(response.data);
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       return NextResponse.json(
//         { error: error.message },
//         { status: error.response?.status || 500 }
//       );
//     }
//     return NextResponse.json(
//       { error: 'Unexpected error' },
//       { status: 500 }
//     );
//   }
// }



// // lib/proxy/route.ts

// export async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T> {
//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch data from ${url}`);
//   }

//   return res.json();
// }


