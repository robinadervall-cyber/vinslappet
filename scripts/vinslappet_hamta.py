#!/usr/bin/env python3
"""Samlar in ett släpp i Systembolagets tillfälliga sortiment och betyg från öppna källor
(Vinbanken, Munskänkarna, Finewines och BKWine).

Användning:
    python3 scripts/vinslappet_hamta.py              # nästa fredag
    python3 scripts/vinslappet_hamta.py 2026-10-16   # valfritt släppdatum

Skriver data/insamling/<datum>.json och skriver ut en rangordnad kandidatlista.
Bara standardbiblioteket. Se docs/vinslappet-rutin.md för metoden.
"""

from __future__ import annotations

import datetime as dt
import html
import json
import math
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/130 Safari/537.36"
)
SB_SEARCH = "https://api-extern.systembolaget.se/sb-api-ecommerce/v1/productsearch/search"
SB_KEY_FALLBACK = "8d39a7340ee7439f8b4c1e995c8f3e4a"
MONTHS = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti",
          "september", "oktober", "november", "december"]


def get(url: str, headers: dict | None = None, attempts: int = 4) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "sv-SE,sv", **(headers or {})})
    for n in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            if n == attempts - 1:
                raise
            time.sleep(2 ** (n + 1))
    raise AssertionError("unreachable")


def safe(name: str, fn, empty):
    """Kör en källa. Om den fallerar fortsätter insamlingen utan den."""
    try:
        return fn()
    except Exception as e:  # noqa: BLE001
        print(f"Varning: {name} gick inte att hämta ({e}).", file=sys.stderr)
        return empty


def text_lines(page: str) -> list[str]:
    page = re.sub(r"(?s)<(script|style|svg)[^>]*>.*?</\1>", "", page)
    page = re.sub(r"<br\s*/?>|</p>|</h\d>|</li>|</div>|</a>|</span>", "\n", page)
    page = html.unescape(re.sub(r"<[^>]+>", "", page))
    return [l.strip() for l in page.split("\n") if l.strip()]


def num(s: str) -> float:
    return float(s.replace(",", "."))


# --- Systembolaget -----------------------------------------------------------------------

def sb_key() -> str:
    try:
        home = get("https://www.systembolaget.se/")
        for src in re.findall(r'src="(/_next/static/chunks/[^"]+\.js)"', home):
            m = re.search(r'NEXT_PUBLIC_API_KEY_APIM:"([0-9a-f]{32})"', get("https://www.systembolaget.se" + src))
            if m:
                return m.group(1)
    except Exception as e:  # noqa: BLE001
        print(f"Varning: kunde inte läsa API-nyckel ({e}), använder sparad.", file=sys.stderr)
    return SB_KEY_FALLBACK


def sb_release(date: str) -> list[dict]:
    key, wines, page = sb_key(), [], 1
    while True:
        q = urllib.parse.urlencode({
            "size": 30, "page": page, "productLaunch.min": date, "productLaunch.max": date,
            "assortmentText": "Tillfälligt sortiment",
        })
        data = json.loads(get(f"{SB_SEARCH}?{q}", {
            "Ocp-Apim-Subscription-Key": key, "Origin": "https://www.systembolaget.se"}))
        for p in data["products"]:
            if p["categoryLevel1"] != "Vin":
                continue
            wines.append({
                "sbNumber": p["productNumber"],
                "short": p["productNumber"][:-2],
                "name": " ".join(x for x in [p["productNameBold"], p["productNameThin"]] if x),
                "producer": p["producerName"],
                "vintage": int(p["vintage"]) if p["vintage"] else None,
                "country": p["country"],
                "region": p["originLevel2"] or p["originLevel1"],
                "grapes": p["grapes"],
                "type": p["categoryLevel2"],
                "price": p["price"],
                "volume": p["volume"],
                "image": (f"https://product-cdn.systembolaget.se/productimages/{p['productId']}/{p['productId']}_400.png"
                          if p["images"] else None),
                "scores": {},
            })
        if data["metadata"]["nextPage"] in (-1, None) or page >= data["metadata"]["totalPages"]:
            return wines
        page += 1


# --- Källor ------------------------------------------------------------------------------

