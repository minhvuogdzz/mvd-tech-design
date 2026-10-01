import React from "react";
import { ShieldCheck, Heart, Terminal, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070C] text-slate-400 text-xs py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/brand/mvd_app_icon_minimal_dark_squircle.png"
                alt="MVD Logo"
                className="w-6 h-6 rounded-md shadow-sm border border-white/10"
              />
              <span className="font-bold text-xs text-white">MVD Tech & Design</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bộ công cụ lọc ảnh RAW và tự động hóa trả file chuyên nghiệp dành cho studio ảnh cưới, phóng sự, kỷ yếu và freelancer toàn quốc.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Bản quyền phát triển độc quyền</span>
            </div>
          </div>

          {/* Apps */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Hệ Sinh Thái
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#workbench" className="hover:text-blue-400 transition-colors">Trải nghiệm Workbench</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Photo Picker Pro</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Contact The Sheet</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Photo Counter</a></li>
              <li><a href="#benchmark" className="hover:text-blue-400 transition-colors">So sánh hiệu năng vs Lightroom</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Tải Về & Bảng Giá
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">macOS Apple Silicon (M1—M4)</a></li>
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">macOS Chip Intel</a></li>
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">Windows 10 / 11 (64-bit)</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Bảng giá bản quyền</a></li>
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">Lệnh khắc phục Gatekeeper</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Hỗ Trợ Kỹ Thuật
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[10px]">
              <li>Zalo: <a href="https://zalo.me/0339676003" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-bold">0339 676 003</a></li>
              <li>Hỗ trợ từ xa: UltraViewer / AnyDesk</li>
              <li>Khung giờ: 8:00 — 23:00 hàng ngày</li>
              <li>Bảo mật: Local-First Air-Gapped</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 font-mono">
          <p>&copy; {new Date().getFullYear()} MVD Tech & Design Studio. Toàn bộ quyền được bảo lưu.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-sans">
              Phát triển bởi <strong className="text-slate-300">Dương Minh Vương</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
