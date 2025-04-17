
// /hooks/use-auth.ts
import { useState } from 'react';
import { loginUser, logoutUser } from '../lib/routes';
// import { loginUser, logoutUser } from '../lib/api/user';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (credentials: { email: string; password: string }) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return { user, login, logout };
};




// "use client";

// import { useState, useEffect } from 'react';
// import { User } from '../types';
// import API from '../lib/api';
// // import { API } from '../lib/api';
// // import { cookies } from 'next/headers';
// // import * as Cookies from 'js-cookie';


// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('auth_token');
//     // Cookies.default.get('token');
//     // Cookies.default.set('token', token);
//     // const token = localStorage.getItem('token') || Cookies.default.get('token');

//     if (token) {
//       API.get('/user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => {
//           setUser(res.data.user);
//         })
//         .catch((err) => {
//           console.error('Failed to fetch user:', err);
//           setUser(null);
//         });
//     }
//   }, []);

//   // login
//   const login = async (credentials: { email: string; password: string }) => {
//     try {
//       const response = await API.post('/api/auth/login', credentials);
//       const { token, user } = response.data;

//       localStorage.setItem('auth_token', token);
//       setUser(user);
//     } catch (err) {
//       console.error('Login failed:', err);
//       throw err;
//     }
//   };

//   // logout
//   const logout = () => {
//     localStorage.removeItem('auth_token');
//     setUser(null);
//   };

//   return { user, login, logout };
// }




// // hooks/use-auth.ts

// import { useState, useEffect } from 'react';
// import { User } from '../types';

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       fetch('/api/auth/user', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => setUser(data.user));
//     }
//   }, []);

//   const login = (credentials: { email: string; password: string }) => { /* login logic */ };
//   const logout = () => { localStorage.removeItem('auth_token'); setUser(null); };

//   return { user, login, logout };
// }
