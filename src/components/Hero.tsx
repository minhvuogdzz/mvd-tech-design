"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  FolderSync,
  Layers,
  FileSpreadsheet,
} from "lucide-react";

interface HeroProps {
  release: LatestRelease;
}

export function Hero({ release }: HeroProps) {
  const [detectedOs, setDetectedOs] = useState<"mac_arm" | "mac_intel" | "windows">("mac_arm");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes("win")) {
        setDetectedOs("windows");
      } else if (userAgent.includes("mac")) {
        // Modern Mac detection
        setDetectedOs("mac_arm");
      }
    }
  }, []);

  const getActiveDownload = () => {
    switch (detectedOs) {
      case "windows":
        return {
          label: "Tải về cho Windows 64-bit (.exe)",
          sub: `Phiên bản v${release.version} • ${release.downloads.windows.formattedSize}`,
          url: release.downloads.windows.url,
          icon: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
          ),
        };
      case "mac_intel":
        return {
          label: "Tải về cho macOS Intel (.dmg)",
          sub: `Phiên bản v${release.version} • ${release.downloads.macIntel.formattedSize}`,
          url: release.downloads.macIntel.url,
          icon: <Apple className="w-5 h-5" />,
        };
      case "mac_arm":
      default:
        return {
          label: "Tải về cho macOS Apple Silicon (.dmg)",
          sub: `M1 / M2 / M3 / M4 • v${release.version} • ${release.downloads.macArm64.formattedSize}`,
          url: release.downloads.macArm64.url,
          icon: <Apple className="w-5 h-5" />,
        };
    }
  };

  const currentDownload = getActiveDownload();

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/15 via-orange-600/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Release Live Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs font-semibold text-zinc-300 shadow-sm animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
            Chính thức v{release.version}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 hidden sm:inline">
            Cập nhật tự động & Siêu tốc độ
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Hệ Sinh Thái Phần Mềm{" "}
            <span className="gradient-text-amber">Studio & Nhiếp Ảnh Gia</span>{" "}
            Chuyên Nghiệp
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Bộ công cụ All-in-One đột phá: Lọc hàng nghìn ảnh RAW thần tốc, tự động hóa đồng bộ chọn ảnh Google Sheets & Drive, thống kê số lượng và kho tài nguyên sáng tạo.
          </p>
        </div>

        {/* OS Selector Tabs */}
        <div className="inline-flex p-1 rounded-2xl glass-panel border border-white/10 gap-1 text-xs font-medium text-zinc-400">
          <button
            onClick={() => setDetectedOs("mac_arm")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_arm"
                ? "bg-amber-500 text-black font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={14} /> Mac (Chip M)
          </button>
          <button
            onClick={() => setDetectedOs("mac_intel")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_intel"
                ? "bg-amber-500 text-black font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={14} /> Mac (Chip Intel)
          </button>
          <button
            onClick={() => setDetectedOs("windows")}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "windows"
                ? "bg-amber-500 text-black font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
            Windows
          </button>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={currentDownload.url}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-black font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-black/10 group-hover:bg-black/20 transition-colors">
              {currentDownload.icon}
            </div>
            <div className="text-left">
              <div className="font-extrabold leading-tight">
                {currentDownload.label}
              </div>
              <div className="text-[11px] font-medium opacity-80">
                {currentDownload.sub}
              </div>
            </div>
          </a>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Bảng Giá Bản Quyền</span>
            <ArrowRight size={16} className="text-amber-400" />
          </a>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Miễn phí 7 ngày dùng thử</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Hoạt động 100% Offline an toàn</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Không giới hạn số lượng ảnh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-emerald-400" />
            <span>Hỗ trợ macOS & Windows</span>
          </div>
        </div>

        {/* Visual App Mockup Preview */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-2 sm:p-3 glass-panel border border-white/15 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden group">
            {/* macOS Window Header Bar */}
            <div className="h-8 px-4 rounded-t-2xl bg-[#141724]/90 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] font-mono font-medium text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                MVD Tech & Design Studio • v{release.version}
              </div>
              <div className="w-12 text-right text-[10px] text-zinc-500">
                Studio Suite
              </div>
            </div>

            {/* Inner Dashboard Simulation */}
            <div className="p-6 md:p-8 rounded-b-2xl bg-[#0d0f17] text-left space-y-6">
              {/* Top Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-xl font-black text-white">
                    Trung Tâm Ứng Dụng Studio
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Chọn ứng dụng bạn muốn làm việc để bắt đầu tối ưu quy trình chụp và trả ảnh.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles size={14} /> Gói Bản Quyền: Vĩnh Viễn
                  </div>
                </div>
              </div>

              {/* 4 App Cards Grid in Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* App 1: Photo Picker Pro */}
                <div className="p-4 rounded-2xl bg-[#161926] border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-md group/card">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover/card:scale-105 transition-transform">
                    <Layers size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    Photo Picker Pro
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    Lọc ảnh RAW/JPG tốc độ cao, gắn cờ sao, nhãn màu cho studio.
                  </p>
                  <div className="mt-3 flex items-center text-[10px] font-bold text-amber-400 gap-1">
                    Khởi chạy ngay <ArrowRight size={10} />
                  </div>
                </div>

                {/* App 2: Contact The Sheet */}
                <div className="p-4 rounded-2xl bg-[#161926] border border-purple-500/30 hover:border-purple-500/60 transition-all shadow-md group/card">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover/card:scale-105 transition-transform">
                    <FileSpreadsheet size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    Contact The Sheet
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    Đồng bộ Google Sheets & Drive tự động bóc tách trả file khách.
                  </p>
                  <div className="mt-3 flex items-center text-[10px] font-bold text-purple-400 gap-1">
                    Khởi chạy ngay <ArrowRight size={10} />
                  </div>
                </div>

                {/* App 3: Photo Counter */}
                <div className="p-4 rounded-2xl bg-[#161926] border border-blue-500/30 hover:border-blue-500/60 transition-all shadow-md group/card">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 group-hover/card:scale-105 transition-transform">
                    <FolderSync size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    Photo Counter
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    Thống kê số lượng ảnh, phân loại định dạng file kiểm soát hợp đồng.
                  </p>
                  <div className="mt-3 flex items-center text-[10px] font-bold text-blue-400 gap-1">
                    Khởi chạy ngay <ArrowRight size={10} />
                  </div>
                </div>

                {/* App 4: Resources Hub */}
                <div className="p-4 rounded-2xl bg-[#161926] border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-md group/card">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover/card:scale-105 transition-transform">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    Resources & Tools
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    Kho tài nguyên Presets màu, typography và overlay độc quyền.
                  </p>
                  <div className="mt-3 flex items-center text-[10px] font-bold text-emerald-400 gap-1">
                    Khởi chạy ngay <ArrowRight size={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
