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
      icon: <PhoneCall size={20} className="text-blue-400" />,
      title: "Hotline Kỹ Thuật Trực Tiếp",
      detail: "0339 676 003",
      sub: "Hỗ trợ cuộc gọi khẩn cấp trong giờ làm việc",
      action: "tel:0339676003",
      actionText: "Gọi ngay",
    },
    {
      icon: <MessageSquare size={20} className="text-blue-400" />,
      title: "Zalo Kỹ Thuật 24/7",
      detail: "0339 676 003",
      sub: "Gửi ảnh chụp lỗi, nhận key bản quyền tức thì",
      action: "https://zalo.me/0339676003",
      actionText: "Nhắn tin Zalo",
    },
    {
      icon: <Monitor size={20} className="text-blue-400" />,
      title: "Hỗ Trợ Cài Đặt Từ Xa",
      detail: "UltraViewer / AnyDesk",
      sub: "Kỹ thuật viên trực tiếp vào máy cài đặt & hướng dẫn",
      action: "https://zalo.me/0339676003",
      actionText: "Yêu cầu kết nối",
    },
  ];

  return (
    <div className="py-10 space-y-16">
      {/* 1. Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
          <HelpCircle size={12} />
          <span>Trung Tâm Trợ Giúp & Chăm Sóc Khách Hàng</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Hỗ Trợ Kỹ Thuật Studio 24/7
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Đội ngũ phát triển trực tiếp đồng hành cùng bạn. Bất kể khi cài đặt lần đầu hay cần tối ưu quy trình trả file, chúng tôi luôn sẵn sàng hỗ trợ.
        </p>
      </section>

      {/* 2. Direct Support Channels */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {supportChannels.map((ch, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  {ch.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ch.title}</h3>
                  <div className="text-base font-mono font-bold text-blue-400 mt-1">
                    {ch.detail}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{ch.sub}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <a
                  href={ch.action}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  {ch.actionText} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quick Diagnostics Terminal Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D15] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Terminal size={16} className="text-blue-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Khắc Phục Nhanh Lỗi Gatekeeper (macOS)
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              Nếu macOS hiển thị thông báo <em>&ldquo;Không thể mở vì nhà phát triển không xác định&rdquo;</em>, bạn chỉ cần mở Terminal (nhấn Cmd + Space &rarr; gõ Terminal) và chạy dòng lệnh duy nhất sau:
            </p>
            <div className="p-3 rounded-xl bg-[#06080E] border border-white/[0.08] font-mono text-[11px] text-emerald-400 flex items-center justify-between">
              <code>xattr -cr /Applications/MVD.T.D.app</code>
              <button
                onClick={handleCopyCmd}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
              >
                {copiedMacCmd ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedMacCmd ? "Đã copy" : "Copy lệnh"}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
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