def vinbanken(date: str, d: dt.date) -> tuple[list[dict], list[str]]:
    """Returnerar en lista med {nr, name, score, price} och använda URL:er.

    Vinbanken skriver ibland fel artikelnummer, så matchningen mot Systembolaget görs i match_vinbanken.
    """
    label = f"{d.day}-{MONTHS[d.month - 1]}"
    cat = get("https://vinbanken.se/kategorier/nyheter-systembolaget/tillfalligt-sortiment-systembolaget")
    urls = sorted({"https://vinbanken.se" + u for u in re.findall(r'href="(/artiklar/[^"]*tillfalligt-sortiment-' + label + r'-\d+)"', cat)})
    entries = []
    for url in urls:
        lines = text_lines(get(url))
        for i, l in enumerate(lines):
            m = re.fullmatch(r"#(\d{5})", l)
            if not m:
                continue
            name = " ".join(x for x in lines[max(0, i - 4):i] if not re.search(r"ml$|%$|^•", x))
            for j in range(i + 1, min(i + 12, len(lines) - 1)):
                if re.fullmatch(r"\d{2,3}", lines[j]) and re.fullmatch(r"[\d ]+ kr", lines[j + 1]):
                    entries.append({"nr": m.group(1), "name": name, "score": int(lines[j]), "scale": 100, "url": url,
                                    "price": int(lines[j + 1].replace(" kr", "").replace(" ", ""))})
                    break
    return entries, urls


def match_vinbanken(wines: list[dict], entries: list[dict]) -> list[dict]:
    """Kopplar Vinbankens betyg till viner. Nummer och pris måste stämma, annars pris och namnord."""
    unmatched = []
    for e in entries:
        hit = next((w for w in wines if w["short"] == e["nr"] and w["price"] == e["price"]), None)
        if not hit:
            words = {x.lower() for x in re.findall(r"\w{4,}", e["name"])}
            cands = [w for w in wines if w["price"] == e["price"]
                     and words & {x.lower() for x in re.findall(r"\w{4,}", w["name"] + " " + w["producer"])}]
            hit = cands[0] if len(cands) == 1 else None
        if hit:
            hit["scores"]["Vinbanken"] = {k: e[k] for k in ("score", "scale", "url")}
        else:
            unmatched.append(e)
    return unmatched


def munskankarna(d: dt.date) -> tuple[dict, str]:
    url = f"https://www.munskankarna.se/sv/vinlocus/tillfalligt-sortiment-{d.day}-{MONTHS[d.month - 1]}-{d.year}"
    try:
        lines = text_lines(get(url))
    except Exception:  # noqa: BLE001
        return {}, url
    scores, idx = {}, [i for i, l in enumerate(lines) if l == "BETYG"] + [len(lines)]
    for a, b in zip(idx, idx[1:]):
        blk = lines[a:b]
        if "Systembolaget:" not in blk:
            continue
        nr = blk[blk.index("Systembolaget:") + 1]
        value = next((x for x in blk[3:6] if "prisvärt" in x.lower() or "fynd" in x.lower()), None)
        scores[nr] = {"score": num(blk[1]), "scale": 20, "url": url, "value": value}
    return scores, url


def finewines(date: str) -> tuple[dict, str | None]:
    forum = get("https://www.finewines.se/forums/lanseringar-fran-systembolaget.51/")
    m = re.search(r'href="(/threads/tillfaelligt-sortiment-' + date.replace("-", "") + r'\.\d+/)"', forum)
    if not m:
        return {}, None
    url = "https://www.finewines.se" + m.group(1)
    lines = text_lines(get(url))
    scores, current = {}, None
    for l in lines:
        h = re.match(r"^(\d{5}) ", l)
        if h:
            current = h.group(1)
        r = re.search(r"(\d{2,3})\s*-\s*(\d{2,3})p\s*$", l)
        if r and current:
            lo, hi = int(r.group(1)), int(r.group(2))
            scores[current] = {"score": (lo + hi) / 2, "scale": 100, "url": url, "range": f"{lo}–{hi}"}
            current = None
    return scores, url


