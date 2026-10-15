import { formatScore, scoreFill, toHundred } from "@/lib/scoring";
import type { CriticScore } from "@/lib/types";
import styles from "./ScoreRing.module.css";

const R = 26;
const CIRC = 2 * Math.PI * R;

/** Ett kritikerbetyg som ring. Ringen fylls utifrån var betyget ligger på 80–100. */
export function ScoreRing({ score }: { score: CriticScore }) {
  const fill = scoreFill(toHundred(score));
  return (
    <figure className={styles.ring}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r={R} className={styles.track} />
        <circle
          cx="32"
          cy="32"
          r={R}
          className={styles.arc}
          strokeDasharray={`${fill * CIRC} ${CIRC}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className={`${styles.value} ${formatScore(score).length > 3 ? styles.long : ""}`}>
        {formatScore(score)}
        <span className={styles.scale}>/{score.scale}</span>
      </span>
      <figcaption className={styles.source}>{score.source}</figcaption>
    </figure>
  );
}
