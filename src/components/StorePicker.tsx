"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { useState } from "react";
import type { Store } from "@/lib/systembolaget";
import styles from "./StorePicker.module.css";

const norm = (s: string) => s.toLocaleLowerCase("sv").normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Butikssök: skriv ort, butiksnamn eller adress och välj bland träffarna. */
export function StorePicker({ stores, selected }: { stores: Store[]; selected?: string }) {
  const [query, setQuery] = useState("");
  const words = norm(query).split(/\s+/).filter(Boolean);
  const hits = words.length
    ? stores.filter((s) => {
        const text = norm(`${s.city} ${s.name} ${s.county}`);
        return words.every((w) => text.includes(w));
      })
    : [];

  return (
    <div className={styles.form}>
      <label htmlFor="butik-sok" className={styles.label}>
        Sök din butik
      </label>
      <input
        id="butik-sok"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ort, butik eller adress, t.ex. Sundsvall"
        autoComplete="off"
        className={styles.input}
      />
      {words.length > 0 && (
        <ul className={styles.hits}>
          {hits.length === 0 && <li className={styles.none}>Ingen butik matchar.</li>}
          {hits.slice(0, 12).map((s) => (
            <li key={s.id}>
              <Link
                href={`/butik?butik=${s.id}`}
                className={s.id === selected ? styles.hitActive : styles.hit}
                onClick={() => {
                  track("Butik vald", { butik: s.id, ort: s.city });
                  setQuery("");
                }}
              >
                <span className={styles.city}>{s.city}</span> {s.name}
              </Link>
            </li>
          ))}
          {hits.length > 12 && <li className={styles.none}>{hits.length - 12} till, skriv mer för att begränsa.</li>}
        </ul>
      )}
    </div>
  );
}
