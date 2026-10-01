import React from "react";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface DownloadMatrixProps {
  release: LatestRelease;
}

export function DownloadMatrix({ release }: DownloadMatrixProps) {
  return (
    <section id="downloads" className="py-14 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full studio-panel border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Tải Bộ Cài Đặt</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Tải MVD Tech & Design v{release.version}
          </h2>
          <p className="text-xs text-slate-400">
            Liên kết trực tiếp từ GitHub Releases tốc độ cao, hỗ trợ tự động cập nhật khi có bản mới.
          </p>
        </div>

        {/* 3 Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Mac Apple Silicon */}
          <div className="p-5 rounded-2xl studio-panel border border-slate-800 hover:border-blue-500/40 studio-panel-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Apple size={20} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  Khuyên dùng
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">
                  macOS Apple Silicon
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  MacBook, Mac mini, iMac chip <strong>M1, M2, M3, M4</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090D17] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">File:</span>
                  <span>{release.downloads.macArm64.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold">{release.downloads.macArm64.formattedSize}</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macArm64.url}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Download size={14} /> Tải bản Apple Silicon (.dmg)
            </a>
          </div>

          {/* Mac Intel */}
          <div className="p-5 rounded-2xl studio-panel border border-slate-800 hover:border-slate-700 studio-panel-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <Apple size={20} />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  Mac Intel
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">
                  macOS Chip Intel
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Máy Mac đời 2020 trở về trước dùng chip <strong>Intel Core i5/i7/i9</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090D17] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">File:</span>
                  <span>{release.downloads.macIntel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span>{release.downloads.macIntel.formattedSize}</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macIntel.url}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download size={14} /> Tải bản Intel (.dmg)
            </a>
          </div>

          {/* Windows */}
          <div className="p-5 rounded-2xl studio-panel border border-slate-800 hover:border-blue-500/40 studio-panel-hover flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  Windows 64-bit
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">
                  Windows 10 / 11
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Bộ cài đặt tự động tương thích hoàn hảo Windows 10 & 11 (64-bit).
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090D17] space-y-1 text-[11px] text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">File:</span>
                  <span>{release.downloads.windows.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="text-blue-400 font-bold">{release.downloads.windows.formattedSize}</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.windows.url}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Download size={14} /> Tải cho Windows (.exe)
            </a>
          </div>
        </div>

        {/* Changelog & Gatekeeper Helper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Changelog */}
          <div className="p-5 rounded-2xl studio-panel border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">
                Có gì mới ở bản {release.tagName}?
              </span>
              <a
                href="https://github.com/minhvuogdzz/photo-picker-pro/releases"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                GitHub Releases <ExternalLink size={10} />
              </a>
            </div>
            <div className="text-[11px] text-slate-300 font-mono whitespace-pre-line leading-relaxed bg-[#090D17] p-3 rounded-xl border border-slate-800/80">
              {release.releaseNotes}
            </div>
          </div>

          {/* Installation & Security Note */}
          <div className="p-5 rounded-2xl studio-panel border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-white border-b border-slate-800 pb-2">
              <HelpCircle size={14} className="text-blue-400" />
              <span>Lưu ý khi mở ứng dụng lần đầu</span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-slate-200">Trên macOS:</strong> Kéo icon vào thư mục <em>Applications</em>. Nếu Mac hiện thông báo <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>, bạn chỉ cần nhấp <strong>chuột phải</strong> vào icon app &rarr; chọn <strong>Mở (Open)</strong> &rarr; nhấn <strong>Mở</strong>.
              </p>
              <p>
                <strong className="text-slate-200">Trên Windows:</strong> Nếu Windows SmartScreen hiện cảnh báo, hãy nhấn vào <strong>&ldquo;More info&rdquo;</strong> &rarr; chọn <strong>&ldquo;Run anyway&rdquo;</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
