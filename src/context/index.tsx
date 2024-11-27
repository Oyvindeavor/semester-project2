'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  getAccessToken,
  storeAccessToken,
  removeAccessToken,
} from '@/utils/accessToken';

export interface User {
  name: string;
  email: string;
  bio?: string;
  credits: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  _wins: string;
  _listings: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  loading: boolean; // Add loading to the type
  setAuthData: (token: string | null, user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Initialize auth data from localStorage on app load
  useEffect(() => {
    const token = getAccessToken(); // Retrieve from localStorage
    const storedUser = localStorage.getItem('user');
    if (token) {
      console.log('Access Token from localStorage:', token);
      setAccessTokenState(token);
    } else {
      console.warn('Access Token not found in localStorage');
    }

    if (storedUser) {
      console.log('User from localStorage:', JSON.parse(storedUser));
      setUserState(JSON.parse(storedUser));
    } else {
      console.warn('User not found in localStorage');
    }

    setLoading(false); // Set loading to false after initialization
  }, []);

  // Wrapper function to update context and localStorage
  const setAuthData = (token: string | null, user: User | null) => {
    if (token) {
      storeAccessToken(token); // Persist the token to localStorage
      setAccessTokenState(token);
    } else {
      removeAccessToken(); // Remove the token from localStorage
      setAccessTokenState(null);
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
      setUserState(user);
    } else {
      localStorage.removeItem('user');
      setUserState(null);
    }
  };

  // Logout function to clear both context and storage
  const logout = () => {
    setAuthData(null, null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, loading, setAuthData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
