import React from "react";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060910] text-slate-400 text-xs py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/brand/mvd_app_icon_minimal_dark_squircle.png"
                alt="MVD Logo"
                className="w-6 h-6 rounded-md shadow-sm border border-slate-700/60"
              />
              <span className="font-bold text-xs text-white">MVD Tech & Design</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Hệ sinh thái phần mềm chọn ảnh và tự động hóa trả file chuyên nghiệp cho studio nhiếp ảnh toàn quốc.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Bản quyền phát triển độc quyền</span>
            </div>
          </div>

          {/* Apps */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Hệ Sinh Thái
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Photo Picker Pro</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Contact The Sheet</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Photo Counter</a></li>
              <li><a href="#apps" className="hover:text-blue-400 transition-colors">Resources & Presets</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Tải Về & Bảng Giá
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">Tải bản macOS Apple Silicon</a></li>
              <li><a href="#downloads" className="hover:text-blue-400 transition-colors">Tải bản Windows (64-bit)</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Bảng giá bản quyền</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Hướng dẫn cài đặt & Gatekeeper</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
              Hỗ Trợ Kỹ Thuật
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Zalo Hỗ Trợ: <strong className="text-white">0339 676 003</strong></li>
              <li>Email: contact@mvd.vn</li>
              <li>Hỗ trợ từ xa: UltraViewer / AnyDesk</li>
              <li>Khung giờ: 8:00 - 23:00 hàng ngày</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 font-mono">
          <p>&copy; {new Date().getFullYear()} MVD Tech & Design Studio. Toàn bộ quyền được bảo lưu.</p>
          <p className="flex items-center gap-1 font-sans">
            Xây dựng với <Heart size={10} className="text-rose-500 fill-current" /> bởi <strong className="text-slate-300">Dương Minh Vương</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
