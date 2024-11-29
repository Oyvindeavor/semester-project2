/* eslint-disable */

'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getAccessToken,
  storeAccessToken,
  removeAccessToken,
} from '@/utils/accessToken';

export interface User {
  name: string;
  email: string;
  bio?: string;
  credits: number;
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
  wins: [];
  listings: [];
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  loggedIn: boolean;
  setAuthData: (token: string | null, user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const storedUser = localStorage.getItem('user');
    if (token) setAccessTokenState(token);
    if (storedUser) setUserState(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const setAuthData = (token: string | null, user: User | null) => {
    if (token) {
      storeAccessToken(token);
      setAccessTokenState(token);
    } else {
      removeAccessToken();
      setAccessTokenState(null);
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUserState(user);
    } else {
      localStorage.removeItem('user');
      setUserState(null);
    }
  };

  const logout = () => {
    setAuthData(null, null);
  };

  const loggedIn = Boolean(accessToken && user);

  return (
    <AuthContext.Provider
      value={{ accessToken, user, loading, setAuthData, logout, loggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };

console.log('AuthProvider exported');
