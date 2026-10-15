import { findEmailBySubject, scheduleEmail } from "@/lib/buttondown";
import { getLatestRelease } from "@/data/releases";
import { newsletterHtml, newsletterSubject, sendTime, stockholmDate } from "@/lib/newsletter";

/**
 * Körs av Vercel Cron på torsdagar (se vercel.json). Om det senast publicerade släppet är
 * morgondagens schemaläggs nyhetsbrevet i Buttondown till kl 16 svensk tid. Att släppet ligger på
 * main betyder att Robin har godkänt det. Körs den flera gånger skapas bara ett utskick.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Obehörig" }, { status: 401 });
  }

  const release = getLatestRelease();
  const now = new Date();
  const at = sendTime(release);
  if (stockholmDate(now) !== stockholmDate(at)) {
    return Response.json({ status: "skipped", reason: `Senaste släppet (${release.releaseDate}) är inte morgondagens.` });
  }
  if (now >= at) {
    return Response.json({ status: "skipped", reason: "Klockan har redan passerat 16." });
  }

  const subject = newsletterSubject(release);
  const existing = await findEmailBySubject(subject);
  if (existing) {
    return Response.json({ status: "exists", id: existing.id, emailStatus: existing.status, publishDate: existing.publish_date });
  }
  const email = await scheduleEmail(subject, newsletterHtml(release), at.toISOString());
  return Response.json({ status: "scheduled", id: email.id, publishDate: email.publish_date });
}
