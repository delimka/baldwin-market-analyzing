"use client";

import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";

export function LoginDialog() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border border-border/70">
          {t("login.dialog.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("login.dialog.title")}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="login-email">
              {t("login.form.email")}
            </label>
            <Input id="login-email" type="email" placeholder="you@domain.com" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="login-password">
              {t("login.form.password")}
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="********"
            />
          </div>
          <Button className="btn-primary">{t("login.dialog.continue")}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
