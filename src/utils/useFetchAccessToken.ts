'use client';

import { useAuth } from '@/context/useAuth';

interface UseFetchAccessTokenResult {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch the access token
 */
export function useFetchAccessToken(): UseFetchAccessTokenResult {
  const { accessToken, loading } = useAuth();

  if (loading) {
    return { accessToken: null, isLoading: true, error: null };
  }

  if (!accessToken) {
    return {
      accessToken: null,
      isLoading: false,
      error: 'Access token is missing.',
    };
  }

  return { accessToken, isLoading: false, error: null };
}
