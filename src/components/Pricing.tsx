import React, { useState } from "react";
import { Check, Zap, QrCode, X, PhoneCall } from "lucide-react";

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    period: string;
    code: string;
  } | null>(null);

  const plans = [
    {
      id: "trial",
      name: "Gói Dùng Thử",
      price: "0đ",
      period: "7 ngày",
      badge: "MIỄN PHÍ",
      highlight: false,
      desc: "Trải nghiệm đầy đủ 100% tính năng của hệ sinh thái MVD T&D trước khi quyết định mua bản quyền.",
      features: [
        "Đầy đủ 4 ứng dụng trong SuperApp",
        "Không giới hạn số lượng ảnh lọc",
        "Tự động hóa Google Sheets & Drive",
        "Thống kê ảnh Photo Counter",
        "Hỗ trợ kỹ thuật qua Zalo",
      ],
      cta: "Tải Dùng Thử Ngay",
      link: "#downloads",
    },
    {
      id: "pro_annual",
      name: "Bản Quyền 1 Năm",
      price: "499.000đ",
      period: "12 tháng",
      badge: "KHUYÊN DÙNG",
      highlight: true,
      desc: "Lựa chọn tiết kiệm chi phí tối ưu dành cho thợ ảnh tự do (freelancer) và studio vừa.",
      features: [
        "Sử dụng không giới hạn 365 ngày",
        "Trọn bộ Photo Picker Pro + Contact The Sheet",
        "Mở khóa toàn bộ kho Presets & Overlays",
        "Cập nhật miễn phí mọi tính năng mới trong năm",
        "Hỗ trợ cài đặt từ xa qua UltraViewer / AnyDesk",
        "Ưu tiên hỗ trợ kỹ thuật 24/7",
      ],
      cta: "Đăng Ký Gói 1 Năm",
      action: () =>
        setSelectedPlan({
          name: "Gói Bản Quyền 1 Năm",
          price: "499.000đ",
          period: "12 tháng",
          code: "MVD PRO 1Y",
        }),
    },
    {
      id: "lifetime",
      name: "Bản Quyền Vĩnh Viễn",
      price: "999.000đ",
      period: "Trọn đời",
      badge: "SỞ HỮU MÃI MÃI",
      highlight: false,
      desc: "Thanh toán 1 lần duy nhất, sở hữu mãi mãi và nhận toàn bộ bản nâng cấp trong tương lai.",
      features: [
        "Sở hữu vĩnh viễn không thời hạn",
        "Đầy đủ mọi ứng dụng hiện tại & tương lai",
        "Miễn phí mọi bản nâng cấp v3.x, v4.x trọn đời",
        "Mở khóa độc quyền kho tài nguyên VIP",
        "Hỗ trợ chuyển đổi máy khi nâng cấp thiết bị mới",
        "Kênh hỗ trợ VIP riêng biệt",
      ],
      cta: "Sở Hữu Trọn Đời",
      action: () =>
        setSelectedPlan({
          name: "Gói Bản Quyền Vĩnh Viễn",
          price: "999.000đ",
          period: "Trọn đời",
          code: "MVD LIFETIME",
        }),
    },
  ];

  return (
    <section id="pricing" className="py-14 md:py-20 relative border-t border-slate-800/80 bg-[#090D17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full studio-panel border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Bảng Giá Bản Quyền</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Chi Phí Hợp Lý, Giá Trị Lâu Dài
          </h2>
          <p className="text-xs text-slate-400">
            Kích hoạt bản quyền chính hãng để mở khóa toàn bộ sức mạnh của MVD Tech & Design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                plan.highlight
                  ? "bg-[#0E1626] border-2 border-blue-500/70 shadow-[0_0_35px_-5px_rgba(37,99,235,0.2)]"
                  : "studio-panel border border-slate-800 hover:border-slate-700"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  Được Chọn Nhiều Nhất
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {plan.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        plan.highlight
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      {plan.price}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      / {plan.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    Quyền lợi bao gồm:
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <div
                          className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                            plan.highlight
                              ? "bg-blue-500 text-white"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          <Check size={9} className="stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                {plan.action ? (
                  <button
                    onClick={plan.action}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                      plan.highlight
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    <Zap size={13} />
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href={plan.link}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60"
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VietQR / License Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md studio-panel rounded-2xl p-6 border border-blue-500/40 shadow-2xl bg-[#0D131F] text-slate-100 space-y-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <QrCode size={22} />
              </div>
              <h3 className="text-base font-bold text-white">
                Kích Hoạt {selectedPlan.name}
              </h3>
              <p className="text-xs text-slate-400">
                Giá cước: <span className="font-mono font-bold text-blue-400">{selectedPlan.price}</span> ({selectedPlan.period})
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090D17] border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 border-b border-slate-800">
                <span className="text-slate-400">Ngân hàng:</span>
                <span className="font-bold text-white">MB Bank (Quân Đội)</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-slate-800">
                <span className="text-slate-400">Số tài khoản:</span>
                <span className="font-mono font-bold text-blue-400 text-sm">
                  8888 8888 8888
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-slate-800">
                <span className="text-slate-400">Chủ tài khoản:</span>
                <span className="font-bold text-white uppercase">DƯƠNG MINH VƯƠNG</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-400">Nội dung chuyển khoản:</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedPlan.code} [SĐT]
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 text-center space-y-0.5">
              <p className="font-bold text-[11px]">⚡ Kích Hoạt Key Tự Động Trong Vài Phút</p>
              <p className="text-[10px] text-slate-400">
                Sau khi chuyển khoản, bạn nhắn tin Zalo để được kích hoạt ngay lập tức.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800"
              >
                Đóng
              </button>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PhoneCall size={13} />
                Nhắn Zalo Kích Hoạt
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
