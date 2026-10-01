import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Zap, QrCode, X, PhoneCall, Copy, CheckCircle2 } from "lucide-react";

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    period: string;
    code: string;
  } | null>(null);

  const [copiedCode, setCopiedCode] = useState(false);

  const plans = [
    {
      id: "trial",
      name: "Bản Dùng Thử",
      price: "0đ",
      period: "7 ngày đầy đủ",
      badge: "MIỄN PHÍ",
      highlight: false,
      desc: "Trải nghiệm đầy đủ 100% tính năng của hệ sinh thái MVD Studio trước khi quyết định mua bản quyền.",
      features: [
        "Đầy đủ 4 ứng dụng trong bộ cài đặt",
        "Không giới hạn số lượng ảnh lọc",
        "Tự động hóa Google Sheets & Drive",
        "Thống kê ảnh Photo Counter",
        "Hỗ trợ kỹ thuật qua Zalo",
      ],
      cta: "Tải Dùng Thử Ngay",
      link: "/download",
    },
    {
      id: "pro_annual",
      name: "Bản Quyền 1 Năm",
      price: "499.000đ",
      period: "12 tháng",
      badge: "KHUYÊN DÙNG",
      highlight: true,
      desc: "Lựa chọn tiết kiệm chi phí tối ưu dành cho thợ ảnh tự do (freelancer) và studio quy mô vừa.",
      features: [
        "Sử dụng không giới hạn 365 ngày",
        "Trọn bộ Photo Picker Pro + Contact The Sheet",
        "Mở khóa toàn bộ kho Presets & Typography",
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="pricing" className="py-14 md:py-20 relative bg-[#090C16] border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Bảng Giá Bản Quyền</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Chi Phí Đầu Tư Hợp Lý Cho Studio & Nhiếp Ảnh Gia
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tiết kiệm 60 giờ ngồi dò mã ảnh thủ công mỗi tháng. Chỉ 1 buổi chụp dịch vụ đã hoàn vốn đầu tư phần mềm.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                plan.highlight
                  ? "bg-[#0C121F] border-2 border-blue-500 shadow-2xl shadow-blue-500/10"
                  : "bg-[#0A0D15] border border-white/[0.08] hover:border-white/[0.15]"
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
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
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

              <div className="pt-6 mt-4 border-t border-white/[0.06]">
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
                  <Link
                    to={plan.link}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/[0.06]"
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VietQR / License Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl p-6 border border-blue-500/40 shadow-2xl bg-[#0C101B] text-slate-100 space-y-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <QrCode size={20} />
              </div>
              <h3 className="text-base font-bold text-white">
                Kích Hoạt {selectedPlan.name}
              </h3>
              <p className="text-xs text-slate-400">
                Số tiền thanh toán: <span className="font-mono font-bold text-blue-400">{selectedPlan.price}</span> ({selectedPlan.period})
              </p>
            </div>

            {/* QR Image Box */}
            <div className="flex justify-center p-3 rounded-xl bg-white/5 border border-white/10">
              <img
                src="/brand/qr_payment.jpg"
                alt="VietQR Chuyển Khoản"
                className="w-48 h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#07090F] border border-white/[0.08] space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Ngân hàng:</span>
                <span className="font-bold text-white">MB Bank (Quân Đội)</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Số tài khoản:</span>
                <span className="font-mono font-bold text-blue-400 text-sm">
                  8888 8888 8888
                </span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Chủ tài khoản:</span>
                <span className="font-bold text-white uppercase">DƯƠNG MINH VƯƠNG</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-400">Nội dung CK:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedPlan.code} [SĐT]
                  </span>
                  <button
                    onClick={() => handleCopyCode(`${selectedPlan.code} 0339676003`)}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                    title="Copy nội dung"
                  >
                    {copiedCode ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 text-center space-y-0.5">
              <p className="font-bold text-[11px]">⚡ Kích Hoạt Key Tự Động Trong Vài Phút</p>
              <p className="text-[10px] text-slate-400">
                Sau khi chuyển khoản, bạn nhắn tin Zalo hoặc gọi 0339 676 003 để nhận mã kích hoạt bản quyền ngay lập tức.
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.08] text-xs font-bold text-slate-400 hover:bg-slate-800 cursor-pointer"
              >
                Đóng
              </button>
              <a
                href="https://zalo.me/0339676003"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <PhoneCall size={13} />
                Nhắn Zalo Nhận Key
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
