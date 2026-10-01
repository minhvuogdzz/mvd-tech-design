import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import { fetchLatestRelease, FALLBACK_RELEASE } from "@/services/githubApi";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Dedicated Pages
import { HomePage } from "@/pages/HomePage";
import { PhotoPickerPage } from "@/pages/PhotoPickerPage";
import { ContactSheetPage } from "@/pages/ContactSheetPage";
import { PhotoCounterPage } from "@/pages/PhotoCounterPage";
import { BenchmarkPage } from "@/pages/BenchmarkPage";
import { DownloadPage } from "@/pages/DownloadPage";
import { PricingPage } from "@/pages/PricingPage";
import { SupportPage } from "@/pages/SupportPage";

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
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
        <Navbar version={release.version} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage release={release} />} />
            <Route
              path="/apps/photo-picker"
              element={<PhotoPickerPage release={release} />}
            />
            <Route
              path="/apps/contact-the-sheet"
              element={<ContactSheetPage release={release} />}
            />
            <Route
              path="/apps/photo-counter"
              element={<PhotoCounterPage release={release} />}
            />
            <Route path="/benchmark" element={<BenchmarkPage />} />
            <Route
              path="/download"
              element={<DownloadPage release={release} />}
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
