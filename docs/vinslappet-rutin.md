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
| Munskänkarna (Vinlocus) | Ja, öppet | Egen provning per släpp: `/sv/vinlocus/tillfalligt-sortiment-<d>-<månad>-<år>` (t.ex. `tillfalligt-sortiment-16-oktober-2026`). 20-poängsbetyg plus prisvärdhetssymbol (Fynd i sin prisklass, Mer än prisvärt, Prisvärt, Ej prisvärt). 34 av 37 viner. Provas lördagen före släppet. Hitlistan (`/hitlista-<datum>/`) är ett mindre urval. Tips från Robin. |
| Wine Table | Nej | 403 mot både curl och WebFetch. Syns i sökresultat, men inget om 16 okt ännu. |
| Finewines.se (forum) | Ja, med webbläsar-User-Agent | Tråd per släpp, t.ex. `/threads/tillfaelligt-sortiment-20261016.9354/`. Patrik Sellin provar hela släppet ca tre veckor före och anger intervall (88-90p), vi använder mittvärdet. 33 viner. Kräver en full webbläsar-User-Agent i anropet, annars 403. Trådens id går inte att räkna ut, sök på forumet eller webben. Tips från Robin. |
| Wine Advocate (Parker), Peñín, Suckling, Vinous, Decanter | Indirekt | Egna sidor kräver inloggning. Betyg hittades via vinhandlare som citerar dem (bodeboca.it, hedonism.co.uk). Varje betyg länkas till sidan där det hittades. |
| Falstaff | Indirekt | 403 mot curl, men sidan syns i webbsök med betyg. |
| Vivino, Wine-Searcher, CellarTracker, Jancis Robinson | Nej | 403. |

Regel: använd bara betyg som står för rätt årgång. Betyg för andra årgångar (vanligt hos handlare) räknas inte.

## 3. Urval

1. Normalisera betyg till 100-skala. 20-skala: `65 + betyg × 5/3` (12 = 85, 15 = 90, 18 = 95, 20 ≈ 98), vilket följer Munskänkarnas egna band. Finns i `toHundred` i `src/lib/scoring.ts`. (Första versionen använde `50 + 2,5 × betyg`, men då straffades Munskänkarnas strängare skala för hårt.)
2. Snittbetyg per vin.
3. Värdepoäng = `snitt − 4 × log2(pris / 200)` − 1,5 om vinet bara har en källa. Det ger ett vin för 400 kr samma värde som ett vin för 200 kr med 4 poäng lägre snitt.
4. Släppets styrka styr antalet förslag: svagt 1–2, medel 3, starkt/mycket starkt 4–5. Bedöms på hur många viner som har snitt ≥ 91 och vad provarna skriver om släppet som helhet.
5. Minst ett vin under 200 kr. Gärna minst ett vitt eller mousserande om något håller nivån.
6. Ordning på sajten: det vin med högst snitt bland de tre högsta värdepoängen blir nr 1 ("Släppets bästa").

Utfall 16 okt med Vinbanken, Munskänkarna, Finewines och hittade internationella betyg (topp 10):

| Värde | Vin | Pris | Snitt | Källor |
|---|---|---|---|---|
| 91,5 | Finca Martelo Reserva 2021 | 229 | 92,3 | 6 |
| 90,1 | Pétalos 2023 | 219 | 90,6 | 5 |
| 90,0 | Caprai Montefalco Rosso 2023 | 179 | 89,3 | 4 |
| 89,5 | Juliusspital Silvaner 2025 | 209 | 89,7 | 3 |
| 89,0 | Kühn Quarz & Schiefer 2023 | 251 | 90,3 | 3 |
| 88,9 | Penfolds Bin 8 2024 | 229 | 89,7 | 3 |
| 88,8 | Château Montus 2022 | 325 | 91,6 | 3 |
| 88,7 | Penfolds Bin 311 2025 | 279 | 90,6 | 3 |
| 88,6 | Penfolds Bin 2 2024 | 199 | 88,6 | 2 |
| 88,5 | Soave Montesei 2025 | 159 | 87,2 | 3 |

Valda: de fem översta. Platserna 5–8 skiljer bara några tiondelar, så där är det en smaksak. Cristal 2018 (Vinbanken 98, Munskänkarna 18,5, Finewines 95-97, 2 799 kr) nämns i ingressen men är inget värdeköp. Finewines är tydligt svalare än övriga till Caprai (85-87) och mest positiv till Aalto (92-94) och Penfolds dyrare Bin-viner, men dem drar priset ner.

Notera: Finewines-tråden listar några viner (Marqués de Riscal GR 2016, Vajra Barbera Freisa, Wiemer m.fl.) som inte finns i Systembolagets lista för 16 okt. Systembolaget är facit.

## 4. Publicering

- Släppet läggs i `src/data/releases.ts` på en gren, aldrig direkt på main.
- Vercel bygger en förhandsversion per gren. Robin godkänner, sedan merge till main.
- Motiveringar skrivs med egna ord utifrån provningsnoterna, inga kopierade texter.

## 5. Att lösa innan det blir en schemalagd rutin

- När ska körningen gå? Munskänkarna provar lördag och publicerar före släppet, Vinbanken publicerar mån–tis. Förslag: tisdag kväll för utkast.
- Fler internationella betyg kräver fler handlarsidor per vin (tidskrävande). Kan begränsas till de 8–10 vinerna med högst svenska betyg.
- Wine Table och Finewines är blockerade härifrån. Kan testas från Robins dator.
