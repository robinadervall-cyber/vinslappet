import type { Release } from "@/lib/types";

const sbImage = (productId: string) =>
  `https://product-cdn.systembolaget.se/productimages/${productId}/${productId}_400.png`;

/**
 * Släppdata. Sortiment och priser från Systembolagets produktsök, betyg från de källor som
 * anges på varje betyg. Se docs/vinslappet-rutin.md för hur urvalet görs.
 */
export const releases: Release[] = [
  {
    slug: "2026-10-16",
    releaseDate: "2026-10-16",
    title: "Starkt släpp med tre röda fynd runt 200 kronor",
    strength: "starkt",
    intro:
      "37 viner släpps i det tillfälliga sortimentet och nivån är hög, även om de svenska provarna inte alltid är överens om vilka flaskor som sticker ut. Vi har valt fem flaskor där betygen är höga och priset rimligt, med en Rioja som har fått höga betyg från sex håll. Vill du unna dig något större är Cristal 2018 släppets högst betygsatta vin, men till 2 799 kronor.",
    isExample: false,
    picks: [
      {
        id: "9067901",
        name: "Finca Martelo Reserva",
        producer: "Torre de Oña",
        vintage: 2021,
        country: "Spanien",
        region: "Rioja",
        grapes: ["Tempranillo"],
        style: "rött",
        priceSek: 229,
        volumeMl: 750,
        sbNumber: "9067901",
        imageUrl: sbImage("66658041"),
        scores: [
          {
            source: "Wine Advocate",
            score: 95,
            scale: 100,
            url: "https://www.bodeboca.it/vino/finca-martelo-reserva-2021",
          },
          {
            source: "Guía Peñín",
            score: 94,
            scale: 100,
            url: "https://www.bodeboca.it/vino/finca-martelo-reserva-2021",
          },
          {
            source: "James Suckling",
            score: 93,
            scale: 100,
            url: "https://www.bodeboca.it/vino/finca-martelo-reserva-2021",
          },
          {
            source: "Vinbanken",
            score: 92,
            scale: 100,
            url: "https://vinbanken.se/artiklar/roda-viner-i-tillfalligt-sortiment-16-oktober-6947",
          },
          {
            source: "Munskänkarna",
            score: 15.5,
            scale: 20,
            url: "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-16-oktober-2026",
          },
          {
            source: "Finewines",
            score: 89,
            scale: 100,
            url: "https://www.finewines.se/threads/tillfaelligt-sortiment-20261016.9354/",
          },
        ],
        verdict:
          "Släppets mest samstämmigt höga betyg, och det till 229 kronor. Mörk frukt, läder och tobak från en stark Rioja-årgång. Går att dricka nu men håller gott in på 2030-talet.",
      },
      {
        id: "9220801",
        name: "Château Montus",
        producer: "Alain Brumont",
        vintage: 2022,
        country: "Frankrike",
        region: "Madiran",
        grapes: ["Tannat", "Cabernet Franc", "Cabernet Sauvignon"],
        style: "rött",
        priceSek: 325,
        volumeMl: 750,
        sbNumber: "9220801",
        imageUrl: sbImage("17073980"),
        scores: [
          { source: "Vinbanken", score: 92, scale: 100, url: "https://vinbanken.se/artiklar/roda-viner-i-tillfalligt-sortiment-16-oktober-6947" },
          { source: "Munskänkarna", score: 16, scale: 20, url: "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-16-oktober-2026" },
          { source: "Finewines", score: 91, scale: 100, url: "https://www.finewines.se/threads/tillfaelligt-sortiment-20261016.9354/" },
        ],
        verdict:
          "Släppets lagringsvin. Kraftfull tannat med mörka bär, mocka, tobak och peppar, men med fin balans. Alla tre svenska provarna ger den högt, och den håller gott in på 2030-talet.",
      },
      {
        id: "9231901",
        name: "Montefalco Rosso",
        producer: "Arnaldo Caprai",
        vintage: 2023,
        country: "Italien",
        region: "Umbrien",
        grapes: ["Sangiovese", "Sagrantino", "Merlot"],
        style: "rött",
        priceSek: 179,
        volumeMl: 750,
        sbNumber: "9231901",
        imageUrl: sbImage("24478620"),
        scores: [
          {
            source: "Falstaff",
            score: 92,
            scale: 100,
            url: "https://www.falstaff.com/en/wines/arnaldo-caprai-2023-montefalco-rosso-doc",
          },
          {
            source: "Vinbanken",
            score: 91,
            scale: 100,
            url: "https://vinbanken.se/artiklar/roda-viner-i-tillfalligt-sortiment-16-oktober-6947",
          },
          {
            source: "Munskänkarna",
            score: 14,
            scale: 20,
            url: "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-16-oktober-2026",
          },
          {
            source: "Finewines",
            score: 86,
            scale: 100,
            url: "https://www.finewines.se/threads/tillfaelligt-sortiment-20261016.9354/",
          },
        ],
        verdict:
          "Veckans fynd under 200 kronor. Djup och kraftfull med plommon, mörka körsbär och en touch av tjära. Finewines provare tycker att den är lite eldig, men övriga betyg är höga. Gör sig bäst till höstgryta med vilt och svamp.",
      },
      {
        id: "9439501",
        name: "Riesling Trocken Quarz & Schiefer",
        producer: "Peter Jakob Kühn",
        vintage: 2023,
        country: "Tyskland",
        region: "Rheingau",
        grapes: ["Riesling"],
        style: "vitt",
        priceSek: 251,
        volumeMl: 750,
        sbNumber: "9439501",
        imageUrl: sbImage("64795854"),
        scores: [
          {
            source: "Vinbanken",
            score: 91,
            scale: 100,
            url: "https://vinbanken.se/artiklar/mousserande-och-vitt-vin-i-tillfalligt-sortiment-16-oktober-6946",
          },
          {
            source: "Munskänkarna",
            score: 15,
            scale: 20,
            url: "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-16-oktober-2026",
          },
          {
            source: "Finewines",
            score: 90,
            scale: 100,
            url: "https://www.finewines.se/threads/tillfaelligt-sortiment-20261016.9354/",
          },
        ],
        verdict:
          "Stram och frisk torr Riesling med citrus, persika och en stenig mineralitet. Alla tre svenska provarna ger den högt betyg. Fin redan nu, men vinner på något år i källaren.",
      },
      {
        id: "9435901",
        name: "Pétalos",
        producer: "Descendientes de J. Palacios",
        vintage: 2023,
        country: "Spanien",
        region: "Bierzo",
        grapes: ["Mencía"],
        style: "rött",
        priceSek: 219,
        volumeMl: 750,
        sbNumber: "9435901",
        imageUrl: sbImage("64795836"),
        scores: [
          {
            source: "Wine Advocate",
            score: 93,
            scale: 100,
            url: "https://hedonism.co.uk/product/petalos-descendientes-de-j-palacios-2023",
          },
          {
            source: "Vinous",
            score: 92,
            scale: 100,
            url: "https://hedonism.co.uk/product/petalos-descendientes-de-j-palacios-2023",
          },
          {
            source: "Vinbanken",
            score: 91,
            scale: 100,
            url: "https://vinbanken.se/artiklar/roda-viner-i-tillfalligt-sortiment-16-oktober-6947",
          },
          {
            source: "Munskänkarna",
            score: 14.5,
            scale: 20,
            url: "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-16-oktober-2026",
          },
          {
            source: "Finewines",
            score: 88,
            scale: 100,
            url: "https://www.finewines.se/threads/tillfaelligt-sortiment-20261016.9354/",
          },
        ],
        verdict:
          "Ett av Spaniens säkraste värdeköp. Aromatisk och frisk med violer och röda bär, mer elegans än tyngd. Bara 960 flaskor, så det kan ta slut snabbt.",
      },
    ],
    bubblers: [
      {
        name: "Penfolds Bin 8 Cabernet Shiraz",
        vintage: 2024,
        priceSek: 229,
        sbNumber: "9227601",
        note: "Svalt och fräscht med mörk frukt. Vinbanken 90, Munskänkarna 15, Finewines 88–90.",
      },
      {
        name: "Penfolds Bin 311 Chardonnay",
        vintage: 2025,
        priceSek: 279,
        sbNumber: "9441801",
        note: "Mycket chardonnay för pengarna. Vinbanken 92, Munskänkarna 15,5, Finewines 88–90.",
      },
      {
        name: "Penfolds Bin 2 Shiraz Mataro",
        vintage: 2024,
        priceSek: 199,
        sbNumber: "9407401",
        note: "Släppets billigaste Penfolds, fräsch och balanserad. Munskänkarna 14,5, Finewines 87–89.",
      },
      {
        name: "Soave Classico Montesei, Le Battistelle",
        vintage: 2025,
        priceSek: 159,
        sbNumber: "9481001",
        note: "Stram och frisk vit för lite pengar. Vinbanken 89, Munskänkarna 13, Finewines 85–87.",
      },
      {
        name: "Aalto",
        vintage: 2024,
        priceSek: 529,
        sbNumber: "9512801",
        note: "Finewines favorit bland de röda, elegant Ribera del Duero. Munskänkarna 16, Finewines 92–94.",
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
