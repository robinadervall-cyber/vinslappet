import { Suspense } from "react";
import { StorePicker } from "@/components/StorePicker";
import { StoreWineCard } from "@/components/StoreWineCard";
import { getStores, getStoreTop, type Store } from "@/lib/systembolaget";
import styles from "./page.module.css";

export const metadata = { title: "Flaskor från min butik · Vinsläppet" };

export default function StorePage({ searchParams }: PageProps<"/butik">) {
  return (
    <>
      <header className={styles.hero}>
        <p className={styles.kicker}>Flaskor från min butik</p>
        <h1 className={styles.title}>Det bästa ur tillfälligt sortiment i din butik</h1>
        <p className={styles.intro}>
          Välj butik så visar vi fem köpförslag bland vinerna från Systembolagets tillfälliga släpp som står på
          hyllan där just nu. Vinerna kan komma från olika släpp och rangordnas med samma modell som Vinsläppet:
          betyg från Vinbanken, Munskänkarna, BKWine och Finewines vägt mot pris.
        </p>
      </header>
      <Suspense fallback={<p className={styles.muted}>Hämtar butiker …</p>}>
        <Picker searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Picker({ searchParams }: { searchParams: PageProps<"/butik">["searchParams"] }) {
  const param = (await searchParams).butik;
  const id = typeof param === "string" && /^\d{4}$/.test(param) ? param : undefined;
  const stores = await getStores();
  const store = stores.find((s) => s.id === id);

  return (
    <>
      <StorePicker stores={stores} selected={store?.id} />
      {store && (
        <Suspense key={store.id} fallback={<p className={styles.muted}>Kollar hyllorna i {store.city} …</p>}>
          <Results store={store} />
        </Suspense>
      )}
    </>
  );
}

async function Results({ store }: { store: Store }) {
  const result = await getStoreTop(store.id).catch(() => null);

  if (!result) {
    return <p className={styles.notice}>Vi kunde inte nå Systembolaget just nu. Försök igen om en stund.</p>;
  }

  return (
    <section className={styles.results} aria-label={`Köpförslag i ${store.city}`}>
      <h2 className={styles.storeName}>
        {store.city}: {store.name}
      </h2>
      <p className={styles.muted}>
        {result.inStore === 0
          ? "Butiken har inga viner från tillfälligt sortiment just nu."
          : `${result.inStore} viner från tillfälligt sortiment i butiken, ${result.rated} av dem har betyg hos oss.`}
      </p>
      {result.inStore > 0 && result.wines.length === 0 && (
        <p className={styles.notice}>Inga betygsatta viner i lager här just nu.</p>
      )}
      <div className={styles.picks}>
        {result.wines.map((w, i) => (
          <StoreWineCard key={w.sbNumber} wine={w} rank={i + 1} />
        ))}
      </div>
      <p className={styles.footnote}>
        Lagersaldo från Systembolaget, uppdateras varje timme. Betyg finns för släppen från 21 augusti och framåt.
      </p>
    </section>
  );
}
