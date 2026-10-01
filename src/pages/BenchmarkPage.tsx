import React from "react";
import { Link } from "react-router-dom";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { EngineeringSpecs } from "@/components/EngineeringSpecs";
import { Gauge, Cpu, HardDrive, ShieldCheck, Zap, Download, ArrowRight } from "lucide-react";

export function BenchmarkPage() {
  return (
    <div className="py-12 md:py-20 space-y-20 ambient-glow">
      {/* 1. Header - Left-Biased, Editorial & Spacious */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-600 dark:text-blue-400">
              <Gauge size={13} />
              <span>Kỹ Thuật & Hiệu Năng Độc Lập</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Tối Ưu Phần Cứng Đến Từng Chu Kỳ CPU
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Chúng tôi xây dựng MVD Tech & Design dựa trên triết lý Native Engineering: từ chối các nền tảng cồng kềnh như Electron, giải mã trực tiếp từ phần cứng để đem lại tốc độ tức thì cho nhiếp ảnh gia chuyên nghiệp.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-white/[0.08] space-y-4 font-mono text-xs shadow-sm">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
              Tiêu Chuẩn Thử Nghiệm
            </div>
            <div className="space-y-2 divide-y divide-slate-100 dark:divide-white/[0.04]">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Mẫu kiểm tra:</span>
                <span className="text-slate-900 dark:text-white font-bold tabular-nums">2,000 RAW (33MP)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Phần cứng test:</span>
                <span className="text-slate-900 dark:text-white">Apple M3 Pro / Core i7</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">So sánh trực tiếp:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Lightroom Classic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Benchmark Table Component with Admin Custom Image */}
      <BenchmarkComparison />

      {/* 3. Under The Hood Specs Component */}
      <EngineeringSpecs />

      {/* 4. Bottom Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Trải nghiệm tốc độ thực tế trên chính máy tính của bạn
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Tương thích hoàn hảo macOS Apple Silicon (M1—M4), Mac Intel và Windows 10/11 64-bit.
        </p>
        <div className="flex justify-center gap-3 pt-3">
          <Link
            to="/download"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors duration-150 whitespace-nowrap shadow-sm"
          >
            Tải Bản Cài Đặt Ngay
          </Link>
          <Link
            to="/pricing"
            className="px-5 py-3 rounded-xl bg-white dark:bg-[#0E1422] hover:bg-slate-100 dark:hover:bg-[#161F33] text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition-colors duration-150 border border-slate-200 dark:border-white/[0.08] whitespace-nowrap shadow-sm"
          >
            Bảng Giá Tham Khảo
          </Link>
        </div>
      </section>
    </div>
  );
}
