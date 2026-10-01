import React from "react";
import {
  Camera,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function StudioWorkflow() {
  const steps = [
    {
      num: "01",
      icon: <Camera className="w-5 h-5 text-blue-400" />,
      title: "Cắm Thẻ & Đọc Ảnh RAW",
      desc: "Hỗ trợ nguyên bản Sony ARW, Canon CR2/CR3, Nikon NEF, Fuji RAF và JPEG. Đọc ảnh tức thì từ thẻ nhớ hoặc SSD tốc độ cao.",
    },
    {
      num: "02",
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: "Lọc Ảnh Siêu Tốc (Photo Picker)",
      desc: "Zoom 100% kiểm tra nét mắt trong 0.01 giây. Sử dụng phím tắt 1-5 sao, màu, space để tuyển chọn bộ ảnh trong vài phút.",
    },
    {
      num: "03",
      icon: <FileSpreadsheet className="w-5 h-5 text-blue-400" />,
      title: "Tự Động Bóc Tách (Contact Sheet)",
      desc: "Dán link Google Sheets hoặc folder Google Drive của khách. Phần mềm tự động dò mã và copy đúng các file đã chọn vào folder trả khách.",
    },
    {
      num: "04",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
      title: "Kiểm Soát & Xuất Báo Cáo",
      desc: "Photo Counter đối chiếu số lượng ảnh hợp đồng, xuất bảng thống kê file chi tiết giúp quản lý studio và thợ chụp bàn giao chính xác 100%.",
    },
  ];

  return (
    <section id="workflow" className="py-14 md:py-20 relative border-t border-b border-slate-800/80 bg-[#090D17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full studio-panel border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <Sparkles size={11} />
            Quy trình khép kín
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Một Quy Trình Tự Động Hóa Từ Thẻ Nhớ Đến Khách Hàng
          </h2>
          <p className="text-xs text-slate-400">
            Giúp studio giải phóng 90% thời gian ngồi dò từng số ảnh thủ công sau mỗi buổi chụp.
          </p>
        </div>

        {/* 4 Steps Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl studio-panel border border-slate-800 relative studio-panel-hover group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-mono font-black text-xs text-slate-600 group-hover:text-blue-400 transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
