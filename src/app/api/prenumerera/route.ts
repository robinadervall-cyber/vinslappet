import { addSubscriber, ButtondownError } from "@/lib/buttondown";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Anmälan från formuläret på sajten. Buttondown skickar bekräftelsemejlet. */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }
  if (body?.consent !== true) {
    return Response.json({ error: "Du behöver bekräfta att du fyllt 25 år." }, { status: 400 });
  }

  try {
    await addSubscriber(email, {
      ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim(),
      referrer: request.headers.get("referer") ?? undefined,
    });
    return Response.json({ ok: true });
  } catch (e) {
    if (e instanceof ButtondownError && e.status === 400) {
      return Response.json({ error: "Adressen gick inte att registrera. Kontrollera stavningen." }, { status: 400 });
    }
    console.error("Prenumeration misslyckades", e);
    const reason = e instanceof ButtondownError ? `${e.status}${e.code ? ` ${e.code}` : ""}` : "nätverk";
    return Response.json({ error: `Något gick fel, försök igen om en stund. (${reason})` }, { status: 502 });
  }
}
