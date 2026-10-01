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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Mac Apple Silicon */}
          <div className="p-6 rounded-2xl bg-[#0A0D15] border-2 border-blue-500/60 shadow-xl shadow-blue-500/5 flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Apple size={20} />
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                  Khuyên Dùng Cho Mac M-Series
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  macOS Apple Silicon (M1 — M4)
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Tối ưu hóa nguyên bản cho vi xử lý Apple Silicon kiến trúc ARM64. Cho tốc độ đọc RAW và giải mã Metal cao nhất.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#06080E] border border-white/[0.04] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%]">{release.downloads.macArm64.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold">{release.downloads.macArm64.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>macOS 11.0 Big Sur trở lên</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macArm64.url}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Download size={14} /> Tải bản Apple Silicon (.dmg)
            </a>
          </div>

          {/* Mac Intel */}
          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-white/[0.15] flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/[0.08] flex items-center justify-center text-slate-300">
                  <Apple size={20} />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-900 border border-white/[0.06] px-2 py-0.5 rounded">
                  Mac Intel x86_64
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  macOS Chip Intel
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Dành cho các máy MacBook, iMac, Mac Pro sản xuất năm 2020 trở về trước sử dụng chip Intel Core i5/i7/i9.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#06080E] border border-white/[0.04] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%]">{release.downloads.macIntel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span>{release.downloads.macIntel.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>macOS 10.15 Catalina trở lên</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macIntel.url}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download size={14} /> Tải bản Intel (.dmg)
            </a>
          </div>

          {/* Windows */}
          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-blue-500/40 flex flex-col justify-between group space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
                  </svg>
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                  Windows 64-bit
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  Windows 10 / 11 (x64)
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Tương thích hoàn hảo Windows 10 và Windows 11 (64-bit). Cài đặt nhanh chóng chỉ với một file thực thi duy nhất.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#06080E] border border-white/[0.04] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tệp cài:</span>
                  <span className="truncate max-w-[65%]">{release.downloads.windows.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold">{release.downloads.windows.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yêu cầu:</span>
                  <span>Windows 10 / 11 (64-bit)</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.windows.url}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Download size={14} /> Tải cho Windows (.exe)
            </a>
          </div>
        </div>

        {/* Release Notes & Security / Gatekeeper Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Release Notes */}
          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <span className="font-bold text-white">
                Nhật Ký Cập Nhật {release.tagName}
              </span>
              <a
                href="https://github.com/minhvuogdzz/photo-picker-pro/releases"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                GitHub Releases <ExternalLink size={10} />
              </a>
            </div>
            <div className="text-[11px] text-slate-300 font-mono whitespace-pre-line leading-relaxed bg-[#06080E] p-3.5 rounded-xl border border-white/[0.04]">
              {release.releaseNotes}
            </div>
          </div>

          {/* Gatekeeper & SmartScreen Helper */}
          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-white border-b border-white/[0.06] pb-2">
              <HelpCircle size={14} className="text-blue-400" />
              <span>Hướng Dẫn Khắc Phục Cảnh Báo Lần Đầu Mở</span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-2.5 leading-relaxed">
              <div>
                <p className="text-slate-200 font-bold mb-1">Trên macOS (Apple Gatekeeper):</p>
                <p>
                  Kéo app vào Applications. Nếu hiện thông báo <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>, bạn chỉ cần mở Terminal và dán lệnh sau:
                </p>
                <div className="mt-1.5 p-2 rounded-lg bg-[#06080E] border border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-emerald-400">
                  <code>xattr -cr /Applications/MVD.T.D.app</code>
                  <button
                    onClick={handleCopyCmd}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                    title="Copy lệnh"
                  >
                    {copiedCmd ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-slate-200 font-bold mb-0.5">Trên Windows (SmartScreen):</p>
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
