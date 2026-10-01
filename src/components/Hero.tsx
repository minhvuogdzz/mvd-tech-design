import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  release: LatestRelease;
}

export function Hero({ release }: HeroProps) {
  const [detectedOs, setDetectedOs] = useState<"mac_arm" | "mac_intel" | "windows">("mac_arm");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes("win")) {
        setDetectedOs("windows");
      } else if (ua.includes("mac")) {
        setDetectedOs("mac_arm");
      }
    }
  }, []);

  const getDownload = () => {
    switch (detectedOs) {
      case "windows":
        return {
          title: "Tải cho Windows 64-bit",
          spec: `v${release.version} · ${release.downloads.windows.formattedSize} · Win 10/11`,
          url: release.downloads.windows.url,
          icon: (
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
          ),
        };
      case "mac_intel":
        return {
          title: "Tải cho macOS (Intel)",
          spec: `v${release.version} · ${release.downloads.macIntel.formattedSize} · Core i5/i7/i9`,
          url: release.downloads.macIntel.url,
          icon: <Apple className="w-4 h-4 shrink-0" />,
        };
      case "mac_arm":
      default:
        return {
          title: "Tải cho macOS (Apple Silicon)",
          spec: `v${release.version} · ${release.downloads.macArm64.formattedSize} · M1—M4`,
          url: release.downloads.macArm64.url,
          icon: <Apple className="w-4 h-4 shrink-0" />,
        };
    }
  };

  const currentDownload = getDownload();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 text-center">
        {/* Release Pill with gentle glow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1422] border border-white/[0.08] text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
          <span className="text-blue-400 font-bold">MVD Studio v{release.version}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Tối ưu chip Apple M & Tự động đồng bộ 0h00 VN</span>
        </div>

        {/* Headline with Plus Jakarta Sans - Warm, Confident, Friendly */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bộ phần mềm lọc ảnh & tự động hóa studio{" "}
            <span className="text-blue-400">nhanh nhất</span> trên Mac & Windows.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Đọc RAW 33MP—61MP tức thì trong 0.02s. Tự động bóc tách mã ảnh khách chọn từ Google Sheets & Google Drive chỉ với một cú click. Tiết kiệm 2 — 3 giờ trả file mỗi ngày cho studio.
          </p>
        </div>

        {/* Architecture Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-[#0E1422] border border-white/[0.08] gap-1 text-xs font-medium text-slate-400">
          <button
            onClick={() => setDetectedOs("mac_arm")}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_arm"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={14} /> Mac Apple Silicon
          </button>
          <button
            onClick={() => setDetectedOs("mac_intel")}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_intel"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={14} /> Mac Intel
          </button>
          <button
            onClick={() => setDetectedOs("windows")}
            className={`px-3 py-1.5 rounded-lg transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "windows"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
            Windows 64-bit
          </button>
        </div>

        {/* Download Action Row with whitespace-nowrap and clean transitions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <a
            href={currentDownload.url}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
          >
            {currentDownload.icon}
            <span>{currentDownload.title}</span>
            <span className="text-[10px] font-mono text-blue-200 bg-blue-700/60 px-2 py-0.5 rounded">
              v{release.version}
            </span>
          </a>

          <Link
            to="/download"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0E1422] hover:bg-[#151D30] text-slate-300 hover:text-white font-medium text-xs border border-white/[0.08] transition-colors duration-150 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>Mọi Nền Tảng & Yêu Cầu</span>
            <ArrowRight size={13} className="text-blue-400" />
          </Link>
        </div>

        {/* Technical Highlights Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>Rust native engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>120MB RAM footprint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>100% Offline an toàn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>7 ngày dùng thử đầy đủ</span>
          </div>
        </div>

        {/* Studio Keyboard Shortcuts Bar */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-[#0E1422] border border-white/[0.06] text-[11px] font-mono text-slate-400">
            <span className="text-slate-500 font-sans text-xs">Phím tắt nhanh:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-white/5 font-bold">[1..5] Đánh giá sao</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-white/5 font-bold">[6..9] Gán nhãn màu</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-white/5 font-bold">[Space] Lướt ảnh</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-white/5 font-bold">[Z] Soi nét 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
