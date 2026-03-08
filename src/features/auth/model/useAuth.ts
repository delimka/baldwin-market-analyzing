"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, login, logout, register } from "@/entities/auth";
import type {
  AuthMeResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/entities/auth";

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (payload) => login(payload),
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: (payload) => register(payload),
  });
}

export function useCurrentUser() {
  return useQuery<AuthMeResponse, Error>({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    staleTime: 30_000,
  });
}

export function useLogout() {
  return useMutation<{ ok: true }, Error, void>({
    mutationFn: () => logout(),
  });
}
