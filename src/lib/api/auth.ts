import { apiRequest } from "../api";

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  plan: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

// Auth API functions
export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: async (): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>("/api/auth/logout", {
      method: "POST",
    });
  },

  getMe: async (): Promise<{ user: User }> => {
    return apiRequest<{ user: User }>("/api/me");
  },
};

