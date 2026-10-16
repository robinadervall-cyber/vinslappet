import { cacheLife } from "next/cache";
import register from "@/data/betygsregister.json";
import type { CriticScore, WineStyle } from "./types";

/**
 * Systembolagets eget API för webbplatsen (inofficiellt). Nyckeln är den publika som ligger i
 * sajtens JS-filer. Byter Systembolaget nyckel: sätt SB_API_KEY i Vercel eller uppdatera här.
 */
const API = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1";
const KEY = process.env.SB_API_KEY ?? "8d39a7340ee7439f8b4c1e995c8f3e4a";
const PRICE_CAP = 1500;
const BUDGET = 200;

async function sb<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Ocp-Apim-Subscription-Key": KEY, Origin: "https://www.systembolaget.se" },
  });
  if (!res.ok) throw new Error(`Systembolaget svarade ${res.status} på ${path.split("?")[0]}`);
  return res.json() as Promise<T>;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  county: string;
}

interface RawStore {
  siteId: string;
  alias: string | null;
  address: string | null;
  city: string | null;
  county: string | null;
  isActive: boolean;
}

const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s-])\p{L}/gu, (c) => c.toUpperCase());

/** Alla fysiska butiker, sorterade på ort. */
export async function getStores(): Promise<Store[]> {
  "use cache";
  cacheLife("days");
  const raw = await sb<RawStore[]>("/site/stores");
  return raw
    .filter((s) => s.isActive && s.address && s.city)
    .map((s) => {
      const city = titleCase(s.city!);
      return {
        id: s.siteId,
        name: s.alias ? `${s.alias.replace(/\p{Lu}{3,}/gu, titleCase)}, ${s.address}` : s.address!,
        city,
        county: s.county ?? "",
      };
    })
    .sort((a, b) => a.city.localeCompare(b.city, "sv") || a.name.localeCompare(b.name, "sv"));
}

interface RegisterWine {
  sbNumber: string;
  name: string;
  producer: string;
  vintage: number | null;
  country: string;
  region: string | null;
  type: string;
  price: number;
  volume: number;
  image: string | null;
  releaseDate: string;
  scores: { source: string; score: number; scale: number; url: string | null }[];
  avg: number;
  value: number;
  drink?: { from: number; to: number; source: string };
}

export interface StoreWine {
  sbNumber: string;
  name: string;
  producer: string;
  vintage: number | null;
  region: string;
  style: WineStyle;
  priceSek: number;
  imageUrl?: string;
  releaseDate: string;
  scores: CriticScore[];
  avg: number;
  drinkWindow?: { from: number; to: number; source: string };
  stock: number;
  shelf: string | null;
}

export interface StoreResult {
  /** Viner i tillfälligt sortiment i butiken just nu. */
  inStore: number;
  /** Hur många av dem som har betyg hos oss. */
  rated: number;
  wines: StoreWine[];
}

const STYLES: Record<string, WineStyle> = {
  "Rött vin": "rött",
  "Vitt vin": "vitt",
  "Rosévin": "rosé",
  "Mousserande vin": "mousserande",
  "Starkvin": "starkvin",
  "Sött vin": "sött",
};

const byNumber = new Map((register as RegisterWine[]).map((w) => [w.sbNumber, w]));

interface SearchProduct {
  productNumber: string;
  productId: string;
  price: number;
  categoryLevel1: string;
}

interface Search {
  products: SearchProduct[];
  metadata: { totalPages: number; nextPage: number };
}

interface Stock {
  stock: number;
  shelf: string | null;
}

/**
 * Fem köpförslag ur tillfälligt sortiment som står i butiken: högst värdepoäng enligt samma
 * modell som Vinsläppet. Finns ett betygsatt vin under 200 kr får det femte platsen om inget
 * av de fyra första redan är under 200 kr. Bara viner med flaskor i lager visas.
 */
export async function getStoreTop(storeId: string): Promise<StoreResult> {
  "use cache";
  cacheLife("hours");

  const products: SearchProduct[] = [];
  for (let page = 1; page <= 10; page++) {
    const q = new URLSearchParams({
      size: "30",
      page: String(page),
      storeId,
      isInStoreAssortmentSearch: "true",
      assortmentText: "Tillfälligt sortiment",
      categoryLevel1: "Vin",
    });
    const res = await sb<Search>(`/productsearch/search?${q}`);
    products.push(...res.products.filter((p) => p.categoryLevel1 === "Vin"));
    if (res.metadata.nextPage < 1 || page >= res.metadata.totalPages) break;
  }

  const rated = products
    .map((p) => ({ p, w: byNumber.get(p.productNumber) }))
    .filter((x): x is { p: SearchProduct; w: RegisterWine } => !!x.w && x.p.price <= PRICE_CAP)
    .sort((a, b) => b.w.value - a.w.value);

  const picks: StoreWine[] = [];
  const tried = new Set<string>();
  const take = async ({ p, w }: (typeof rated)[number]) => {
    if (tried.has(w.sbNumber)) return;
    tried.add(w.sbNumber);
    const s = await sb<Stock>(`/stockbalance/store/${storeId}/${p.productId}`).catch(() => null);
    if (!s || s.stock < 1) return;
    picks.push({
      sbNumber: w.sbNumber,
      name: w.name,
      producer: w.producer,
      vintage: w.vintage,
      region: [w.region, w.country].filter(Boolean).join(", "),
      style: STYLES[w.type] ?? "rött",
      priceSek: p.price,
      imageUrl: w.image ?? undefined,
      releaseDate: w.releaseDate,
      scores: w.scores.map((x) => ({ source: x.source, score: x.score, scale: x.scale as 20 | 100, url: x.url ?? undefined })),
      avg: w.avg,
      drinkWindow: w.drink,
      stock: s.stock,
      shelf: s.shelf,
    });
  };

  // Lagersaldo hämtas i rangordning tills fyra (eller fem) viner med flaskor i hyllan hittats.
  const budget = rated.filter((x) => x.p.price < BUDGET);
  for (const x of rated) {
    if (picks.length >= 4) break;
    await take(x);
  }
  const hasBudget = picks.some((w) => w.priceSek < BUDGET);
  for (const x of hasBudget ? rated : budget) {
    if (picks.length >= 5) break;
    await take(x);
  }
  // Fanns inget budgetvin i lager: fyll på med nästa bästa.
  for (const x of rated) {
    if (picks.length >= 5) break;
    await take(x);
  }

  return { inStore: products.length, rated: rated.length, wines: picks };
}
