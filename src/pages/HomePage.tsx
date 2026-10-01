import React from "react";
import { Link } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import { Hero } from "@/components/Hero";
import { StudioWorkbench } from "@/components/StudioWorkbench";
import {
  Layers,
  FileSpreadsheet,
  FolderSync,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  CheckCircle2,
  HardDrive,
  Cpu,
} from "lucide-react";

interface HomePageProps {
  release: LatestRelease;
}

export function HomePage({ release }: HomePageProps) {
  const productSpotlights = [
    {
      title: "Photo Picker Pro",
      badge: "CULL ENGINE",
      headline: "Đọc RAW 33MP - 61MP trong 0.02s. Soi nét mắt 1:1 Loupe tức thì.",
      desc: "Xây dựng trên lõi Rust native và giải mã Metal/DirectX. Loại bỏ hoàn toàn độ trễ khi lướt và lọc ảnh phóng sự, tiệc cưới hàng nghìn tấm.",
      path: "/apps/photo-picker",
      icon: <Layers size={22} className="text-blue-400" />,
      features: ["Độ trễ <16ms (60 FPS)", "Soi nét 100% mắt phím Z", "RAM chỉ 118MB"],
    },
    {
      title: "Contact The Sheet",
      badge: "AUTOMATION ENGINE",
      headline: "Dán link Google Sheets. Tự động bóc tách & gom file RAW chuẩn 100%.",
      desc: "Chấm dứt việc thợ chụp phải căng mắt ngồi dò từng mã số ảnh khách chọn. Nhận diện chuẩn mọi dải mã (4901..4905) và xuất file trong 0.4s.",
      path: "/apps/contact-the-sheet",
      icon: <FileSpreadsheet size={22} className="text-blue-400" />,
      features: ["Khớp dải mã liên tiếp", "1-Click bóc tách", "Zero file thất lạc"],
    },
    {
      title: "Photo Counter",
      badge: "AUDIT & BILLING",
      headline: "Quét sâu đệ quy mọi thư mục. Đối soát hợp đồng giao nhận ảnh.",
      desc: "Đếm số lượng file theo từng phân loại RAW, JPG, PSD. Đảm bảo đúng số lượng ảnh album và ảnh phóng đã cam kết trong hợp đồng studio.",
      path: "/apps/photo-counter",
      icon: <FolderSync size={22} className="text-blue-400" />,
      features: ["Quét thư mục con đệ quy", "Đối soát cam kết hợp đồng", "Xuất báo cáo nghiệm thu"],
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Flagship Hero */}
      <Hero release={release} />

      {/* 2. Interactive Studio Workbench Simulator */}
      <StudioWorkbench />

      {/* 3. Deep-Dive Product Suite Showcase */}
      <section className="py-12 relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Hệ Thống Ứng Dụng Chuyên Sâu</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ba Cột Trụ Tự Động Hóa Dành Riêng Cho Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Mỗi module được thiết kế với giao diện và tính năng độc lập, phục vụ trọn vẹn từng khâu trong quy trình làm việc studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productSpotlights.map((prod, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-blue-500/40 transition-colors flex flex-col justify-between group space-y-4 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    {prod.icon}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                    {prod.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {prod.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-300">
                    {prod.headline}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {prod.desc}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-300">
                  {prod.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <Link
                  to={prod.path}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#0F1422] hover:bg-blue-600 group-hover:text-white text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-blue-500/20 hover:border-blue-600"
                >
                  <span>Khám phá tính năng chi tiết</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Engineering Benchmark Teaser */}
      <section className="py-12 relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0C101B] to-[#0A0D15] border border-white/[0.1] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300">
              <Gauge size={11} /> Benchmark Độc Lập
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Nhanh hơn 40 lần và tiết kiệm 80% bộ nhớ so với Lightroom Classic.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              MVD Photo Picker Pro đọc thẳng embedded preview JPEG phần cứng mà không cần render Smart Previews, giúp máy tính chạy mát rượi và tiết kiệm pin ngoại cảnh.
            </p>
          </div>

          <Link
            to="/benchmark"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-blue-600/20 transition-all"
          >
            <span>Xem Bảng So Sánh Chi Tiết</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. Local-First & Air-Gapped Trust Guarantee */}
      <section className="py-12 relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-2xl bg-[#090C16] border border-white/[0.08] text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-base font-bold text-white">
            Cam Kết Bảo Mật Tuyệt Đối (Air-Gapped Local-First)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            100% dữ liệu hình ảnh và mã khách hàng được xử lý cục bộ trên ổ cứng NVMe / SSD máy tính của bạn. MVD Tech & Design tuyệt đối không tải ảnh lên đám mây, bảo đảm an toàn thông tin cho khách hàng của bạn.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-500">
            <span>✓ 0 byte cloud upload</span>
            <span>✓ Hoạt động offline 100%</span>
            <span>✓ Tự động đồng bộ phiên 0h00 VN</span>
          </div>
        </div>
      </section>
    </div>
  );
}
