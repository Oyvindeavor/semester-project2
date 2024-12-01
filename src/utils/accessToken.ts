'use client';
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('accessToken');
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }
  return null; // Return null if not in the browser
}

export function removeAccessToken() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Error removing accessToken from localStorage:', error);
    }
  }
}

export function storeAccessToken(token: string) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error storing accessToken in localStorage:', error);
    }
  }
}
