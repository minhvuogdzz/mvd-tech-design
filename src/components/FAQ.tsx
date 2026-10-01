import React, { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";

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
    <section id="faq" className="py-14 md:py-20 relative border-t border-slate-800/80 bg-[#090D17]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full studio-panel border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
            <span>Giải Đáp Thắc Mắc</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-xs text-slate-400">
            Thông tin chi tiết về bản quyền, quy trình cài đặt và hỗ trợ khách hàng.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="studio-panel rounded-xl border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-blue-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? "rotate-180 text-blue-400" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Zalo Support CTA */}
        <div className="mt-8 p-4 rounded-xl studio-panel border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-xs">
              Cần hỗ trợ kỹ thuật hoặc tư vấn bản quyền?
            </h4>
            <p className="text-[11px] text-slate-400">
              Đội ngũ MVD Studio luôn sẵn sàng hỗ trợ trực tiếp 24/7.
            </p>
          </div>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MessageSquare size={13} /> Nhắn Zalo Hỗ Trợ
          </a>
        </div>
      </div>
    </section>
  );
}
