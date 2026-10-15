import type { WineStyle } from "@/lib/types";
import styles from "./Bottle.module.css";

const GLASS: Record<WineStyle, string> = {
  rött: "var(--glass-red)",
  vitt: "var(--glass-white)",
  rosé: "var(--glass-rose)",
  mousserande: "var(--glass-sparkling)",
  sött: "var(--glass-white)",
};

/** Generisk flaska som platshållare tills riktiga produktbilder finns. */
export function Bottle({ style }: { style: WineStyle }) {
  const sparkling = style === "mousserande";
  return (
    <svg
      className={styles.bottle}
      viewBox="0 0 80 260"
      role="img"
      aria-label={`Illustration av en flaska ${style} vin`}
    >
      {sparkling ? (
        <path d="M33 4h14v10l-1 4h-12l-1-4z" fill="var(--foil-gold)" />
      ) : (
        <rect x="33" y="4" width="14" height="22" rx="2" fill="var(--foil)" />
      )}
      <path
        d={
          sparkling
            ? "M34 18h12v36c0 22 22 34 22 60v130a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V114c0-26 22-38 22-60z"
            : "M34 26h12v44c0 12 22 16 22 34v142a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V104c0-18 22-22 22-34z"
        }
        fill={GLASS[style]}
      />
      <path d="M18 120c0-6 2-10 6-12v128c-4-2-6-5-6-10z" fill="#fff" opacity="0.14" />
      <rect x="16" y="140" width="48" height="66" rx="3" fill="var(--label)" />
      <rect x="22" y="150" width="36" height="1.5" fill="var(--label-ink)" opacity="0.5" />
      <circle cx="40" cy="173" r="7" fill="none" stroke="var(--label-ink)" strokeWidth="1.2" opacity="0.6" />
      <rect x="28" y="190" width="24" height="1.5" fill="var(--label-ink)" opacity="0.5" />
    </svg>
  );
}
