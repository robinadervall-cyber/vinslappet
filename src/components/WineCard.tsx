import { averageScore, formatBottles, formatPrice, isBudgetPick, systembolagetUrl } from "@/lib/scoring";
import type { Wine } from "@/lib/types";
import { Bottle } from "./Bottle";
import { ScoreRing } from "./ScoreRing";
import styles from "./WineCard.module.css";

export function WineCard({ wine, rank }: { wine: Wine; rank: number }) {
  const avg = averageScore(wine);
  const facts = [wine.region, wine.country, wine.grapes.join(", "), `${wine.volumeMl / 10} cl`].filter(Boolean);

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
        <div className={styles.top}>
          <div className={styles.tags}>
            {rank === 1 && <span className={styles.tagTop}>Släppets bästa</span>}
            {isBudgetPick(wine) && <span className={styles.tagBudget}>Under 200 kr</span>}
            <span className={styles.tag}>{wine.style}</span>
          </div>
          {wine.food && (
            <p className={styles.food}>
              <span className={styles.foodLabel}>Matförslag</span> {wine.food}
            </p>
          )}
        </div>

        <h3 className={styles.name}>
          <span className={styles.producer}>{wine.producer}</span>
          {wine.name} {wine.vintage ?? "NV"}
        </h3>
        <p className={styles.facts}>{facts.join(" · ")}</p>
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

        <p className={styles.verdict}>{wine.verdict}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(wine.priceSek)}</span>
          <span className={styles.meta}>
            <a href={systembolagetUrl(wine.sbNumber)} className={styles.sbLink}>
              Art.nr {wine.sbNumber}
            </a>
            {wine.bottles && <> · {formatBottles(wine.bottles)}</>}
            {avg !== null && <> · snitt {avg.toLocaleString("sv-SE")}/100</>}
          </span>
        </div>
      </div>
    </article>
  );
}
