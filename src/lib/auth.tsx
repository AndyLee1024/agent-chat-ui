export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

// Storage key for authentication state
const AUTH_STORAGE_KEY = "lg:chat:auth";

export function getAuthState(): AuthState | null {
  try {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthState;
  } catch {
    // no-op
  }
  return null;
}

export function setAuthState(authState: AuthState): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  } catch {
    // no-op
  }
}

export function clearAuthState(): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // no-op
  }
}

// Simple authentication function - in a real app this would make an API call
export function authenticateUser(credentials: LoginCredentials): boolean {
  // For demo purposes, accept any non-empty username and password
  // In a real application, this would validate against a backend
  return credentials.username.trim() !== "" && credentials.password.trim() !== "";
}