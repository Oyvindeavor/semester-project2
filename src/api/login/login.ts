'use server';

import { noAuthHeaders } from '../headers';
import { noroffApi } from '../config';

type LoginResponse = {
  accessToken: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(noroffApi.login, {
    method: 'POST',
    headers: noAuthHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to login');
  }

  const accessToken = result.data?.accessToken;
  if (!accessToken) {
    throw new Error('AccessToken is missing in the response.');
  }

  return result.data;
}
