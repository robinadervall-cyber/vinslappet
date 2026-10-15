import { getLatestRelease, getRelease } from "@/data/releases";
import { newsletterHtml, newsletterSubject, sendTime } from "@/lib/newsletter";

/** Visar hur nyhetsbrevet för ett släpp ser ut. ?slapp=2026-10-16, annars det senaste. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slapp");
  const release = slug ? getRelease(slug) : getLatestRelease();
  if (!release) return new Response("Släppet finns inte.", { status: 404 });

  const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${newsletterSubject(release)}</title></head>
<body style="margin:0;padding:24px 16px;background:#faf7f2">
<p style="font-family:Arial,sans-serif;font-size:12px;color:#7a6f66;max-width:600px;margin:0 auto 16px">Förhandsvisning. Ämne: <strong>${newsletterSubject(release)}</strong>. Skickas ${sendTime(release).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })}.</p>
${newsletterHtml(release)}
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
