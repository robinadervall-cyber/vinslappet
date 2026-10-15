# Vinsläppet: rutin för inhämtning, urval och publicering

Första manuella körningen gjordes 2026-10-15 för släppet fredag 16 oktober 2026. Det här dokumentet är underlaget för en framtida skill och schemalagd rutin.

## 1. Hitta släppet och dess viner

- Datum: Systembolagets startsida har en "LaunchModule" i sin `__NEXT_DATA__` med `assortment: "tillfalligt-sortiment"` och `launchDate` (UTC, 22:00 dagen före = svenskt släppdatum).
- Viner: Systembolagets eget produktsök, samma API som webbplatsen använder:
  `GET https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search?size=30&page=1&productLaunch.min=YYYY-MM-DD&productLaunch.max=YYYY-MM-DD&assortmentText=Tillfälligt sortiment`
  med headern `Ocp-Apim-Subscription-Key` (den publika nyckeln `NEXT_PUBLIC_API_KEY_APIM` som ligger i sajtens JS-filer) och `Origin: https://www.systembolaget.se`. Max 30 per sida. Inofficiellt, kan sluta fungera om Systembolaget byter nyckel.
- 16 okt: 53 artiklar, varav 37 viner (`categoryLevel1 == "Vin"`).
- Fält vi använder: `productNumber`, `productId`, `productNameBold/Thin`, `producerName`, `vintage`, `country`, `originLevel1/2`, `grapes`, `categoryLevel2`, `price`, `volume`, `images`.
- Produktbild: `https://product-cdn.systembolaget.se/productimages/{productId}/{productId}_400.png`. Saknas `images` används den generiska flaskan.
- Tredjepartslistor (t.ex. Johan Lidby) kan vara inaktuella: Freestone 2024 stod på 16 okt hos dem men har flyttats till 23 okt hos Systembolaget. Systembolaget är facit.

## 2. Källor och vad som gick att nå (2026-10-15)

| Källa | Nåbar | Vad den gav |
|---|---|---|
| Vinbanken.se | Ja, öppet | Två artiklar om 16 okt (röda + mousserande/vitt) med 100-poängsbetyg, fyndmarkering och provarens egna köp. Bäst täckning: 20 av 37 viner. Publiceras måndag–tisdag före släppet. |
| Munskänkarna (Vinlocus) | Delvis | "Hitlista"-provningen (`/sv/vinlocus/hitlista-<datum>/`) är öppen med 20-poängsbetyg, 3 viner ur släppet. Övriga Vinlocus kräver troligen inloggning eller JS. |
| Wine Table | Nej | 403 mot både curl och WebFetch. Syns i sökresultat, men inget om 16 okt ännu. |
| Finewines.se | Nej | 403. |
| Wine Advocate (Parker), Peñín, Suckling, Vinous, Decanter | Indirekt | Egna sidor kräver inloggning. Betyg hittades via vinhandlare som citerar dem (bodeboca.it, hedonism.co.uk). Varje betyg länkas till sidan där det hittades. |
| Falstaff | Indirekt | 403 mot curl, men sidan syns i webbsök med betyg. |
| Vivino, Wine-Searcher, CellarTracker, Jancis Robinson | Nej | 403. |

Regel: använd bara betyg som står för rätt årgång. Betyg för andra årgångar (vanligt hos handlare) räknas inte.

## 3. Urval

1. Normalisera betyg till 100-skala. 20-skala: `50 + 2,5 × betyg` (16 ≈ 90, 18 = 95, 20 = 100). Finns i `toHundred` i `src/lib/scoring.ts`.
2. Snittbetyg per vin.
3. Värdepoäng = `snitt − 4 × log2(pris / 200)` − 1,5 om vinet bara har en källa. Det ger ett vin för 400 kr samma värde som ett vin för 200 kr med 4 poäng lägre snitt.
4. Släppets styrka styr antalet förslag: svagt 1–2, medel 3, starkt/mycket starkt 4–5. Bedöms på hur många viner som har snitt ≥ 91 och vad provarna skriver om släppet som helhet.
5. Minst ett vin under 200 kr. Gärna minst ett vitt eller mousserande om något håller nivån.
6. Ordning på sajten: det vin med högst snitt bland de tre högsta värdepoängen blir nr 1 ("Släppets bästa").

Utfall 16 okt (topp 8 av 20 viner med betyg):

| Värde | Vin | Pris | Snitt | Källor |
|---|---|---|---|---|
| 92,1 | Caprai Montefalco Rosso 2023 | 179 | 91,5 | 2 |
| 91,8 | Finca Martelo Reserva 2021 | 229 | 92,6 | 5 |
| 91,5 | Pétalos 2023 | 219 | 92,0 | 3 |
| 89,2 | Juliusspital Silvaner 2025 | 209 | 91,0 | 1 |
| 88,8 | Allram Grüner Veltliner 2025 | 189 | 90,0 | 1 |
| 88,8 | Soave Montesei 2025 | 159 | 89,0 | 1 |
| 88,7 | Dievole Novecento Riserva 2022 | 275 | 92,0 | 1 |
| 88,6 | Penfolds Bin 311 2025 | 279 | 92,0 | 1 |

Valda: Finca Martelo, Pétalos, Caprai, Juliusspital, Dievole. Dievole före Allram/Soave för högre snitt och för att provaren köper den själv. Cristal 2018 (98, 2 799 kr) nämns i ingressen men är inget värdeköp.

## 4. Publicering

- Släppet läggs i `src/data/releases.ts` på en gren, aldrig direkt på main.
- Vercel bygger en förhandsversion per gren. Robin godkänner, sedan merge till main.
- Motiveringar skrivs med egna ord utifrån provningsnoterna, inga kopierade texter.

## 5. Att lösa innan det blir en schemalagd rutin

- När ska körningen gå? Vinbanken publicerar mån–tis, Munskänkarnas hitlista torsdag. Förslag: tisdag kväll för utkast, torsdag för komplettering.
- Fler internationella betyg kräver fler handlarsidor per vin (tidskrävande). Kan begränsas till de 8–10 vinerna med högst svenska betyg.
- Wine Table och Finewines är blockerade härifrån. Kan testas från Robins dator.
