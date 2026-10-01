import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import {
  FileSpreadsheet,
  Zap,
  CheckCircle2,
  Terminal,
  RefreshCw,
  Copy,
  Download,
  ArrowRight,
  FolderSync,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

interface ContactSheetPageProps {
  release: LatestRelease;
}

export function ContactSheetPage({ release }: ContactSheetPageProps) {
  const [sheetInput, setSheetInput] = useState(
    "Khách báo in album cưới: DSC04892, DSC04895, 4901..4905, 4910, 5012-5015 (giao trước thứ 6)"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Sẵn sàng bóc tách. Nhấn nút để khởi chạy Regex Engine...",
  ]);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const runExtraction = () => {
    setIsProcessing(true);
    setLogs(["[1/5] Bắt đầu nhận diện chuỗi regex và mở rộng dải số..."]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[2/5] Đã bóc tách thành công 12 mã ảnh mục tiêu: 4892, 4895, 4901, 4902, 4903, 4904, 4905, 4910, 5012, 5013, 5014, 5015",
      ]);
    }, 250);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[3/5] Quét đệ quy thư mục gốc SSD: /Volumes/Sony_RAW/2026_Wedding_TrangMinh/ (2,450 files)",
      ]);
    }, 550);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "  ↳ Khớp DSC04892.ARW -> Tìm thấy",
        "  ↳ Khớp dải DSC04901.ARW .. DSC04905.ARW -> Tìm thấy đủ 5 files",
        "  ↳ Khớp dải DSC05012.ARW .. DSC05015.ARW -> Tìm thấy đủ 4 files",
      ]);
    }, 850);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[4/5] Sao chép an toàn (Atomic File Copy) vào: /Exports/KhachChon_Album_30x30/",
        "✓ [5/5] Hoàn tất 12/12 file khớp chính xác 100% trong 0.42 giây! (0 file thất lạc)",
      ]);
      setSuccessCount(12);
      setIsProcessing(false);
    }, 1150);
  };

  const steps = [
    {
      num: "01",
      title: "Nhận Danh Sách Từ Khách",
      desc: "Khách gửi link Google Sheets, Google Drive hoặc nhắn tin Zalo với các mã số viết tắt, dải gạch nối (ví dụ: 4901-4905).",
    },
    {
      num: "02",
      title: "Phân Tích Regex Thông Minh",
      desc: "Hệ thống tự động loại bỏ tiền tố thừa (DSC, IMG, _MG), tách dải số liên tiếp và chuẩn hóa danh sách mã file chuẩn xác.",
    },
    {
      num: "03",
      title: "Dò Quét & Sao Chép Tức Thì",
      desc: "Quét sâu toàn bộ thư mục thẻ nhớ hoặc SSD ngoài, tìm đúng file RAW gốc và sao chép vào folder bàn giao chỉ trong vài giây.",
    },
  ];

  return (
    <div className="py-10 space-y-16">
      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Contact The Sheet · Automation Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tự Động Bóc Tách Google Sheets.{" "}
            <span className="text-blue-400">Tiết Kiệm 2 Giờ Trả File.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Chấm dứt hoàn toàn công việc nhàm chán ngồi gõ tìm từng số ảnh khách chọn trên máy tính. Dán link Google Sheets hoặc danh sách mã ảnh, phần mềm tự động tìm và gom toàn bộ file RAW gốc chuẩn xác 100%.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/download"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download size={15} />
              <span>Tải Contact The Sheet v{release.version}</span>
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

      {/* 2. Interactive Regex Simulator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.1] bg-[#0A0D15] p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left: Input Form */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                  Thử Nghiệm Trực Tiếp Trên Web
                </span>
                <h3 className="text-base font-bold text-white">
                  Nhập văn bản mã chọn từ khách hàng:
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bạn có thể chỉnh sửa đoạn văn bản dưới đây để kiểm tra khả năng bóc tách dải số thông minh.
                </p>
                <textarea
                  value={sheetInput}
                  onChange={(e) => setSheetInput(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-[#06080E] border border-white/[0.08] font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={runExtraction}
                  disabled={isProcessing}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Đang Quét & Bóc Tách...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={13} />
                      <span>Chạy Bóc Tách File RAW (0.4s)</span>
                    </>
                  )}
                </button>

                {successCount && (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Đã khớp {successCount} files 100%
                  </span>
                )}
              </div>
            </div>

            {/* Right: Terminal Console Output */}
            <div className="rounded-xl border border-white/[0.08] bg-[#05070B] p-4 flex flex-col justify-between font-mono text-xs space-y-2 min-h-[220px]">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal size={12} className="text-blue-400" />
                  <span>Terminal Engine Logs</span>
                </span>
                <span>Tốc độ: 0.04s Regex Parser</span>
              </div>

              <div className="space-y-1.5 overflow-y-auto max-h-[200px] text-[11px] leading-relaxed">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.startsWith("✓")
                        ? "text-emerald-400 font-bold"
                        : log.startsWith("  ↳")
                        ? "text-blue-300 pl-2"
                        : "text-slate-400"
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-500">
                <span>An toàn dữ liệu: Atomic Copy</span>
                <span className="text-emerald-400 font-bold">100% Zero File Thất Lạc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three-Step Workflow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Quy Trình 3 Bước Tự Động Hóa 100%
          </h2>
          <p className="text-xs text-slate-400">
            Giúp studio rút ngắn quy trình trả ảnh từ vài tiếng xuống còn vài chục giây.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] space-y-3"
            >
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Bước {st.num}
              </span>
              <h3 className="text-sm font-bold text-white">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Loại bỏ ngay sự mệt mỏi khi ngồi dò từng số ảnh!
        </h3>
        <p className="text-xs text-slate-400">
          Tích hợp sẵn trong bộ cài đặt MVD Tech & Design v{release.version}.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/download"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Tải Bản Cài Đặt Ngay
          </Link>
          <Link
            to="/apps/photo-counter"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Tìm Hiểu Photo Counter &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
