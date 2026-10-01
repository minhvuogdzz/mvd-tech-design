import React from "react";
import { Cpu, ShieldCheck, Zap, Terminal, Lock, RefreshCw, Layers } from "lucide-react";

export function EngineeringSpecs() {
  const pillars = [
    {
      badge: "CORE ENGINE",
      title: "Rust & Tauri Native Stack",
      subtitle: "Nói không với Electron nặng nề",
      desc: "Electron đóng gói cả trình duyệt Chromium nặng hàng trăm megabyte. MVD sử dụng Rust và Tauri native binary — dung lượng bộ cài chỉ ~5MB, khởi động tức thì trong 250ms và tiêu thụ bộ nhớ dưới 150MB RAM.",
      codeSnippet: `// Rust LibRaw Embedded Decode Pipeline
let preview = raw_loader::extract_embedded_jpeg(&file_path)?;
gpu_surface.stream_texture(preview.as_slice(), 60.0 /* fps */);`,
    },
    {
      badge: "GPU PIPELINE",
      title: "Zero-Copy 1:1 Loupe Zoom",
      subtitle: "Soi nét lông mi & tròng mắt tức thì",
      desc: "Thay vì de-mosaic toàn bộ ma trận cảm biến 60 triệu điểm ảnh trên CPU gây đơ máy, MVD giải mã trực tiếp khối preview siêu nét từ phần cứng và nạp thẳng vào texture GPU Metal (macOS) / DirectX (Windows).",
      codeSnippet: `// Instant Focus Inspection
const loupeRect = computeEyeTarget(cursorCoords, 1.0 /* 100% */);
renderContext.blitToScreen(loupeRect, { latencyMs: 0.01 });`,
    },
    {
      badge: "SECURITY & PRIVACY",
      title: "Local-First & Air-Gapped",
      subtitle: "Bảo mật 100% dữ liệu khách hàng",
      desc: "Mọi thao tác đọc, zoom, lọc sao, bóc tách và copy file ảnh đều thực thi cục bộ trên ổ cứng NVMe/SSD máy bạn. Không một byte ảnh hay danh sách khách hàng nào bị upload lên internet.",
      codeSnippet: `// Local File I/O Only
fs::copy_safe(source_raw, target_album_dir, CopyOptions::Atomic)?;
assert!(network_egress::is_blocked_for_photo_data());`,
    },
    {
      badge: "SESSION LIFECYCLE",
      title: "Tự Động Đồng Bộ Phiên 0h00 VN",
      subtitle: "Quản lý bản quyền tin cậy & mượt mà",
      desc: "Hệ thống xác thực bản quyền kiểm tra quyền sử dụng chính hãng và tự động làm mới phiên làm việc vào đúng 0h00 hàng ngày theo giờ Việt Nam, đảm bảo an toàn tài khoản và ngăn chặn gian lận thiết bị.",
      codeSnippet: `// 00:00 ICT Scheduled Session Renewal
cron::schedule("0 0 0 * * *", Timezone::Asia_HoChiMinh, || {
    auth_guard.validate_entitlement_and_refresh_session();
});`,
    },
  ];

  return (
    <section id="engineering" className="py-14 md:py-20 relative bg-[#090C16] border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Terminal size={11} />
            <span>Dưới Nắp Ca-Pô (Under The Hood)</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Kiến Trúc Kỹ Thuật Đằng Sau Tốc Độ 0.02 Giây
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tối ưu hóa từng chu kỳ CPU và luồng I/O đĩa cứng để phục vụ nhu cầu làm việc cường độ cao của studio chuyên nghiệp.
          </p>
        </div>

        {/* 2x2 Dense Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0C101B] border border-white/[0.08] hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600">Spec 0{idx + 1}</span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <h4 className="text-xs font-semibold text-slate-400">
                  {item.subtitle}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-xl bg-[#06080E] p-3 border border-white/[0.06] font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
                <pre>
                  <code>{item.codeSnippet}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
