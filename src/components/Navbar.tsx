import React from "react";
import { Glyph } from "./Glyph";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  version?: string;
  onOpenDownload?: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  const { isVi, setLanguage } = useLanguage();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="nav">
      {/* Brand logo & text */}
      <a className="brand" href="#top" onClick={scrollTo("top")} aria-label="DH Studio Pro">
        <img
          src="/brand/dh_app_icon_dark_squircle.png"
          alt="DH Studio Pro"
          style={{ width: 34, height: 34, objectFit: "contain" }}
        />
        <span><span className="m">DH</span> Studio Pro</span>
      </a>

      {/* Nav Links - 5 concise items matching mfinder.vn */}
      <nav className="nav-links" aria-label="Điều hướng chính">
        <a href="#loc-anh" onClick={scrollTo("loc-anh")}>
          {isVi ? "Tính năng" : "Features"}
        </a>
        <a href="#bo-cong-cu" onClick={scrollTo("bo-cong-cu")}>
          {isVi ? "Bộ công cụ" : "Superapp"}
        </a>
        <a href="#tat-ca" onClick={scrollTo("tat-ca")}>
          {isVi ? "Tất cả tính năng" : "All Features"}
        </a>
        <a href="#gia" onClick={scrollTo("gia")}>
          {isVi ? "Bảng giá" : "Pricing"}
        </a>
        <a href="#hoi-dap" onClick={scrollTo("hoi-dap")}>
          {isVi ? "Hỏi đáp" : "FAQ"}
        </a>
      </nav>

      {/* Actions: Language Switch & Download Button */}
      <div className="nav-actions">
        <div className="language-switch" aria-label="Ngôn ngữ">
          <button
            type="button"
            onClick={() => setLanguage("vi")}
            aria-current={isVi ? "page" : undefined}
            className={isVi ? "active" : ""}
          >
            VI
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-current={!isVi ? "page" : undefined}
            className={!isVi ? "active" : ""}
          >
            EN
          </button>
        </div>

        <a
          className="btn btn-dark btn-s dl"
          href="#download"
          onClick={(e) => {
            if (onOpenDownload) {
              e.preventDefault();
              onOpenDownload();
            } else {
              scrollTo("download")(e);
            }
          }}
        >
          <Glyph name="download" />
          <span>{isVi ? "Tải về" : "Download"}</span>
        </a>
      </div>
    </header>
  );
}

export default Navbar;
