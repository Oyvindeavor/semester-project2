'use client';

import { useAuth } from '@/context/useAuth';
import { User } from '@/context/useAuth';

interface UseFetchUserResult {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch the user data
 */
export function useFetchUser(): UseFetchUserResult {
  const { user, loading } = useAuth();

  if (loading) {
    return { user: null, isLoading: true, error: null };
  }

  if (!user) {
    return {
      user: null,
      isLoading: false,
      error: 'User not authenticated or missing data.',
    };
  }

  return { user, isLoading: false, error: null };
}
