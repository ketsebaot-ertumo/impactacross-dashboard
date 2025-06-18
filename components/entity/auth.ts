"use client";
import axios from "axios";
import { UserCreate, UserLogin } from "../../types/user";

export const roles = ['student', 'instructor', 'admin'];
export const getDefaultUserRole = () => 'student';


export const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});


export const getToken = () => {
  const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
  if (!token) {
    throw new Error('Token is undefined');
  }
  const decodedPayload = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodedPayload);
}


// utils/getUser.ts

export const getUser = async () => {
  try {
    const {data: res} = await axios.get('/api/me', {
      // credentials: 'include',
    });

    if (!res.user) {
      throw new Error('Failed to fetch user data');
    }
    return res.user;
  } catch (error: any) {
    console.error('Failed to fetch user:', error);
    return error.message;
  }
};



export const decodeValue = (value: string) => {
  const payload = value.split('.')[1];
  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decodedPayload);
}

export const getUserId = (user: string) => {
  const userId = user.split('-')[0];
  return userId;
}

export const getUserRole = (user: string) => {
  const role = user.split('-')[1];
  return roles.includes(role) ? role : 'student';
};


export const getUserWithRole = (user: string) => ({
  user_id: user.split('-')[0],
  role: getUserRole(user),
});



export function validateLoginData(data: UserLogin): boolean {
  return !!data.email && !!data.password;
}

export function validateUserCreation(data: UserCreate): boolean {
  return (
    !!data.firstName &&
    !!data.lastName &&
    !!data.phoneNumber &&
    !!data.email &&
    !!data.password &&
    !!data.role
  );
}

