import React, { useEffect, useState } from "react";
import { LatestRelease } from "@/types/release";
import { fetchLatestRelease, FALLBACK_RELEASE } from "@/services/githubApi";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StudioWorkbench } from "@/components/StudioWorkbench";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { EngineeringSpecs } from "@/components/EngineeringSpecs";
import { AppGrid } from "@/components/AppGrid";
import { StudioWorkflow } from "@/components/StudioWorkflow";
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
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar version={release.version} />
      <main className="flex-1">
        <Hero release={release} />
        <StudioWorkbench />
        <BenchmarkComparison />
        <EngineeringSpecs />
        <AppGrid />
        <StudioWorkflow />
        <Pricing />
        <DownloadMatrix release={release} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
