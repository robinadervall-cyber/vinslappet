import Link from "next/link";
import styles from "./page.module.css";

export const metadata = { title: "Integritetspolicy · Vinsläppet" };

export default function Privacy() {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Integritetspolicy</h1>
      <p className={styles.updated}>Senast uppdaterad 15 oktober 2026</p>

      <p>
        Vinsläppet drivs av Robin Adervall, som är personuppgiftsansvarig. Här beskriver vi vilka
        uppgifter vi samlar in, varför och hur länge de sparas.
      </p>

      <h2>Nyhetsbrevet</h2>
      <p>
        När du prenumererar sparar vi din e-postadress. För att stoppa skräpanmälningar skickas även
        din IP-adress och sidan du anmälde dig från med anmälan. Vi använder adressen bara för att
        skicka Vinsläppet, ungefär en gång i veckan inför Systembolagets fredagssläpp. Vi säljer
        eller lämnar aldrig ut den till någon annan i marknadsföringssyfte.
      </p>
      <p>
        Den rättsliga grunden är ditt samtycke. Du bekräftar prenumerationen via en länk i ett
        mejl, och adressen sparas så länge du prenumererar. Varje utskick har en länk där du avslutar
        prenumerationen, och då slutar vi skicka direkt. Du kan
        också be oss radera adressen helt.
      </p>
      <p>
        Utskicken görs med tjänsten Buttondown, som lagrar prenumerantlistan åt oss. Buttondown kan
        mäta om ett utskick öppnas och vilka länkar som klickas. Det använder vi bara för att se vad
        som är intressant i breven.
      </p>

      <h2>Webbplatsen</h2>
      <p>
        Webbplatsen använder inga cookies och ingen besöksstatistik. Den drivs hos Vercel, som likt
        alla webbhotell tillfälligt loggar tekniska uppgifter som IP-adress för drift och säkerhet.
        Flaskbilderna hämtas direkt från Systembolagets bildserver, så Systembolaget ser att din
        webbläsare laddar dem.
      </p>

      <h2>Var uppgifterna finns</h2>
      <p>
        Buttondown och Vercel är amerikanska företag, så uppgifterna kan behandlas i USA. Överföringen
        sker enligt de skyddsåtgärder som tjänsterna anger i sina dataskyddsvillkor.
      </p>

      <h2>Dina rättigheter</h2>
      <p>
        Du har rätt att få veta vilka uppgifter vi har om dig, att få fel rättade och att få dem
        raderade. Du kan när som helst återkalla ditt samtycke. Svara på något av våra utskick eller
        på bekräftelsemejlet, så når du oss. Tycker du att vi hanterar dina uppgifter fel kan du
        vända dig till Integritetsskyddsmyndigheten (imy.se).
      </p>

      <h2>Ålder</h2>
      <p>
        Vinsläppet handlar om alkohol och riktar sig till dig som fyllt 25 år. Vi ber dig intyga det
        när du prenumererar.
      </p>

      <p className={styles.back}>
        <Link href="/">Till senaste släppet</Link>
      </p>
    </article>
  );
}
