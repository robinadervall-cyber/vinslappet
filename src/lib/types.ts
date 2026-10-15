export type WineStyle = "rött" | "vitt" | "rosé" | "mousserande" | "sött";

export interface CriticScore {
  /** Källa, t.ex. "Wine Advocate" eller "Guía Peñín". */
  source: string;
  score: number;
  /** Skalans maxvärde: 100 för Parker/Peñín, 20 för Jancis Robinson och Munskänkarna. */
  scale: 100 | 20;
  /** Sidan där betyget hämtades. */
  url?: string;
}

export interface Wine {
  id: string;
  name: string;
  producer: string;
  vintage: number | null;
  country: string;
  region: string;
  grapes: string[];
  style: WineStyle;
  priceSek: number;
  volumeMl: number;
  /** Systembolagets artikelnummer. */
  sbNumber: string;
  imageUrl?: string;
  scores: CriticScore[];
  /** Vår motivering i 1–3 meningar. */
  verdict: string;
}

export type ReleaseStrength = "svagt" | "medel" | "starkt" | "mycket starkt";

export interface Release {
  slug: string;
  /** Systembolagets släppdatum, ISO-format. */
  releaseDate: string;
  title: string;
  strength: ReleaseStrength;
  intro: string;
  /** Rangordnade köpförslag, 1–5 st. */
  picks: Wine[];
  /** Sant så länge datan är påhittad exempeldata. */
  isExample: boolean;
}
