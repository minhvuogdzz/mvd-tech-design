import React from "react";
import { Link } from "react-router-dom";
import { BenchmarkComparison } from "@/components/BenchmarkComparison";
import { EngineeringSpecs } from "@/components/EngineeringSpecs";
import { Gauge, Cpu, HardDrive, ShieldCheck, Zap, Download } from "lucide-react";

export function BenchmarkPage() {
  return (
    <div className="py-10 space-y-16">
      {/* 1. Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
            <Gauge size={12} />
            <span>Kỹ Thuật & Hiệu Năng Độc Lập</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tối Ưu Phần Cứng Đến Từng Chu Kỳ CPU
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Chúng tôi xây dựng MVD Tech & Design dựa trên triết lý Native Engineering: từ chối các nền tảng cồng kềnh như Electron, giải mã trực tiếp từ phần cứng để đem lại tốc độ tức thì cho nhiếp ảnh gia chuyên nghiệp.
          </p>
        </div>
      </section>

      {/* 2. Benchmark Table Component */}
      <BenchmarkComparison />

      {/* 3. Under The Hood Specs Component */}
      <EngineeringSpecs />

      {/* 4. Bottom Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Trải nghiệm tốc độ thực tế trên chính máy tính của bạn
        </h3>
        <p className="text-xs text-slate-400">
          Tương thích hoàn hảo macOS Apple Silicon (M1-M4), Mac Intel và Windows 10/11 64-bit.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/download"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Tải Bản Cài Đặt Ngay
          </Link>
          <Link
            to="/pricing"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Bảng Giá Kích Hoạt
          </Link>
        </div>
      </section>
    </div>
  );
}
