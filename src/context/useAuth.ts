/* eslint-disable */

import { useContext } from 'react';
import { AuthContext } from './authContext';

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
  setAuthData: (token: string | null, user: User | null) => void;
  logout: () => void;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
