import { useAuth } from '@/context';

export function useIsUserLoggedIn(): boolean {
  const { accessToken, user } = useAuth();
  return Boolean(accessToken && user);
}
