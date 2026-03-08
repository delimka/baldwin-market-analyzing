export type AuthMode = "login" | "register";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name?: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthResponse = {
  user: AuthUser;
};

export type AuthMeResponse = {
  user: AuthUser | null;
  source?: "local" | "google" | null;
};
