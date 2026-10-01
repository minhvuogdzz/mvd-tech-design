"use client";

import React from "react";
import {
  Cpu,
  ShieldCheck,
  WifiOff,
  RefreshCw,
  Zap,
  Lock,
  Flame,
  Award,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      title: "Hiệu Năng Rust Siêu Nhẹ",
      desc: "Được xây dựng trên nền tảng Rust và Tauri thế hệ mới. Tiêu thụ chỉ khoảng 100 - 150MB RAM, không làm nóng máy hay đơ lag máy như các phần mềm truyền thống.",
    },
    {
      icon: <WifiOff className="w-6 h-6 text-emerald-400" />,
      title: "Hoạt Động 100% Offline",
      desc: "Chụp ảnh tại nơi không có sóng hay mất mạng? Không vấn đề! MVD T&D vẫn hoạt động trơn tru 100% mà không bắt buộc phải có kết nối mạng internet.",
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: "Bảo Mật File Khách Tuyệt Đối",
      desc: "Toàn bộ file ảnh RAW, JPG của khách hàng được xử lý trực tiếp cục bộ trên ổ cứng của bạn. Chúng tôi KHÔNG BAO GIỜ upload ảnh của bạn lên bất kỳ server đám mây nào.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
      title: "Làm Mới Phiên Mỗi Ngày 0h00",
      desc: "Cơ chế bảo vệ bản quyền thông minh: tự động đồng bộ và làm mới phiên vào 0h00 mỗi ngày (giờ VN), giải phóng bộ nhớ đệm và duy trì hiệu năng cao nhất.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Hỗ Trợ Đầy Đủ File RAW",
      desc: "Đọc tức thì các định dạng RAW phổ biến nhất: Sony (.ARW), Canon (.CR2, .CR3), Nikon (.NEF), Fujifilm (.RAF) cùng với JPEG, PNG, TIFF, DNG.",
    },
    {
      icon: <Award className="w-6 h-6 text-rose-400" />,
      title: "Cập Nhật Tự Động Trọn Đời",
      desc: "Khi có phiên bản mới trên GitHub Releases, ứng dụng tự động thông báo và hỗ trợ cập nhật chỉ trong 1 cú click chuột.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#090a0f]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-white/10 text-xs font-bold text-zinc-300 uppercase tracking-widest">
            <Flame size={12} className="text-orange-400" />
            Lợi thế cạnh tranh
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Được Thiết Kế Chuẩn Mực Cho{" "}
            <span className="gradient-text-amber">Quy Trình Studio Tốc Độ Cao</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Mọi tính năng đều được tối ưu hóa tối đa nhằm giúp bạn cắt giảm thời gian xử lý file sau chụp từ vài tiếng xuống còn vài phút.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 glass-panel-hover border border-white/10 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
