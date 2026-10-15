"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SignupForm.module.css";

type State = { kind: "idle" | "sending" | "done" } | { kind: "error"; message: string };

/** Anmälan till nyhetsbrevet. Adressen skickas till Buttondown, som mejlar en bekräftelselänk. */
export function SignupForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  if (state.kind === "done") {
    return (
      <p className={styles.done} role="status">
        Tack! Kolla din inkorg och klicka på länken i mejlet för att bekräfta prenumerationen.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        setState({ kind: "sending" });
        try {
          const res = await fetch("/api/prenumerera", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.get("email"), consent: form.get("consent") === "on" }),
          });
          if (res.ok) return setState({ kind: "done" });
          const data = await res.json().catch(() => null);
          setState({ kind: "error", message: data?.error ?? "Något gick fel, försök igen om en stund." });
        } catch {
          setState({ kind: "error", message: "Något gick fel, försök igen om en stund." });
        }
      }}
    >
      <label className={styles.label} htmlFor="email">
        Få Vinsläppet i mejlen inför varje fredagssläpp
      </label>
      <div className={styles.row}>
        <input id="email" name="email" type="email" required placeholder="din@epost.se" className={styles.input} />
        <button type="submit" className={styles.button} disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Skickar…" : "Prenumerera"}
        </button>
      </div>
      <label className={styles.check}>
        <input type="checkbox" name="consent" required /> Jag har fyllt 25 år och godkänner{" "}
        <Link href="/integritet">integritetspolicyn</Link>.
      </label>
      {state.kind === "error" && (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
