"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from "lucide-react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "MVD Tech & Design gồm những ứng dụng nào và phù hợp với ai?",
      a: "MVD Tech & Design là hệ sinh thái SuperApp tích hợp 4 công cụ chuyên nghiệp: (1) Photo Picker Pro lọc ảnh RAW/JPG siêu tốc; (2) Contact The Sheet tự động đồng bộ Google Sheets & Drive trả ảnh khách; (3) Photo Counter thống kê số lượng kiểm soát hợp đồng; (4) Resources Hub kho tài nguyên preset và đồ họa độc quyền. Phần mềm phù hợp nhất cho các Studio ảnh cưới, phóng sự, tiệc, kỷ yếu, sự kiện và thợ chụp tự do (freelancer).",
    },
    {
      q: "Gói dùng thử 7 ngày có bị giới hạn tính năng hay watermark vào ảnh không?",
      a: "Hoàn toàn KHÔNG! Khi tải về dùng thử, bạn được trải nghiệm 100% toàn bộ tính năng của cả 4 ứng dụng trong 7 ngày, không giới hạn số lượng ảnh lọc và tuyệt đối không chèn watermark hay làm suy giảm chất lượng ảnh gốc của bạn.",
    },
    {
      q: "Khi tôi mua máy tính mới hoặc nâng cấp máy, bản quyền có được chuyển sang máy mới không?",
      a: "Có! Hệ thống hỗ trợ chuyển đổi thiết bị cực kỳ linh hoạt. Bạn chỉ cần đăng nhập tài khoản trên máy tính mới và kích hoạt, hệ thống sẽ tự động đồng bộ và chuyển đổi bản quyền sang máy mới một cách an toàn.",
    },
    {
      q: "Dữ liệu ảnh và danh sách khách hàng của Studio tôi có được bảo mật không?",
      a: "Tuyệt đối an toàn 100%! Mọi thao tác đọc, lọc, zoom, sao chép file ảnh đều diễn ra cục bộ (Local) trên ổ cứng máy tính của bạn. MVD Tech & Design không bao giờ tải ảnh hay file khách hàng của bạn lên máy chủ internet.",
    },
    {
      q: "Phần mềm có hoạt động được khi không có mạng Internet không?",
      a: "Có! Phần mềm được thiết kế để hoạt động hoàn toàn Offline. Ngay cả khi bạn đang chụp ảnh ở vùng đồi núi, hải đảo hay studio bị mất mạng, bạn vẫn có thể mở app và lọc ảnh bình thường.",
    },
    {
      q: "Nếu tôi gặp khó khăn khi cài đặt hoặc sử dụng, tôi sẽ nhận hỗ trợ từ đâu?",
      a: "Đội ngũ kỹ thuật hỗ trợ trực tiếp qua Zalo và UltraViewer/AnyDesk. Chúng tôi có thể kết nối từ xa để hỗ trợ cài đặt, kích hoạt key và hướng dẫn thao tác chi tiết từng bước cho bạn bất cứ lúc nào.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-white/10 text-xs font-bold text-zinc-300 uppercase tracking-widest">
            <HelpCircle size={12} className="text-amber-400" />
            Giải đáp thắc mắc
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Mọi thông tin bạn cần biết về bản quyền, quy trình cài đặt và chính sách hỗ trợ.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-zinc-400 shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-12 p-6 rounded-3xl glass-panel border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-white text-base">
              Bạn vẫn còn câu hỏi khác?
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Đội ngũ hỗ trợ MVD Studio luôn sẵn sàng giải đáp và hướng dẫn bạn 24/7.
            </p>
          </div>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 border border-white/15 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle size={15} className="text-amber-400" />
            Nhắn Tin Hỗ Trợ Zalo
          </a>
        </div>
      </div>
    </section>
  );
}
