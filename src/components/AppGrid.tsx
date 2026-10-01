import React from "react";
import {
  Layers,
  FileSpreadsheet,
  FolderSync,
  Sliders,
  Check,
  Zap,
  ArrowRight,
} from "lucide-react";

export function AppGrid() {
  const apps = [
    {
      id: "photo-picker",
      tag: "CORE APP",
      title: "Photo Picker Pro",
      subtitle: "Lọc Hàng Nghìn Ảnh RAW Thần Tốc",
      desc: "Được xây dựng trên nền tảng Rust hiệu năng cao. Hỗ trợ hiển thị ảnh tức thì, zoom 100% kiểm tra chi tiết mắt và da mặt trong 0.01 giây, gán nhãn sao và màu đồng bộ phím tắt Lightroom.",
      icon: <Layers size={20} className="text-blue-400" />,
      features: [
        "Đọc trước file RAW Sony, Canon, Nikon, Fuji không giật lag",
        "Phóng to 100% tại vị trí con trỏ chuột siêu mượt",
        "Hỗ trợ phím tắt 1-5 sao, màu 6-9, cờ tuyển chọn",
        "Lọc nhanh danh sách ảnh theo yêu cầu khách hàng",
      ],
    },
    {
      id: "contact-the-sheet",
      tag: "AUTOMATION",
      title: "Contact The Sheet",
      subtitle: "Tự Động Bóc Tách Google Sheets & Drive",
      desc: "Chấm dứt việc thợ ảnh phải căng mắt ngồi dò từng mã số ảnh khách chọn trên file Google Sheets. Chỉ cần dán link Sheets hoặc Drive, phần mềm tự động tìm kiếm và copy ảnh trả file.",
      icon: <FileSpreadsheet size={20} className="text-blue-400" />,
      features: [
        "Kết nối trực tiếp link Google Sheets và folder Google Drive",
        "Tự động nhận diện mọi định dạng số ảnh (0012, DSC_0012)",
        "Tìm kiếm file gốc và copy vào thư mục hoàn chỉnh",
        "Tiết kiệm 95% thời gian lọc trả file cho studio",
      ],
    },
    {
      id: "photo-counter",
      tag: "ANALYTICS",
      title: "Photo Counter",
      subtitle: "Thống Kê Số Lượng & Phân Loại File",
      desc: "Công cụ đếm số lượng ảnh thông minh cho thợ ảnh và quản lý studio. Quét sâu mọi thư mục con, phân loại rõ ràng định dạng RAW, JPG, PSD, Video và xuất báo cáo kiểm soát hợp đồng.",
      icon: <FolderSync size={20} className="text-blue-400" />,
      features: [
        "Quét hàng chục thư mục con, đếm số lượng file chính xác",
        "Phân loại trực quan file RAW, JPG, PNG, PSD, Video",
        "Kiểm soát số lượng ảnh cam kết trong hợp đồng chụp",
        "Xuất báo cáo thống kê nhanh gọn và chuẩn xác",
      ],
    },
    {
      id: "resources",
      tag: "CREATIVE",
      title: "Resources Hub",
      subtitle: "Kho Presets Màu & Đồ Họa Độc Quyền",
      desc: "Nâng tầm chất lượng bộ ảnh với kho tài nguyên đồ họa được tối ưu riêng cho studio ảnh cưới, kỷ yếu và sự kiện từ MVD Tech & Design Studio.",
      icon: <Sliders size={20} className="text-blue-400" />,
      features: [
        "Bộ sưu tập Presets màu cưới, phóng sự, kỷ yếu thịnh hành",
        "Typography chữ nghệ thuật, khung ảnh mẫu cho studio",
        "Overlay ánh sáng, bụi phim vintage độ phân giải cao",
        "Cập nhật tài nguyên sáng tạo mới định kỳ",
      ],
    },
  ];

  return (
    <section id="apps" className="py-14 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full studio-panel border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Bộ Công Cụ All-in-One</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            4 Ứng Dụng Chuyên Biệt Trong 1 Bộ Cài Duy Nhất
          </h2>
          <p className="text-xs text-slate-400">
            Không cần mua rời rạc nhiều phần mềm. MVD T&D tích hợp trọn vẹn giải pháp làm việc cho studio ảnh.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {apps.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-2xl studio-panel border border-slate-800 studio-panel-hover flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    {app.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {app.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {app.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-300">
                    {app.subtitle}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {app.desc}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                  {app.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Check size={9} className="stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Tích hợp sẵn trong v2.6.6</span>
                <a
                  href="#downloads"
                  className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] transition-colors"
                >
                  Tải trải nghiệm &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
