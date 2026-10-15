import type { Release } from "@/lib/types";

/**
 * EXEMPELDATA. Alla viner, producenter, artikelnummer och betyg nedan är påhittade
 * och används bara för att ta fram design och struktur för Vinsläppet.
 */
export const releases: Release[] = [
  {
    slug: "2026-10-16",
    releaseDate: "2026-10-16",
    title: "Höstens starkaste släpp hittills",
    strength: "mycket starkt",
    intro:
      "Ett ovanligt brett släpp med flera Rhône- och Riojaviner som fått höga betyg utomlands. Vi har valt fem flaskor, varav en riktig fyndflaska under 200 kronor.",
    isExample: true,
    picks: [
      {
        id: "ex-1",
        name: "Les Galets Rouges",
        producer: "Domaine Exemple",
        vintage: 2022,
        country: "Frankrike",
        region: "Châteauneuf-du-Pape",
        grapes: ["Grenache", "Syrah", "Mourvèdre"],
        style: "rött",
        priceSek: 449,
        volumeMl: 750,
        sbNumber: "00000-01",
        scores: [
          { source: "Wine Advocate", score: 95, scale: 100 },
          { source: "Jancis Robinson", score: 17.5, scale: 20 },
          { source: "Decanter", score: 94, scale: 100 },
        ],
        verdict:
          "Släppets tyngsta vin och det med högst samlade betyg. Lagringsbart i tio år, men redan generöst nu.",
      },
      {
        id: "ex-2",
        name: "Reserva Viñas Viejas",
        producer: "Bodegas Ejemplo",
        vintage: 2019,
        country: "Spanien",
        region: "Rioja",
        grapes: ["Tempranillo", "Graciano"],
        style: "rött",
        priceSek: 279,
        volumeMl: 750,
        sbNumber: "00000-02",
        scores: [
          { source: "Guía Peñín", score: 94, scale: 100 },
          { source: "Wine Advocate", score: 93, scale: 100 },
        ],
        verdict: "Bäst förhållande mellan betyg och pris i släppet. Klassisk Rioja med fin mognad.",
      },
      {
        id: "ex-3",
        name: "Garnacha Montaña",
        producer: "Viñedos de Muestra",
        vintage: 2023,
        country: "Spanien",
        region: "Calatayud",
        grapes: ["Garnacha"],
        style: "rött",
        priceSek: 149,
        volumeMl: 750,
        sbNumber: "00000-03",
        scores: [
          { source: "Guía Peñín", score: 91, scale: 100 },
          { source: "Wine Advocate", score: 90, scale: 100 },
        ],
        verdict: "Veckans fynd under 200 kronor. Saftig och kryddig, perfekt till höstgrytor.",
      },
      {
        id: "ex-4",
        name: "Riesling Großes Beispiel",
        producer: "Weingut Muster",
        vintage: 2022,
        country: "Tyskland",
        region: "Mosel",
        grapes: ["Riesling"],
        style: "vitt",
        priceSek: 329,
        volumeMl: 750,
        sbNumber: "00000-04",
        scores: [
          { source: "Jancis Robinson", score: 17, scale: 20 },
          { source: "Decanter", score: 93, scale: 100 },
        ],
        verdict: "Torr, stram Riesling med lång eftersmak. Släppets bästa vita.",
      },
      {
        id: "ex-5",
        name: "Brut Réserve",
        producer: "Champagne Prototype",
        vintage: null,
        country: "Frankrike",
        region: "Champagne",
        grapes: ["Pinot Noir", "Chardonnay", "Pinot Meunier"],
        style: "mousserande",
        priceSek: 399,
        volumeMl: 750,
        sbNumber: "00000-05",
        scores: [{ source: "Decanter", score: 92, scale: 100 }],
        verdict: "Prisvärd champagne från ett litet hus. Bra köp inför julen.",
      },
    ],
  },
  {
    slug: "2026-10-02",
    releaseDate: "2026-10-02",
    title: "Tunt släpp, två flaskor värda att köpa",
    strength: "svagt",
    intro:
      "Ett litet släpp där få viner har internationella betyg. Två flaskor sticker ut, resten kan du hoppa över.",
    isExample: true,
    picks: [
      {
        id: "ex-6",
        name: "Barbera d'Esempio Superiore",
        producer: "Cantina Campione",
        vintage: 2021,
        country: "Italien",
        region: "Piemonte",
        grapes: ["Barbera"],
        style: "rött",
        priceSek: 189,
        volumeMl: 750,
        sbNumber: "00000-06",
        scores: [{ source: "Decanter", score: 91, scale: 100 }],
        verdict: "Frisk och fruktig Barbera med god syra. Släppets självklara fynd.",
      },
      {
        id: "ex-7",
        name: "Grüner Veltliner Ried Probe",
        producer: "Weingut Vorlage",
        vintage: 2023,
        country: "Österrike",
        region: "Kamptal",
        grapes: ["Grüner Veltliner"],
        style: "vitt",
        priceSek: 239,
        volumeMl: 750,
        sbNumber: "00000-07",
        scores: [
          { source: "Jancis Robinson", score: 16.5, scale: 20 },
          { source: "Decanter", score: 92, scale: 100 },
        ],
        verdict: "Pepprig och mineralisk. Ett säkert val till fisk och skaldjur.",
      },
    ],
  },
];

export function getLatestRelease(): Release {
  return [...releases].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0];
}

export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}
