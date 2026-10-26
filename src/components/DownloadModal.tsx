import React, { useEffect } from "react";
import { LatestRelease } from "@/types/release";
import { Glyph } from "./Glyph";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  release: LatestRelease;
  isVi: boolean;
}

export function DownloadModal({ isOpen, onClose, release, isVi }: DownloadModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const version = release.version || "2.9.1";
  const macArm = release.downloads?.macArm64;
  const macIntel = release.downloads?.macIntel;
  const win = release.downloads?.windows;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(11, 13, 18, 0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "#ffffff",
          borderRadius: "28px",
          padding: "32px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          border: "1px solid rgba(11, 13, 18, 0.08)",
          animation: "modalIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#f1f3f7",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5f6673",
            fontSize: 16,
            fontWeight: 700,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e2e8f0";
            e.currentTarget.style.color = "#0b0d12";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f1f3f7";
            e.currentTarget.style.color = "#5f6673";
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src="/brand/dh_app_icon_dark_squircle.png"
            alt="DH Studio Pro"
            style={{ width: 56, height: 56, objectFit: "contain" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: "#0b0d12" }}>
                DH Studio Pro
              </h3>
              <span
                style={{
                  background: "rgba(47, 123, 255, 0.1)",
                  color: "var(--blue)",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                v{version}
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "#5f6673" }}>
              {isVi
                ? "Chọn phiên bản phù hợp với thiết bị của bạn để tải về trực tiếp:"
                : "Choose the package tailored for your machine for direct download:"}
            </p>
          </div>
        </div>

        {/* Download Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 6 }}>
          {/* Option 1: macOS Apple Silicon */}
          <a
            href={macArm?.url}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderRadius: "16px",
              background: "rgba(47, 123, 255, 0.05)",
              border: "1.5px solid rgba(47, 123, 255, 0.25)",
              textDecoration: "none",
              color: "#0b0d12",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(47, 123, 255, 0.12)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(47, 123, 255, 0.05)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "var(--blue)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name="download" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ fontSize: 16 }}>macOS (Apple Silicon)</b>
                  <span style={{ fontSize: 11, background: "#1fae55", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
                    M1 / M2 / M3 / M4
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#5f6673", marginTop: 2 }}>
                  {macArm?.name} · {macArm?.formattedSize || "10.8 MB"}
                </div>
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--blue)" }}>
              {isVi ? "Tải .DMG →" : "Download →"}
            </span>
          </a>

          {/* Option 2: macOS Intel */}
          <a
            href={macIntel?.url}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              textDecoration: "none",
              color: "#0b0d12",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "#64748b",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name="download" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ fontSize: 16 }}>macOS (Intel Chip)</b>
                  <span style={{ fontSize: 11, background: "#64748b", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
                    x86_64
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#5f6673", marginTop: 2 }}>
                  {macIntel?.name} · {macIntel?.formattedSize || "11.1 MB"}
                </div>
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>
              {isVi ? "Tải .DMG →" : "Download →"}
            </span>
          </a>

          {/* Option 3: Windows 64-bit */}
          <a
            href={win?.url}
            download
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              textDecoration: "none",
              color: "#0b0d12",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "#0284c7",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name="desktop" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b style={{ fontSize: 16 }}>Windows 10 / 11</b>
                  <span style={{ fontSize: 11, background: "#0284c7", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>
                    64-bit Setup
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#5f6673", marginTop: 2 }}>
                  {win?.name} · {win?.formattedSize || "7.6 MB"}
                </div>
              </div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0284c7" }}>
              {isVi ? "Tải .EXE →" : "Download →"}
            </span>
          </a>
        </div>

        {/* Modal Footer Note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#8b919c",
            borderTop: "1px solid #f1f3f7",
            paddingTop: 14,
            marginTop: 4,
          }}
        >
          <span>✓ {isVi ? "Dùng thử đầy đủ 7 ngày" : "Full 7-day evaluation"}</span>
          <span>✓ {isVi ? "100% Offline & Riêng tư" : "100% Local-First Offline"}</span>
          <span>✓ {isVi ? "Cập nhật tự động" : "Auto OTA updates"}</span>
        </div>
      </div>
    </div>
  );
}
