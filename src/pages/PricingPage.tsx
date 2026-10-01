import React from "react";
import { Pricing } from "@/components/Pricing";
import { ShieldCheck, Clock, RefreshCw, Smartphone, Zap } from "lucide-react";

export function PricingPage() {
  const policies = [
    {
      icon: <Clock size={18} className="text-blue-400" />,
      title: "Làm Mới Phiên 0h00 Hàng Ngày",
      desc: "Vào đúng 0h00 theo giờ Việt Nam, phiên đăng nhập được làm mới để bảo vệ bản quyền chính hãng và dọn sạch session tạm thời.",
    },
    {
      icon: <Smartphone size={18} className="text-blue-400" />,
      title: "Chuyển Đổi Máy Tính Linh Hoạt",
      desc: "Khi bạn nâng cấp MacBook hoặc đổi máy tính mới, bản quyền được hỗ trợ chuyển đổi sang máy mới nhanh chóng mà không mất thêm phí.",
    },
    {
      icon: <ShieldCheck size={18} className="text-blue-400" />,
      title: "Không Ẩn Phí, Không Ép Thuê Bao",
      desc: "Lựa chọn gói 1 năm hoặc sở hữu vĩnh viễn trọn đời. Tuyệt đối không tự động trừ tiền trong thẻ tín dụng của bạn.",
    },
    {
      icon: <Zap size={18} className="text-blue-400" />,
      title: "Hoàn Vốn Sau 1 Buổi Chụp",
      desc: "Tiết kiệm 2 - 3 giờ lọc file cho mỗi ca chụp tiệc. Giúp studio bàn giao file đúng hẹn và nâng cao uy tín với khách hàng.",
    },
  ];

  return (
    <div className="py-14 space-y-24 ambient-glow">
      {/* 1. Header - Left-Biased, Editorial & Spacious */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
              <ShieldCheck size={13} />
              <span>Bản Quyền Chính Hãng MVD Tech & Design</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bảng Giá Minh Bạch & Đầu Tư Lâu Dài
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Kích hoạt trọn bộ hệ sinh thái 4 ứng dụng. Thanh toán an toàn qua VietQR tự động và nhận mã kích hoạt bản quyền ngay lập tức.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-4 font-mono text-xs">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
              Quyền Lợi Kèm Theo
            </div>
            <div className="space-y-2 divide-y divide-white/[0.04]">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Kích hoạt:</span>
                <span className="text-emerald-400 font-bold">VietQR Tự Động</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Số thiết bị:</span>
                <span className="text-white">1 Máy / Chuyển Đổi Tự Do</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Hỗ trợ kỹ thuật:</span>
                <span className="text-blue-400 font-bold">Zalo / UltraViewer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Pricing Component */}
      <Pricing />

      {/* 3. License Terms & Guarantees */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Chính Sách Bản Quyền & Quyền Lợi Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Mọi điều khoản được công khai minh bạch để bảo vệ quyền lợi cao nhất cho studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
