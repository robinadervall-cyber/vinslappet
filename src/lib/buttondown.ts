/**
 * Anrop mot Buttondowns API (https://docs.buttondown.com). Nyckeln ligger i BUTTONDOWN_API_KEY
 * i Vercel och används bara på servern.
 */

const API = "https://api.buttondown.com/v1";

export class ButtondownError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
  }
}

function apiKey(): string {
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) throw new ButtondownError("BUTTONDOWN_API_KEY saknas", 503, "missing_key");
  return key;
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${apiKey()}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Buttondown svarar ibland med HTML vid fel, då används bara statuskoden.
  }
  if (!res.ok) {
    throw new ButtondownError(
      data?.detail ?? `Buttondown svarade ${res.status}`,
      res.status,
      data?.code,
    );
  }
  return data as T;
}

/**
 * Lägger till en prenumerant. Buttondown skickar själv ett bekräftelsemejl (dubbel opt-in), och
 * adressen får inga utskick förrän den är bekräftad. En adress som redan finns räknas som lyckad.
 */
export async function addSubscriber(email: string, meta: { ip?: string; referrer?: string }) {
  await call("/subscribers", {
    method: "POST",
    headers: { "X-Buttondown-Collision-Behavior": "add" },
    body: JSON.stringify({
      email_address: email,
      ip_address: meta.ip,
      referrer_url: meta.referrer,
    }),
  });
}

interface EmailSummary {
  id: string;
  subject: string;
  status: string;
  publish_date: string | null;
}

export async function findEmailBySubject(subject: string): Promise<EmailSummary | undefined> {
  const page = await call<{ results: EmailSummary[] }>("/emails?ordering=-creation_date");
  return page.results.find((e) => e.subject === subject);
}

/** Skapar ett utskick som Buttondown skickar till alla bekräftade prenumeranter vid publishDate. */
export async function scheduleEmail(subject: string, body: string, publishDate: string) {
  return call<EmailSummary>("/emails", {
    method: "POST",
    body: JSON.stringify({ subject, body, status: "scheduled", publish_date: publishDate }),
  });
}
