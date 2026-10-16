"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Räknar klick på länkar till Systembolaget (Vercel Web Analytics, inga cookies). */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="https://www.systembolaget.se/"]');
      if (!a) return;
      const url = new URL(a.getAttribute("href")!);
      if (url.pathname.startsWith("/sortiment/")) {
        track("Hela släppet", { sida: location.pathname });
        return;
      }
      track("Till Systembolaget", { nr: url.pathname.replace(/\D/g, ""), sida: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
