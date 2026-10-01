import React, { useState } from "react";
import { ChevronDown, MessageSquare, PhoneCall } from "lucide-react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "MVD Tech & Design gồm những ứng dụng nào và phù hợp với ai?",
      a: "MVD Tech & Design là hệ sinh thái SuperApp tích hợp 4 công cụ chuyên nghiệp: (1) Photo Picker Pro lọc ảnh RAW/JPG siêu tốc không giật lag; (2) Contact The Sheet tự động đồng bộ Google Sheets & Drive bóc tách ảnh trả khách; (3) Photo Counter thống kê số lượng kiểm soát hợp đồng; (4) Resources Hub kho tài nguyên preset và typography độc quyền. Phần mềm phù hợp nhất cho các Studio ảnh cưới, phóng sự tiệc, kỷ yếu, sự kiện và thợ chụp tự do (freelancer).",
    },
    {
      q: "Gói dùng thử 7 ngày có bị giới hạn tính năng hay watermark vào ảnh không?",
      a: "Hoàn toàn KHÔNG! Khi tải về dùng thử, bạn được trải nghiệm 100% toàn bộ tính năng của cả 4 ứng dụng trong 7 ngày, không giới hạn số lượng ảnh lọc và tuyệt đối không chèn watermark hay can thiệp vào cấu trúc file ảnh gốc của bạn.",
    },
    {
      q: "Khi tôi đổi máy tính mới hoặc nâng cấp máy, bản quyền có được chuyển sang không?",
      a: "Có! Hệ thống hỗ trợ chuyển đổi thiết bị linh hoạt. Bạn chỉ cần đăng nhập tài khoản trên thiết bị mới, hệ thống sẽ xác thực và chuyển quyền sử dụng sang máy mới an toàn.",
    },
    {
      q: "Dữ liệu ảnh và danh sách khách hàng của Studio tôi có được bảo mật không?",
      a: "Tuyệt đối an toàn 100%! Mọi thao tác đọc, lọc, zoom, sao chép file ảnh đều diễn ra cục bộ (Local Air-Gapped) trên ổ cứng máy tính của bạn. MVD Tech & Design không bao giờ tải ảnh hay thông tin khách hàng của bạn lên máy chủ internet.",
    },
    {
      q: "Phần mềm có hoạt động được khi không có kết nối Internet không?",
      a: "Có! Phần mềm được thiết kế theo tư duy Local-First. Ngay cả khi bạn đang chụp ảnh ngoại cảnh ở vùng đồi núi, hải đảo hay studio bị mất mạng, bạn vẫn có thể mở app và lọc ảnh bình thường.",
    },
    {
      q: "Cơ chế tự động đăng xuất và làm mới phiên 0h00 theo giờ Việt Nam hoạt động thế nào?",
      a: "Hệ thống bản quyền được thiết lập để tự động xác thực và làm mới phiên đăng nhập vào đúng 0h00 hàng ngày (giờ Hà Nội/GMT+7). Điều này giúp bảo vệ bản quyền chính hãng của bạn, dọn sạch session tạm thời và ngăn chặn việc chia sẻ tài khoản trái phép.",
    },
    {
      q: "Nếu tôi gặp khó khăn khi cài đặt hoặc sử dụng, tôi sẽ nhận hỗ trợ từ đâu?",
      a: "Đội ngũ kỹ thuật hỗ trợ trực tiếp qua Zalo và UltraViewer/AnyDesk. Chúng tôi có thể kết nối từ xa để cài đặt, kích hoạt key và hướng dẫn thao tác chi tiết cho bạn bất cứ lúc nào.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative bg-[#07090E] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header: Left-Biased */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
              <MessageSquare size={11} />
              <span>Giải Đáp Thắc Mắc Kỹ Thuật</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Câu Hỏi Thường Gặp (FAQ)
            </h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Thông tin minh bạch về cơ chế kích hoạt bản quyền, bảo mật dữ liệu Local-First và quy trình hỗ trợ từ xa cho studio.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0E18] border border-white/[0.08] text-xs text-slate-400 self-start md:self-auto font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Hỗ trợ kỹ thuật 24/7</span>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-[#0A0E18] hover:border-white/[0.14] transition-colors overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-blue-300 transition-colors cursor-pointer"
              >
                <span className="leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180 text-blue-400" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zalo Support CTA */}
        <div className="mt-12 p-7 rounded-3xl bg-[#0E1526] border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              Cần hỗ trợ kỹ thuật hoặc tư vấn bản quyền studio?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Đội ngũ kỹ sư MVD Studio hỗ trợ trực tiếp từ xa qua Zalo & UltraViewer mọi lúc bạn cần.
            </p>
          </div>
          <a
            href="https://zalo.me/0339676003"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors duration-150 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <PhoneCall size={14} />
            <span>Zalo Kỹ Thuật: 0339 676 003</span>
          </a>
        </div>
      </div>
    </section>
  );
}
