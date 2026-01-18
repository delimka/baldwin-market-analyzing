"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Button } from "@/shared/ui/shadcn/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/shadcn/navigation-menu";

const productLinks = [
  {
    title: "Market Tracker",
    href: "/market-tracker",
    description: "Candles, signals, and AI-assisted analysis.",
  },
  {
    title: "Market Screener",
    href: "/market-screener",
    description: "Scan movers and filter for momentum.",
  },
  {
    title: "Advice Engine",
    href: "/market-tracker",
    description: "Request trade guidance with rationale.",
  },
];

const companyLinks = [
  { title: "Features", href: "#features" },
  { title: "Insights", href: "#insights" },
  { title: "About", href: "#about" },
];

export function NavBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="BaldWin logo"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">BaldWin</span>
            <span className="text-[11px] text-muted-foreground">
              Market Analyzer
            </span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            AI
          </Badge>
        </Link>

        <NavigationMenu
          viewport={!isMobile}
          className="hidden max-w-none md:flex"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-2 md:w-[360px]">
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
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-2 p-2">
                  {companyLinks.map((item) => (
                    <NavigationMenuLink
                      key={item.title}
                      asChild
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
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
                <Link href="/market-screener">Screener</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/market-screener">Try screener</Link>
          </Button>
          <Button asChild>
            <Link href="/market-tracker">Open tracker</Link>
          </Button>
        </div>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t bg-background/95 transition-all duration-300 ease-out md:hidden",
          open
            ? "max-h-[520px] opacity-100 translate-y-0 blur-0"
            : "pointer-events-none max-h-0 opacity-0 -translate-y-2 blur-sm",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm">
          <div className="grid gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Product
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
              Company
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
            <Button asChild>
              <Link href="/market-tracker" onClick={() => setOpen(false)}>
                Open tracker
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/market-screener" onClick={() => setOpen(false)}>
                Try screener
              </Link>
            </Button>
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
        <Link href={href} className="rounded-md px-3 py-2 hover:bg-accent">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
