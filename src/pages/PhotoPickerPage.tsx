import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LatestRelease } from "@/types/release";
import {
  Layers,
  Zap,
  Eye,
  Camera,
  Star,
  Download,
  CheckCircle2,
  Cpu,
  ArrowRight,
  HardDrive,
  Sliders,
  Maximize2,
} from "lucide-react";

interface PhotoPickerPageProps {
  release: LatestRelease;
}

export function PhotoPickerPage({ release }: PhotoPickerPageProps) {
  const [loupeActive, setLoupeActive] = useState(true);
  const [activeStar, setActiveStar] = useState(5);

  const supportedFormats = [
    { brand: "Sony", formats: ".ARW (A7R V 61MP, A7 IV 33MP, A1 50MP, A9 III)" },
    { brand: "Canon", formats: ".CR2 / .CR3 (EOS R5, R6 II, R3, 5D Mark IV)" },
    { brand: "Nikon", formats: ".NEF (Z8, Z9, Z6 III, D850)" },
    { brand: "Fujifilm", formats: ".RAF (X-T5, X-H2, GFX 100 II)" },
    { brand: "Standard", formats: ".JPG / .JPEG / .PNG / .TIFF sRGB & AdobeRGB" },
  ];

  const features = [
    {
      title: "Giải Mã Trực Tiếp Embedded Preview",
      desc: "Thay vì de-mosaic toàn bộ cảm biến Bayer 60MP trên CPU gây nghẽn, MVD đọc trực tiếp khối preview độ phân giải cao từ phần cứng bằng LibRaw, cho tốc độ hiển thị tức thì trong 0.02 giây.",
      stat: "0.02s",
      statLabel: "Thời gian mở ảnh",
    },
    {
      title: "Kính Lúp Soi Nét Mắt 1:1 Siêu Nét",
      desc: "Nhấn giữ hoặc toggle phím Z để soi nét 100% tại tròng mắt và lông mi cô dâu chú rể. Kiểm tra ngay lập tức ảnh có bị out nét hoặc rung tay hay không mà không cần zoom toàn màn hình.",
      stat: "<16ms",
      statLabel: "Độ trễ lúp 100%",
    },
    {
      title: "Đồng Bộ Phím Tắt Tiêu Chuẩn Studio",
      desc: "Bàn phím được tối ưu hóa cho thợ lọc ảnh chuyên nghiệp: phím 1..5 gán sao, phím 6..9 gán nhãn màu, phím Space lướt ảnh tiếp theo, phím Z soi nét mắt. Thao tác quen thuộc 100% như Lightroom.",
      stat: "60 FPS",
      statLabel: "Khung hình lướt liên tục",
    },
    {
      title: "Tiết Kiệm Bộ Nhớ Đệm RAM Vượt Trội",
      desc: "Chỉ chiếm dụng từ 118MB đến 190MB RAM ngay cả khi nạp thư mục hơn 3,000 ảnh RAW. Máy tính không bị nóng, không hú quạt và hoạt động cực êm ái trên cả MacBook Air M1 cơ bản.",
      stat: "118 MB",
      statLabel: "RAM trung bình",
    },
  ];

  return (
    <div className="py-10 space-y-16">
      {/* 1. Product Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Photo Picker Pro · Cull Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lọc Hàng Nghìn Ảnh RAW Thần Tốc.{" "}
            <span className="text-blue-400">Không Giật Lag.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Phần mềm chọn ảnh chuyên nghiệp thế hệ mới xây dựng trên Rust native. Giải quyết triệt để sự ì ạch của Lightroom khi phải lọc các buổi chụp tiệc cưới, phóng sự từ 1,500 đến 3,000 ảnh RAW.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/download"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download size={15} />
              <span>Tải Photo Picker Pro v{release.version}</span>
            </Link>
            <Link
              to="/benchmark"
              className="px-5 py-3 rounded-xl bg-[#0C101B] hover:bg-[#121829] text-slate-300 font-semibold text-xs border border-white/[0.08] transition-colors flex items-center gap-1.5"
            >
              <span>Xem So Sánh Benchmark</span>
              <ArrowRight size={13} className="text-blue-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive Feature Showcase Stage */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.1] bg-[#0A0D15] overflow-hidden shadow-2xl">
          <div className="h-10 px-4 bg-[#07090F] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-400">SONY ILCE-7M4 · DSC04892.ARW (33.1 MP Uncompressed RAW)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLoupeActive(!loupeActive)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  loupeActive ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                <Eye size={11} /> {loupeActive ? "[Z] Soi Nét 100% Đang Bật" : "[Z] Bật Soi Nét 100%"}
              </button>
            </div>
          </div>

          <div className="relative min-h-[420px] flex items-center justify-center p-6 bg-black/60">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
              alt="Studio RAW Preview"
              className="max-h-[380px] w-auto object-contain rounded shadow-2xl"
            />

            {/* Interactive Loupe Overlay */}
            {loupeActive && (
              <div className="absolute top-8 right-8 w-52 h-52 rounded-2xl border-2 border-blue-500 bg-[#090D17] shadow-2xl overflow-hidden flex flex-col pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                <div className="h-6 bg-blue-600 text-white px-2.5 flex items-center justify-between text-[9px] font-mono font-bold">
                  <span className="flex items-center gap-1">
                    <Eye size={10} /> 1:1 Eye Focus Reticle
                  </span>
                  <span>0.01s Latency</span>
                </div>
                <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=95"
                    alt="100% Loupe"
                    className="w-full h-full object-cover scale-150"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 border border-emerald-400 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="h-5 bg-black/90 px-2 flex items-center justify-between text-[8px] font-mono text-emerald-400">
                  <span>Right Eye AF Locked</span>
                  <span>PIN SHARP 100%</span>
                </div>
              </div>
            )}

            {/* Camera EXIF Floating HUD */}
            <div className="absolute bottom-8 left-8 px-3.5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 space-y-1 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold">
                <Camera size={13} className="text-blue-400" />
                <span>SONY ILCE-7M4</span>
                <span className="text-slate-500">|</span>
                <span>FE 50mm F1.4 GM</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-[9px]">
                <span className="text-blue-400 font-bold">1/4000s</span>
                <span>f/1.4</span>
                <span>ISO 100</span>
                <span className="text-emerald-400">60 FPS Hardware Render</span>
              </div>
            </div>

            {/* Star Rating Interactive HUD */}
            <div className="absolute bottom-8 right-8 p-2.5 rounded-xl bg-[#0B0F1A]/90 backdrop-blur-md border border-white/10 flex items-center gap-3 shadow-xl">
              <span className="text-[10px] font-mono text-slate-400">Đánh giá:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setActiveStar(star)}
                    className={`p-1 rounded cursor-pointer transition-transform hover:scale-125 ${
                      star <= activeStar ? "text-amber-400 fill-amber-400" : "text-slate-600"
                    }`}
                  >
                    <Star size={15} className={star <= activeStar ? "fill-current" : ""} />
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">★ {activeStar}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0A0D15] border border-white/[0.08] hover:border-blue-500/30 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="text-right">
                    <span className="text-base font-mono font-extrabold text-blue-400">
                      {item.stat}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 block">
                      {item.statLabel}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RAW Format Support Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0D15] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Cpu size={16} className="text-blue-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Ma Trận Định Dạng Tương Thích (Hardware LibRaw Support)
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04] text-xs font-mono">
            {supportedFormats.map((item, idx) => (
              <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-blue-400 font-bold min-w-32">{item.brand}</span>
                <span className="text-slate-300">{item.formats}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">
          Sẵn sàng lọc ảnh với tốc độ 60 FPS mượt mà?
        </h3>
        <p className="text-xs text-slate-400">
          Tải về dùng thử đầy đủ 100% tính năng trong 7 ngày trên macOS và Windows.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/download"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Tải Ngay Bản Cài Đặt
          </Link>
          <Link
            to="/pricing"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Xem Bảng Giá Bản Quyền
          </Link>
        </div>
      </section>
    </div>
  );
}
