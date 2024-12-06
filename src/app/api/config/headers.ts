import { API_KEY } from '@api/config/endpoints';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function headers(accessToken: string | null = null) {
  console.log('[PROD_CHECK]', {
    isProduction: process.env.NODE_ENV === 'production',
    hasApiKey: !!API_KEY,
    apiKeyFirstChars: API_KEY ? API_KEY.substring(0, 4) : 'none', // Show first 4 chars only for security
  });

  const session = await getServerSession(authOptions);
  accessToken = session?.accessToken || null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY || '',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
}
export function noAuthHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}
