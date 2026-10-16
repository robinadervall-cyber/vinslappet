"use client";

import { useRouter } from "next/navigation";
import type { Store } from "@/lib/systembolaget";
import styles from "./StorePicker.module.css";

/** Butiksval. Fungerar som vanligt formulär utan JavaScript, byter sida direkt med. */
export function StorePicker({ stores, selected }: { stores: Store[]; selected?: string }) {
  const router = useRouter();
  const counties = [...new Set(stores.map((s) => s.county))].sort((a, b) => a.localeCompare(b, "sv"));

  return (
    <form action="/butik" className={styles.form}>
      <label htmlFor="butik" className={styles.label}>
        Välj din butik
      </label>
      <div className={styles.row}>
        <select
          id="butik"
          name="butik"
          defaultValue={selected ?? ""}
          className={styles.select}
          onChange={(e) => e.target.value && router.push(`/butik?butik=${e.target.value}`)}
        >
          <option value="" disabled>
            Ort och butik
          </option>
          {counties.map((county) => (
            <optgroup key={county} label={county}>
              {stores
                .filter((s) => s.county === county)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.city}: {s.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <button type="submit" className={styles.button}>
          Visa
        </button>
      </div>
    </form>
  );
}
