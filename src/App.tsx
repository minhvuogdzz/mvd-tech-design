import React, { useEffect, useState } from "react";
import { LatestRelease } from "@/types/release";
import { fetchLatestRelease, FALLBACK_RELEASE } from "@/services/githubApi";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StudioWorkflow } from "@/components/StudioWorkflow";
import { AppGrid } from "@/components/AppGrid";
import { Pricing } from "@/components/Pricing";
import { DownloadMatrix } from "@/components/DownloadMatrix";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export function App() {
  const [release, setRelease] = useState<LatestRelease>(FALLBACK_RELEASE);

  useEffect(() => {
    fetchLatestRelease().then((data) => {
      if (data) {
        setRelease(data);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans">
      <Navbar version={release.version} />
      <main className="flex-1">
        <Hero release={release} />
        <StudioWorkflow />
        <AppGrid />
        <Pricing />
        <DownloadMatrix release={release} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
