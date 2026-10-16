import Link from "next/link";
import styles from "../integritet/page.module.css";

export const metadata = { title: "Om Vinsläppet" };

export default function About() {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Om Vinsläppet</h1>
      <p className={styles.updated}>Hur vi väljer viner och var datan kommer ifrån</p>

      <p>
        Varje fredag släpper Systembolaget ett trettiotal viner i tillfälligt sortiment. Flera skribenter och
        provare betygsätter dem, men omdömena är utspridda på olika sajter och skalor. Vinsläppet samlar dem och
        ger en snabb överblick över vilka viner recensenterna är överens om, så att du vet vad som är värt att
        köpa innan hyllorna töms.
      </p>
      <p>
        <Link href="/butik">Min butik</Link> gör samma sak för din butik: fem köpförslag bland vinerna från
        tillfälligt sortiment som faktiskt står på hyllan där, oavsett vilket släpp de kom med.
      </p>

      <h2>Källor</h2>
      <p>
        Vi använder Vinbanken, Munskänkarnas släpprovning, BKWine Magazine och Patrik Sellins provningar på
        Finewines-forumet. För de högst rankade vinerna letar vi även efter internationella kritiker som Wine
        Advocate, James Suckling och Guía Peñín. Betyg räknas bara om de gäller exakt rätt årgång, och varje betyg
        länkar till sidan där det står. Wine Table läser vi som stöd i bedömningen men räknar inte in i snittet,
        eftersom de inte sätter poäng.
      </p>

      <h2>Betyg och snitt</h2>
      <p>
        Betyg på 20-poängsskala räknas om till 100-skala med 65 + betyg × 5/3, så att 15 blir 90 och 18 blir 95.
        Det följer hur Munskänkarna själva beskriver sina nivåer. Anger en provare ett intervall, till exempel
        88–90, använder vi mittvärdet. Snittet är medelvärdet av alla betyg vinet fått.
      </p>

      <h2>Pris mot betyg</h2>
      <p>
        Fokus ligger på riktigt bra viner, men priset spelar in. Varje fördubbling av priset (räknat per 75 cl)
        kostar 1,5 poäng i vår rangordning, med 200 kronor som utgångspunkt. Ett vin för 400 kronor behöver alltså
        ett snitt som är 1,5 poäng högre än ett för 200 kronor för att rankas lika. Viner med bara ett betyg får
        1,5 poängs avdrag, eftersom ett enskilt omdöme är osäkrare. Viner över 1 500 kronor rankas inte, men vi
        nämner dem om de sticker ut.
      </p>

      <h2>Så blir listan</h2>
      <p>
        Modellen tar fram tio kandidater, och det bästa vinet under 200 kronor får alltid en plats bland dem. De
        fem köpförslagen och deras ordning väljs sedan för hand, med hänsyn till sådant som siffrorna missar, som
        tydlig oenighet mellan provarna eller ett bra vitt vin i ett rött släpp. Övriga kandidater visas som
        bubblare. Antalet förslag kan bli färre än fem om släppet är svagt.
      </p>
      <p>
        Dryckesfönstret kommer från Vinbanken i första hand och annars från BKWine. Antal flaskor i släppet kommer
        från BKWine. Släppet publiceras på torsdagen före och nyhetsbrevet går ut samma dag klockan 16.
      </p>

      <h2>Min butik</h2>
      <p>
        När du väljer butik hämtar vi butikens tillfälliga sortiment och lagersaldo direkt från Systembolaget.
        Svaret sparas i högst en timme, så lagersaldot är som mest en timme gammalt. Vi visar bara viner som har
        minst en flaska i butiken, rangordnade med samma modell som ovan. Finns inget vin under 200 kronor bland de
        fyra första får det bästa budgetvinet i butiken femte platsen.
      </p>
      <p>
        Betygen uppdateras en gång i veckan när vi samlar in nästa släpp, och vi har betyg för släppen från 21
        augusti 2026 och framåt. Äldre viner och viner utan betyg visas inte. Lagret kan ändras snabbt efter ett
        släpp, så kontrollera gärna hos Systembolaget innan du går dit.
      </p>

      <h2>Oberoende</h2>
      <p>
        Vinsläppet är inte knutet till Systembolaget och tar inte betalt av producenter eller importörer.
        Motiveringarna skriver vi med egna ord utifrån provningsnoterna.
      </p>
    </article>
  );
}
