import { ReleaseView } from "@/components/ReleaseView";
import { getLatestRelease } from "@/data/releases";

export default function Home() {
  return <ReleaseView release={getLatestRelease()} />;
}
