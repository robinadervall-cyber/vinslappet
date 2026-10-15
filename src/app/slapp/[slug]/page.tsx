import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReleaseView } from "@/components/ReleaseView";
import { getRelease, releases } from "@/data/releases";

export function generateStaticParams() {
  return releases.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/slapp/[slug]">): Promise<Metadata> {
  const release = getRelease((await params).slug);
  return { title: release ? `${release.title} · Vinsläppet` : "Vinsläppet" };
}

export default async function ReleasePage({ params }: PageProps<"/slapp/[slug]">) {
  const release = getRelease((await params).slug);
  if (!release) notFound();
  return <ReleaseView release={release} />;
}
