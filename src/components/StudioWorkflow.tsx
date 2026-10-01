import React from "react";
import {
  Camera,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  GitCommit,
} from "lucide-react";

export function StudioWorkflow() {
  const steps = [
    {
      num: "01",
      icon: <Camera size={16} className="text-blue-400" />,
      title: "Cắm Thẻ & Đọc RAW Tức Thì",
      desc: "Hỗ trợ nguyên bản Sony ARW, Canon CR2/CR3, Nikon NEF, Fuji RAF và JPG. Tự động đọc embedded preview không tốn thời gian render.",
      timing: "0.00s latency",
    },
    {
      num: "02",
      icon: <Layers size={16} className="text-blue-400" />,
      title: "Lọc 100% Loupe Siêu Tốc",
      desc: "Soi nét lông mi & tròng mắt trong 0.01 giây bằng phím Z. Đánh giá 1-5 sao, gán nhãn màu 6-9 đồng bộ phím tắt Lightroom.",
      timing: "60 FPS mượt mà",
    },
    {
      num: "03",
      icon: <FileSpreadsheet size={16} className="text-blue-400" />,
      title: "Bóc Tách Mã Google Sheets",
      desc: "Dán link Google Sheets hoặc danh sách số ảnh khách chọn. Regex engine tự động tìm đúng file gốc và copy vào thư mục trả khách.",
      timing: "0.4s hoàn tất",
    },
    {
      num: "04",
      icon: <CheckCircle2 size={16} className="text-blue-400" />,
      title: "Đối Soát Hợp Đồng Nghiệm Thu",
      desc: "Photo Counter tự động đối chiếu số lượng ảnh cam kết trong hợp đồng (ảnh in, ảnh phóng, ảnh sửa) và xuất biên bản nghiệm thu.",
      timing: "Chính xác 100%",
    },
  ];

  return (
    <section id="workflow" className="py-14 md:py-20 relative border-b border-white/[0.08] bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <GitCommit size={11} />
            <span>Quy Trình Chuẩn Studio</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Một Chu Trình Tự Động Hóa Từ Thẻ Nhớ Đến Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Giúp studio giải phóng 90% thời gian ngồi dò từng số ảnh thủ công sau mỗi buổi chụp.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-blue-500/40 transition-colors relative flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-mono font-bold text-xs text-slate-600 group-hover:text-blue-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">Benchmark:</span>
                <span className="text-emerald-400 font-bold">{step.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
