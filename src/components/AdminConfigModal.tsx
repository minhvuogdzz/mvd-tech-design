import React, { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import {
  X,
  Phone,
  Image as ImageIcon,
  Save,
  RotateCcw,
  CheckCircle2,
  Upload,
  ExternalLink,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export function AdminConfigModal() {
  const { config, updateConfig, resetConfig, isAdminModalOpen, closeAdminModal } =
    useSiteConfig();

  const [phone, setPhone] = useState(config.phone);
  const [benchmarkImageUrl, setBenchmarkImageUrl] = useState(
    config.benchmarkImageUrl
  );
  const [benchmarkTitle, setBenchmarkTitle] = useState(config.benchmarkTitle);
  const [benchmarkNotes, setBenchmarkNotes] = useState(config.benchmarkNotes);
  const [savedToast, setSavedToast] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isAdminModalOpen) {
      setPhone(config.phone);
      setBenchmarkImageUrl(config.benchmarkImageUrl);
      setBenchmarkTitle(config.benchmarkTitle);
      setBenchmarkNotes(config.benchmarkNotes);
    }
  }, [isAdminModalOpen, config]);

  if (!isAdminModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng ảnh tối đa là 5MB. Vui lòng chọn ảnh nhỏ hơn.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setBenchmarkImageUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      phone: phone.trim(),
      benchmarkImageUrl,
      benchmarkTitle: benchmarkTitle.trim(),
      benchmarkNotes: benchmarkNotes.trim(),
    });

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      closeAdminModal();
    }, 1200);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn khôi phục về cấu hình mặc định ban đầu (SĐT: 0869528304)?"
      )
    ) {
      resetConfig();
      setPhone("0869528304");
      setBenchmarkImageUrl("");
      setBenchmarkTitle(
        "Hiệu Năng Thực Tế: MVD Photo Picker Pro vs Adobe Lightroom Classic"
      );
      setBenchmarkNotes(
        "Thử nghiệm thực địa với 2,000 file RAW Sony 33MP (ILCE-7M4) trên máy MacBook Pro Apple Silicon (M-Series) và máy tính Windows 11 PC."
      );
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0A0E18] text-slate-900 dark:text-white shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                Bảng Điều Khiển Quản Trị (Admin)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tùy chỉnh số điện thoại hotline & ảnh benchmark toàn hệ thống
              </p>
            </div>
          </div>
          <button
            onClick={closeAdminModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            title="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {savedToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Đã lưu cấu hình thành công! Dữ liệu đã cập nhật trên toàn trang.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* 1. Phone number customization */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Phone size={13} className="text-blue-500" />
              <span>Số Điện Thoại Hotline / Zalo</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0869528304"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Được tự động đồng bộ vào toàn bộ link Zalo, Hotline, Footer, FAQ và Hỗ trợ.</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                Chuẩn: 0869 528 304
              </span>
            </p>
          </div>

          {/* 2. Benchmark image customization */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <ImageIcon size={13} className="text-blue-500" />
              <span>Ảnh Bảng Đo Lường Benchmark</span>
            </label>

            {/* Direct File Upload */}
            <div className="space-y-2">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-white/[0.1] hover:border-blue-500/50 rounded-2xl bg-slate-50/50 dark:bg-[#070A12]/50 cursor-pointer transition-colors group">
                <Upload size={22} className="text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Tải lên ảnh biểu đồ / benchmark từ máy tính
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Định dạng PNG, JPG, WebP (Tối đa 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Or URL input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={benchmarkImageUrl.startsWith("data:") ? "(Ảnh tải từ máy tính)" : benchmarkImageUrl}
                  onChange={(e) => setBenchmarkImageUrl(e.target.value)}
                  placeholder="Hoặc dán link URL ảnh (vd: https://...)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                />
                {benchmarkImageUrl && (
                  <button
                    type="button"
                    onClick={() => setBenchmarkImageUrl("")}
                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Xóa ảnh tùy chỉnh"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Xóa ảnh</span>
                  </button>
                )}
              </div>
            </div>

            {/* Image Preview Box */}
            {benchmarkImageUrl && (
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Xem trước ảnh Benchmark:</span>
                  <span className="text-emerald-500 font-bold">Đang kích hoạt</span>
                </div>
                <div className="max-h-48 overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.08] flex items-center justify-center bg-black/5 dark:bg-black/20">
                  <img
                    src={benchmarkImageUrl}
                    alt="Benchmark Custom Preview"
                    className="max-h-48 w-auto object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Benchmark notes */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Ghi Chú Cấu Hình Máy Test
            </label>
            <input
              type="text"
              value={benchmarkNotes}
              onChange={(e) => setBenchmarkNotes(e.target.value)}
              placeholder="VD: Thử nghiệm thực địa với 2,000 file RAW Sony 33MP..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Khôi Phục Mặc Định</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeAdminModal}
                className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Save size={14} />
                <span>Lưu Cấu Hình</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
