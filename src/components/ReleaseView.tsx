import { formatPrice, formatReleaseDate, systembolagetReleaseUrl, systembolagetUrl } from "@/lib/scoring";
import type { Release } from "@/lib/types";
import { SignupForm } from "./SignupForm";
import { WineCard } from "./WineCard";
import styles from "./ReleaseView.module.css";

export function ReleaseView({ release }: { release: Release }) {
  return (
    <>
      {release.isExample && (
        <p className={styles.example}>
          Exempeldata: viner, producenter och betyg på den här sidan är påhittade.
        </p>
      )}

      <header className={styles.hero}>
        <p className={styles.kicker}>
          Släpp {formatReleaseDate(release.releaseDate)}
        </p>
        <h1 className={styles.title}>{release.title}</h1>
        <p className={styles.intro}>{release.intro}</p>
        <dl className={styles.stats}>
          <div>
            <dt>Släppets styrka</dt>
            <dd>{release.strength}</dd>
          </div>
          <div>
            <dt>Köpförslag</dt>
            <dd>{release.picks.length} st</dd>
          </div>
        </dl>
      </header>

      <section className={styles.picks} aria-label="Köpförslag">
        {release.picks.map((wine, i) => (
          <WineCard key={wine.id} wine={wine} rank={i + 1} />
        ))}
      </section>

      {release.bubblers && release.bubblers.length > 0 && (
        <section className={styles.bubblers} aria-labelledby="bubblare">
          <h2 id="bubblare" className={styles.bubblersTitle}>
            Bubblare
          </h2>
          <ol className={styles.bubblersList} start={release.picks.length + 1}>
            {release.bubblers.map((b) => (
              <li key={b.sbNumber}>
                <a href={systembolagetUrl(b.sbNumber)} className={styles.bubblerName}>
                  {b.name} {b.vintage ?? "NV"}
                </a>
                <span className={styles.bubblerPrice}> · {formatPrice(b.priceSek)}</span>
                <p className={styles.bubblerNote}>{b.note}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {!release.isExample && (
        <section className={styles.toSb}>
          <a href={systembolagetReleaseUrl(release.releaseDate)} className={styles.toSbButton}>
            Hela släppet hos Systembolaget
          </a>
          <p className={styles.toSbNote}>
            Öppnar alla viner som släpps {formatReleaseDate(release.releaseDate)} i en lista. Systembolaget kan inte
            visa bara våra{" "}
            {release.picks.length + (release.bubblers?.length ?? 0)}, så leta efter namnen ovan i listan.
          </p>
        </section>
      )}

      <section className={styles.signup}>
        <SignupForm />
      </section>
    </>
  );
}
