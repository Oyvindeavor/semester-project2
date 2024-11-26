export function storeAccessToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function removeAccessToken() {
  localStorage.removeItem('accessToken');
}
