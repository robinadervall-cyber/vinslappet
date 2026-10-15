import { formatReleaseDate } from "@/lib/scoring";
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

      <section className={styles.signup}>
        <SignupForm />
      </section>
    </>
  );
}
