"use client";

import { useEffect, useState } from "react";

const DEFAULT_BREAKPOINT = 768;

export function useIsMobile(breakpoint = DEFAULT_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = `(max-width: ${Math.max(0, breakpoint - 1)}px)`;
    const media = window.matchMedia(query);

    const update = () => setIsMobile(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, [breakpoint]);

  return isMobile;
}

export const useMobile = useIsMobile;
