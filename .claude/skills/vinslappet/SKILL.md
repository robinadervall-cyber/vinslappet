---
name: vinslappet
description: Ta fram veckans Vinsläppet för Systembolagets tillfälliga sortiment (fredagssläpp) - samla betyg, rangordna kandidater, låt Robin välja och publicera på sajten. Använd när ett nytt släpp ska förberedas eller när den schemalagda torsdagskörningen startar.
---

# Vinsläppet: veckorutin

Svara Robin på svenska. Metoden i detalj står i `docs/vinslappet-rutin.md`. Robin godkänner varje släpp innan det publiceras: pusha aldrig ett nytt släpp direkt till main.

## Tidsplan

- Torsdag kl. 12: kör steg 1–4 och meddela Robin med kandidatlistan.
- Robin svarar med sina fem val och ordning, och eventuella justeringar. Gör steg 5–6.
- Torsdag kl. 16: nyhetsbrevet går ut via Buttondown. Släppet måste vara mergat till main före ca kl. 15 (vintertid 14), annars hinner Vercel Cron inte schemalägga det.

## 1. Samla in

```bash
python3 scripts/vinslappet_hamta.py            # nästa fredag
python3 scripts/vinslappet_hamta.py 2026-10-23 # eller ett givet datum
```

Skriptet hämtar släppets viner från Systembolaget och betyg från Vinbanken, Munskänkarnas släpprovning, Finewines-forumets släpptråd och BKWine Magazines månadsrapport (finns ofta först en bit in i månaden, så tidiga släpp kan sakna den). Resultatet hamnar i `data/insamling/<datum>.json` och en rangordnad lista skrivs ut.

- Om en källa saknas (inte publicerad än, eller nätfel): säg det i meddelandet till Robin, kör inte om i en loop.
- Om skriptet skriver "Kunde inte matcha Vinbanken": matcha för hand mot JSON-filen.
- Systembolaget är facit för vilka viner som släpps. Viner i källorna som inte finns hos Systembolaget ignoreras.

## 2. Internationella betyg

För de cirka tolv högst rankade vinerna: sök med WebSearch efter Wine Advocate (Parker), Guía Peñín, James Suckling, Vinous, Decanter, Falstaff och Jeb Dunnuck för exakt rätt årgång. Använd bara betyg du sett på en sida (handlare som citerar kritikern går bra) och spara URL:en. Betyg för andra årgångar räknas inte. Gissa aldrig.

## 3. Rangordna

- 20-skala till 100: `65 + betyg × 5/3`.
- Snitt av alla betyg. Värde = `snitt − 4 × log2(pris / 200)` − 1,5 om bara en källa.
- Wine Table (Cloudflare-spärrat, Robin klistrar ibland in texten) räknas inte in i snittet, men används som plus/neutral/minus och i motiveringar.

## 4. Meddela Robin

Skicka i projekttråden:
- Släppets storlek, vilka källor som fanns och en bedömning av släppets styrka (svagt, medel, starkt, mycket starkt).
- Tio kandidater, numrerade: namn, årgång, pris, typ, snitt och betygen per källa. Minst ett vin under 200 kr ska finnas med.
- Nämn dyra toppviner (som Cristal) separat om de sticker ut.
- Be Robin svara med fem nummer i ordning. Övriga blir bubblare.

Spara listan i `/mnt/project-files/vinslappet-rutin/kandidater-<datum>.md` och bifoga den.

## 5. Bygg släppet

Skapa gren `vinslappet/<datum>` från main. I `src/data/releases.ts`, lägg till ett nytt släpp först i listan:
- `picks`: Robins fem i hans ordning, med `Wine`-objekt. Bild: `image` från insamlingen, annars utelämna `imageUrl`. Varje betyg med `url` till källan. Motivering 2–3 meningar med egna ord utifrån provningsnoterna, nämn tydlig oenighet mellan källor.
- `bubblers`: övriga fem kandidater (eller de Robin anger), en mening plus betygen.
- `title`, `intro` och `strength` utifrån släppet.

Kör `npm run build` och `npm run lint`. Ta skärmbilder (dator och mobil) av startsidan och kontrollera kort och bilder. Öppna en PR mot main, och skicka Robin länk till förhandsversionen (Vercel kommenterar den på PR:en) och skärmbilden.

## 6. Publicera

Först när Robin godkänt: merga PR:en (squash) och kontrollera att https://vinslappet.vercel.app visar det nya släppet. Uppdatera `docs/vinslappet-rutin.md` om metoden ändrats.

## 7. Nyhetsbrev

Ingen åtgärd behövs normalt. Vercel Cron anropar `/api/nyhetsbrev` på torsdagar kl. 13 UTC. Är senaste släppet på main morgondagens schemaläggs utskicket i Buttondown till kl. 16 svensk tid, en gång per släpp. Förhandsvisning: https://vinslappet.vercel.app/api/nyhetsbrev/forhandsvisning. Godkänner Robin för sent för cron-körningen: säg det till Robin, som kan skicka utskicket från Buttondown (klistra in HTML från förhandsvisningen) eller hoppa över veckan.
