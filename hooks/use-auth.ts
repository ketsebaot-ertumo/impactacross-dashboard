// /hooks/use-auth.ts
"use client";

import { useState } from 'react';
import { loginUser, registerUser } from '@/app/api/routes';
import { useToast } from './use-toast';
import { UserData } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [succ, setSucc] = useState(false);
  const [err, setErr] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const { success, error } = useToast();


  const login = async (credentials: { email: string; password: string }) => {
    setLoginLoading(true);
    try {
      const data  = await loginUser(credentials);
      return data;
    } catch (err: any) {
      setErr(err.message);
      return err.message;
    } finally {
      setLoginLoading(false);
    }
  };

  // register
  const register = async (credentials: {firstName: string; lastName: string; email: string; password: string; phoneNumber: string; }) => {
    setRegistrationLoading(true);
    try {
      const data  = await registerUser(credentials);
      if(data?.data && data?.data?.user){
        setUser(data);
      }
      setErr(data)
      return data;
    } catch (err: any) {
      setErr(err.message);
      return err.message;
    } finally {
      setRegistrationLoading(false);
    }
  };

  // logout
  const logout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
      localStorage?.removeItem('auth_token');
      setUser(null);
      return true;
    } catch (err: any) {
      setErr(err?.message || "Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  return {
    user,
    login,
    register,
    logout,
    loginLoading,
    registrationLoading,
    logoutLoading,
    success,
    error,
    succ,
    err,
  };
};

