"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Menu, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { Button } from "@/shared/ui";
import { LanguageSwitcher } from "@/shared/components";
import { useTranslation } from "react-i18next";
import { useCurrentUser, useLogout } from "@/features/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui";

export function NavBar() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const meQ = useCurrentUser();
  const logoutM = useLogout();
  const lastScrollY = useRef(0);
  const currentUser = meQ.data?.user ?? null;
  const authSource = meQ.data?.source ?? null;

  const handleLogout = async () => {
    try {
      if (authSource === "google") {
        await signOut({ redirect: false });
      } else {
        await logoutM.mutateAsync();
      }
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.refresh();
      router.push("/");
    } catch {}
  };
  const productLinks = [
    {
      title: t("nav.productLinks.marketTracker.title"),
      href: "/market-tracker",
      description: t("nav.productLinks.marketTracker.description"),
    },
    {
      title: t("nav.productLinks.marketScreener.title"),
      href: "/market-screener",
      description: t("nav.productLinks.marketScreener.description"),
    },
    {
      title: t("nav.productLinks.adviceEngine.title"),
      href: "/market-tracker",
      description: t("nav.productLinks.adviceEngine.description"),
    },
  ];
  const companyLinks = [
    { title: t("nav.companyLinks.features"), href: "#features" },
    { title: t("nav.companyLinks.insights"), href: "#insights" },
    { title: t("nav.companyLinks.about"), href: "#about" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (open) {
            lastScrollY.current = window.scrollY;
            ticking = false;
            return;
          }

          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY.current;
          const pastThreshold = currentY > 100;

          setHidden(scrollingDown && pastThreshold);
          lastScrollY.current = currentY;

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full border-b bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
        open ? "translate-y-0" : "transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between = gap-6 px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="BaldWin logo"
            width={140}
            height={32}
            className="h-14 w-auto"
            priority
          />
          {/* <Badge variant="secondary" className="hidden sm:inline-flex">
            AI
          </Badge> */}
        </Link>

        <NavigationMenu viewport={false} className="hidden max-w-none md:flex ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav.product")}</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-lg">
                <ul className="grid gap-2 p-2 md:w-90">
                  {productLinks.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("nav.company")}</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-lg">
                <ul className="grid w-55 gap-2 p-2">
                  {companyLinks.map((item) => (
                    <NavigationMenuLink
                      key={item.title}
                      asChild
                      className="rounded-md px-3 py-2 text-sm"
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/market-screener">{t("nav.screener")}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {currentUser ? (
            <>
              <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-card/80 px-3 py-2 text-sm shadow-sm backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="max-w-40 truncate">
                  {currentUser.name || currentUser.email}
                </span>
              </div>
              <Button
                variant="outline"
                className="border-border/60 bg-card/80 shadow-sm backdrop-blur hover:bg-card"
                onClick={handleLogout}
                disabled={logoutM.isPending}
              >
                {logoutM.isPending ? `${t("common.loading")}...` : t("nav.logout")}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="border-border/60 bg-card/80 shadow-sm backdrop-blur hover:bg-card"
              asChild
            >
              <Link href="/login">{t("nav.logIn")}</Link>
            </Button>
          )}
          <Button className="btn-primary shadow-sm" asChild>
            <Link href="/market-tracker">{t("nav.openTracker")}</Link>
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("nav.toggleMenu")}
            onClick={() => {
              setHidden(false);
              lastScrollY.current = window.scrollY;
              setOpen((v) => !v);
            }}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t bg-background/95 transition-all duration-300 ease-out md:hidden",
          open
            ? "max-h-130 opacity-100 translate-y-0 blur-0"
            : "pointer-events-none max-h-0 opacity-0 -translate-y-2 blur-sm",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-sm">
          <div className="grid gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("nav.product")}
            </div>
            {productLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md border bg-background px-3 py-2"
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </Link>
            ))}
          </div>

          <div className="grid gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("nav.company")}
            </div>
            {companyLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md border bg-background px-3 py-2"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="grid gap-2">
            {currentUser ? (
              <div className="rounded-md border bg-background px-3 py-2 text-sm">
                <div className="flex items-center gap-2 font-medium">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  {t("nav.online")}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {currentUser.name || currentUser.email}
                </div>
              </div>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  {t("nav.logIn")}
                </Link>
              </Button>
            )}

            <Button asChild>
              <Link href="/market-tracker" onClick={() => setOpen(false)}>
                {t("nav.openTracker")}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/market-screener" onClick={() => setOpen(false)}>
                {t("nav.tryScreener")}
              </Link>
            </Button>
            {currentUser ? (
              <Button
                variant="outline"
                onClick={async () => {
                  await handleLogout();
                  setOpen(false);
                }}
                disabled={logoutM.isPending}
              >
                {logoutM.isPending ? `${t("common.loading")}...` : t("nav.logout")}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="rounded-md px-3 py-2 ">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
