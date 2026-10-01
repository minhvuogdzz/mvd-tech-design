import React, { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import {
  Phone,
  Image as ImageIcon,
  Save,
  RotateCcw,
  CheckCircle2,
  Upload,
  ShieldCheck,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export function AdminPage() {
  const { config, updateConfig, resetConfig } = useSiteConfig();

  const [phone, setPhone] = useState(config.phone);
  const [benchmarkImageUrl, setBenchmarkImageUrl] = useState(
    config.benchmarkImageUrl
  );
  const [benchmarkTitle, setBenchmarkTitle] = useState(config.benchmarkTitle);
  const [benchmarkNotes, setBenchmarkNotes] = useState(config.benchmarkNotes);
  const [savedToast, setSavedToast] = useState(false);

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
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn khôi phục về cấu hình mặc định (SĐT: 0869528304)?"
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
      setTimeout(() => setSavedToast(false), 2000);
    }
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-500 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Quay lại trang chủ</span>
        </Link>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold">
          ADMIN CONSOLE
        </span>
      </div>

      <div className="rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0E18] space-y-8 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500">
              <ShieldCheck size={22} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Quản Trị Hệ Thống (MVD Admin)
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tùy biến số điện thoại liên hệ và ảnh benchmark biểu đồ hiển thị trên toàn bộ trang web. Mọi thay đổi sẽ có hiệu lực tức thì.
          </p>
        </div>

        {savedToast && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-500" />
            <span>Cập nhật cấu hình thành công! Dữ liệu đã được lưu trên máy của bạn.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Phone Section */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.06] space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Phone size={16} className="text-blue-500" />
              <span>Số Điện Thoại Hotline & Zalo</span>
            </div>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0869528304"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono text-base font-semibold focus:outline-none focus:border-blue-500"
              required
            />
            <p className="text-xs text-slate-500">
              Mặc định: <strong className="text-blue-500 font-mono">0869528304</strong>. Số này sẽ đồng bộ trên toàn bộ liên kết Zalo, Hotline, Footer và trang Hỗ trợ.
            </p>
          </div>

          {/* Benchmark Section */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#070A12] border border-slate-200 dark:border-white/[0.06] space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <ImageIcon size={16} className="text-blue-500" />
              <span>Ảnh Bảng Đo Lường Benchmark</span>
            </div>

            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-white/[0.1] hover:border-blue-500/50 rounded-2xl bg-white dark:bg-[#0A0E18] cursor-pointer transition-colors group">
                <Upload size={24} className="text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Chọn ảnh từ máy tính để tải lên
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Định dạng PNG, JPG, WebP (Dung lượng tối đa 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={benchmarkImageUrl.startsWith("data:") ? "(Ảnh đã tải từ máy tính)" : benchmarkImageUrl}
                  onChange={(e) => setBenchmarkImageUrl(e.target.value)}
                  placeholder="Hoặc dán URL ảnh trực tiếp..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                />
                {benchmarkImageUrl && (
                  <button
                    type="button"
                    onClick={() => setBenchmarkImageUrl("")}
                    className="p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Xóa ảnh</span>
                  </button>
                )}
              </div>

              {benchmarkImageUrl && (
                <div className="p-4 rounded-xl bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] space-y-2">
                  <span className="text-xs font-semibold text-slate-500">Xem trước ảnh benchmark:</span>
                  <div className="max-h-64 overflow-hidden rounded-lg flex items-center justify-center bg-slate-100 dark:bg-black/30 p-2">
                    <img
                      src={benchmarkImageUrl}
                      alt="Benchmark Custom"
                      className="max-h-60 w-auto object-contain rounded"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Ghi Chú Cấu Hình Benchmark
              </label>
              <textarea
                value={benchmarkNotes}
                onChange={(e) => setBenchmarkNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#0A0E18] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Khôi Phục Mặc Định</span>
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Save size={16} />
              <span>Lưu Cấu Hình Toàn Trang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
