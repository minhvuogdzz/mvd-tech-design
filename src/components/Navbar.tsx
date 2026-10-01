import React, { useState } from "react";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  version: string;
}

export function Navbar({ version }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090E]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/brand/mvd_app_icon_minimal_dark_squircle.png"
            alt="MVD App Icon"
            className="w-6 h-6 rounded-md border border-white/10 group-hover:border-blue-500/50 transition-colors"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              MVD Tech & Design
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-medium rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v{version}
            </span>
          </div>
        </a>

        {/* Center: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-400">
          <a href="#apps" className="hover:text-white transition-colors">
            Hệ sinh thái
          </a>
          <a href="#workbench" className="hover:text-white transition-colors">
            Trải nghiệm Workbench
          </a>
          <a href="#benchmark" className="hover:text-white transition-colors">
            So sánh hiệu năng
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Bảng giá
          </a>
          <a href="#downloads" className="hover:text-white transition-colors">
            Tải về
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            Hỗ trợ
          </a>
        </nav>

        {/* Right: Quick Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Mua bản quyền
          </a>
          <a
            href="#downloads"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={13} className="stroke-[2.5]" />
            <span>Tải v{version}</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded text-slate-400 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0D14] px-4 py-3 space-y-2.5 text-xs">
          <a
            href="#apps"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            Hệ sinh thái
          </a>
          <a
            href="#workbench"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            Trải nghiệm Workbench
          </a>
          <a
            href="#benchmark"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            So sánh hiệu năng
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            Bảng giá bản quyền
          </a>
          <a
            href="#downloads"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            Tải bộ cài đặt
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-slate-300 hover:text-white"
          >
            Hỗ trợ kỹ thuật
          </a>
          <div className="pt-2 border-t border-white/[0.08]">
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center gap-1.5"
            >
              <Download size={13} /> Tải v{version}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
