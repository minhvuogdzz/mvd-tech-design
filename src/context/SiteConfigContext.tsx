import React, { createContext, useContext, useEffect, useState } from "react";

export interface SiteConfig {
  phone: string;
  phoneFormatted: string;
  benchmarkImageUrl: string;
  benchmarkNotes: string;
  benchmarkTitle: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  phone: "0869528304",
  phoneFormatted: "0869 528 304",
  benchmarkImageUrl: "",
  benchmarkTitle: "Hiệu Năng Thực Tế: MVD Photo Picker Pro vs Adobe Lightroom Classic",
  benchmarkNotes: "Thử nghiệm thực địa với 2,000 file RAW Sony 33MP (ILCE-7M4) trên máy MacBook Pro Apple Silicon (M-Series) và máy tính Windows 11 PC.",
};

const STORAGE_KEY = "mvd_site_config_v1";

interface SiteConfigContextType {
  config: SiteConfig;
  zaloUrl: string;
  telUrl: string;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  updateConfig: (patch: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULT_CONFIG,
  zaloUrl: `https://zalo.me/${DEFAULT_CONFIG.phone}`,
  telUrl: `tel:${DEFAULT_CONFIG.phone}`,
  isAdminModalOpen: false,
  openAdminModal: () => {},
  closeAdminModal: () => {},
  updateConfig: () => {},
  resetConfig: () => {},
});

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load site config:", e);
    }
    return DEFAULT_CONFIG;
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const updateConfig = (patch: Partial<SiteConfig>) => {
    setConfig((prev) => {
      let formatted = prev.phoneFormatted;
      if (patch.phone) {
        // Auto format phone if changed
        const clean = patch.phone.replace(/\D/g, "");
        if (clean.length === 10) {
          formatted = `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
        } else {
          formatted = clean;
        }
      }

      const next = {
        ...prev,
        ...patch,
        phoneFormatted: patch.phoneFormatted || formatted,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save site config:", e);
      }
      return next;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to reset site config:", e);
    }
  };

  const cleanPhone = config.phone.replace(/\D/g, "");
  const zaloUrl = `https://zalo.me/${cleanPhone}`;
  const telUrl = `tel:${cleanPhone}`;

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        zaloUrl,
        telUrl,
        isAdminModalOpen,
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),
        updateConfig,
        resetConfig,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
