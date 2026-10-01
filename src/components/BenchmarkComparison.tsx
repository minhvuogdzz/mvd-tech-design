import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Check,
  ShieldAlert,
  Cpu,
  HardDrive,
  BatteryCharging,
  Gauge,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function BenchmarkComparison() {
  const { config } = useSiteConfig();

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
      note: "Regex engine tự nhận diện dải số liên tiếp và gom trọn file RAW gốc.",
    },
    {
      metric: "Thời lượng pin khi chụp ngoại cảnh",
      icon: <BatteryCharging size={14} className="text-blue-500" />,
      lrc: "Tốn 25 — 35% pin / giờ (Quạt hú)",
      mvd: "Chỉ tốn 6 — 8% pin / giờ (Máy mát)",
      winner: "mvd",
      note: "Không ép CPU render dư thừa, tối ưu tuyệt đối cho thợ đi làm xa nguồn điện.",
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

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400 font-mono shadow-sm self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Thử nghiệm phần cứng thực địa</span>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0A0E18] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-100 dark:bg-[#0E1526] px-6 py-4 border-b border-slate-200 dark:border-white/[0.08] text-xs font-mono font-bold">
            <div className="col-span-5 text-slate-700 dark:text-slate-300">Tiêu Chí Đo Lường</div>
            <div className="col-span-3 text-slate-500 dark:text-slate-400 text-center">Adobe Lightroom Classic</div>
            <div className="col-span-4 text-blue-600 dark:text-blue-400 text-center flex items-center justify-center gap-2">
              <span>MVD Photo Picker Pro</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 font-mono">
                Native Engine
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50/60 dark:hover:bg-white/[0.015] transition-colors"
              >
                <div className="col-span-5 space-y-1 pr-4">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {row.icon}
                    <span>{row.metric}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                    {row.note}
                  </div>
                </div>

                <div className="col-span-3 text-center text-xs font-mono text-slate-500 dark:text-slate-400">
                  {row.lrc}
                </div>

                <div className="col-span-4 flex items-center justify-center gap-2 text-center text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <Check size={14} strokeWidth={3} className="shrink-0 text-emerald-500" />
                  <span>{row.mvd}</span>
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
              <span>Tải bản cài đặt về test thực tế</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
