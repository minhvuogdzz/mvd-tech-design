"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X, Sparkles, ExternalLink } from "lucide-react";

interface NavbarProps {
  version: string;
  onDownloadClick?: () => void;
}

export function Navbar({ version, onDownloadClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/brand/mvd_app_icon_minimal_dark_squircle.png"
              alt="MVD Tech & Design Logo"
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                MVD Tech & Design
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                v{version}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Studio SuperApp Ecosystem
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="#apps" className="hover:text-white transition-colors">
            Hệ sinh thái Apps
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Tính năng vượt trội
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Bảng giá
          </a>
          <a href="#downloads" className="hover:text-white transition-colors">
            Tải về
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            Hỗ trợ & HDSD
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="text-xs font-semibold px-4 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Mua bản quyền
          </a>
          <a
            href="#downloads"
            onClick={onDownloadClick}
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} className="stroke-[2.5]" />
            Tải bản v{version}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0d0f17] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="flex flex-col gap-2.5 text-sm font-medium text-zinc-300">
            <a
              href="#apps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Hệ sinh thái Apps
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Tính năng vượt trội
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Bảng giá
            </a>
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Tải về
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Hỗ trợ & HDSD
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-bold py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md flex items-center justify-center gap-2"
            >
              <Download size={15} />
              Tải MVD T&D Studio v{version}
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-semibold py-2.5 rounded-xl border border-white/10 text-zinc-300 hover:bg-white/5"
            >
              Xem bảng giá bản quyền
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
