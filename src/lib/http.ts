import { getToken, removeToken } from './auth';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = getToken();
  const headers = new Headers((options.headers as HeadersInit) || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    if (
      typeof window !== 'undefined' &&
      !window.location.pathname.includes('/login')
    ) {
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`API Error ${response.status}: ${message}`);
  }

  return response;
}
