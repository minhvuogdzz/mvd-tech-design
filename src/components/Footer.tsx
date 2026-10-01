"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Mail, Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06070a] text-zinc-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/brand/mvd_app_icon_minimal_dark_squircle.png"
                alt="MVD Logo"
                width={32}
                height={32}
                className="rounded-lg shadow-sm"
              />
              <span className="font-extrabold text-sm text-white tracking-tight">
                MVD Tech & Design
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Hệ sinh thái phần mềm chuyên nghiệp phục vụ studio và nhiếp ảnh gia toàn quốc. Tối ưu thời gian, nâng tầm chất lượng dịch vụ.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Bản quyền phát triển độc quyền</span>
            </div>
          </div>

          {/* Col 2: Hệ Sinh Thái Apps */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Hệ Sinh Thái Apps
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#apps" className="hover:text-amber-400 transition-colors">
                  Photo Picker Pro (Lọc ảnh)
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-amber-400 transition-colors">
                  Contact The Sheet (Đồng bộ Drive)
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-amber-400 transition-colors">
                  Photo Counter (Thống kê ảnh)
                </a>
              </li>
              <li>
                <a href="#apps" className="hover:text-amber-400 transition-colors">
                  Resources & Creative Tools
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Liên Kết Nhanh */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#downloads" className="hover:text-amber-400 transition-colors">
                  Tải bản mới cho macOS
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-amber-400 transition-colors">
                  Tải bản mới cho Windows
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  Bảng giá & Kích hoạt bản quyền
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Hướng dẫn cài đặt & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Hỗ Trợ & Liên Hệ */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li className="flex items-center gap-2">
                <MessageSquare size={13} className="text-amber-400 shrink-0" />
                <span>Zalo Hỗ Trợ: <strong>0339 676 003</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-amber-400 shrink-0" />
                <span>Email: contact@mvd.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-amber-400 shrink-0" />
                <span>Giờ làm việc: 8:00 - 23:00 (Hàng ngày)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} MVD Tech & Design Studio. Toàn bộ quyền được bảo lưu.
          </p>
          <p className="flex items-center gap-1">
            Xây dựng và phát triển với <Heart size={11} className="text-rose-500 fill-current" /> bởi <strong className="text-zinc-300">Dương Minh Vương</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
