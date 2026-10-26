import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { isVi } = useLanguage();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a
              className="brand"
              href="#top"
              onClick={scrollTo("top")}
              style={{ padding: 0, marginBottom: 14 }}
            >
              <img
                src="/brand/dh_app_icon_dock_light.png"
                alt="DH Studio Pro"
                style={{ width: 34, height: 34, objectFit: "contain" }}
              />
              <span>
                <span className="m" style={{ color: "var(--blue)", fontWeight: 800 }}>DH</span> Studio Pro
              </span>
            </a>
            <p style={{ margin: 0, maxWidth: 360, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
              {isVi
                ? "DH Studio Pro là hệ sinh thái phần mềm tự động hóa và lọc ảnh RAW tốc độ cao dành riêng cho Studio & Photographer chuyên nghiệp, do DevHouse Software phát triển tại Việt Nam."
                : "DH Studio Pro is a high-speed RAW photo filtering and studio automation ecosystem for professional studios & photographers, developed by DevHouse Software."}
            </p>
          </div>

          <div>
            <h5>{isVi ? "Khám phá" : "Explore"}</h5>
            <a href="#loc-anh" onClick={scrollTo("loc-anh")}>{isVi ? "Lọc ảnh siêu tốc" : "Photo Picker"}</a>
            <a href="#sheet" onClick={scrollTo("sheet")}>{isVi ? "Đồng bộ Google Sheets" : "Sheet Automation"}</a>
            <a href="#counter" onClick={scrollTo("counter")}>{isVi ? "Thống kê & KPI" : "Analytics & KPI"}</a>
            <a href="#hieu-nang" onClick={scrollTo("hieu-nang")}>{isVi ? "Hiệu năng & Bảo mật" : "Performance & Privacy"}</a>
          </div>

          <div>
            <h5>{isVi ? "Công cụ" : "Tools"}</h5>
            <a href="#bo-cong-cu" onClick={scrollTo("bo-cong-cu")}>{isVi ? "Bộ công cụ Superapp" : "Superapp Suite"}</a>
            <a href="#dinh-dang" onClick={scrollTo("dinh-dang")}>{isVi ? "Định dạng RAW & Convert" : "RAW Formats"}</a>
            <a href="#tat-ca" onClick={scrollTo("tat-ca")}>{isVi ? "Tất cả tính năng" : "All Features"}</a>
          </div>

          <div>
            <h5>{isVi ? "Bắt đầu" : "Get Started"}</h5>
            <a href="#download" onClick={scrollTo("download")}>{isVi ? "Tải cho Mac & Windows" : "Download"}</a>
            <a href="#gia" onClick={scrollTo("gia")}>{isVi ? "Bảng giá bản quyền" : "Pricing"}</a>
            <a href="#hoi-dap" onClick={scrollTo("hoi-dap")}>{isVi ? "Hỏi đáp & Hỗ trợ" : "FAQ & Support"}</a>
          </div>
        </div>

        <div className="copy">
          <span>© 2026 DevHouse Software. {isVi ? "Bảo lưu mọi quyền." : "All rights reserved."}</span>
          <span>{isVi ? "Một ứng dụng Studio chuyên nghiệp hàng đầu." : "Studio-grade automation suite."}</span>
        </div>
      </div>
    </footer>
  );
}
