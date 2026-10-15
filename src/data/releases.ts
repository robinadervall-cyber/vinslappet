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
        id: "9035801",
        name: "Würzburger Stein Silvaner Erste Lage",
        producer: "Juliusspital",
        vintage: 2025,
        country: "Tyskland",
        region: "Franken",
        grapes: ["Silvaner"],
        style: "vitt",
        priceSek: 209,
        volumeMl: 750,
        sbNumber: "9035801",
        imageUrl: sbImage("24409539"),
        scores: [
          {
            source: "Vinbanken",
            score: 91,
            scale: 100,
            url: "https://vinbanken.se/artiklar/mousserande-och-vitt-vin-i-tillfalligt-sortiment-16-oktober-6946",
          },
          {
            source: "Munskänkarna",
            score: 14.5,
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
          "Släppets bästa vita i förhållande till priset. Ren och stram med gröna äpplen, citron och mineralsälta. Ett återkommande säkert kort till fisk och skaldjur.",
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
    ],
  },
];

export function getLatestRelease(): Release {
  return [...releases].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))[0];
}

export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}
