import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vinsläppet",
  description: "De bästa köpen i Systembolagets tillfälliga släpp, utvalda utifrån betyg och pris.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="shell">
          <nav className="nav">
            <Link href="/" className="brand">
              Vinsläppet
            </Link>
            <Link href="/arkiv">Tidigare släpp</Link>
          </nav>
          <main>{children}</main>
          <footer className="footer" id="integritet">
            <p>
              Vinsläppet riktar sig till dig som fyllt 25 år. Njut av alkohol med måtta.
            </p>
            <p>Vi är inte knutna till Systembolaget och tar inte betalt av producenter.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
