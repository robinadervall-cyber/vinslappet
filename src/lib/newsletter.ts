import { averageScore, formatBottles, formatPrice, formatReleaseDate, formatScore, systembolagetUrl } from "./scoring";
import type { Release, Wine } from "./types";

export const SITE_URL = "https://vinslappet.vercel.app";
export const SEND_HOUR = 16;
const TZ = "Europe/Stockholm";

/** Dagens datum i Stockholm, ISO-format. */
export function stockholmDate(now: Date): string {
  return now.toLocaleDateString("sv-SE", { timeZone: TZ });
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Dagen före släppet kl 16 svensk tid, som ISO-tid med rätt UTC-förskjutning (sommar/vinter). */
export function sendTime(release: Release): Date {
  const day = addDays(release.releaseDate, -1);
  const noonUtc = new Date(`${day}T12:00:00Z`);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "longOffset" })
    .formatToParts(noonUtc)
    .find((p) => p.type === "timeZoneName")!
    .value.replace("GMT", "");
  return new Date(`${day}T${String(SEND_HOUR).padStart(2, "0")}:00:00${offset || "+00:00"}`);
}

export function newsletterSubject(release: Release): string {
  const date = new Date(`${release.releaseDate}T12:00:00`).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
  });
  return `Vinsläppet ${date}: ${release.title}`;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function extras(w: Wine): string {
  const parts = [
    w.food && `Matförslag: ${esc(w.food)}`,
    w.drinkWindow && `Drick ${w.drinkWindow.from}–${w.drinkWindow.to}`,
    w.bottles && formatBottles(w.bottles),
  ].filter(Boolean);
  return parts.length
    ? `<p style="margin:0 0 8px;font-size:13px;color:#2b2420">${parts.join(" · ")}</p>`
    : "";
}

/** Utskickets innehåll som HTML med inline-stilar, så att det ser likadant ut i alla mejlprogram. */
export function newsletterHtml(release: Release): string {
  const releaseUrl = `${SITE_URL}/slapp/${release.slug}`;
  const picks = release.picks
    .map((w, i) => {
      const avg = averageScore(w);
      const scores = w.scores.map((s) => `${esc(s.source)} ${formatScore(s)}`).join(" · ");
      const img = w.imageUrl
        ? `<td width="72" valign="top" style="padding-right:16px"><img src="${esc(w.imageUrl)}" alt="" width="72" style="display:block;width:72px;height:auto"></td>`
        : "";
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-top:1px solid #e6dfd6;padding-top:20px"><tr>${img}<td valign="top">
<p style="margin:0 0 4px;font-size:13px;color:#7a6f66">${i + 1}. ${esc(w.country)}, ${esc(w.region)} · ${esc(w.style)}</p>
<p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#2b2420"><a href="${systembolagetUrl(w.sbNumber)}" style="color:#7b1e32;text-decoration:none">${esc(w.name)} ${w.vintage ?? "NV"}</a></p>
<p style="margin:0 0 8px;font-size:14px;color:#2b2420">${esc(w.producer)} · <strong>${formatPrice(w.priceSek)}</strong> · nr ${esc(w.sbNumber)}${avg ? ` · snittbetyg ${avg.toLocaleString("sv-SE")}` : ""}</p>
<p style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#2b2420">${esc(w.verdict)}</p>
${extras(w)}
<p style="margin:0;font-size:12px;color:#7a6f66">${scores}</p>
</td></tr></table>`;
    })
    .join("\n");

  const bubblers = release.bubblers?.length
    ? `<h2 style="margin:8px 0 12px;font-size:18px;color:#2b2420">Bubblare</h2>
<ol start="${release.picks.length + 1}" style="margin:0 0 24px;padding-left:22px;font-size:14px;line-height:1.5;color:#2b2420">
${release.bubblers
  .map(
    (b) =>
      `<li style="margin-bottom:8px"><a href="${systembolagetUrl(b.sbNumber)}" style="color:#7b1e32;font-weight:600">${esc(b.name)} ${b.vintage ?? "NV"}</a>, ${formatPrice(b.priceSek)}. ${esc(b.note)}</li>`,
  )
  .join("\n")}
</ol>`
    : "";

  return `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;color:#2b2420">
<p style="margin:0 0 4px;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:#7a6f66">Släpp ${esc(formatReleaseDate(release.releaseDate))}</p>
<h1 style="margin:0 0 12px;font-size:26px;line-height:1.2">${esc(release.title)}</h1>
<p style="margin:0 0 24px;font-size:16px;line-height:1.55">${esc(release.intro)}</p>
${picks}
${bubblers}
<p style="margin:0 0 24px"><a href="${releaseUrl}" style="display:inline-block;padding:12px 20px;background:#7b1e32;color:#fff;border-radius:8px;text-decoration:none;font-family:Arial,sans-serif;font-weight:600">Se släppet på sajten</a></p>
<p style="margin:0;font-size:12px;color:#7a6f66">Vinsläppet riktar sig till dig som fyllt 25 år. Njut av alkohol med måtta. Vi är inte knutna till Systembolaget och tar inte betalt av producenter.</p>
</div>`;
}
