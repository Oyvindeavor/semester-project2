import { API_KEY } from '@api/config/endpoints';
import { getAccessToken } from '@utils/accessToken';

export function headers() {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY || '',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export function noAuthHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}
