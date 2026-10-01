import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Download,
  Menu,
  X,
  ChevronDown,
  Layers,
  FileSpreadsheet,
  FolderSync,
  Gauge,
  Tag,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  version: string;
}

export function Navbar({ version }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: "Tổng quan", path: "/" },
    { label: "Hiệu năng", path: "/benchmark" },
    { label: "Bảng giá", path: "/pricing" },
    { label: "Tải về", path: "/download" },
    { label: "Hỗ trợ", path: "/support" },
  ];

  const appItems = [
    {
      name: "Photo Picker Pro",
      desc: "Lọc RAW 33MP-61MP 60fps & Loupe 100%",
      path: "/apps/photo-picker",
      icon: <Layers size={15} className="text-blue-400" />,
      tag: "CORE CULL",
    },
    {
      name: "Contact The Sheet",
      desc: "Tự động hóa bóc tách Google Sheets & Drive",
      path: "/apps/contact-the-sheet",
      icon: <FileSpreadsheet size={15} className="text-blue-400" />,
      tag: "AUTOMATION",
    },
    {
      name: "Photo Counter",
      desc: "Đối soát hợp đồng & kiểm kê số lượng file",
      path: "/apps/photo-counter",
      icon: <FolderSync size={15} className="text-blue-400" />,
      tag: "AUDIT",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090E]/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/brand/mvd_app_icon_minimal_dark_squircle.png"
              alt="MVD App Icon"
              className="w-7 h-7 rounded-lg border border-white/10 group-hover:border-blue-500/50 transition-colors"
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                MVD Tech & Design
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] font-mono font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tabular-nums">
                v{version}
              </span>
            </div>
          </Link>

          {/* Apps Dropdown */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setAppsDropdownOpen(true)}
            onMouseLeave={() => setAppsDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 text-xs py-1 transition-colors cursor-pointer ${
                location.pathname.startsWith("/apps")
                  ? "text-blue-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Bộ Ứng Dụng</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-150 ${appsDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {appsDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 animate-in fade-in duration-100">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0A0E18] p-2 shadow-2xl space-y-1">
                  {appItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setAppsDropdownOpen(false)}
                      className={`p-2.5 rounded-xl flex items-start gap-2.5 transition-colors group ${
                        location.pathname === item.path
                          ? "bg-blue-600/15 border border-blue-500/30"
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-white/[0.06] mt-0.5">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white group-hover:text-blue-300">
                            {item.name}
                          </span>
                          <span className="text-[8px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1 py-0.2 rounded">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 ${
                isActive(link.path)
                  ? "text-blue-400 font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Quick Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/pricing"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Mua bản quyền
          </Link>
          <Link
            to="/download"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Download size={14} className="stroke-[2.5]" />
            <span>Tải v{version}</span>
          </Link>
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
        <div className="md:hidden border-b border-white/[0.08] bg-[#0A0D15] px-4 py-4 space-y-3 text-xs">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
            Ứng dụng chuyên biệt
          </div>
          <div className="space-y-1 pl-1">
            {appItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 text-slate-300 hover:text-blue-400 flex items-center justify-between ${
                  location.pathname === item.path ? "text-blue-400 font-bold" : ""
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[8px] font-mono text-blue-400">{item.tag}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/[0.06] pt-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
            Điều hướng
          </div>
          <div className="space-y-1 pl-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 text-slate-300 hover:text-blue-400 ${
                  isActive(link.path) ? "text-blue-400 font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.08]">
            <Link
              to="/download"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors duration-150"
            >
              <Download size={14} /> Tải MVD Studio v{version}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
