import React, { useState } from "react";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Copy,
  CheckCircle2,
} from "lucide-react";

interface DownloadMatrixProps {
  release: LatestRelease;
}

export function DownloadMatrix({ release }: DownloadMatrixProps) {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("xattr -cr /Applications/MVD.T.D.app");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="downloads" className="py-14 md:py-20 relative bg-[#07090E] border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Download size={11} />
            <span>Kho Tải Bản Cài Đặt</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Tải MVD Tech & Design v{release.version}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Hệ thống phân phối trực tiếp từ GitHub Releases tốc độ cao, hỗ trợ tự động nhận diện cập nhật.
          </p>
        </div>

        {/* 3 Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Mac Apple Silicon */}
          <div className="p-7 rounded-3xl bg-[#0E1526] border-2 border-blue-500 flex flex-col justify-between group space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Apple size={22} />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Khuyên Dùng Cho M-Series
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  macOS Apple Silicon (M1 — M4)
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Tối ưu hóa nguyên bản cho vi xử lý Apple Silicon kiến trúc ARM64. Cho tốc độ đọc RAW và giải mã Metal cao nhất.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%] text-slate-300">{release.downloads.macArm64.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold tabular-nums">{release.downloads.macArm64.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>macOS 11.0 Big Sur trở lên</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macArm64.url}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-colors duration-150"
            >
              <Download size={15} /> Tải bản Apple Silicon (.dmg)
            </a>
          </div>

          {/* Mac Intel */}
          <div className="p-7 rounded-3xl bg-[#0A0E18] border border-white/[0.08] hover:border-white/[0.16] flex flex-col justify-between group space-y-5 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300">
                  <Apple size={22} />
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full whitespace-nowrap">
                  Mac Intel x86_64
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  macOS Chip Intel
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Dành cho các máy MacBook, iMac, Mac Pro sản xuất năm 2020 trở về trước sử dụng chip Intel Core i5/i7/i9.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%] text-slate-300">{release.downloads.macIntel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="tabular-nums">{release.downloads.macIntel.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>macOS 10.15 Catalina trở lên</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macIntel.url}
              className="w-full py-3 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-colors duration-150"
            >
              <Download size={15} /> Tải bản Intel (.dmg)
            </a>
          </div>

          {/* Windows */}
          <div className="p-7 rounded-3xl bg-[#0A0E18] border border-white/[0.08] hover:border-blue-500/40 flex flex-col justify-between group space-y-5 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Windows 64-bit
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Windows 10 / 11 (x64)
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Tương thích hoàn hảo Windows 10 và Windows 11 (64-bit). Cài đặt nhanh chóng chỉ với một file thực thi duy nhất.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%] text-slate-300">{release.downloads.windows.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold tabular-nums">{release.downloads.windows.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>Windows 10 / 11 (64-bit)</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.windows.url}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-colors duration-150"
            >
              <Download size={15} /> Tải cho Windows (.exe)
            </a>
          </div>
        </div>

        {/* Release Notes & Security / Gatekeeper Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Release Notes */}
          <div className="p-7 rounded-3xl bg-[#0A0E18] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="font-bold text-white text-sm">
                Nhật Ký Cập Nhật {release.tagName}
              </span>
              <a
                href="https://github.com/minhvuogdzz/photo-picker-pro/releases"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
              >
                GitHub Releases <ExternalLink size={12} />
              </a>
            </div>
            <div className="text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed bg-[#070A12] p-4 rounded-2xl border border-white/[0.04]">
              {release.releaseNotes}
            </div>
          </div>

          {/* Gatekeeper & SmartScreen Helper */}
          <div className="p-7 rounded-3xl bg-[#0A0E18] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 font-bold text-white text-sm border-b border-white/[0.06] pb-3">
              <HelpCircle size={16} className="text-blue-400" />
              <span>Hướng Dẫn Khắc Phục Cảnh Báo Lần Đầu Mở</span>
            </div>
            <div className="text-xs text-slate-400 space-y-3 leading-relaxed">
              <div>
                <p className="text-slate-200 font-bold mb-1">Trên macOS (Apple Gatekeeper):</p>
                <p>
                  Kéo app vào Applications. Nếu hiện thông báo <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>, bạn chỉ cần mở Terminal và dán lệnh sau:
                </p>
                <div className="mt-2 p-2.5 rounded-xl bg-[#070A12] border border-white/[0.06] flex items-center justify-between font-mono text-xs text-emerald-400">
                  <code>xattr -cr /Applications/MVD.T.D.app</code>
                  <button
                    onClick={handleCopyCmd}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
                    title="Copy lệnh"
                  >
                    {copiedCmd ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-slate-200 font-bold mb-1">Trên Windows (SmartScreen):</p>
                <p>
                  Khi màn hình <em>&ldquo;Windows protected your PC&rdquo;</em> xuất hiện &rarr; Nhấn vào dòng chữ <strong>&ldquo;More info&rdquo;</strong> &rarr; Chọn <strong>&ldquo;Run anyway&rdquo;</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
