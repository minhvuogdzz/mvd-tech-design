import React, { useState } from "react";
import { FAQ } from "@/components/FAQ";
import {
  HelpCircle,
  PhoneCall,
  MessageSquare,
  Monitor,
  Terminal,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ArrowRight,
} from "lucide-react";

export function SupportPage() {
  const [copiedMacCmd, setCopiedMacCmd] = useState(false);

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("xattr -cr /Applications/MVD.T.D.app");
    setCopiedMacCmd(true);
    setTimeout(() => setCopiedMacCmd(false), 2000);
  };

  const supportChannels = [
    {
      icon: <PhoneCall size={22} className="text-blue-400" />,
      title: "Hotline Kỹ Thuật Trực Tiếp",
      detail: "0339 676 003",
      sub: "Hỗ trợ cuộc gọi khẩn cấp trong giờ làm việc",
      action: "tel:0339676003",
      actionText: "Gọi ngay",
      primary: true,
    },
    {
      icon: <MessageSquare size={22} className="text-blue-400" />,
      title: "Zalo Kỹ Thuật 24/7",
      detail: "0339 676 003",
      sub: "Gửi ảnh chụp lỗi, nhận key bản quyền tức thì",
      action: "https://zalo.me/0339676003",
      actionText: "Nhắn tin Zalo",
      primary: true,
    },
    {
      icon: <Monitor size={22} className="text-blue-400" />,
      title: "Hỗ Trợ Cài Đặt Từ Xa",
      detail: "UltraViewer / AnyDesk",
      sub: "Kỹ thuật viên trực tiếp vào máy cài đặt & hướng dẫn",
      action: "https://zalo.me/0339676003",
      actionText: "Yêu cầu kết nối",
      primary: false,
    },
  ];

  return (
    <div className="py-14 space-y-24 ambient-glow">
      {/* 1. Page Header - Left-Biased, Editorial & Spacious */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
              <HelpCircle size={13} />
              <span>Trung Tâm Trợ Giúp & Chăm Sóc Khách Hàng</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hỗ Trợ Kỹ Thuật Studio 24/7
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Đội ngũ phát triển trực tiếp đồng hành cùng bạn. Bất kể khi cài đặt lần đầu hay cần tối ưu quy trình trả file, chúng tôi luôn sẵn sàng hỗ trợ.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-4 font-mono text-xs">
            <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">
              Thời Gian Hỗ Trợ
            </div>
            <div className="space-y-2 divide-y divide-white/[0.04]">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Khung giờ:</span>
                <span className="text-white font-bold tabular-nums">8:00 — 23:00</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Ngày làm việc:</span>
                <span className="text-emerald-400 font-bold">Tất cả các ngày</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Hỗ trợ từ xa:</span>
                <span className="text-blue-400 font-bold">UltraViewer / AnyDesk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Support Channels - Asymmetric & Featured */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Liên Hệ Kỹ Thuật Trực Tiếp
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Chọn kênh liên lạc phù hợp để được kỹ sư phản hồi trong vài phút.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((ch, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border flex flex-col justify-between space-y-5 ${
                ch.primary
                  ? "bg-[#0E1422] border-white/[0.1] hover:border-blue-500/40"
                  : "bg-[#0A0E18] border-white/[0.06] hover:border-white/[0.12]"
              } transition-colors duration-200`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  {ch.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{ch.title}</h3>
                  <div className="text-lg font-mono font-bold text-blue-400 mt-1 tabular-nums">
                    {ch.detail}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{ch.sub}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={ch.action}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap ${
                    ch.primary
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                      : "bg-[#141C2E] hover:bg-[#1B263E] text-slate-200"
                  }`}
                >
                  <span>{ch.actionText}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quick Diagnostics Terminal Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-white/[0.08] bg-[#0E1422] p-8 space-y-5">
          <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-4">
            <Terminal size={18} className="text-blue-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Khắc Phục Nhanh Lỗi Gatekeeper (macOS)
            </h3>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              Nếu macOS hiển thị thông báo <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>, bạn chỉ cần mở Terminal (nhấn Cmd + Space &rarr; gõ Terminal) và chạy dòng lệnh duy nhất sau:
            </p>
            <div className="p-4 rounded-2xl bg-[#06080E] border border-white/[0.08] font-mono text-xs text-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <code>xattr -cr /Applications/MVD.T.D.app</code>
              <button
                onClick={handleCopyCmd}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs cursor-pointer transition-colors duration-150 self-start sm:self-auto shrink-0"
              >
                {copiedMacCmd ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedMacCmd ? "Đã copy lệnh" : "Copy lệnh"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Lệnh này gỡ bỏ thuộc tính cách ly (quarantine attribute) của macOS cho ứng dụng an toàn.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ Component */}
      <FAQ />
    </div>
  );
}