def bkwine(date: str, d: dt.date) -> tuple[dict, str]:
    """BKWine Magazines månadsrapport. Jack Jakobsson provar hela månadens släpp på 20-skala.

    Samma vin kan stå i flera tabeller (provat flera gånger), då används snittet.
    """
    url = (f"https://www.bkwine.com/sv/utvalt/nyhetsutslapp-nya-viner/"
           f"{MONTHS[d.month - 1]}-{d.year}-systembolagets-nyheter-hela-provningen/")
    page = get(url)
    found: dict[str, list[tuple[float, str]]] = {}
    for row in re.findall(r'(?s)<tr class="row-\d+">(.*?)</tr>', page):
        cols = dict(re.findall(r'(?s)<td class="column-(\d)">(.*?)</td>', row))
        if cols.get("5", "").strip() != date:
            continue
        nr = re.search(r"(\d{5})<br />\s*[\d ]+ kr", cols.get("2", ""))
        sc = re.search(r"(\d+,\d) p, ([^,]+),", html.unescape(cols.get("3", "")))
        if nr and sc:
            found.setdefault(nr.group(1), []).append((num(sc.group(1)), sc.group(2).strip()))
    scores = {nr: {"score": round(sum(x for x, _ in v) / len(v), 2), "scale": 20, "url": url, "value": v[0][1]}
              for nr, v in found.items()}
    return scores, url


# --- Urval -------------------------------------------------------------------------------

def to_hundred(s: dict) -> float:
    return s["score"] if s["scale"] == 100 else 65 + s["score"] * 5 / 3


def rank(wines: list[dict]) -> list[dict]:
    for w in wines:
        vals = [to_hundred(s) for s in w["scores"].values()]
        if not vals:
            w["avg"] = w["value"] = None
            continue
        w["avg"] = round(sum(vals) / len(vals), 1)
        w["value"] = round(w["avg"] - 4 * math.log2(w["price"] / 200) - (1.5 if len(vals) == 1 else 0), 1)
    return sorted((w for w in wines if w["value"] is not None), key=lambda w: -w["value"])


def next_friday(today: dt.date) -> dt.date:
    return today + dt.timedelta(days=(4 - today.weekday()) % 7 or 7)


def main() -> None:
    d = dt.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else next_friday(dt.date.today())
    date = d.isoformat()
    wines = sb_release(date)
    if not wines:
        sys.exit(f"Inga viner i tillfälligt sortiment för {date} hos Systembolaget.")

    vb, vb_urls = safe("Vinbanken", lambda: vinbanken(date, d), ([], []))
    mk, mk_url = safe("Munskänkarna", lambda: munskankarna(d), ({}, None))
    fw, fw_url = safe("Finewines", lambda: finewines(date), ({}, None))
    bk, bk_url = safe("BKWine", lambda: bkwine(date, d), ({}, None))
    vb_unmatched = match_vinbanken(wines, vb)
    for w in wines:
        if w["sbNumber"] in mk:
            w["scores"]["Munskänkarna"] = mk[w["sbNumber"]]
        if w["short"] in fw:
            w["scores"]["Finewines"] = fw[w["short"]]
        if w["short"] in bk:
            w["scores"]["BKWine"] = bk[w["short"]]

    ranked = rank(wines)
    out = Path(__file__).resolve().parent.parent / "data" / "insamling" / f"{date}.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({
        "releaseDate": date,
        "collectedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "sources": {"vinbanken": vb_urls, "munskankarna": mk_url if mk else None, "finewines": fw_url, "bkwine": bk_url if bk else None},
        "unmatched": {"vinbanken": vb_unmatched},
        "coverage": {"wines": len(wines), "vinbanken": len(vb) - len(vb_unmatched), "munskankarna": len(mk), "finewines": len(fw), "bkwine": len(bk)},
        "wines": wines,
    }, ensure_ascii=False, indent=1))

    print(f"Släpp {date}: {len(wines)} viner. Betyg: Vinbanken {len(vb) - len(vb_unmatched)}, Munskänkarna {len(mk)}, Finewines {len(fw)}, BKWine {len(bk)}.")
    for e in vb_unmatched:
        print(f"Kunde inte matcha Vinbanken: {e['name']} #{e['nr']} {e['price']} kr ({e['score']})")
    print(f"Sparat: {out}\n")
    for i, w in enumerate(ranked[:15], 1):
        src = ", ".join(f"{k} {v.get('range') or str(v['score']).replace('.', ',')}" for k, v in w["scores"].items())
        print(f"{i:2}. {w['value']:5.1f}  {w['name']} {w['vintage'] or 'NV'} ({w['producer']}), "
              f"{int(w['price'])} kr, {w['type']}, snitt {w['avg']}  [{src}]")


if __name__ == "__main__":
    main()
