"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/features/auth";
import { GridBackground } from "@/shared/components";

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-card"
          >
            <ArrowLeft className="size-4" />
            <span>{t("login.backToHome")}</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border bg-card/90 p-6 shadow-sm backdrop-blur">
            <LoginForm />
          </div>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-[radial-gradient(900px_circle_at_20%_10%,hsl(var(--secondary))_0%,transparent_55%),radial-gradient(800px_circle_at_90%_20%,hsl(var(--primary)/0.20)_0%,transparent_60%)] lg:block">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,transparent_40%,hsl(var(--background))_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <GridBackground
            className="h-full w-full translate-x-4 lg:translate-x-16 text-muted-foreground/30"
            strokeOpacity={0.2}
          />
        </div>
        <div className="absolute inset-0 mask-l-from-70% mask-r-from-70% mask-t-from-50%">
          <Image
            src="/login/bg-login.webp"
            alt={t("login.imageAlt")}
            fill
            priority
            className="object-cover opacity-70"
          />
        </div>
      </aside>
    </section>
  );
}
