import Link from "next/link";
import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/features/auth";
import { GridBackground } from "@/shared/components";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur hover:bg-card"
          >
            <ArrowLeft className="size-4" />

            <span className="mx-1 h-4 w-px bg-border/70" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-[radial-gradient(900px_circle_at_20%_10%,hsl(var(--secondary))_0%,transparent_55%),radial-gradient(800px_circle_at_90%_20%,hsl(var(--primary)/0.18)_0%,transparent_60%)] lg:block">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background))_0%,transparent_45%,hsl(var(--background))_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <GridBackground
            className="h-full w-full translate-x-4 lg:translate-x-16 text-muted-foreground/30"
            strokeOpacity={0.18}
          />
        </div>
        <div className="absolute inset-0">
          <img
            src="/login-hero.webp"
            alt="Market intelligence visualization"
            className="h-full w-full object-cover opacity-70"
          />
        </div>
      </div>
    </div>
  );
}

