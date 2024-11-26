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

interface User {
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  setAuthData: (token: string | null, user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  // Initialize auth data from localStorage on app load
  useEffect(() => {
    const token = getAccessToken();
    const storedUser = localStorage.getItem('user');
    if (token) {
      setAccessTokenState(token);
    }
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
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
    <AuthContext.Provider value={{ accessToken, user, setAuthData, logout }}>
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
