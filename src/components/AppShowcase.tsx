"use client";

import React from "react";
import {
  Layers,
  FileSpreadsheet,
  FolderSync,
  Zap,
  Check,
  Cpu,
  Clock,
  HardDrive,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export function AppShowcase() {
  const apps = [
    {
      id: "photo-picker",
      tag: "ỨNG DỤNG LỌC ẢNH HÀNG ĐẦU",
      title: "Photo Picker Pro",
      subtitle: "Lọc Hàng Nghìn Ảnh RAW Thần Tốc Không Lag",
      desc: "Giải pháp lọc và tuyển chọn ảnh chuyên nghiệp được thiết kế riêng cho thợ chụp ảnh và studio. Hiển thị ảnh tức thì, zoom 100% kiểm tra nét trong chớp mắt và gán nhãn linh hoạt.",
      icon: <Layers size={28} className="text-amber-400" />,
      accentColor: "amber",
      features: [
        "Đọc trước file RAW (Sony ARW, Canon CR2/CR3, Nikon NEF, Fuji RAF) tức thì.",
        "Phóng to 100% tại con trỏ chuột kiểm tra nét mắt, biểu cảm trong 0.01 giây.",
        "Hỗ trợ phím tắt chuẩn quốc tế (1-5 sao, 6-9 màu, phím gắn cờ tuyển chọn).",
        "Bộ lọc thông minh theo mã ảnh mà khách hàng yêu cầu.",
      ],
      badge: "Tốc độ x10 so với Lightroom",
    },
    {
      id: "contact-the-sheet",
      tag: "ĐỘT PHÁ TỰ ĐỘNG HÓA",
      title: "Contact The Sheet",
      subtitle: "Đồng Bộ Google Sheets & Google Drive Chọn Ảnh",
      desc: "Chấm dứt hoàn toàn cảnh ngồi căng mắt dò từng số ảnh khách gửi trên Google Sheets. Dán link Sheet hoặc thư mục Drive, phần mềm sẽ tự động tìm, lọc và gom ảnh trả file chỉ trong 1 cú click!",
      icon: <FileSpreadsheet size={28} className="text-purple-400" />,
      accentColor: "purple",
      features: [
        "Tự động kết nối Google Drive và bóc tách dữ liệu cột Google Sheets của khách.",
        "Tự động nhận diện định dạng số ảnh (VD: 0012, DSC_0012, IMG_0012).",
        "Tự động tìm kiếm file ảnh gốc trong máy và copy vào thư mục hoàn chỉnh.",
        "Tiết kiệm 95% thời gian lọc trả file, không bao giờ lo bỏ sót ảnh của khách.",
      ],
      badge: "Tiết kiệm 2 - 3 giờ mỗi ngày",
    },
    {
      id: "photo-counter",
      tag: "KIỂM SOÁT BỘ ẢNH",
      title: "Photo Counter",
      subtitle: "Thống Kê Số Lượng & Phân Loại File Thông Minh",
      desc: "Công cụ quản lý số lượng ảnh chuyên sâu cho quản lý studio và thợ chụp. Đếm nhanh số lượng ảnh theo từng thư mục con, đối chiếu tiến độ và xuất báo cáo rõ ràng.",
      icon: <FolderSync size={28} className="text-blue-400" />,
      accentColor: "blue",
      features: [
        "Quét sâu toàn bộ thư mục con, đếm số lượng chính xác từng định dạng file.",
        "Phân loại trực quan: RAW, JPEG, PNG, PSD, Video clip theo từng máy chụp.",
        "Kiểm soát số lượng ảnh cam kết trong hợp đồng chụp với khách hàng.",
        "Xuất file Excel / bảng tổng kết nhanh chóng phục vụ kế toán và trả ảnh.",
      ],
      badge: "Không lo thất lạc file",
    },
    {
      id: "resources",
      tag: "SÁNG TẠO VÔ TẬN",
      title: "Resources & Design Tools",
      subtitle: "Kho Tài Nguyên Đồ Họa & Presets Màu Độc Quyền",
      desc: "Nâng tầm chất lượng hình ảnh của bạn với kho tài nguyên đồ họa chất lượng cao được tuyển chọn bởi MVD Tech & Design Studio.",
      icon: <Zap size={28} className="text-emerald-400" />,
      accentColor: "emerald",
      features: [
        "Bộ sưu tập Presets màu cưới, tiệc, phóng sự, kỷ yếu thịnh hành.",
        "Kho typography chữ nghệ thuật, khung ảnh thiết kế sẵn cho studio.",
        "Overlay ánh sáng, hiệu ứng bokeh, hạt bụi vintage độ phân giải cao.",
        "Cập nhật tài nguyên mới liên tục định kỳ cho các thành viên.",
      ],
      badge: "Kho tài nguyên không giới hạn",
    },
  ];

  return (
    <section id="apps" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles size={12} />
            Hệ sinh thái All-in-One
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            4 Ứng Dụng Đỉnh Cao Trong{" "}
            <span className="gradient-text-amber">1 Bộ Phần Mềm Duy Nhất</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Không cần phải mở nhiều phần mềm rời rạc. MVD Tech & Design quy tụ đầy đủ mọi công cụ thiết yếu mà một Studio ảnh và Nhiếp ảnh gia chuyên nghiệp cần có.
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div
              key={app.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between glass-panel-hover border border-white/10 group"
            >
              <div className="space-y-6">
                {/* Header Icon + Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {app.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-zinc-300">
                    {app.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400/90 block">
                    {app.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {app.title}
                  </h3>
                  <h4 className="text-sm font-semibold text-zinc-300">
                    {app.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                    {app.desc}
                  </p>
                </div>

                {/* Feature Bullets */}
                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  {app.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Check size={11} className="stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">
                  Tích hợp sẵn trong bản cài
                </span>
                <a
                  href="#downloads"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  Trải nghiệm ngay &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
