"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border border-border/70">
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="login-email">
              Email
            </label>
            <Input id="login-email" type="email" placeholder="you@domain.com" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="login-password">
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            />
          </div>
          <Button className="btn-primary">Continue</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

