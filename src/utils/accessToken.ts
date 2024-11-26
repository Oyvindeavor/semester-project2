export function getAccessToken(): string | null {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('accessToken');
  }
  return null; // Return null if `localStorage` is not accessible
}

export function removeAccessToken() {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('accessToken');
  }
}

export function storeAccessToken(token: string) {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('accessToken', token);
  }
}
