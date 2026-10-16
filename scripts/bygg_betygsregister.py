"""Bygger betygsregistret som sidan "Flaskor från min butik" sorterar på.

Läser alla insamlingar i data/insamling/ (en per släpp, se vinslappet_hamta.py) och skriver
src/data/betygsregister.json med de viner som har minst ett betyg. Kör efter varje ny insamling:

    python3 scripts/bygg_betygsregister.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_ORDER = ["Vinbanken", "Munskänkarna", "BKWine", "Finewines"]


def main() -> None:
    wines: dict[str, dict] = {}
    for path in sorted((ROOT / "data" / "insamling").glob("*.json")):
        release = json.loads(path.read_text())
        for w in release["wines"]:
            if not w.get("scores") or w.get("value") is None:
                continue
            scores = [{"source": k, "score": v["score"], "scale": v["scale"], "url": v.get("url")}
                      for k, v in sorted(w["scores"].items(), key=lambda kv: SOURCE_ORDER.index(kv[0])
                                         if kv[0] in SOURCE_ORDER else 99)]
            # Senare släpp skriver över tidigare om samma artikel släpps igen.
            wines[w["sbNumber"]] = {
                "sbNumber": w["sbNumber"],
                "name": w["name"],
                "producer": w["producer"],
                "vintage": w["vintage"],
                "country": w["country"],
                "region": w["region"],
                "type": w["type"],
                "price": w["price"],
                "volume": w["volume"],
                "image": w.get("image"),
                "releaseDate": release["releaseDate"],
                "scores": scores,
                "avg": w["avg"],
                "value": w["value"],
                **({"drink": w["drink"]} if w.get("drink") else {}),
            }

    out = ROOT / "src" / "data" / "betygsregister.json"
    out.write_text(json.dumps(sorted(wines.values(), key=lambda w: -w["value"]), ensure_ascii=False, indent=1) + "\n")
    print(f"{len(wines)} betygsatta viner i {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
