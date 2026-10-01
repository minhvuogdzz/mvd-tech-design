"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, QrCode, X, PhoneCall } from "lucide-react";

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
      name: "Trải Nghiệm Miễn Phí",
      price: "0đ",
      period: "7 ngày dùng thử",
      badge: "KHÔNG CẦN THẺ",
      highlight: false,
      desc: "Trải nghiệm đầy đủ 100% tính năng của hệ sinh thái MVD T&D trước khi quyết định mua bản quyền.",
      features: [
        "Đầy đủ 4 ứng dụng trong SuperApp",
        "Không giới hạn số lượng ảnh lọc",
        "Tự động hóa Google Sheets & Drive",
        "Thống kê ảnh Photo Counter",
        "Hỗ trợ kỹ thuật qua Zalo",
      ],
      cta: "Tải Bản Dùng Thử Ngay",
      link: "#downloads",
    },
    {
      id: "pro_annual",
      name: "Bản Quyền 1 Năm",
      price: "499.000đ",
      period: "1 năm sử dụng",
      badge: "PHỔ BIẾN NHẤT",
      highlight: true,
      desc: "Lựa chọn tối ưu chi phí dành cho thợ ảnh tự do (freelancer) và studio dịch vụ chụp ảnh.",
      features: [
        "Sử dụng không giới hạn 365 ngày",
        "Trọn bộ Photo Picker Pro + Contact The Sheet",
        "Mở khóa toàn bộ kho Presets & Overlays",
        "Cập nhật miễn phí mọi tính năng mới trong năm",
        "Hỗ trợ cài đặt từ xa qua UltraViewer / AnyDesk",
        "Ưu tiên hỗ trợ kỹ thuật 24/7",
      ],
      cta: "Kích Hoạt Gói 1 Năm",
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
      period: "Sở hữu trọn đời",
      badge: "TIẾT KIỆM TỐI ĐA",
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
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles size={12} />
            Bảng giá minh bạch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Đầu Tư Một Lần,{" "}
            <span className="gradient-text-amber">Tiết Kiệm Hàng Trăm Giờ Làm Việc</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Chỉ với chi phí bằng một buổi chụp ảnh nhỏ, bạn sở hữu ngay trợ thủ đắc lực giúp trả file nhanh gấp 10 lần và nâng tầm uy tín với khách hàng.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#1c1f30] to-[#121420] border-2 border-amber-500 shadow-[0_0_50px_-10px_rgba(245,158,11,0.25)] scale-100 md:-translate-y-2"
                  : "glass-panel border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[11px] font-black uppercase tracking-wider shadow-md">
                  Gói Được Đề Xuất
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {plan.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        plan.highlight
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      / {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                    {plan.desc}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Quyền lợi bao gồm:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            plan.highlight
                              ? "bg-amber-500 text-black"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          <Check size={11} className="stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-white/5">
                {plan.action ? (
                  <button
                    onClick={plan.action}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      plan.highlight
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/20 hover:scale-[1.02]"
                        : "bg-white/10 hover:bg-white/15 text-white"
                    }`}
                  >
                    <Zap size={16} />
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href={plan.link}
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Thanh Toán / Nhận License Key */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl bg-[#0f111c] text-white space-y-6 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <QrCode size={28} />
              </div>
              <h3 className="text-xl font-black">
                Kích Hoạt {selectedPlan.name}
              </h3>
              <p className="text-xs text-zinc-400">
                Giá cước: <span className="font-bold text-amber-400 text-sm">{selectedPlan.price}</span> ({selectedPlan.period})
              </p>
            </div>

            {/* Payment Details Box */}
            <div className="p-4 rounded-2xl bg-[#161826] border border-white/10 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">Ngân hàng:</span>
                <span className="font-bold text-white">MB Bank (Quân Đội)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">Số tài khoản:</span>
                <span className="font-mono font-bold text-amber-400 text-base">
                  8888 8888 8888
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">Chủ tài khoản:</span>
                <span className="font-bold text-white uppercase">DƯƠNG MINH VƯƠNG</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">Nội dung chuyển khoản:</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {selectedPlan.code} [SĐT của bạn]
                </span>
              </div>
            </div>

            {/* Support Hotline */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 text-center space-y-1">
              <p className="font-bold">⚡ Tự Động Kích Hoạt Key Trong 1 Phút</p>
              <p className="text-[11px] text-zinc-400">
                Sau khi chuyển khoản, hệ thống sẽ tự động kích hoạt hoặc bạn có thể gửi tin nhắn Zalo để được kích hoạt ngay lập tức.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold text-zinc-400 hover:bg-white/5"
              >
                Đóng
              </button>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
              >
                <PhoneCall size={14} />
                Nhắn Zalo Kích Hoạt
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
