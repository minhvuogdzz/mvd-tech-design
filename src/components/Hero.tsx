import React, { useEffect, useState } from "react";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  CheckCircle2,
  Cpu,
  Layers,
  FileSpreadsheet,
  FolderSync,
  Sliders,
  Sparkles,
  Command,
  ArrowRight,
  ShieldCheck,
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
          title: "Tải cho Windows (64-bit)",
          meta: `Bản cài đặt .exe • ${release.downloads.windows.formattedSize}`,
          url: release.downloads.windows.url,
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
          ),
        };
      case "mac_intel":
        return {
          title: "Tải cho macOS Intel",
          meta: `Core i5/i7/i9 • .dmg • ${release.downloads.macIntel.formattedSize}`,
          url: release.downloads.macIntel.url,
          icon: <Apple className="w-4 h-4" />,
        };
      case "mac_arm":
      default:
        return {
          title: "Tải cho macOS Apple Silicon",
          meta: `M1 / M2 / M3 / M4 • .dmg • ${release.downloads.macArm64.formattedSize}`,
          url: release.downloads.macArm64.url,
          icon: <Apple className="w-4 h-4" />,
        };
    }
  };

  const activeDownload = getDownload();

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden bg-tech-grid">
      {/* Subtle Blue Glow Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative space-y-6 text-center">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full studio-panel border border-blue-500/30 text-[11px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-400 font-bold">MVD Tech & Design v{release.version}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 hidden sm:inline">Phần mềm chọn ảnh & tự động hóa Studio</span>
        </div>

        {/* Headline with restrained, professional font size */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Tối Ưu Hóa Quy Trình Lọc & Trả Ảnh{" "}
            <span className="gradient-text-blue">Nhanh Gấp 10 Lần</span> Cho Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Hệ sinh thái All-in-One: Lọc file RAW thần tốc, tự động hóa đồng bộ chọn ảnh từ Google Sheets & Drive, kiểm soát số lượng ảnh và kho tài nguyên sáng tạo.
          </p>
        </div>

        {/* OS Platform Switcher */}
        <div className="inline-flex p-1 rounded-xl studio-panel border border-slate-800 gap-1 text-[11px] font-medium text-slate-400">
          <button
            onClick={() => setDetectedOs("mac_arm")}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_arm"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={13} /> Mac (Apple Silicon)
          </button>
          <button
            onClick={() => setDetectedOs("mac_intel")}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "mac_intel"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <Apple size={13} /> Mac (Intel)
          </button>
          <button
            onClick={() => setDetectedOs("windows")}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              detectedOs === "windows"
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "hover:text-white"
            }`}
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
            </svg>
            Windows
          </button>
        </div>

        {/* Main CTA Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <a
            href={activeDownload.url}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {activeDownload.icon}
            <div className="text-left">
              <div className="font-bold leading-tight">{activeDownload.title}</div>
              <div className="text-[10px] text-blue-200 font-normal">{activeDownload.meta}</div>
            </div>
          </a>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-5 py-3 rounded-xl studio-panel hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Xem bảng giá bản quyền</span>
            <ArrowRight size={13} className="text-blue-400" />
          </a>
        </div>

        {/* Feature Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>Miễn phí 7 ngày dùng thử đầy đủ tính năng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>Hoạt động 100% Offline an toàn tuyệt đối</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-400" />
            <span>Tối ưu chip Apple Silicon & Windows đa luồng</span>
          </div>
        </div>

        {/* Authentic MVD Studio App UI Simulation */}
        <div className="pt-6 max-w-4xl mx-auto text-left">
          <div className="rounded-2xl studio-panel border border-slate-800 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Window TopBar */}
            <div className="h-9 px-3.5 bg-[#0A0E17] border-b border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-slate-500 ml-2 font-mono">MVD T&D • Studio Launcher</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                  Bản quyền: Pro Active
                </span>
                <span className="text-slate-500 text-[10px] font-mono">00:00:00 VN Reset</span>
              </div>
            </div>

            {/* App Suite Launcher Grid in Mockup */}
            <div className="p-5 sm:p-6 bg-[#0B0F19] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Hệ Sinh Thái Ứng Dụng MVD T&D
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Chọn ứng dụng để bắt đầu xử lý bộ ảnh của bạn:
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  <Command size={11} className="text-blue-400" />
                  <span>Phím tắt: 1..5 sao | 6..9 màu | Space</span>
                </div>
              </div>

              {/* 4 App Cards in Suite */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Photo Picker Pro */}
                <div className="p-3.5 rounded-xl bg-[#0F1626] border border-blue-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Layers size={15} />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      Chính
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Photo Picker Pro</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    Lọc ảnh RAW/JPG siêu tốc, zoom 100% kiểm tra nét da mặt trong 0.01s.
                  </p>
                  <div className="text-[10px] font-bold text-blue-400 flex items-center gap-1 pt-1">
                    Đang sẵn sàng &rarr;
                  </div>
                </div>

                {/* 2. Contact The Sheet */}
                <div className="p-3.5 rounded-xl bg-[#0F1626] border border-slate-800 hover:border-blue-500/30 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <FileSpreadsheet size={15} />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      Auto
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Contact The Sheet</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    Đọc link Google Sheets & Drive, tự động bóc tách số ảnh khách chọn để gom file.
                  </p>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 pt-1">
                    Đang sẵn sàng &rarr;
                  </div>
                </div>

                {/* 3. Photo Counter */}
                <div className="p-3.5 rounded-xl bg-[#0F1626] border border-slate-800 hover:border-blue-500/30 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <FolderSync size={15} />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                      Stats
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Photo Counter</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    Thống kê số lượng từng loại file (RAW, JPG, PSD) kiểm soát ảnh hợp đồng.
                  </p>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 pt-1">
                    Đang sẵn sàng &rarr;
                  </div>
                </div>

                {/* 4. Resources Hub */}
                <div className="p-3.5 rounded-xl bg-[#0F1626] border border-slate-800 hover:border-blue-500/30 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Sliders size={15} />
                    </div>
                    <span className="text-[9px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      VIP
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Resources & Presets</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    Kho tài nguyên màu độc quyền từ MVD: Presets, Overlays, Typography studio.
                  </p>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 pt-1">
                    Đang sẵn sàng &rarr;
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
