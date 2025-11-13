// API client for LinkVault backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ApiError {
  message: string;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include', // Send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: `HTTP error! status: ${response.status}`,
    }));
    throw new Error(error.message || error.error || 'An error occurred');
  }

  return response.json();
}


// Links API (to be implemented)
export const linksAPI = {
  check: () => apiRequest<{ status: string; service: string; timestamp: number }>('/health'),
  getAll: () => apiRequest('/api/links'),
  getOne: (id: string) => apiRequest(`/api/links/${id}`),
  create: (data: unknown) => apiRequest('/api/links', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: unknown) => apiRequest(`/api/links/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/api/links/${id}`, {
    method: 'DELETE',
  }),
};



