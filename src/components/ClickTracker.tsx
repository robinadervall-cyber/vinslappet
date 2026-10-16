"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Räknar klick på länkar till Systembolaget (Vercel Web Analytics, inga cookies). */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="https://www.systembolaget.se/"]');
      if (!a) return;
      const nr = a.getAttribute("href")!.replace(/\D/g, "");
      track("Till Systembolaget", { nr, sida: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
