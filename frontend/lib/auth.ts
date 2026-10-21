export type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_verified: boolean;
  created_at: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

const TOKEN_KEY = "hw_auth_token";
const USER_KEY = "hw_auth_user";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000/api";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function persistAuth(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("hw-auth-changed"));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("hw-auth-changed"));
}

type ApiErrorBody = {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
};

export function formatApiError(data: unknown, fallback = "Something went wrong.") {
  if (!data || typeof data !== "object") return fallback;
  const body = data as ApiErrorBody;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.non_field_errors) && body.non_field_errors[0]) {
    return String(body.non_field_errors[0]);
  }
  for (const value of Object.values(body)) {
    if (Array.isArray(value) && value[0]) return String(value[0]);
    if (typeof value === "string") return value;
  }
  return fallback;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = getStoredToken();
    if (token) headers.set("Authorization", `Token ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(formatApiError(data, `Request failed (${response.status})`));
  }

  return data as T;
}

export async function registerUser(input: {
  email: string;
  password: string;
  confirm_password: string;
  first_name?: string;
  last_name?: string;
}) {
  const data = await request<AuthResponse>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(input),
  });
  persistAuth(data.token, data.user);
  return data;
}

export async function loginUser(input: { email: string; password: string }) {
  const data = await request<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(input),
  });
  persistAuth(data.token, data.user);
  return data;
}

export async function logoutUser() {
  try {
    await request("/auth/logout/", { method: "POST" }, true);
  } finally {
    clearAuth();
  }
}

export async function fetchMe() {
  return request<AuthUser>("/auth/me/", { method: "GET" }, true);
}
