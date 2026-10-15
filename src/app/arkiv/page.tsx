import Link from "next/link";
import { releases } from "@/data/releases";
import { formatReleaseDate } from "@/lib/scoring";
import styles from "./page.module.css";

export const metadata = { title: "Tidigare släpp · Vinsläppet" };

export default function Archive() {
  const sorted = [...releases].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  return (
    <>
      <h1 className={styles.title}>Tidigare släpp</h1>
      <ul className={styles.list}>
        {sorted.map((r) => (
          <li key={r.slug}>
            <Link href={`/slapp/${r.slug}`} className={styles.item}>
              <span className={styles.date}>{formatReleaseDate(r.releaseDate)}</span>
              <span className={styles.name}>{r.title}</span>
              <span className={styles.meta}>
                {r.picks.length} köpförslag · {r.strength}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
