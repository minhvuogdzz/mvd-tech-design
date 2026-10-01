"use client";

import React, { useState } from "react";
import { LatestRelease } from "@/types/release";
import {
  Download,
  Apple,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCode,
  HardDrive,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface DownloadHubProps {
  release: LatestRelease;
}

export function DownloadHub({ release }: DownloadHubProps) {
  const [activeTab, setActiveTab] = useState<"mac" | "windows">("mac");

  return (
    <section id="downloads" className="py-20 md:py-28 relative bg-[#090a0f]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Download size={12} />
            Trung tâm tải về
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Tải Bản Cài Đặt Mới Nhất{" "}
            <span className="gradient-text-amber">v{release.version}</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Hệ thống tự động liên kết trực tiếp với máy chủ GitHub Releases. Tốc độ tải tối đa, đảm bảo an toàn tuyệt đối và nguyên vẹn từ nhà phát triển.
          </p>
        </div>

        {/* 3 Download Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Mac Apple Silicon */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-amber-500/40 glass-panel-hover flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                <Apple size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Khuyên dùng cho Mac mới
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  macOS Apple Silicon
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dành cho Macbook / Mac mini / iMac dùng chip <strong>M1, M2, M3, M4</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 space-y-1 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Định dạng:</span>
                  <span className="font-mono font-medium">Apple Disk Image (.dmg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Dung lượng:</span>
                  <span className="font-mono font-medium text-amber-400">{release.downloads.macArm64.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Kiến trúc:</span>
                  <span className="font-mono font-medium">ARM64 (aarch64)</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macArm64.url}
              className="mt-6 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <Download size={16} />
              Tải cho Apple Silicon (.dmg)
            </a>
          </div>

          {/* Card 2: Mac Intel */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-white/20 glass-panel-hover flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                <Apple size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  Dành cho Mac đời cũ
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  macOS Chip Intel
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dành cho máy Mac sản xuất từ 2020 trở về trước dùng chip <strong>Intel Core i5, i7, i9</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 space-y-1 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Định dạng:</span>
                  <span className="font-mono font-medium">Apple Disk Image (.dmg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Dung lượng:</span>
                  <span className="font-mono font-medium text-zinc-200">{release.downloads.macIntel.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Kiến trúc:</span>
                  <span className="font-mono font-medium">x86_64</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.macIntel.url}
              className="mt-6 w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download size={16} />
              Tải cho Mac Intel (.dmg)
            </a>
          </div>

          {/* Card 3: Windows */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-blue-500/40 glass-panel-hover flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-blue-400">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  Windows 10 / 11
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Windows 64-bit
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Bộ cài đặt tự động tương thích hoàn hảo Windows 10 và Windows 11 (64-bit).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 space-y-1 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Định dạng:</span>
                  <span className="font-mono font-medium">Windows Setup (.exe)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Dung lượng:</span>
                  <span className="font-mono font-medium text-blue-400">{release.downloads.windows.formattedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Kiến trúc:</span>
                  <span className="font-mono font-medium">x64 (NSIS Installer)</span>
                </div>
              </div>
            </div>

            <a
              href={release.downloads.windows.url}
              className="mt-6 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <Download size={16} />
              Tải cho Windows (.exe)
            </a>
          </div>
        </div>

        {/* Release Notes / Changelog */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">
                Có gì mới trong phiên bản {release.tagName}?
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Mới nhất
              </span>
            </div>
            <a
              href="https://github.com/minhvuogdzz/photo-picker-pro/releases"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              Xem toàn bộ lịch sử trên GitHub <ExternalLink size={12} />
            </a>
          </div>

          <div className="text-xs sm:text-sm text-zinc-300 font-mono whitespace-pre-line leading-relaxed bg-[#11131c] p-4 rounded-2xl border border-white/5">
            {release.releaseNotes}
          </div>
        </div>

        {/* Installation Guide & Gatekeeper Helper */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Hướng Dẫn Cài Đặt & Mở Ứng Dụng Nhanh
              </h3>
              <p className="text-xs text-zinc-400">
                Nếu gặp thông báo bảo mật của macOS hoặc Windows lần đầu mở app, hãy làm theo hướng dẫn sau:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {/* macOS Guide */}
            <div className="p-5 rounded-2xl bg-[#141724] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Apple size={16} /> Hướng dẫn trên macOS:
              </div>
              <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                <li>Mở file <code>.dmg</code> vừa tải và kéo icon <strong>MVD T&D</strong> vào thư mục <strong>Applications</strong>.</li>
                <li>
                  Nếu macOS hiện thông báo: <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>:
                  <ul className="list-disc list-inside pl-4 pt-1 space-y-1 text-zinc-400">
                    <li>Nhấp <strong>chuột phải</strong> vào icon ứng dụng &rarr; chọn <strong>Mở (Open)</strong>.</li>
                    <li>Hoặc vào <strong>Cài đặt hệ thống (System Settings)</strong> &rarr; <strong>Quyền riêng tư & Bảo mật (Privacy & Security)</strong> &rarr; nhấn <strong>Vẫn mở (Open Anyway)</strong>.</li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* Windows Guide */}
            <div className="p-5 rounded-2xl bg-[#141724] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 font-bold text-blue-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.799" />
                </svg>
                Hướng dẫn trên Windows:
              </div>
              <ol className="list-decimal list-inside space-y-2 text-zinc-300">
                <li>Nhấp đúp chuột vào file <code>.exe</code> vừa tải về.</li>
                <li>
                  Nếu Windows SmartScreen hiện cảnh báo màu xanh:
                  <ul className="list-disc list-inside pl-4 pt-1 space-y-1 text-zinc-400">
                    <li>Nhấn vào dòng chữ <strong>&ldquo;More info&rdquo; (Thông tin khác)</strong>.</li>
                    <li>Sau đó nhấn nút <strong>&ldquo;Run anyway&rdquo; (Vẫn chạy)</strong> để tiếp tục cài đặt.</li>
                  </ul>
                </li>
                <li>Ứng dụng sẽ tự động hoàn tất và tạo icon tiện lợi ngay ngoài màn hình Desktop.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
