"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { useLogin, useRegister } from "../model/useAuth";
import type { AuthMode } from "@/entities/auth";

type LoginFormProps = React.ComponentProps<"form">;

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loginM = useLogin();
  const registerM = useRegister();
  const activeMutation = mode === "login" ? loginM : registerM;
  const isPending = loginM.isPending || registerM.isPending;

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setLocalError(null);
    setSuccessMessage(null);
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setLocalError("Passwords do not match");
        return;
      }
      if (form.password.length < 6) {
        setLocalError("Password must be at least 6 characters");
        return;
      }
    }

    try {
      await (mode === "login"
        ? loginM.mutateAsync({
            email: form.email.trim(),
            password: form.password,
          })
        : registerM.mutateAsync({
            email: form.email.trim(),
            password: form.password,
            name: form.name.trim() || undefined,
          }));
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

      if (mode === "login") {
        router.refresh();
        router.push("/market-tracker");
        return;
      }

      setSuccessMessage("Registration successful. You can log in now.");
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      switchMode("login");
    } catch {
      // React Query exposes the error in activeMutation.error.
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/market-tracker" });
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">
          {mode === "login" ? t("login.form.title") : t("login.form.signUp")}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {mode === "login"
            ? t("login.form.subtitle")
            : "Create an account to continue to BaldWin."}
        </p>
      </div>

      <div className="grid gap-4">
        {mode === "register" ? (
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </div>
        ) : null}

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            {t("login.form.email")}
          </label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <label className="text-sm font-medium" htmlFor="password">
              {t("login.form.password")}
            </label>
            {mode === "login" ? (
              <Link
                href="/"
                className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                {t("login.form.forgotPassword")}
              </Link>
            ) : null}
          </div>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
          />
        </div>

        {mode === "register" ? (
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="confirm-password">
              Confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              required
            />
          </div>
        ) : null}

        <Button type="submit" className="btn-primary" disabled={isPending}>
          {isPending
            ? `${t("common.loading")}...`
            : mode === "login"
              ? t("login.form.logIn")
              : t("login.form.signUp")}
        </Button>
      </div>

      {localError ? <p className="text-sm text-red-600">{localError}</p> : null}
      {activeMutation.error ? (
        <p className="text-sm text-red-600">
          {t("common.error")}: {activeMutation.error.message}
        </p>
      ) : null}
      {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}

      <div className="relative text-center text-sm text-muted-foreground">
        <span className="bg-background px-2">{t("login.form.orContinue")}</span>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-border" />
      </div>

      <Button variant="outline" type="button" className="gap-2" onClick={handleGoogleLogin}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-4"
          aria-hidden="true"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
        {t("login.form.logInGoogle")}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? t("login.form.noAccount") : `${t("login.form.logIn")}?`}
        <button
          type="button"
          className="ml-1 underline underline-offset-4"
          onClick={() => switchMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? t("login.form.signUp") : t("login.form.logIn")}
        </button>
      </p>
    </form>
  );
}
