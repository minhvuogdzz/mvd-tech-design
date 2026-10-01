import React from "react";
import { Link } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import {
  FolderSync,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Download,
  ArrowRight,
  HardDrive,
  BarChart3,
  FileText,
} from "lucide-react";

interface PhotoCounterPageProps {
  release: LatestRelease;
}

export function PhotoCounterPage({ release }: PhotoCounterPageProps) {
  const auditData = [
    { type: "Sony RAW Uncompressed (.ARW)", count: "1,840 files", size: "82.4 GB", status: "Hoàn tất chụp gốc" },
    { type: "Photoshop Retouched Master (.PSD)", count: "35 files", size: "4.2 GB", status: "Đạt cam kết hợp đồng (35/35)" },
    { type: "High-Res JPEG Export (300 DPI)", count: "35 files", size: "280 MB", status: "Sẵn sàng in Album 30x30" },
    { type: "Ảnh Phóng Lớn (Cổng Cưới 60x90)", count: "2 files", size: "45 MB", status: "Sẵn sàng gửi xưởng in" },
    { type: "Video Highlight 4K (.MP4)", count: "1 file", size: "3.6 GB", status: "Đã render hoàn tất" },
  ];

  return (
    <div className="py-10 space-y-16">
      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Photo Counter · Audit & Delivery Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Kiểm Kê File & Đối Soát Hợp Đồng.{" "}
            <span className="text-blue-400">Chuẩn Xác 100%.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Công cụ đếm số lượng và phân loại file chuyên sâu cho quản lý studio và thợ chụp. Quét đệ quy mọi thư mục con, đối chiếu số lượng cam kết trong hợp đồng chụp và xuất biên bản nghiệm thu bàn giao khách hàng.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/download"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download size={15} />
              <span>Tải Photo Counter v{release.version}</span>
            </Link>
            <Link
              to="/pricing"
              className="px-5 py-3 rounded-xl bg-[#0C101B] hover:bg-[#121829] text-slate-300 font-semibold text-xs border border-white/[0.08] transition-colors flex items-center gap-1.5"
            >
              <span>Xem Bảng Giá Bản Quyền</span>
              <ArrowRight size={13} className="text-blue-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Live Audit Report Simulator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.1] bg-[#0A0D15] p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Biên Bản Kiểm Kê Dự Án (Live Inspection)
              </span>
              <h3 className="text-base font-bold text-white">
                Dự án: 2026-Wedding-TrangMinh-SSD_T7
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> Đủ Điều Kiện Nghiệm Thu
              </span>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#06080E] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Tổng dung lượng</span>
              <div className="text-xl font-mono font-bold text-white">90.5 GB</div>
              <span className="text-[11px] text-slate-400">1,913 files trên ổ đĩa SSD</span>
            </div>
            <div className="p-4 rounded-xl bg-[#06080E] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Cam kết hợp đồng</span>
              <div className="text-xl font-mono font-bold text-blue-400">35 / 35 Ảnh Sửa</div>
              <span className="text-[11px] text-emerald-400 font-medium">100% chỉ tiêu hợp đồng</span>
            </div>
            <div className="p-4 rounded-xl bg-[#06080E] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Ảnh phóng cổng cưới</span>
              <div className="text-xl font-mono font-bold text-white">2 / 2 Khổ 60x90</div>
              <span className="text-[11px] text-slate-400">Sẵn sàng gửi nhà in</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="bg-[#080B12] px-4 py-2.5 border-b border-white/[0.06] text-xs font-bold text-white flex justify-between">
              <span>Bảng Chi Tiết Định Dạng File</span>
              <span className="font-mono text-slate-400 text-[11px]">Deep Recursive Tree</span>
            </div>
            <div className="divide-y divide-white/[0.04] bg-[#05070B] font-mono text-xs">
              {auditData.map((row, idx) => (
                <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-slate-200 font-semibold">{row.type}</span>
                    <span className="text-[10px] text-slate-500 block">{row.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-400 font-bold">{row.count}</span>
                    <span className="text-slate-500 text-[11px] block">{row.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BarChart3 size={18} />
            </div>
            <h3 className="text-sm font-bold text-white">Quét Đệ Quy Không Giới Hạn</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tự động đi sâu vào từng thư mục con của máy 1, máy 2, flycam, thẻ nhớ phụ mà không bỏ sót bất kỳ một tệp tin hình ảnh nào.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileCheck size={18} />
            </div>
            <h3 className="text-sm font-bold text-white">Chống Thiếu & Thừa File</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cảnh báo ngay lập tức nếu số lượng ảnh chỉnh sửa thiếu so với cam kết gói chụp trong hợp đồng, giúp tránh khiếu nại từ khách hàng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText size={18} />
            </div>
            <h3 className="text-sm font-bold text-white">Xuất Báo Cáo Nghiệm Thu 1-Click</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Xuất biên bản thống kê rõ ràng để kẹp vào hồ sơ trả khách hoặc gửi xưởng gia công album ảnh cưới kiểm đếm.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Kiểm soát chính xác mọi bàn giao studio của bạn
        </h3>
        <p className="text-xs text-slate-400">
          Có sẵn trong bộ cài MVD Studio v{release.version}.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/download"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Tải Ngay Bộ Cài Đặt
          </Link>
          <Link
            to="/pricing"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Kích Hoạt Bản Quyền
          </Link>
        </div>
      </section>
    </div>
  );
}
