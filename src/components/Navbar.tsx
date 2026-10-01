import React, { useState } from "react";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  version: string;
}

export function Navbar({ version }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full studio-panel border-b border-slate-800/80 bg-[#080C14]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/brand/mvd_app_icon_minimal_dark_squircle.png"
            alt="MVD Logo"
            className="w-7 h-7 rounded-lg shadow-sm border border-slate-700/60 group-hover:border-blue-500/50 transition-colors"
          />
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              MVD Tech & Design
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
              v{version}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#apps" className="hover:text-white transition-colors">
            Hệ sinh thái Apps
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Quy trình Studio
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Bảng giá
          </a>
          <a href="#downloads" className="hover:text-white transition-colors">
            Tải về
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            Hỗ trợ kỹ thuật
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            Mua bản quyền
          </a>
          <a
            href="#downloads"
            className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={13} className="stroke-[2.5]" />
            Tải v{version}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B101C] px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2 text-xs font-medium text-slate-300">
            <a
              href="#apps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Hệ sinh thái Apps
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Quy trình Studio
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Bảng giá bản quyền
            </a>
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Tải bộ cài đặt
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white"
            >
              Hỗ trợ kỹ thuật
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-bold py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-1.5"
            >
              <Download size={13} /> Tải MVD Studio v{version}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
