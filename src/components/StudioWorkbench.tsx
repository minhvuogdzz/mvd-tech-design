import React, { useState } from "react";
import {
  Layers,
  FileSpreadsheet,
  FolderSync,
  Search,
  Check,
  Star,
  Zap,
  Sliders,
  Maximize2,
  Copy,
  Terminal,
  CheckCircle2,
  RefreshCw,
  Eye,
  Camera,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

interface SamplePhoto {
  id: string;
  name: string;
  rating: number;
  color: "none" | "red" | "yellow" | "green" | "blue";
  shutter: string;
  aperture: string;
  iso: string;
  lens: string;
  camera: string;
  focusPoint: string;
  previewUrl: string;
  loupeCropUrl: string;
}

const SAMPLE_PHOTOS: SamplePhoto[] = [
  {
    id: "p1",
    name: "DSC04892.ARW",
    rating: 5,
    color: "green",
    shutter: "1/4000s",
    aperture: "f/1.4",
    iso: "ISO 100",
    lens: "FE 50mm F1.4 GM",
    camera: "SONY ILCE-7M4",
    focusPoint: "Eye AF (Right Eye Locked)",
    previewUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    loupeCropUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=95",
  },
  {
    id: "p2",
    name: "DSC04895.ARW",
    rating: 4,
    color: "blue",
    shutter: "1/3200s",
    aperture: "f/1.4",
    iso: "ISO 100",
    lens: "FE 50mm F1.4 GM",
    camera: "SONY ILCE-7M4",
    focusPoint: "Eye AF (Center Locked)",
    previewUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    loupeCropUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=95",
  },
  {
    id: "p3",
    name: "DSC04901.ARW",
    rating: 0,
    color: "none",
    shutter: "1/5000s",
    aperture: "f/1.8",
    iso: "ISO 125",
    lens: "FE 85mm F1.4 GM",
    camera: "SONY ILCE-7M4",
    focusPoint: "Eye AF (Left Eye Locked)",
    previewUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    loupeCropUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=95",
  },
  {
    id: "p4",
    name: "DSC04902.ARW",
    rating: 5,
    color: "red",
    shutter: "1/2000s",
    aperture: "f/1.4",
    iso: "ISO 200",
    lens: "FE 50mm F1.4 GM",
    camera: "SONY ILCE-7M4",
    focusPoint: "Face Tracking Wide",
    previewUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    loupeCropUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=95",
  },
  {
    id: "p5",
    name: "DSC04910.ARW",
    rating: 3,
    color: "yellow",
    shutter: "1/4000s",
    aperture: "f/2.0",
    iso: "ISO 100",
    lens: "FE 35mm F1.4 GM",
    camera: "SONY ILCE-7M4",
    focusPoint: "Eye AF (Right Eye Locked)",
    previewUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    loupeCropUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=95",
  },
];

export function StudioWorkbench() {
  const [activeTab, setActiveTab] = useState<"picker" | "sheets" | "counter">("picker");

  // State for Photo Picker
  const [photos, setPhotos] = useState<SamplePhoto[]>(SAMPLE_PHOTOS);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [loupeActive, setLoupeActive] = useState<boolean>(true);

  // State for Contact The Sheet
  const [sheetInput, setSheetInput] = useState<string>(
    "Khách gửi in album: DSC04892, DSC04895, 4901..4905, 4910 (giao trước thứ 6)"
  );
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedLogs, setExtractedLogs] = useState<string[]>([
    "Sẵn sàng bóc tách. Nhấn nút để khởi chạy Regex Engine...",
  ]);
  const [matchedCount, setMatchedCount] = useState<number>(0);

  const activePhoto = photos[selectedIdx];

  const handleRate = (stars: number) => {
    setPhotos((prev) =>
      prev.map((p, idx) => (idx === selectedIdx ? { ...p, rating: stars } : p))
    );
  };

  const handleColor = (color: SamplePhoto["color"]) => {
    setPhotos((prev) =>
      prev.map((p, idx) => (idx === selectedIdx ? { ...p, color } : p))
    );
  };

  const runSheetExtractor = () => {
    setIsExtracting(true);
    setExtractedLogs(["[1/5] Khởi động bộ phân tích Regex & Fuzzy Parser..."]);

    setTimeout(() => {
      setExtractedLogs((prev) => [
        ...prev,
        "[2/5] Nhận diện dải mã: 'DSC04892', 'DSC04895', '4901..4905' (5 file liên tiếp), '4910'",
      ]);
    }, 200);

    setTimeout(() => {
      setExtractedLogs((prev) => [
        ...prev,
        "[3/5] Quét thư mục gốc SSD: /Volumes/Sony_T7/2026_Wedding_TrangMinh/RAW (1,480 files)",
      ]);
    }, 450);

    setTimeout(() => {
      setExtractedLogs((prev) => [
        ...prev,
        "  ↳ Khớp DSC04892.ARW (33.1MB) -> OK",
        "  ↳ Khớp DSC04895.ARW (33.4MB) -> OK",
        "  ↳ Khớp dải DSC04901.ARW đến DSC04905.ARW (165.2MB) -> OK",
        "  ↳ Khớp DSC04910.ARW (32.9MB) -> OK",
      ]);
    }, 700);

    setTimeout(() => {
      setExtractedLogs((prev) => [
        ...prev,
        "[4/5] Sao chép an toàn (Zero Data Loss) vào thư mục: /Exports/KhachChon_Album_30x30/",
        "✓ [5/5] Hoàn tất 8/8 file khớp chính xác 100% trong 0.38 giây! (Không sót 1 file nào)",
      ]);
      setMatchedCount(8);
      setIsExtracting(false);
    }, 950);
  };

  return (
    <section id="workbench" className="py-12 md:py-20 relative border-b border-slate-200 dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Zap size={11} />
            <span>Interactive Studio Simulator</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trải Nghiệm Trực Tiếp Workbench Trên Web
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Không cần xem video quảng cáo chung chung. Dưới đây là mô phỏng thực tế thao tác lọc ảnh & tự động hóa bóc tách Google Sheets của MVD Studio.
          </p>
        </div>

        {/* Studio Window Frame */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.12] bg-[#0A0D15] shadow-2xl overflow-hidden">
          {/* Window Titlebar */}
          <div className="h-11 px-4 bg-[#07090F] border-b border-white/[0.08] flex items-center justify-between select-none">
            {/* Clean Status Header */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="text-[11px] font-mono text-slate-200 font-bold">
                MVD Studio Pro
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                Session: 2026-Wedding-TrangMinh · Sony A7 IV (1,480 RAWs)
              </span>
            </div>

            {/* Workbench Tab Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-white/[0.08] text-[11px]">
              <button
                onClick={() => setActiveTab("picker")}
                className={`px-3 py-1 rounded-md transition-colors duration-150 flex items-center gap-1.5 cursor-pointer font-medium ${
                  activeTab === "picker"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={13} />
                <span>Photo Picker Pro</span>
              </button>
              <button
                onClick={() => setActiveTab("sheets")}
                className={`px-3 py-1 rounded-md transition-colors duration-150 flex items-center gap-1.5 cursor-pointer font-medium ${
                  activeTab === "sheets"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileSpreadsheet size={13} />
                <span>Contact The Sheet</span>
              </button>
              <button
                onClick={() => setActiveTab("counter")}
                className={`px-3 py-1 rounded-md transition-colors duration-150 flex items-center gap-1.5 cursor-pointer font-medium ${
                  activeTab === "counter"
                    ? "bg-blue-600 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FolderSync size={13} />
                <span>Photo Counter</span>
              </button>
            </div>
          </div>

          {/* TAB 1: PHOTO PICKER PRO SIMULATOR */}
          {activeTab === "picker" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Left Sidebar: Session & Filter Stats */}
              <div className="lg:col-span-3 border-r border-white/[0.08] bg-[#080B12] p-4 flex flex-col justify-between text-xs space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                      Thư Mục Đang Lọc
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0C101A] border border-white/[0.06] space-y-1">
                      <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs truncate">
                        <FolderOpen size={14} className="text-blue-400 shrink-0" />
                        <span className="truncate">2026_Wedding_TrangMinh</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                        <span>Tổng số file:</span>
                        <span className="text-slate-300 font-bold">1,480 RAWs</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                        <span>Tốc độ đọc cache:</span>
                        <span className="text-emerald-400 font-bold">0.02s / file</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filters */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">
                      Bộ Lọc Sao & Màu
                    </div>
                    {[
                      { label: "5 Sao (Tuyển chọn VIP)", count: 42, color: "text-amber-400", key: "Phím 5" },
                      { label: "4 Sao (Ảnh đẹp dự phòng)", count: 88, color: "text-amber-300", key: "Phím 4" },
                      { label: "3 Sao (Ảnh gia đình)", count: 120, color: "text-amber-200", key: "Phím 3" },
                      { label: "Nhãn Xanh (In Album)", count: 35, color: "text-emerald-400", key: "Phím 8" },
                      { label: "Nhãn Đỏ (Retouch kỹ)", count: 15, color: "text-rose-400", key: "Phím 6" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D16] border border-white/[0.04] text-[11px] text-slate-300 hover:bg-[#101524] transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className={`font-bold ${item.color}`}>★</span>
                          <span>{item.label}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-slate-500 bg-slate-800 px-1 py-0.5 rounded">
                            {item.key}
                          </span>
                          <span className="font-mono font-bold text-slate-200">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Shortcut Helper */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 space-y-1">
                    <div className="font-bold flex items-center gap-1 text-blue-200">
                      <Zap size={12} /> Thử Thao Tác Trực Tiếp:
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Click vào các ngôi sao hoặc nút nhãn màu ở góc phải để đánh giá ảnh mẫu ngay trên web.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>RAM bộ nhớ đệm:</span>
                  <span className="text-blue-400 font-bold">118 MB / 1,480 RAWs</span>
                </div>
              </div>

              {/* Main Photo Canvas Area */}
              <div className="lg:col-span-9 flex flex-col justify-between bg-[#07090F]">
                {/* Photo Viewer HUD Header */}
                <div className="h-10 px-4 border-b border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white text-xs">
                      {activePhoto.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      SONY 33MP RAW
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline-block">
                      {activePhoto.camera} · {activePhoto.lens}
                    </span>
                  </div>

                  {/* Loupe & Rating Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLoupeActive(!loupeActive)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        loupeActive
                          ? "bg-blue-600 text-white font-bold shadow-sm"
                          : "bg-slate-800 text-slate-300 hover:text-white"
                      }`}
                    >
                      <Eye size={12} />
                      <span>{loupeActive ? "[Z] Đang Soi Nét 100%" : "[Z] Bật Soi Nét"}</span>
                    </button>
                  </div>
                </div>

                {/* Photo Canvas Stage */}
                <div className="relative flex-1 min-h-[360px] flex items-center justify-center p-4 bg-black/60 overflow-hidden">
                  <img
                    src={activePhoto.previewUrl}
                    alt={activePhoto.name}
                    className="max-h-[340px] w-auto object-contain rounded shadow-2xl transition-all"
                  />

                  {/* Eye Focus 100% Loupe Simulation */}
                  {loupeActive && (
                    <div className="absolute top-6 right-6 w-44 h-44 rounded-2xl border-2 border-blue-500 bg-[#090D17] shadow-2xl overflow-hidden flex flex-col pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <div className="h-6 bg-blue-600 text-white px-2 flex items-center justify-between text-[9px] font-mono font-bold">
                        <span className="flex items-center gap-1">
                          <Eye size={10} /> 100% 1:1 Pixel Crop
                        </span>
                        <span>0.01s</span>
                      </div>
                      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                        <img
                          src={activePhoto.loupeCropUrl}
                          alt="100% Crop"
                          className="w-full h-full object-cover scale-150"
                        />
                        {/* Target Reticle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border border-emerald-400/80 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="h-5 bg-black/80 px-2 flex items-center justify-between text-[8px] font-mono text-emerald-400">
                        <span>{activePhoto.focusPoint}</span>
                        <span>PIN SHARP</span>
                      </div>
                    </div>
                  )}

                  {/* Camera EXIF Floating HUD */}
                  <div className="absolute bottom-6 left-6 px-3 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300 space-y-1 shadow-lg pointer-events-none">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Camera size={12} className="text-blue-400" />
                      <span>{activePhoto.camera}</span>
                      <span className="text-slate-500">|</span>
                      <span>{activePhoto.lens}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[9px]">
                      <span className="text-blue-300 font-bold">{activePhoto.shutter}</span>
                      <span>{activePhoto.aperture}</span>
                      <span>{activePhoto.iso}</span>
                      <span className="text-emerald-400">Embedded RAW 60fps</span>
                    </div>
                  </div>

                  {/* Interactive Star & Color Overlay */}
                  <div className="absolute bottom-6 right-6 p-2 rounded-xl bg-[#0B0F1A]/90 backdrop-blur-md border border-white/10 flex items-center gap-3 shadow-lg">
                    {/* Stars 1-5 */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(star)}
                          className={`p-1 rounded transition-colors duration-150 cursor-pointer ${
                            star <= activePhoto.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600 hover:text-amber-300"
                          }`}
                          title={`Gán ${star} sao`}
                        >
                          <Star size={14} className={star <= activePhoto.rating ? "fill-current" : ""} />
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-4 bg-white/10" />

                    {/* Color Labels */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleColor("red")}
                        className={`w-3.5 h-3.5 rounded-full bg-rose-500 hover:opacity-80 transition-opacity duration-150 cursor-pointer border ${
                          activePhoto.color === "red" ? "ring-2 ring-white" : "border-rose-400/40"
                        }`}
                        title="Nhãn Đỏ (Phím 6)"
                      />
                      <button
                        onClick={() => handleColor("yellow")}
                        className={`w-3.5 h-3.5 rounded-full bg-amber-500 hover:opacity-80 transition-opacity duration-150 cursor-pointer border ${
                          activePhoto.color === "yellow" ? "ring-2 ring-white" : "border-amber-400/40"
                        }`}
                        title="Nhãn Vàng (Phím 7)"
                      />
                      <button
                        onClick={() => handleColor("green")}
                        className={`w-3.5 h-3.5 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity duration-150 cursor-pointer border ${
                          activePhoto.color === "green" ? "ring-2 ring-white" : "border-emerald-400/40"
                        }`}
                        title="Nhãn Xanh Lá (Phím 8)"
                      />
                      <button
                        onClick={() => handleColor("blue")}
                        className={`w-3.5 h-3.5 rounded-full bg-blue-500 hover:opacity-80 transition-opacity duration-150 cursor-pointer border ${
                          activePhoto.color === "blue" ? "ring-2 ring-white" : "border-blue-400/40"
                        }`}
                        title="Nhãn Xanh Dương (Phím 9)"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Filmstrip Thumbnails */}
                <div className="h-18 px-3 py-2 bg-[#080B12] border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto">
                  <div className="text-[10px] font-mono text-slate-500 mr-1 shrink-0">
                    Strip:
                  </div>
                  {photos.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedIdx(idx)}
                      className={`relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedIdx === idx
                          ? "border-blue-500 ring-2 ring-blue-500/30 scale-105"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={p.previewUrl} alt={p.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/75 px-1 py-0.5 text-[8px] font-mono text-slate-300 flex justify-between">
                        <span className="truncate">{p.name.replace(".ARW", "")}</span>
                        {p.rating > 0 && <span className="text-amber-400">★{p.rating}</span>}
                      </div>
                    </button>
                  ))}
                  <div className="text-[10px] font-mono text-slate-500 ml-auto shrink-0 px-2 hidden sm:block">
                    [Mũi tên Trái / Phải] hoặc [Space] để lướt ảnh tiếp theo
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT THE SHEET AUTOMATION SIMULATOR */}
          {activeTab === "sheets" && (
            <div className="p-6 md:p-8 bg-[#080B12] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Input Simulated Box */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                      Bước 1: Nhập Danh Sách Mã Ảnh Từ Khách Hàng
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      Bóc Tách Tự Động Từ Google Sheets / Zalo / Excel
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Khách hàng thường copy mã ảnh lộn xộn hoặc gửi link Google Sheets với dải số (ví dụ: 4901..4905). MVD Contact The Sheet tự động nhận diện regex và mở rộng dải số chuẩn 100%.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-slate-400 block">
                      Dữ liệu khách gửi (Thử chỉnh sửa văn bản này):
                    </label>
                    <textarea
                      value={sheetInput}
                      onChange={(e) => setSheetInput(e.target.value)}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-[#0C101A] border border-white/[0.1] font-mono text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={runSheetExtractor}
                      disabled={isExtracting}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      {isExtracting ? (
                        <>
                          <RefreshCw size={13} className="animate-spin" />
                          <span>Đang Phân Tích & Khớp File...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={13} />
                          <span>Chạy Bóc Tách File RAW (0.4s)</span>
                        </>
                      )}
                    </button>

                    {matchedCount > 0 && (
                      <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Đã khớp {matchedCount}/8 file
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Live Terminal Execution */}
                <div className="rounded-xl border border-white/[0.08] bg-[#05070B] p-4 flex flex-col justify-between font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Terminal size={12} className="text-blue-400" />
                      <span>Console Logs (Rust Native Matcher)</span>
                    </span>
                    <span>Tốc độ: 0.04s Regex / 1,480 files</span>
                  </div>

                  <div className="space-y-1.5 min-h-[180px] max-h-[220px] overflow-y-auto text-[11px]">
                    {extractedLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className={`${
                          log.startsWith("✓")
                            ? "text-emerald-400 font-bold"
                            : log.startsWith("  ↳")
                            ? "text-blue-300 pl-2"
                            : "text-slate-400"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-500">
                    <span>Trạng thái: Local I/O An Toàn</span>
                    <span className="text-blue-400">Zero Cloud Upload</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTO COUNTER AUDIT SIMULATOR */}
          {activeTab === "counter" && (
            <div className="p-6 md:p-8 bg-[#080B12] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#0C101A] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Tổng Dung Lượng Dự Án
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-white">84.6 GB</div>
                  <div className="text-[11px] text-slate-400">1,842 files trên thẻ nhớ SSD</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C101A] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    File Cam Kết Hợp Đồng
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-blue-400">35 / 35 Ảnh</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Đã đủ số lượng bàn giao khách
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C101A] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Thời Gian Tiết Kiệm
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400">2.5 Giờ</div>
                  <div className="text-[11px] text-slate-400">So với lọc tay từng file trên Lightroom</div>
                </div>
              </div>

              {/* File Breakdown Table */}
              <div className="rounded-xl border border-white/[0.08] overflow-hidden text-xs">
                <div className="bg-[#0C101A] px-4 py-2.5 border-b border-white/[0.08] font-bold text-white flex justify-between">
                  <span>Phân Loại Định Dạng Thư Mục Dự Án</span>
                  <span className="text-[11px] font-mono text-slate-400">Tự động quét đệ quy (Deep Recursive Scan)</span>
                </div>
                <div className="divide-y divide-white/[0.04] bg-[#07090F] font-mono text-[11px]">
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Sony RAW Uncompressed (.ARW)
                    </span>
                    <span className="text-slate-400">1,800 files · 80.2 GB</span>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Adobe Photoshop Master (.PSD)
                    </span>
                    <span className="text-slate-400">35 files (Retouch hoàn tất) · 4.2 GB</span>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Export In Khổ Lớn (.JPG sRGB)
                    </span>
                    <span className="text-slate-400">35 files (100% sRGB Print Ready) · 210 MB</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
