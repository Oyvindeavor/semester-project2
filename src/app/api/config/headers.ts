import { API_KEY } from '@api/config/endpoints';

export function headers(accessToken: string | null) {
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
