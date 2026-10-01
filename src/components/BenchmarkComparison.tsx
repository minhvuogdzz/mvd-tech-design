import React from "react";
import { Zap, Check, X, ShieldAlert, Cpu, HardDrive, BatteryCharging, Gauge } from "lucide-react";

export function BenchmarkComparison() {
  const comparisons = [
    {
      metric: "Thời gian khởi động (Cold Boot)",
      icon: <Gauge size={14} className="text-blue-400" />,
      lrc: "10 — 15 giây",
      mvd: "0.25 giây (Tức thì)",
      winner: "mvd",
      note: "MVD viết bằng Rust/Tauri native, không gánh nặng tải catalog nặng nề.",
    },
    {
      metric: "Bộ nhớ RAM khi nạp 2,000 file RAW",
      icon: <Cpu size={14} className="text-blue-400" />,
      lrc: "4,800 MB — 8,500 MB",
      mvd: "118 MB — 190 MB",
      winner: "mvd",
      note: "Nhẹ hơn 40 lần. Hoạt động mượt mà ngay cả trên MacBook 8GB RAM.",
    },
    {
      metric: "Thời gian chờ render ảnh trước khi lọc",
      icon: <HardDrive size={14} className="text-blue-400" />,
      lrc: "12 — 18 phút (Tạo 1:1 Previews)",
      mvd: "0.00 giây (Không cần chờ)",
      winner: "mvd",
      note: "Giải mã trực tiếp embedded preview từ phần cứng qua LibRaw GPU pipeline.",
    },
    {
      metric: "Độ trễ lướt ảnh (Frame Switch Lag)",
      icon: <Zap size={14} className="text-blue-400" />,
      lrc: "350ms — 800ms / ảnh",
      mvd: "< 16ms (60 FPS mượt mà)",
      winner: "mvd",
      note: "Chuyển ảnh nhanh như bấm phím cơ, không bị khựng đơ khung hình.",
    },
    {
      metric: "Khớp mã khách chọn từ Google Sheets",
      icon: <ShieldAlert size={14} className="text-blue-400" />,
      lrc: "Không hỗ trợ (Phải dò tay từng số)",
      mvd: "Tự động bóc tách trong 0.4 giây",
      winner: "mvd",
      note: "Nhận diện dải số '4901..4905' và bóc file chuẩn xác 100%.",
    },
    {
      metric: "Mức tiêu thụ pin ngoại cảnh (MacBook)",
      icon: <BatteryCharging size={14} className="text-blue-400" />,
      lrc: "Hao 35% pin/giờ (Quạt kêu lớn)",
      mvd: "< 6% pin/giờ (Chạy êm ái)",
      winner: "mvd",
      note: "Tận dụng tối đa lõi tiết kiệm điện của Apple Silicon M1/M2/M3/M4.",
    },
  ];

  return (
    <section id="benchmark" className="py-14 md:py-20 relative bg-[#07090E] border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Gauge size={11} />
            <span>Thông Số Kỹ Thuật Độc Lập</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Hiệu Năng Thực Tế: MVD Studio vs Adobe Lightroom Classic
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Thử nghiệm trên bộ 2,000 file RAW Sony 33MP (ILCE-7M4) chạy trên máy MacBook Pro Apple Silicon & Windows 11 PC.
          </p>
        </div>

        {/* Technical Comparison Table */}
        <div className="rounded-2xl border border-white/[0.12] bg-[#0A0D15] overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#0E121D] px-4 py-3 border-b border-white/[0.08] text-xs font-mono font-bold">
            <div className="col-span-5 text-slate-400">Tiêu Chí Đo Lường</div>
            <div className="col-span-3 text-slate-500 text-center">Adobe Lightroom Classic</div>
            <div className="col-span-4 text-blue-400 text-center flex items-center justify-center gap-1.5">
              <span>MVD Photo Picker Pro</span>
              <span className="text-[9px] bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300">v2.6.6</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.05]">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-4 py-3.5 items-center hover:bg-white/[0.02] transition-colors text-xs"
              >
                <div className="col-span-5 space-y-0.5 pr-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    {row.icon}
                    <span>{row.metric}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 hidden sm:block">
                    {row.note}
                  </div>
                </div>

                <div className="col-span-3 text-center font-mono text-slate-400 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-white/[0.04]">
                    {row.lrc}
                  </span>
                </div>

                <div className="col-span-4 text-center font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 font-bold">
                    <Check size={12} className="text-blue-400" />
                    <span>{row.mvd}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="px-4 py-3 bg-[#080B12] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Kết luận: Tiết kiệm trung bình 80 — 120 phút cho mỗi ca lọc ảnh phóng sự / tiệc cưới.</span>
            </div>
            <a
              href="#downloads"
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
            >
              Tải bản v2.6.6 về máy test ngay &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
