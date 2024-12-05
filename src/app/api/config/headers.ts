import { API_KEY } from '@api/config/endpoints';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function headers(accessToken: string | null = null) {
  if (!accessToken) {
    const session = await getServerSession(authOptions); // Fetch server session
    accessToken = session?.accessToken || null;
    console.log('AccessToken retrieved in headers:', accessToken); // Log the accessToken
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY || '',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    console.error('Authorization header missing: AccessToken is null');
  }

  return headers;
}

export function noAuthHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}
