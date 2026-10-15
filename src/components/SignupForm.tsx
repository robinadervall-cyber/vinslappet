"use client";

import { useState } from "react";
import styles from "./SignupForm.module.css";

/** Prototyp: formuläret sparar ingenting ännu. Kopplas mot Resend/Brevo i steg 4. */
export function SignupForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className={styles.done} role="status">
        Tack! I prototypen sparas ingen adress än, men så här kommer det att fungera.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className={styles.label} htmlFor="email">
        Få Vinsläppet i mejlen inför varje fredagssläpp
      </label>
      <div className={styles.row}>
        <input id="email" type="email" required placeholder="din@epost.se" className={styles.input} />
        <button type="submit" className={styles.button}>
          Prenumerera
        </button>
      </div>
      <label className={styles.check}>
        <input type="checkbox" required /> Jag har fyllt 25 år och godkänner{" "}
        <a href="#integritet">integritetspolicyn</a>.
      </label>
    </form>
  );
}
