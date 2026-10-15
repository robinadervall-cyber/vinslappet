import type { Release } from "@/lib/types";

const sbImage = (productId: string) =>
  `https://product-cdn.systembolaget.se/productimages/${productId}/${productId}_400.png`;

const VB9_ROTT = "https://vinbanken.se/artiklar/roda-viner-i-tillfalligt-sortiment-9-oktober-6937";
const VB9_VITT = "https://vinbanken.se/artiklar/vita-viner-i-tillfalligt-sortiment-9-oktober-6936";
const MK9 = "https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-9-oktober-2026";
const BK_OKT =
  "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/";

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
      "37 viner släpps i det tillfälliga sortimentet och nivån är hög, även om de svenska provarna inte alltid är överens om vilka flaskor som sticker ut. Vi har valt fem flaskor där betygen är höga och priset rimligt, med en Rioja som har fått höga betyg från sju håll. Vill du unna dig något större är Cristal 2018 släppets högst betygsatta vin, men till 2 799 kronor.",
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
          { source: "BKWine", score: 15.5, scale: 20, url: "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/" },
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
          { source: "BKWine", score: 16.5, scale: 20, url: "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/" },
        ],
        verdict:
          "Släppets lagringsvin. Kraftfull tannat med mörka bär, mocka, tobak och peppar, men med fin balans. Alla fyra svenska provare ger den högt, BKWine med plus för prisvärdhet, och den håller gott in på 2030-talet.",
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
          { source: "BKWine", score: 15.5, scale: 20, url: "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/" },
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
          { source: "BKWine", score: 16, scale: 20, url: "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/" },
        ],
        verdict:
          "Stram och frisk torr Riesling med citrus, persika och en stenig mineralitet. Alla fyra svenska provare ger den högt betyg. Fin redan nu, men vinner på något år i källaren.",
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
          { source: "BKWine", score: 15, scale: 20, url: "https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/oktober-2026-systembolagets-nyheter-hela-provningen/" },
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
        note: "Svalt och fräscht med mörk frukt. Vinbanken 90, Munskänkarna 15, Finewines 88–90, BKWine 15,5.",
      },
      {
        name: "Penfolds Bin 311 Chardonnay",
        vintage: 2025,
        priceSek: 279,
        sbNumber: "9441801",
        note: "Mycket chardonnay för pengarna. Vinbanken 92, Munskänkarna 15,5, Finewines 88–90, BKWine 16.",
      },
      {
        name: "Penfolds Bin 2 Shiraz Mataro",
        vintage: 2024,
        priceSek: 199,
        sbNumber: "9407401",
        note: "Släppets billigaste Penfolds, fräsch och balanserad. Munskänkarna 14,5, Finewines 87–89, BKWine 15.",
      },
      {
        name: "Allram Grüner Veltliner Strass",
        vintage: 2025,
        priceSek: 189,
        sbNumber: "9465501",
        note: "Grüner veltliner från Kamptal som Wine Table kallar ett riktigt toppenköp. Vinbanken 90, Munskänkarna 13,5, Finewines 85–87.",
      },
      {
        name: "Aalto",
        vintage: 2024,
        priceSek: 529,
        sbNumber: "9512801",
        note: "Finewines favorit bland de röda, elegant Ribera del Duero. Munskänkarna 16, Finewines 92–94, BKWine 16,5.",
      },
    ],
  },
  {
    slug: "2026-10-09",
    releaseDate: "2026-10-09",
    title: "Rhône-fynd för 169 kronor och en sauvignon blanc i toppklass",
    strength: "medel",
    intro:
      "41 viner släpptes i det tillfälliga sortimentet. Släppet är jämnt snarare än spektakulärt, men det finns flera köpvärda flaskor runt 200–400 kronor. Vi har valt fem viner som de svenska provarna är överens om, med en klassisk Rhône för 169 kronor överst. Den som vill lägga mer pengar hittar släppets mest hyllade vin i Flor de Pingus, men till 1 199 kronor.",
    isExample: false,
    picks: [
      {
        id: "9436201",
        name: "Les Champauvins",
        producer: "Domaine Grand Veneur, Alain Jaume",
        vintage: 2023,
        country: "Frankrike",
        region: "Côtes du Rhône",
        grapes: [],
        style: "rött",
        priceSek: 169,
        volumeMl: 750,
        sbNumber: "9436201",
        imageUrl: sbImage("64795839"),
        scores: [
          { source: "Vinbanken", score: 91, scale: 100, url: VB9_ROTT },
          { source: "Munskänkarna", score: 13, scale: 20, url: MK9 },
          { source: "BKWine", score: 15.5, scale: 20, url: BK_OKT },
        ],
        verdict:
          "Veckans fynd. Vingården ligger alldeles intill Châteauneuf-du-Pape och vinet har mycket av samma stil: varm mogen frukt med vildhallon, körsbär, läder och lagerblad. Vinbanken och BKWine lyfter prisvärdheten och Wine Table kallar det ett prisvärt husvin.",
      },
      {
        id: "9263101",
        name: "Vino Nobile di Montepulciano",
        producer: "Poliziano",
        vintage: 2023,
        country: "Italien",
        region: "Toscana",
        grapes: ["Sangiovese", "Canaiolo", "Colorino", "Merlot"],
        style: "rött",
        priceSek: 269,
        volumeMl: 750,
        sbNumber: "9263101",
        imageUrl: sbImage("24393720"),
        scores: [
          { source: "Munskänkarna", score: 16, scale: 20, url: MK9 },
          { source: "BKWine", score: 16, scale: 20, url: BK_OKT },
        ],
        verdict:
          "Munskänkarna kallar den ett fynd i sin prisklass och BKWine ger plus för prisvärdheten. En klassisk sangiovese från Montepulciano som passar till höstens kötträtter.",
      },
      {
        id: "9514701",
        name: "Ehrenhausen Korallenkalk",
        producer: "Weingut Tement",
        vintage: 2023,
        country: "Österrike",
        region: "Südsteiermark",
        grapes: ["Sauvignon blanc"],
        style: "vitt",
        priceSek: 329,
        volumeMl: 750,
        sbNumber: "9514701",
        imageUrl: sbImage("60857958"),
        scores: [
          {
            source: "Falstaff",
            score: 94,
            scale: 100,
            url: "https://www.falstaff.com/en/wines/familienweingut-tement-2023-sauvignon-blanc-suedsteiermark-dac-ehrenhausen-korallenkalk-1",
          },
          { source: "Vinbanken", score: 92, scale: 100, url: VB9_VITT },
          { source: "Munskänkarna", score: 15.5, scale: 20, url: MK9 },
          { source: "BKWine", score: 16.5, scale: 20, url: BK_OKT },
        ],
        verdict:
          "Släppets bästa vita. Sauvignon blanc från kalkjordar i Steiermark med äpple, vinbärsblad, örter och klingande syra. Wine Table kallar det ett toppenvin och Falstaff ger 94 poäng. Servera till ceviche eller skaldjur.",
      },
      {
        id: "9222601",
        name: "Santa Barbara County Pinot Noir",
        producer: "Au Bon Climat",
        vintage: 2024,
        country: "USA",
        region: "Kalifornien",
        grapes: ["Pinot noir"],
        style: "rött",
        priceSek: 289,
        volumeMl: 750,
        sbNumber: "9222601",
        imageUrl: sbImage("24392702"),
        scores: [
          { source: "Vinbanken", score: 92, scale: 100, url: VB9_ROTT },
          { source: "Munskänkarna", score: 15, scale: 20, url: MK9 },
          { source: "BKWine", score: 16, scale: 20, url: BK_OKT },
        ],
        verdict:
          "Charmig och djup pinot noir med björnbär, jordgubbar, körsbär och kryddor, där faten håller sig i bakgrunden. Vinbanken tycker att den kombinerar smakrikedom och elegans mycket bra. Gott till kyckling med ugnsbakade rotfrukter.",
      },
      {
        id: "9414901",
        name: "Barolo",
        producer: "Castello di Verduno",
        vintage: 2022,
        country: "Italien",
        region: "Piemonte",
        grapes: ["Nebbiolo"],
        style: "rött",
        priceSek: 399,
        volumeMl: 750,
        sbNumber: "9414901",
        imageUrl: sbImage("64795724"),
        scores: [
          { source: "Vinbanken", score: 92, scale: 100, url: VB9_ROTT },
          { source: "Munskänkarna", score: 16, scale: 20, url: MK9 },
          { source: "BKWine", score: 16.5, scale: 20, url: BK_OKT },
        ],
        verdict:
          "Släppets lagringsvin och Vinbankens lagringstips för veckan. Elegant Barolo med röda bär, blodapelsin och lagerblad, med djup och fin syra. Gott redan nu men håller in på 2030-talet.",
      },
    ],
    bubblers: [
      {
        name: "Barbadillo Oloroso En Rama Criadera Selection",
        vintage: null,
        priceSek: 199,
        sbNumber: "9061101",
        note: "Torr sherry som Munskänkarna kallar ett fynd i sin prisklass. Munskänkarna 15,5, BKWine 15,5.",
      },
      {
        name: "Iona Wild Ferment Sauvignon Blanc",
        vintage: 2024,
        priceSek: 229,
        sbNumber: "9457101",
        note: "Stram och frisk sauvignon blanc från Sydafrika med krusbär och citrus. Vinbanken 91, Munskänkarna 14,5, BKWine 15.",
      },
      {
        name: "Psi",
        vintage: 2023,
        priceSek: 359,
        sbNumber: "9231701",
        note: "Rik och mörkbärig Ribera del Duero som är tillgänglig redan nu. Vinbanken 93, Munskänkarna 16, BKWine 15,5–16.",
      },
      {
        name: "Faiveley Mercurey La Framboisière",
        vintage: 2024,
        priceSek: 399,
        sbNumber: "9270501",
        note: "Röd bourgogne som Wine Table tycker är värd sina kronor. Munskänkarna 16, BKWine 16.",
      },
      {
        name: "Rústico Cinsault Viña Bouchon",
        vintage: 2024,
        priceSek: 149,
        sbNumber: "9458701",
        note: "Ung och rödbärig cinsault från Chile, servera lätt sval. Vinbanken 88, Munskänkarna 13, BKWine 14,5.",
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
