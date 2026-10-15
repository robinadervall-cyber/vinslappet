import type { CriticScore, Wine } from "./types";

export const BUDGET_LIMIT_SEK = 200;

/**
 * Räknar om ett betyg till 100-skala. 20-skalan mappas som 65 + betyg × 5/3, så att 12 = 85,
 * 15 = 90, 18 = 95 och 20 ≈ 98. Det följer Munskänkarnas egna band ("bra till mycket bra",
 * "högklassigt", "exceptionellt") och hur 20-poängsbetyg brukar jämföras med 100-poängsbetyg.
 */
export function toHundred({ score, scale }: CriticScore): number {
  return scale === 100 ? score : 65 + (score * 5) / 3;
}

/** Genomsnittligt betyg på 100-skala, eller null om inga betyg finns. */
export function averageScore(wine: Wine): number | null {
  if (wine.scores.length === 0) return null;
  const sum = wine.scores.reduce((acc, s) => acc + toHundred(s), 0);
  return Math.round((sum / wine.scores.length) * 10) / 10;
}

export function isBudgetPick(wine: Wine): boolean {
  return wine.priceSek < BUDGET_LIMIT_SEK;
}

/** Placering av ett betyg på en 80–100-skala, där nästan alla seriösa betyg hamnar. 0–1. */
export function scoreFill(score100: number): number {
  return Math.min(1, Math.max(0, (score100 - 80) / 20));
}

export function formatPrice(sek: number): string {
  return `${sek.toLocaleString("sv-SE")} kr`;
}

export function formatScore(s: CriticScore): string {
  return s.scale === 20 ? s.score.toLocaleString("sv-SE", { maximumFractionDigits: 1 }) : String(s.score);
}

export function formatReleaseDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Länk till varan hos Systembolaget utifrån artikelnumret. */
/** "4 200 flaskor" med svenskt tusentalsavstånd. */
export function formatBottles(n: number): string {
  return `${n.toLocaleString("sv-SE")} flaskor`;
}

export function systembolagetUrl(sbNumber: string): string {
  return `https://www.systembolaget.se/${sbNumber.replace(/\D/g, "")}`;
}
