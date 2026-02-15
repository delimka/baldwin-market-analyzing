"use client";

import { useTranslation } from "react-i18next";

type SpinnerProps = {
  size?: number;
  className?: string;
};

export function Spinner({ size = 20, className = "" }: SpinnerProps) {
  const { t } = useTranslation();

  return (
    <span
      className={[
        "inline-block animate-spin rounded-full border-[3px] border-muted",
        "border-t-foreground border-r-primary",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
      aria-label={t("spinner.loading")}
      role="status"
    />
  );
}
