import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Check,
  ShieldAlert,
  Cpu,
  HardDrive,
  BatteryCharging,
  Gauge,
  Image as ImageIcon,
  Settings,
  Maximize2,
  X,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function BenchmarkComparison() {
  const { config, openAdminModal } = useSiteConfig();
  const [zoomImage, setZoomImage] = useState(false);

  const comparisons = [
    {
      metric: "Thời gian khởi động (Cold Boot)",
      icon: <Gauge size={14} className="text-blue-500" />,
      lrc: "10 — 15 giây",
      mvd: "0.25 giây (Tức thì)",
      winner: "mvd",
      note: "MVD viết bằng Rust/Tauri native, không gánh nặng tải catalog nặng nề.",
    },
    {
      metric: "Bộ nhớ RAM khi nạp 2,000 file RAW",
      icon: <Cpu size={14} className="text-blue-500" />,
      lrc: "4,800 MB — 8,500 MB",
      mvd: "118 MB — 190 MB",
      winner: "mvd",
      note: "Nhẹ hơn 40 lần. Hoạt động mượt mà ngay cả trên MacBook 8GB RAM.",
    },
    {
      metric: "Thời gian chờ render ảnh trước khi lọc",
      icon: <HardDrive size={14} className="text-blue-500" />,
      lrc: "12 — 18 phút (Tạo 1:1 Previews)",
      mvd: "0.00 giây (Không cần chờ)",
      winner: "mvd",
      note: "Giải mã trực tiếp embedded preview từ phần cứng qua LibRaw GPU pipeline.",
    },
    {
      metric: "Độ trễ lướt ảnh (Frame Switch Lag)",
      icon: <Zap size={14} className="text-blue-500" />,
      lrc: "350ms — 800ms / ảnh",
      mvd: "< 16ms (60 FPS mượt mà)",
      winner: "mvd",
      note: "Chuyển ảnh nhanh như bấm phím cơ, không bị khựng đơ khung hình.",
    },
    {
      metric: "Khớp mã khách chọn từ Google Sheets",
      icon: <ShieldAlert size={14} className="text-blue-500" />,
      lrc: "Không hỗ trợ (Phải dò tay từng số)",
      mvd: "Tự động bóc tách trong 0.4 giây",
      winner: "mvd",
      note: "Nhận diện dải số '4901..4905' và bóc file chuẩn xác 100%.",
    },
    {
      metric: "Mức tiêu thụ pin ngoại cảnh (MacBook)",
      icon: <BatteryCharging size={14} className="text-blue-500" />,
      lrc: "Hao 35% pin/giờ (Quạt kêu lớn)",
      mvd: "< 6% pin/giờ (Chạy êm ái)",
      winner: "mvd",
      note: "Tận dụng tối đa lõi tiết kiệm điện của Apple Silicon M1/M2/M3/M4.",
    },
  ];

  return (
    <section id="benchmark" className="py-16 md:py-24 relative bg-slate-50 dark:bg-[#07090E] border-b border-slate-200 dark:border-white/[0.08] transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header: Left-Biased */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Gauge size={11} />
              <span>Đo Lường Hiệu Năng Thực Tế</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {config.benchmarkTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {config.benchmarkNotes}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={openAdminModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm cursor-pointer"
              title="Nhấn để thay đổi ảnh benchmark hoặc số điện thoại"
            >
              <Settings size={13} />
              <span>Tùy chỉnh ảnh / số liệu (Admin)</span>
            </button>
          </div>
        </div>

        {/* Custom Benchmark Image Showcase (if set by Admin) */}
        {config.benchmarkImageUrl && (
          <div className="rounded-3xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0A0E18] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-blue-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Biểu Đồ Hiệu Năng Do Admin Đăng Tải
                </h3>
              </div>
              <button
                onClick={() => setZoomImage(true)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Maximize2 size={13} />
                <span>Xem kích thước đầy đủ</span>
              </button>
            </div>

            <div
              onClick={() => setZoomImage(true)}
              className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.06] flex items-center justify-center p-4 cursor-pointer group"
            >
              <img
                src={config.benchmarkImageUrl}
                alt="Benchmark Visualization"
                className="max-h-96 w-auto object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                <Maximize2 size={16} />
                <span>Nhấn để phóng to ảnh</span>
              </div>
            </div>
          </div>
        )}

        {/* Technical Comparison Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0A0E18] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-100 dark:bg-[#0E1526] px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] text-xs font-mono font-bold">
            <div className="col-span-5 text-slate-700 dark:text-slate-300">Tiêu Chí Đo Lường</div>
            <div className="col-span-3 text-slate-500 dark:text-slate-400 text-center">Adobe Lightroom Classic</div>
            <div className="col-span-4 text-blue-600 dark:text-blue-400 text-center flex items-center justify-center gap-2">
              <span>MVD Photo Picker Pro</span>
              <span className="text-[9px] bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-300">v2.6.6 Native</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors text-xs"
              >
                <div className="col-span-5 space-y-1 pr-3">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                    {row.icon}
                    <span className="text-sm tracking-tight">{row.metric}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-500 hidden sm:block leading-relaxed">
                    {row.note}
                  </div>
                </div>

                <div className="col-span-3 text-center font-mono text-slate-600 dark:text-slate-400 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.04] tabular-nums">
                    {row.lrc}
                  </span>
                </div>

                <div className="col-span-4 text-center font-mono text-xs">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 font-bold tabular-nums">
                    <Check size={13} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{row.mvd}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#070A12] border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Kết luận: Tiết kiệm trung bình 80 — 120 phút cho mỗi ca lọc ảnh tiệc cưới.</span>
            </div>
            <Link
              to="/download"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
            >
              <span>Tải bản v2.6.6 về máy test ngay</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Zooming Benchmark Image */}
      {zoomImage && config.benchmarkImageUrl && (
        <div
          onClick={() => setZoomImage(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer animate-in fade-in"
        >
          <button
            onClick={() => setZoomImage(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X size={20} />
          </button>
          <img
            src={config.benchmarkImageUrl}
            alt="Benchmark Zoomed"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
