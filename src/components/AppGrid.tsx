import React from "react";
import {
  Layers,
  FileSpreadsheet,
  FolderSync,
  Sliders,
  Check,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export function AppGrid() {
  const apps = [
    {
      id: "photo-picker",
      tag: "CORE CULL ENGINE",
      title: "Photo Picker Pro",
      version: "v2.6.6",
      desc: "Lọc hàng nghìn ảnh RAW không giật lag. Hỗ trợ zoom 100% kiểm tra chi tiết mắt trong 0.01s, gán sao và màu đồng bộ phím tắt Lightroom.",
      metrics: [
        { label: "Độ trễ lướt ảnh", value: "<16ms (60 FPS)" },
        { label: "Định dạng hỗ trợ", value: "Sony ARW, Canon CR2/3, Nikon NEF, Fuji RAF, JPG" },
        { label: "Bộ nhớ sử dụng", value: "~118 MB RAM" },
      ],
      shortcuts: ["[1..5] Sao", "[6..9] Màu", "[Space] Next", "[Z] Soi nét 100%"],
    },
    {
      id: "contact-the-sheet",
      tag: "AUTOMATION ENGINE",
      title: "Contact The Sheet",
      version: "v2.6.6",
      desc: "Chấm dứt việc ngồi căng mắt tìm từng số ảnh khách chọn từ file Google Sheets hay Excel. Tự động nhận diện dải mã (4901..4905) và gom file trả khách trong vài giây.",
      metrics: [
        { label: "Tốc độ bóc tách", value: "0.4s / 1,000 files" },
        { label: "Thuật toán khớp", value: "Regex + Fuzzy Filename Matcher" },
        { label: "Độ chuẩn xác", value: "100% (Zero Missing Files)" },
      ],
      shortcuts: ["[Cmd+V] Dán link Sheets", "[Enter] Bóc tách & Copy"],
    },
    {
      id: "photo-counter",
      tag: "AUDIT & BILLING",
      title: "Photo Counter",
      version: "v2.6.6",
      desc: "Kiểm soát số lượng file hợp đồng, quét sâu đệ quy mọi thư mục con, phân loại rõ ràng định dạng RAW, JPG, PSD và xuất báo cáo kiểm soát nghiệm thu.",
      metrics: [
        { label: "Quét thư mục con", value: "Không giới hạn cấp thư mục" },
        { label: "Báo cáo nghiệm thu", value: "Xuất file Excel / Clipboard" },
        { label: "Đối soát hợp đồng", value: "Cảnh báo thiếu / thừa file tự động" },
      ],
      shortcuts: ["[Cmd+O] Chọn folder SSD", "[Cmd+E] Xuất báo cáo"],
    },
    {
      id: "resources",
      tag: "CREATIVE ASSETS",
      title: "Resources Hub",
      version: "VIP Store",
      desc: "Kho presets màu tiệc cưới, phóng sự, kỷ yếu và thư viện typography chữ nghệ thuật, overlay ánh sáng độ phân giải cao được tối ưu riêng cho studio chuyên nghiệp.",
      metrics: [
        { label: "Thư viện Presets", value: "Hơn 50+ tone màu studio thịnh hành" },
        { label: "Typography & Khung", value: "Font chữ cưới & khung ảnh album VIP" },
        { label: "Cập nhật", value: "Bổ sung tài nguyên mới định kỳ" },
      ],
      shortcuts: ["[1-Click] Tải Preset trực tiếp vào máy"],
    },
  ];

  return (
    <section id="apps" className="py-14 md:py-20 relative bg-[#07090E] border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Hệ Sinh Thái Module Hóa</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            4 Ứng Dụng Chuyên Sâu Tích Hợp Trong 1 Bộ Cài Đặt Duy Nhất
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Không cần mua rời rạc nhiều phần mềm. MVD Studio kết nối liền mạch từ lúc cắm thẻ nhớ đến khi xuất file cho khách.
          </p>
        </div>

        {/* 2x2 Dense Spec Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {apps.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-blue-500/40 transition-colors flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    {app.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.04]">
                    {app.version}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {app.desc}
                  </p>
                </div>

                {/* Technical Metric Table */}
                <div className="p-3 rounded-xl bg-[#06080E] border border-white/[0.04] space-y-1.5 text-[11px] font-mono">
                  {app.metrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center py-0.5 border-b border-white/[0.03] last:border-0">
                      <span className="text-slate-500">{m.label}:</span>
                      <span className="text-slate-200 font-bold text-right truncate max-w-[60%]">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Shortcuts */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-500">Phím tắt:</span>
                  {app.shortcuts.map((sc, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-[10px] font-mono text-slate-300 font-medium"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <a
                  href="#workbench"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>Mở mô phỏng tương tác</span>
                  <ArrowRight size={12} />
                </a>
                <span className="text-[10px] font-mono text-slate-500">Bao gồm trong mọi gói</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
