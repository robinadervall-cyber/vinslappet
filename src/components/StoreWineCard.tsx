import { BUDGET_LIMIT_SEK, formatPrice, systembolagetUrl } from "@/lib/scoring";
import type { StoreWine } from "@/lib/systembolaget";
import { Bottle } from "./Bottle";
import { ScoreRing } from "./ScoreRing";
import styles from "./WineCard.module.css";

const releaseDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("sv-SE", { day: "numeric", month: "long" });

/** Kort för ett vin som står i en viss butik. Samma utseende som köpförslagen, utan motivering. */
export function StoreWineCard({ wine, rank }: { wine: StoreWine; rank: number }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <span className={styles.rank} aria-label={`Förslag ${rank}`}>
          {rank}
        </span>
        {wine.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={wine.imageUrl} alt={`${wine.producer} ${wine.name}`} className={styles.photo} />
        ) : (
          <Bottle style={wine.style} />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          {wine.priceSek < BUDGET_LIMIT_SEK && (
            <span className={styles.tagBudget}>Under 200 kr</span>
          )}
          <span className={styles.tag}>{wine.style}</span>
          <span className={styles.tag}>Släpptes {releaseDay(wine.releaseDate)}</span>
        </div>

        <h3 className={styles.name}>
          <span className={styles.producer}>{wine.producer}</span>
          {wine.name} {wine.vintage ?? "NV"}
        </h3>
        <p className={styles.facts}>{wine.region}</p>
        {wine.drinkWindow && (
          <p className={styles.drink}>
            Drick {wine.drinkWindow.from}–{wine.drinkWindow.to}
            <span className={styles.drinkSource}> enligt {wine.drinkWindow.source}</span>
          </p>
        )}

        <div className={styles.scores}>
          {wine.scores.map((s) => (
            <ScoreRing key={s.source} score={s} />
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(wine.priceSek)}</span>
          <span className={styles.meta}>
            <a href={systembolagetUrl(wine.sbNumber)} className={styles.sbLink}>
              Art.nr {wine.sbNumber}
            </a>
            {" · "}
            <strong>{wine.stock} i butiken</strong>
            {" · "}snitt {wine.avg.toLocaleString("sv-SE")}/100
          </span>
        </div>
      </div>
    </article>
  );
}
