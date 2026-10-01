import { getLatestRelease } from "@/lib/github";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AppShowcase } from "@/components/AppShowcase";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { DownloadHub } from "@/components/DownloadHub";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const revalidate = 60; // Auto revalidate from GitHub API every 60 seconds

export default async function HomePage() {
  const release = await getLatestRelease();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar version={release.version} />
      <main className="flex-1">
        <Hero release={release} />
        <AppShowcase />
        <Features />
        <Pricing />
        <DownloadHub release={release} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
