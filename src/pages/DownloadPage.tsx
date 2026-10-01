import React from "react";
import { LatestRelease } from "@/types/release";
import { DownloadMatrix } from "@/components/DownloadMatrix";
import { Download, ShieldCheck, RefreshCw, Cpu, HardDrive, Terminal } from "lucide-react";

interface DownloadPageProps {
  release: LatestRelease;
}

export function DownloadPage({ release }: DownloadPageProps) {
  const sysReqs = [
    {
      os: "macOS Apple Silicon",
      cpu: "Apple M1 / M2 / M3 / M4 (Mọi biến thể Pro, Max, Ultra)",
      osVer: "macOS 11.0 (Big Sur) trở lên",
      ram: "8 GB RAM trở lên (Khuyến nghị 16 GB)",
      disk: "200 MB dung lượng trống",
    },
    {
      os: "macOS Intel",
      cpu: "Intel Core i5 / i7 / i9 (MacBook, iMac, Mac mini 2020 trở về trước)",
      osVer: "macOS 10.15 (Catalina) trở lên",
      ram: "8 GB RAM trở lên",
      disk: "250 MB dung lượng trống",
    },
    {
      os: "Windows 64-bit",
      cpu: "Intel Core i3/i5/i7/i9 hoặc AMD Ryzen 64-bit",
      osVer: "Windows 10 / Windows 11 (64-bit)",
      ram: "8 GB RAM trở lên (Khuyến nghị 16 GB)",
      disk: "200 MB dung lượng trống",
    },
  ];

  return (
    <div className="py-10 space-y-16">
      {/* 1. Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
          <Download size={12} />
          <span>Kho Phân Phối Trực Tiếp GitHub Releases</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Tải MVD Tech & Design v{release.version}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Tải về bộ cài đặt chính thức tương thích nguyên bản cho macOS và Windows. Bản cài đặt tích hợp sẵn 100% 4 ứng dụng trong hệ sinh thái.
        </p>
      </section>

      {/* 2. Download Matrix Component */}
      <DownloadMatrix release={release} />

      {/* 3. System Requirements Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D15] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Cpu size={16} className="text-blue-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Yêu Cầu Cấu Hình Hệ Thống Tối Thiểu
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs divide-y divide-white/[0.06]">
              <thead>
                <tr className="text-slate-500 text-[10px]">
                  <th className="py-2 pr-4">Hệ Điều Hành</th>
                  <th className="py-2 pr-4">Vi Xử Lý (CPU)</th>
                  <th className="py-2 pr-4">Phiên Bản OS</th>
                  <th className="py-2 pr-4">Bộ Nhớ RAM</th>
                  <th className="py-2">Ổ Đĩa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-[11px] text-slate-300">
                {sysReqs.map((req, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 font-bold text-blue-400">{req.os}</td>
                    <td className="py-3 pr-4">{req.cpu}</td>
                    <td className="py-3 pr-4 text-slate-400">{req.osVer}</td>
                    <td className="py-3 pr-4">{req.ram}</td>
                    <td className="py-3 text-slate-400">{req.disk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Auto-Update Mechanism Note */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-2xl bg-[#090C16] border border-white/[0.08] flex flex-col md:flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <RefreshCw size={20} />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-white">Cơ Chế Cập Nhật Tự Động (Continuous Delivery)</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Khi có bản vá lỗi hoặc tính năng mới được build từ GitHub Actions, ứng dụng máy tính sẽ tự động nhận diện và thông báo nâng cấp chỉ bằng 1 cú click mà không cần gỡ cài đặt cũ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
