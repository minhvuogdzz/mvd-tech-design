import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import { fetchLatestRelease, FALLBACK_RELEASE } from "@/services/githubApi";
import { ThemeProvider } from "@/context/ThemeContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DownloadModal } from "@/components/DownloadModal";

// Dedicated Pages
import { HomePage } from "@/pages/HomePage";
import { PhotoPickerPage } from "@/pages/PhotoPickerPage";
import { ContactSheetPage } from "@/pages/ContactSheetPage";
import { PhotoCounterPage } from "@/pages/PhotoCounterPage";
import { BenchmarkPage } from "@/pages/BenchmarkPage";
import { DownloadPage } from "@/pages/DownloadPage";
import { PricingPage } from "@/pages/PricingPage";
import { SupportPage } from "@/pages/SupportPage";
import { AboutPage } from "@/pages/AboutPage";

function AppContent({ release }: { release: LatestRelease }) {
  const { isVi } = useLanguage();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        version={release.version}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                release={release}
                onOpenDownload={() => setIsDownloadOpen(true)}
              />
            }
          />
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />

      {/* Direct GitHub Release Download Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        release={release}
        isVi={isVi}
      />
    </div>
  );
}

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
    <ThemeProvider>
      <SiteConfigProvider>
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppContent release={release} />
          </BrowserRouter>
        </LanguageProvider>
      </SiteConfigProvider>
    </ThemeProvider>
  );
}

export default App;
