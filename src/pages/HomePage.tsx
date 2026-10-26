import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Glyph } from "@/components/Glyph";
import { ArtLandscape } from "@/components/ArtLandscape";
import { LatestRelease } from "@/types/release";
import { useLanguage } from "@/context/LanguageContext";

interface HomePageProps {
  release: LatestRelease;
  onOpenDownload?: () => void;
}

// Diacritics folding for instant Vietnamese and English searching
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

interface FeatureItem {
  id: string;
  cat: "picker" | "sheet" | "counter" | "convert" | "resources" | "system";
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export function HomePage({ release, onOpenDownload }: HomePageProps) {
  const { isVi } = useLanguage();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseLidRef = useRef<HTMLDivElement>(null);
  const sheetMacRef = useRef<HTMLDivElement>(null);
  const sheetLidRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isAutoTab, setIsAutoTab] = useState<boolean>(true);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Auto-advance tabs for Section 2 (Google Sheets) like mfinder
  const tabCaptions = useMemo(
    () => [
      isVi
        ? "<b>Bóc tách mã chọn ảnh từ Google Sheets.</b> Kết nối OAuth an toàn, đọc trực tiếp cột mã khách chọn và tự động chuẩn hóa tiền tố."
        : "<b>Extract photo selection codes directly from Google Sheets.</b> Secure OAuth connection parses and normalizes codes.",
      isVi
        ? "<b>Tự động tạo folder Drive và dán link trả khách.</b> Trả link chia sẻ Google Drive vào đúng ô khách hàng mà không cần copy paste."
        : "<b>Auto-creates Google Drive folders and pastes client links.</b> Returns folder links directly into client rows.",
      isVi
        ? "<b>Bảo vệ 100% công thức bảng tính (Formula Shield).</b> Chỉ ghi đè vào ô trạng thái, bảo vệ tuyệt đối các hàm kế toán và macro."
        : "<b>100% Google Sheets formula protection.</b> Only writes into designated columns, strictly preserving formulas and macros.",
      isVi
        ? "<b>Kiểm tra trạng thái & Báo cáo thiếu/trùng file.</b> Đối soát tức thì tiến độ và phát hiện file thiếu trước khi xuất xưởng."
        : "<b>Instant delivery audit & missing file reports.</b> Real-time status cross-checking to prevent missing photos.",
    ],
    [isVi]
  );

  useEffect(() => {
    if (!isAutoTab) return;
    const timer = setInterval(() => {
      setTabIndex((prev) => (prev + 1) % 4);
    }, 3400);
    return () => clearInterval(timer);
  }, [isAutoTab]);

  // 1. Data for 15 interactive scenes in the Device Showcase
  const scenes = useMemo(
    () => [
      {
        id: 0,
        chip: isVi ? "Bàn làm việc 3 cột" : "3-Column Workbench",
        cap: isVi
          ? "<b>Bàn làm việc 3 cột chuẩn Studio.</b> Cột 1 Thư mục nguồn & Batch khách ➔ Cột 2 Bóc tách mã thông minh ➔ Cột 3 Thư mục đích, Hardlink 0ms và bảng đếm kết quả."
          : "<b>Studio 3-Column Workbench.</b> Source folders & batch customers ➔ Smart code parser ➔ Target dispatch, 0ms hardlinks, and real-time match tally.",
      },
      {
        id: 1,
        chip: isVi ? "Bóc tách mã Zalo / Chat" : "Zalo / Chat Code Parser",
        cap: isVi
          ? "<b>Smart Fuzzy Parser nuốt trọn mọi kiểu chat.</b> Khách nhắn dải số, tab Excel hay tin nhắn Zalo lộn xộn, app tự động chuẩn hóa tiền tố máy ảnh và tách danh sách chuẩn trong 0.01s."
          : "<b>Smart Fuzzy Parser digests messy chats.</b> Extracts ranges, commas, and Excel pastes from Zalo/WhatsApp into clean camera-prefixed codes in 0.01s.",
      },
      {
        id: 2,
        chip: isVi ? "Lọc hàng loạt khách hàng" : "Batch Multi-Customer",
        cap: isVi
          ? "<b>Chế độ Batch Multi-Customer.</b> Thả một thư mục tháng chứa 50-100 folder khách hàng con, app tự động bóc tách từng folder khách và gom ảnh trả về từng folder con độc lập."
          : "<b>Batch Multi-Customer Mode.</b> Ingests month folders with 50-100 clients, automatically separating and routing matching RAWs to each client folder.",
      },
      {
        id: 3,
        chip: isVi ? "Đồng bộ Google Sheets & Drive" : "Google Sheets & Drive Sync",
        cap: isVi
          ? "<b>Contact the Sheet — Tự động hóa Google Sheets.</b> Đọc trực tiếp tab công việc của studio, tự đánh dấu Đã lọc và cập nhật link trả ảnh Google Drive vào đúng dòng không hỏng công thức."
          : "<b>Contact the Sheet Automation.</b> Reads studio assignment sheets, flags filtered jobs, and auto-updates return Google Drive links without breaking formulas.",
      },
      {
        id: 4,
        chip: isVi ? "Thống kê & KPI Lương" : "Photo Counter & KPI",
        cap: isVi
          ? "<b>Photo Counter — Kiểm đếm sản lượng & Tính lương.</b> Quét sâu thư mục hoàn thiện theo ngày/tháng, phân loại ảnh đơn/ghép/combo, tự động tính KPI lương retoucher theo định mức."
          : "<b>Photo Counter & Retoucher Payroll.</b> Deep recursive audit of delivered deliverables, grouping photo types, and computing retoucher commission payouts.",
      },
    ],
    [isVi]
  );

  // 2. Data for Feature List in #tat-ca
  const allFeatures: FeatureItem[] = useMemo(
    () => [
      // Picker
      {
        id: "p1",
        cat: "picker",
        title: isVi ? "Smart Fuzzy Code Parser" : "Smart Fuzzy Code Parser",
        desc: isVi ? "Nuốt sạch mọi cú pháp hỗn loạn từ Zalo, Facebook, Excel; tự phân tích dải số 100-120." : "Parses chaotic text from Zalo, Facebook, and Excel spreadsheets; auto-handles ranges.",
        icon: "text",
        color: "#2f7bff",
      },
      {
        id: "p2",
        cat: "picker",
        title: isVi ? "Zero-Cost Hardlink (0ms)" : "Zero-Cost Hardlink (0ms)",
        desc: isVi ? "Tách 500 ảnh RAW ra thư mục riêng ngay lập tức mà không tốn thêm 1 byte ổ cứng (APFS/NTFS)." : "Clones 500 RAW photos into target folders in 0ms without consuming extra disk bytes.",
        icon: "zap",
        color: "#2f7bff",
      },
      {
        id: "p3",
        cat: "picker",
        title: isVi ? "Kế thừa tiền tố máy ảnh" : "Smart Camera Prefix Inheritance",
        desc: isVi ? "Khách ghi ABC1234, 1235, 1236; app tự động hiểu là ABC1235, ABC1236 chính xác." : "Auto-inherits camera prefixes like ABC1234, 1235 into ABC1235 seamlessly.",
        icon: "photo",
        color: "#2f7bff",
      },
      {
        id: "p4",
        cat: "picker",
        title: isVi ? "Batch Multi-Customer Engine" : "Batch Multi-Customer Engine",
        desc: isVi ? "Kéo 1 thư mục tháng 50-100 khách, app tự động nhận diện cây thư mục con và gom ảnh riêng." : "Drop a monthly parent folder containing 50-100 clients; automatically dispatches files.",
        icon: "stack",
        color: "#2f7bff",
      },
      {
        id: "p5",
        cat: "picker",
        title: isVi ? "Báo cáo ảnh Trùng & Thiếu" : "Missing & Duplicate Auditor",
        desc: isVi ? "Báo cáo rõ bao nhiêu ảnh đã khớp, mã nào trùng lặp, mã nào khách ghi sai không tìm thấy." : "Instant report on matched files, duplicate selections, and missing numbers.",
        icon: "chart",
        color: "#ff453a",
      },
      {
        id: "p6",
        cat: "picker",
        title: isVi ? "Xuất báo cáo TXT / CSV" : "Export Audit TXT / CSV",
        desc: isVi ? "Xuất nhanh danh sách ảnh thiếu hoặc ảnh đã chọn kèm ghi chú để gửi lại cho khách hàng." : "Export missing or matched photo lists with custom notes to forward to clients.",
        icon: "doc",
        color: "#2f7bff",
      },

      // Sheet
      {
        id: "s1",
        cat: "sheet",
        title: isVi ? "Kết nối Google OAuth2 trực tiếp" : "Direct Google OAuth2 Integration",
        desc: isVi ? "Đăng nhập an toàn một lần, truy cập trực tiếp danh sách bảng tính studio mà không cần xuất file." : "Secure one-click login, directly reads studio sheets without manual file exports.",
        icon: "cloud",
        color: "#7b5cff",
      },
      {
        id: "s2",
        cat: "sheet",
        title: isVi ? "Bóc tách cột mã từ Sheet" : "Column Code Extraction",
        desc: isVi ? "Chỉ định cột mã ảnh khách chọn trong tab tháng; app tự động tải toàn bộ mã vào bộ lọc." : "Point to the customer code column in monthly tabs; imports codes automatically.",
        icon: "list",
        color: "#7b5cff",
      },
      {
        id: "s3",
        cat: "sheet",
        title: isVi ? "Tự động cập nhật link Google Drive" : "Auto-fill Google Drive Links",
        desc: isVi ? "Tự động điền link thư mục trả ảnh trên Drive vào đúng cell của khách hàng tương ứng." : "Populates delivered Google Drive URLs into the exact customer row on Google Sheets.",
        icon: "link",
        color: "#7b5cff",
      },
      {
        id: "s4",
        cat: "sheet",
        title: isVi ? "Bảo vệ 100% công thức bảng tính" : "100% Formula Preservation",
        desc: isVi ? "Ghi đè cell an toàn, tuyệt đối không làm ảnh hưởng đến macro, hàm SUM hay công thức tính tiền." : "Safe cell updates that never corrupt studio macros, accounting formulas, or SUMs.",
        icon: "shield",
        color: "#7b5cff",
      },
      {
        id: "s5",
        cat: "sheet",
        title: isVi ? "Kiểm tra trạng thái lọc của khách" : "Customer Job Status Check",
        desc: isVi ? "Quét nhanh phát hiện ngay hợp đồng nào chưa lọc, hợp đồng nào còn thiếu ảnh để thợ xử lý." : "Quick-scans to flag pending client jobs or missing photos needing immediate action.",
        icon: "eye",
        color: "#7b5cff",
      },

      // Counter
      {
        id: "c1",
        cat: "counter",
        title: isVi ? "Quét đệ quy thư mục sâu nhất" : "Deep Recursive Directory Audit",
        desc: isVi ? "Nhận diện thông minh cấu trúc lưu ảnh của studio, đếm chính xác số lượng file bàn giao." : "Intelligently parses nested studio folder trees to accurately count deliverables.",
        icon: "folder",
        color: "#1fae55",
      },
      {
        id: "c2",
        cat: "counter",
        title: isVi ? "Tính lương Retoucher theo ảnh" : "Piece-rate Retoucher Payroll",
        desc: isVi ? "Phân loại ảnh đơn, ảnh cưới, ảnh tiệc, phóng sự và tự động nhân đơn giá tính lương nhân viên." : "Categorizes single shots, collages, and events to automatically compute salaries.",
        icon: "calculator",
        color: "#1fae55",
      },
      {
        id: "c3",
        cat: "counter",
        title: isVi ? "Biểu đồ sản lượng theo ngày" : "Daily Productivity Sparklines",
        desc: isVi ? "Theo dõi tiến độ hoàn thiện của từng thợ retouch và đối soát năng suất toàn studio theo tháng." : "Tracks daily throughput per retoucher and studio-wide production trends.",
        icon: "chart",
        color: "#1fae55",
      },
      {
        id: "c4",
        cat: "counter",
        title: isVi ? "Trợ lý AI dự đoán doanh số & KPI" : "AI Workload & KPI Assistant",
        desc: isVi ? "Dự đoán khối lượng công việc tồn đọng và phân tích chi phí lương nhân viên tự động." : "Forecasts pending studio backlog and estimates labor cost projections automatically.",
        icon: "sparkles",
        color: "#1fae55",
      },

      // Convert
      {
        id: "v1",
        cat: "convert",
        title: isVi ? "MVD Convert RAW đa luồng" : "Multi-threaded RAW Converter",
        desc: isVi ? "Chuyển đổi hàng loạt từ RAW máy ảnh sang JPG, PNG, WebP chất lượng cao với tốc độ cực nhanh." : "Batch converts proprietary camera RAWs to JPG, PNG, or WebP with peak speed.",
        icon: "photo",
        color: "#ff7a1a",
      },
      {
        id: "v2",
        cat: "convert",
        title: isVi ? "Hỗ trợ Canon CR2, CR3" : "Canon CR2 & CR3 Engine",
        desc: isVi ? "Đọc trực tiếp các file RAW từ EOS R5, R6, R3, 5D Mark IV mà không cần Adobe Camera Raw." : "Native support for EOS R5, R6, R3, 5D Mark IV without third-party plugins.",
        icon: "photo",
        color: "#ff7a1a",
      },
      {
        id: "v3",
        cat: "convert",
        title: isVi ? "Hỗ trợ Sony ARW, Nikon NEF, Fuji RAF" : "Sony ARW, Nikon NEF, Fuji RAF",
        desc: isVi ? "Tương thích 100% với các cảm biến độ phân giải cao 61MP, 100MP GFX, Z8, Z9." : "Full compatibility with Sony 61MP, Fuji GFX 100MP, and Nikon Z8/Z9 high-res RAWs.",
        icon: "photo",
        color: "#ff7a1a",
      },
      {
        id: "v4",
        cat: "convert",
        title: isVi ? "Giữ nguyên siêu dữ liệu EXIF" : "Preserve Metadata & EXIF",
        desc: isVi ? "Toàn bộ thông số máy ảnh, tiêu cự, khẩu độ, ISO và ngày giờ chụp được bảo toàn 100%." : "Retains camera make, lens, aperture, ISO, and capture timestamp untouched.",
        icon: "sliders",
        color: "#ff7a1a",
      },

      // Resources
      {
        id: "r1",
        cat: "resources",
        title: isVi ? "Kho Presets Lightroom VIP" : "VIP Lightroom Presets Vault",
        desc: isVi ? "Tuyển tập hàng trăm tone màu Pre-Wedding, Tiệc cưới, Lookbook, Baby chuẩn studio." : "Hundreds of curated wedding, lookbook, and studio color presets ready to download.",
        icon: "archive",
        color: "#ff4f8b",
      },
      {
        id: "r2",
        cat: "resources",
        title: isVi ? "Actions Photoshop da & màu" : "Photoshop Retouch Actions",
        desc: isVi ? "Các action làm mịn da giữ hạt, nhặt mụn, tách lớp tần số Frequency Separation 1-click." : "High-speed frequency separation, skin smoothing, and blemish cleanup actions.",
        icon: "pen",
        color: "#ff4f8b",
      },
      {
        id: "r3",
        cat: "resources",
        title: isVi ? "LUTs màu Cinematic & Video" : "Cinematic Studio 3D LUTs",
        desc: isVi ? "Hệ màu 3D LUTs điện ảnh cao cấp dùng cho Premiere, DaVinci Resolve và Photoshop." : "High-grade 3D LUTs for wedding teasers in Premiere, DaVinci Resolve, and Photoshop.",
        icon: "film",
        color: "#ff4f8b",
      },

      // System
      {
        id: "y1",
        cat: "system",
        title: isVi ? "100% Offline & Riêng tư" : "100% Offline & Air-Gapped",
        desc: isVi ? "Dữ liệu ảnh RAW ở nguyên trên máy tính cục bộ, không bao giờ upload lên bất kỳ server nào." : "RAW photos remain strictly on your local computer; zero cloud uploads.",
        icon: "lock",
        color: "#12c3f4",
      },
      {
        id: "y2",
        cat: "system",
        title: isVi ? "Kiến trúc Rust Native & Rayon" : "Rust Native & Rayon Concurrency",
        desc: isVi ? "Quét 100.000 file RAW trong dưới 2 giây; chiếm dưới 80MB RAM, không nóng máy." : "Scans 100,000+ RAW files in <2s; consumes <80MB RAM without fan noise.",
        icon: "cpu",
        color: "#12c3f4",
      },
      {
        id: "y3",
        cat: "system",
        title: isVi ? "Kích hoạt VietQR tự động 24/7" : "Automated 24/7 VietQR Activation",
        desc: isVi ? "Chuyển khoản ngân hàng tự động cấp khóa bản quyền ngay lập tức qua webhook SePay." : "Instant automated license key delivery upon bank transfer via SePay webhooks.",
        icon: "zap",
        color: "#12c3f4",
      },
      {
        id: "y4",
        cat: "system",
        title: isVi ? "Cập nhật OTA một click" : "One-Click Seamless OTA Updates",
        desc: isVi ? "Tự động thông báo và cập nhật tính năng mới nhất mà không làm mất cài đặt cũ." : "Seamless updates that deliver new algorithms and features without losing settings.",
        icon: "sync",
        color: "#12c3f4",
      },
    ],
    [isVi]
  );

  // Filtered features based on category and query
  const filteredFeatures = useMemo(() => {
    const q = fold(searchQuery.trim());
    return allFeatures.filter((item) => {
      const matchCat = filterCat === "all" || item.cat === filterCat;
      const matchQuery =
        !q ||
        fold(item.title).includes(q) ||
        fold(item.desc).includes(q);
      return matchCat && matchQuery;
    });
  }, [allFeatures, filterCat, searchQuery]);

  // 3. Showcase & Section 2 3D Laptop Scroll Opening/Folding Engine
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight;

        // 1. Showcase MacBook 1
        const sec = showcaseRef.current;
        if (sec) {
          const r = sec.getBoundingClientRect();
          const span = Math.max(1, r.height - vh);
          const p = Math.min(0.9999, Math.max(0, -r.top / span));
          const idx = Math.floor(p * scenes.length);
          setActiveScene(idx);

          if (showcaseLidRef.current) {
            let openP = 1;
            if (r.top > 0) {
              openP = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (vh * 0.65)));
            }
            const angle = -(1 - openP) * 60;
            showcaseLidRef.current.style.setProperty("--lid-rot", `${angle.toFixed(1)}deg`);
            showcaseLidRef.current.style.setProperty("--lid-glare", `${((1 - openP) * 0.45).toFixed(2)}`);
          }
        }

        // 2. Section 2 (Sheet) MacBook 2
        if (sheetMacRef.current && sheetLidRef.current) {
          const r = sheetMacRef.current.getBoundingClientRect();
          let openP = 1;
          if (r.top > vh * 0.35) {
            openP = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.60)));
          }
          const angle = -(1 - openP) * 60;
          sheetLidRef.current.style.setProperty("--lid-rot", `${angle.toFixed(1)}deg`);
          sheetLidRef.current.style.setProperty("--lid-glare", `${((1 - openP) * 0.45).toFixed(2)}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scenes.length]);

  // 4. Fit Canvas automatically to parent container
  useEffect(() => {
    const canvases = document.querySelectorAll<HTMLElement>(".canvas[data-w]");

    const fitCanvas = (c: HTMLElement) => {
      const w = Number(c.dataset.w);
      const h = Number(c.dataset.h);
      if (!c.classList.contains("mb-screen") && !c.style.aspectRatio) {
        c.style.aspectRatio = `${w} / ${h}`;
      }
      const cv = c.firstElementChild as HTMLElement;
      if (!cv) return;
      const cw = c.clientWidth;
      const ch = c.clientHeight;
      if (!cw || !ch) return;
      const s = Math.min(cw / w, ch / h);
      cv.style.transform = `scale(${s.toFixed(4)})`;
      cv.style.transformOrigin = "0 0";
      cv.style.left = `${((cw - w * s) / 2).toFixed(1)}px`;
      cv.style.top = `${((ch - h * s) / 2).toFixed(1)}px`;
    };

    const handleResize = () => {
      canvases.forEach(fitCanvas);
    };

    handleResize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => handleResize());
      canvases.forEach((c) => ro?.observe(c));
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [activeScene, tabIndex]);

  // 5. Scroll reveal animation (IntersectionObserver)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    // Ensure all sections are immediately marked visible to prevent any blank white rendering
    elements.forEach((el) => el.classList.add("in"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler for chip buttons
  const handleChipClick = (index: number) => {
    setActiveScene(index);
    const sec = showcaseRef.current;
    if (!sec) return;
    const span = sec.offsetHeight - window.innerHeight;
    const targetTop = sec.offsetTop + ((index + 0.5) / scenes.length) * span;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  // Rail scroll buttons
  const scrollRail = (railId: string, direction: number) => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement;
    if (!card) return;
    rail.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <div id="top" className="site-wrapper">
      {/* ───────── 1. HERO SECTION ───────── */}
      <section className="hero wrap">
        <span className="pill-brand">
          <img src="/brand/dh_app_icon_dock_light.png" alt="DH Studio Pro" style={{ width: 26, height: 26, objectFit: "contain" }} />
          <span><span className="m" style={{ color: "var(--blue)" }}>DH</span> Studio Pro</span>
        </span>

        <h1>
          {isVi ? (
            <>
              Hàng chục nghìn ảnh RAW,<br />
              <span className="c-blue">lọc xong <span className="swipe">ngay lập tức</span>.</span>
            </>
          ) : (
            <>
              Thousands of RAW Photos,<br />
              <span className="c-blue">culled <span className="swipe">in seconds</span>.</span>
            </>
          )}
        </h1>

        <p className="lead">
          {isVi ? (
            <>
              Tự động bóc tách danh sách mã chọn ảnh từ Zalo, Excel, đối soát Google Sheets, quét 100.000 file RAW trong 2 giây và xuất Hardlink 0ms. <b>Trọn bộ giải pháp tự động hóa workflow cho Studio & Photographer.</b>
            </>
          ) : (
            <>
              Auto-extracts photo selection codes from Zalo, WhatsApp, and Excel. Audits Google Sheets, scans 100,000 RAWs in 2 seconds with 0ms hardlinks. <b>The ultimate studio automation suite.</b>
            </>
          )}
        </p>

        <div className="cta-row">
          <span className="hand-note">
            {isVi ? "Dùng thử miễn phí" : "Free 7-day trial"}
            <svg viewBox="0 0 70 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M4 6c18 2 40 12 54 36" />
              <path d="M48 40l10 3 1-11" />
            </svg>
          </span>

          <a
            className="btn btn-dark btn-l dl"
            href="#download"
            onClick={(e) => {
              if (onOpenDownload) {
                e.preventDefault();
                onOpenDownload();
              }
            }}
          >
            <Glyph name="download" />
            {isVi ? "Tải cho Mac & Windows" : "Download for Mac & PC"}
          </a>

          <a
            className="btn btn-light btn-l"
            href="#tat-ca"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("tat-ca")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {isVi ? "Xem tính năng" : "Explore features"}
          </a>
        </div>

        <div className="meta">
          <span>{isVi ? "Dùng thử 7 ngày đầy đủ" : "Full 7-day free trial"}</span>
          <span>macOS &amp; Windows 64-bit</span>
          <span>Apple Silicon &amp; Intel</span>
          <span>{isVi ? "100% Offline & Riêng tư" : "100% Local-First Offline"}</span>
          <span>v{release.version || "2.9.1"} Build 2026.10</span>
        </div>
      </section>

      {/* ───────── 2. STICKY SHOWCASE: ONE DEVICE, 5 SCENES ───────── */}
      <section
        className="showcase"
        id="showcase"
        ref={showcaseRef}
        aria-label="DH Studio Pro trên màn hình máy tính"
      >
        <div className="sticky">
          <div className="device macbook">
            <div className="mb-lid" ref={showcaseLidRef}>
              <div className="mb-screen canvas" data-w="1440" data-h="900">
                <div className="cv" style={{ width: "1440px", height: "900px" }}>

                  {/* SCENE 0: Core Studio Workbench (3 Cột) */}
                  <div className={`scene ${activeScene === 0 ? "on" : ""}`} data-scene="0">
                    <div className="wall"></div>
                    <div className="mbar">
                      <b>Photo Picker Pro</b>
                      <span>Workspace</span>
                      <span>Batch</span>
                      <span>Google Sheets</span>
                      <span>Format</span>
                      <span>Help</span>
                      <div className="r">
                        <Glyph name="cpu" />
                        <Glyph name="battery" />
                        <Glyph name="wifi" />
                        <span>Th 3 21 thg 10 9:41</span>
                      </div>
                    </div>

                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Studio App */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(47,123,255,0.1)", color: "var(--blue)", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Photo Picker Pro · Core Studio
                          </span>
                        </div>

                        {/* Top Center: Main Tabs */}
                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ background: "#ffffff", color: "var(--blue)", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            📷 Trang chủ
                          </span>
                          <span style={{ color: "var(--muted)", padding: "3px 10px" }}>🕒 Lịch sử</span>
                          <span style={{ color: "var(--muted)", padding: "3px 10px" }}>⚙️ Cài đặt</span>
                        </div>

                        {/* Top Right: User & Status */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 10px", color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                            <Glyph name="search" style={{ width: 13, height: 13 }} />
                            <span>Tìm kiếm nhanh (Cmd + K)...</span>
                          </div>
                          <span style={{ color: "#16a34a", fontWeight: 700, border: "1px solid #bbf7d0", background: "#f0fdf4", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>
                            Dùng thử: 6 ngày
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace Area with Left Sidebar + 3 Panels */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        {/* Ecosystem Left Sidebar */}
                        <div style={{ width: "200px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 10px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>

                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", padding: "6px 8px 2px" }}>
                            ỨNG DỤNG
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: "rgba(47,123,255,0.12)", color: "var(--blue)", fontWeight: 700, fontSize: 12, borderLeft: "3px solid var(--blue)" }}>
                              <Glyph name="crop" style={{ width: 15, height: 15 }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15, color: "#10b981" }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="zap" style={{ width: 15, height: 15, color: "#6366f1" }} />
                              <span>MVD Convert</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="chart" style={{ width: 15, height: 15, color: "#8b5cf6" }} />
                              <span>Photo Counter</span>
                            </div>
                          </div>

                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* 3-Panel Main Area of Photo Picker Pro */}
                        <div style={{ display: "flex", flex: 1, gap: 10, padding: "10px", minHeight: 0 }}>
                          {/* Cột 1: Thư mục nguồn */}
                          <div style={{ width: "320px", background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "14px", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>1. Thư mục nguồn (Input)</span>
                              <span style={{ fontSize: 10, background: "#16a34a", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>BATCH 48</span>
                            </div>
                            <div style={{ border: "2px dashed #cbd5e1", borderRadius: 10, padding: "12px 10px", textAlign: "center", background: "#f8fafc" }}>
                              <div style={{ color: "var(--blue)", marginBottom: 4 }}><Glyph name="folder" style={{ width: 22, height: 22, margin: "0 auto" }} /></div>
                              <b style={{ fontSize: 12, display: "block", color: "var(--ink)" }}>T10_PreWedding_DaLat</b>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>124,580 ảnh RAW · 48 Khách hàng</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
                              <div style={{ padding: "7px 10px", borderRadius: 8, background: "rgba(47,123,255,0.08)", border: "1px solid rgba(47,123,255,0.25)", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                                <b style={{ color: "var(--blue)" }}>📁 01_Tuan_Lan_DaLat</b>
                                <span style={{ color: "var(--blue)", fontWeight: 700 }}>45 file</span>
                              </div>
                              <div style={{ padding: "7px 10px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                                <span>📁 02_Hoang_Mai_PhimTruong</span>
                                <span style={{ color: "var(--muted)" }}>38 file</span>
                              </div>
                              <div style={{ padding: "7px 10px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                                <span>📁 03_Duc_Anh_TiecCuoi</span>
                                <span style={{ color: "var(--muted)" }}>62 file</span>
                              </div>
                              <div style={{ padding: "7px 10px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                                <span>📁 04_Khanh_Vy_KyYeu</span>
                                <span style={{ color: "var(--muted)" }}>120 file</span>
                              </div>
                            </div>
                          </div>

                          {/* Cột 2: Hộp nhập mã */}
                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "14px", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>2. Bóc tách mã ảnh (Fuzzy Parser)</span>
                              <span style={{ fontSize: 11, color: "var(--blue)", display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}><Glyph name="cloud" /> Sync Google Sheet</span>
                            </div>
                            <div style={{ flex: 1, background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 10, padding: "12px", fontFamily: "JetBrains Mono, Menlo, monospace", fontSize: 13, lineHeight: 1.7, color: "var(--ink)", overflowY: "hidden" }}>
                              <div style={{ color: "#64748b" }}># Danh sách mã khách gửi từ Zalo / Sheets:</div>
                              <div>HPP01099-01006-01078-00987</div>
                              <div>ZHA_0555-0573-0576</div>
                              <div>DSC_0401..0415</div>
                              <div>ABC1234, 1235, 1236, 1240</div>
                              <div style={{ color: "#16a34a" }}># Tự động kế thừa tiền tố ABC: ABC1235, ABC1236...</div>
                            </div>
                            <div style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", borderRadius: 8, padding: "7px 12px", fontSize: 12, color: "#16a34a", display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                              <Glyph name="check" style={{ width: 16, height: 16 }} />
                              Đã bóc tách 142 mã hợp lệ · Không phát hiện lỗi cú pháp
                            </div>
                          </div>

                          {/* Cột 3: Xuất file & Báo cáo */}
                          <div style={{ width: "320px", background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "14px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>3. Xuất file &amp; Đối soát</span>
                            <div style={{ background: "#f8fafc", padding: "9px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 11 }}>
                              <span style={{ color: "var(--muted)", display: "block", marginBottom: 2 }}>Thư mục lưu ảnh đã lọc:</span>
                              <b style={{ wordBreak: "break-all", color: "var(--ink)" }}>D:/Tra_Anh_Khach/T10_PreWedding</b>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                              <div style={{ border: "2px solid var(--blue)", background: "rgba(47,123,255,0.08)", borderRadius: 8, padding: "6px", textAlign: "center" }}>
                                <b style={{ color: "var(--blue)", fontSize: 11, display: "block" }}>Hardlink</b>
                                <span style={{ fontSize: 9.5, color: "var(--muted)" }}>0ms · 0 Byte</span>
                              </div>
                              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px", textAlign: "center" }}>
                                <b style={{ fontSize: 11, display: "block" }}>Copy</b>
                                <span style={{ fontSize: 9.5, color: "var(--muted)" }}>Nhân bản</span>
                              </div>
                              <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px", textAlign: "center" }}>
                                <b style={{ fontSize: 11, display: "block" }}>Move</b>
                                <span style={{ fontSize: 9.5, color: "var(--muted)" }}>Di chuyển</span>
                              </div>
                            </div>

                            <button className="btn btn-dark" style={{ width: "100%", padding: "11px", justifyContent: "center", borderRadius: 10, fontWeight: 700, background: "var(--blue)", fontSize: 13 }}>
                              <Glyph name="zap" /> BẮT ĐẦU LỌC ẢNH
                            </button>

                            <div style={{ background: "#f8fafc", padding: "10px", borderRadius: 8, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: 6 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                                <span>Tiến trình hoàn tất:</span>
                                <b style={{ color: "#16a34a" }}>100% (0.38 giây)</b>
                              </div>
                              <div style={{ height: 5, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                                <div style={{ width: "100%", height: "100%", background: "#16a34a" }}></div>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 2 }}>
                                <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ 142 Đã khớp</span>
                                <span style={{ color: "#f59e0b", fontWeight: 700 }}>0 Trùng lặp</span>
                                <span style={{ color: "#ef4444", fontWeight: 700 }}>0 Thiếu</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Bar of Studio App */}
                      <div style={{ borderTop: "1px solid #d6dfeb", background: "#ffffff", padding: "6px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></span>
                            Sẵn sàng lọc ảnh
                          </span>
                          <span style={{ color: "#cbd5e1" }}>·</span>
                          <span style={{ color: "#64748b" }}>Photo Picker Pro</span>
                        </div>
                        <div style={{ color: "#64748b" }}>
                          Minh Vương Dev · Hệ sinh thái phần mềm Studio Pro
                        </div>
                        <div style={{ color: "#d97706", fontWeight: 600, display: "flex", alignItems: "center", gap: 5, background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 6 }}>
                          <span>☕ Donate Cafe</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SCENE 1: Zalo / Chat Code Parser */}
                  <div className={`scene ${activeScene === 1 ? "on" : ""}`} data-scene="1">
                    <div className="wall dusk"></div>
                    <div className="mbar">
                      <b>Photo Picker Pro</b>
                      <span>Fuzzy Parser Engine</span>
                      <div className="r"><span>Th 3 21 thg 10 9:41</span></div>
                    </div>

                    {/* Chat Window */}
                    <div className="win chat" style={{ left: "60px", top: "45px", width: "460px", height: "800px", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }}>
                      <div className="ch" style={{ background: "#0068ff", color: "#fff", display: "flex", alignItems: "center", gap: 10, padding: "14px 20px" }}>
                        <i style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%" }}></i>
                        <b>Lan Anh · Cô Dâu Tháng 10</b>
                      </div>
                      <div className="body" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14, background: "#eef2f8", flex: 1 }}>
                        <div className="bub">Em ơi gửi lại link ảnh cưới giúp chị nhé!</div>
                        <div className="bub me">Dạ chị, em gửi link rồi ạ!</div>
                        <div className="bub" style={{ background: "#ffffff", border: "1px solid #dbeafe" }}>
                          Chị gửi danh sách ảnh chọn in album nha:<br />
                          <b>12, 15-20, DSC_9901, anh dep 0401..0415, CR3_1020, 1025</b><br />
                          lọc gấp giúp chị nhé em!
                        </div>
                        <div className="bub me" style={{ background: "#dcf8c6" }}>
                          Dạ em nhận được rồi ạ, phần mềm tự lọc xong ngay 1 giây gửi chị luôn đây!
                        </div>
                      </div>
                    </div>

                    {/* Extractor Result Window */}
                    <div className="win finder" style={{ left: "540px", top: "45px", width: "840px", height: "800px", background: "#ffffff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }}>
                      <div className="tb" style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <b>⚡ Trình phân tích mã thông minh (Smart Fuzzy Parser)</b>
                        </div>
                        <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 12, background: "#dcfce7", padding: "3px 10px", borderRadius: 6 }}>
                          ✓ Đã giải mã 24 mã hợp lệ
                        </span>
                      </div>
                      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16, flex: 1, background: "#f8fafc" }}>
                        <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 10, padding: "14px", fontSize: 13, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                          <span style={{ color: "var(--muted)", display: "block", marginBottom: 6, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>Văn bản gốc từ tin nhắn Zalo:</span>
                          <code style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>"12, 15-20, DSC_9901, anh dep 0401..0415, CR3_1020, 1025"</code>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                          <div style={{ background: "#ffffff", border: "1px solid rgba(47,123,255,0.25)", borderRadius: 10, padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ color: "var(--blue)", fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>Tự động kế thừa tiền tố</span>
                            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>
                              <code>0401..0415</code> ➔ 15 file:<br />
                              <b style={{ color: "var(--blue)" }}>DSC_0401.CR3 ➔ DSC_0415.CR3</b>
                            </div>
                          </div>
                          <div style={{ background: "#ffffff", border: "1px solid rgba(22,163,74,0.25)", borderRadius: 10, padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 13, display: "block", marginBottom: 6 }}>Tự bóc tách dải số</span>
                            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>
                              <code>15-20</code> ➔ 6 file:<br />
                              <b style={{ color: "#16a34a" }}>DSC_0015.CR3 ➔ DSC_0020.CR3</b>
                            </div>
                          </div>
                        </div>

                        <div style={{ background: "#ffffff", border: "1px solid #d6dfeb", borderRadius: 10, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>Danh sách file RAW đã phân giải:</span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {["DSC_0012.CR3", "DSC_0015.CR3", "DSC_0016.CR3", "DSC_0017.CR3", "DSC_0018.CR3", "DSC_0019.CR3", "DSC_0020.CR3", "DSC_9901.CR3", "DSC_0401.CR3", "DSC_0402.CR3", "CR3_1020.CR3", "CR3_1025.CR3"].map((f, i) => (
                              <span key={i} style={{ background: "#f1f5f9", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", color: "#1e293b", border: "1px solid #e2e8f0" }}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginTop: "auto", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px 16px", borderRadius: 10, fontSize: 12, color: "#166534" }}>
                          <b>Độ chuẩn xác 100%:</b> Nuốt sạch ký tự lộn xộn, dấu gạch ngang, dấu chấm, dấu phẩy từ tin nhắn khách hàng. Không cần thợ phải ngồi gõ lại từng số trên Finder/Explorer.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SCENE 2: Batch Multi-Customer */}
                  <div className={`scene ${activeScene === 2 ? "on" : ""}`} data-scene="2">
                    <div className="wall night"></div>
                    <div className="mbar dark">
                      <b>Photo Picker Pro</b>
                      <span>Batch Multi-Customer Engine</span>
                      <div className="r"><span>Th 3 21 thg 10 9:41</span></div>
                    </div>

                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", background: "#ffffff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Studio App */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(47,123,255,0.1)", color: "var(--blue)", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Photo Picker Pro · Batch Engine
                          </span>
                        </div>

                        {/* Top Center: Main Tabs */}
                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ background: "#ffffff", color: "var(--blue)", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            📷 Batch Runner
                          </span>
                          <span style={{ color: "var(--muted)", padding: "3px 10px" }}>🕒 Lịch sử</span>
                          <span style={{ color: "var(--muted)", padding: "3px 10px" }}>⚙️ Cài đặt</span>
                        </div>

                        {/* Top Right: User & Status */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <span style={{ color: "#16a34a", fontWeight: 700, border: "1px solid #bbf7d0", background: "#f0fdf4", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>
                            48 Khách hàng sẵn sàng
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace Area with Left Sidebar + Batch Grid */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        {/* Ecosystem Left Sidebar */}
                        <div style={{ width: "200px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 10px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: "rgba(47,123,255,0.12)", color: "var(--blue)", fontWeight: 700, fontSize: 12, borderLeft: "3px solid var(--blue)" }}>
                              <Glyph name="crop" style={{ width: 15, height: 15 }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15, color: "#10b981" }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="zap" style={{ width: 15, height: 15, color: "#6366f1" }} />
                              <span>MVD Convert</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="chart" style={{ width: 15, height: 15, color: "#8b5cf6" }} />
                              <span>Photo Counter</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* Batch Multi-Customer Main Content */}
                        <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div>
                              <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>Lọc hàng loạt 48 Khách hàng trong Thư mục T10_PreWedding_DaLat</b>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>Tự động duyệt thư mục con &amp; trích xuất ảnh vào từng folder riêng</span>
                            </div>
                            <span style={{ fontSize: 12, color: "var(--blue)", fontWeight: 700, background: "rgba(47,123,255,0.1)", padding: "4px 12px", borderRadius: 8 }}>
                              ⚡ Đa luồng Rust Rayon: Hoàn thành trong 3.2 giây
                            </span>
                          </div>

                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "14px", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                              {[
                                { name: "01_Tuan_Lan_DaLat", files: 45, raw: "CR3", status: "Hoàn tất 100% (0.12s)" },
                                { name: "02_Hoang_Mai_Studio", files: 38, raw: "ARW", status: "Hoàn tất 100% (0.09s)" },
                                { name: "03_Duc_Anh_TiecCuoi", files: 62, raw: "NEF", status: "Hoàn tất 100% (0.15s)" },
                                { name: "04_Khanh_Vy_KyYeu", files: 120, raw: "CR3", status: "Hoàn tất 100% (0.22s)" },
                                { name: "05_Minh_Hang_Lookbook", files: 54, raw: "RAF", status: "Hoàn tất 100% (0.11s)" },
                                { name: "06_Quoc_Bao_PhimTruong", files: 42, raw: "ARW", status: "Hoàn tất 100% (0.10s)" },
                              ].map((c, i) => (
                                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px", background: "#f8fafc" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <b style={{ fontSize: 13, color: "var(--ink)" }}>{c.name}</b>
                                    <span style={{ fontSize: 11, background: "rgba(47,123,255,0.1)", color: "var(--blue)", padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>{c.raw}</span>
                                  </div>
                                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
                                    {c.files} file ảnh được tách vào folder riêng
                                  </div>
                                  <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                                    <Glyph name="check" style={{ width: 14, height: 14 }} /> {c.status}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div style={{ marginTop: "auto", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 8 }}>
                              <Glyph name="check" style={{ width: 16, height: 16, flexShrink: 0 }} />
                              <span><b>Batch Processing Siêu Tốc:</b> Xử lý đồng thời 48 thư mục khách hàng mà không làm treo máy hay quá tải RAM.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Bar */}
                      <div style={{ borderTop: "1px solid #d6dfeb", background: "#ffffff", padding: "6px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></span>
                            Sẵn sàng lọc ảnh
                          </span>
                          <span style={{ color: "#cbd5e1" }}>·</span>
                          <span style={{ color: "#64748b" }}>Photo Picker Pro</span>
                        </div>
                        <div style={{ color: "#64748b" }}>
                          Minh Vương Dev · Hệ sinh thái phần mềm Studio Pro
                        </div>
                        <div style={{ color: "#d97706", fontWeight: 600, display: "flex", alignItems: "center", gap: 5, background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 6 }}>
                          <span>☕ Donate Cafe</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SCENE 3: Google Sheets & Drive Sync */}
                  <div className={`scene ${activeScene === 3 ? "on" : ""}`} data-scene="3">
                    <div className="wall blue"></div>
                    <div className="mbar">
                      <b>Contact the Sheet</b>
                      <span>Google Sheets &amp; Drive Integration</span>
                      <div className="r"><span>Th 3 21 thg 10 9:41</span></div>
                    </div>

                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", background: "#ffffff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      <div className="tb" style={{ padding: "10px 18px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#16a34a" }}><Glyph name="cloud" /></span>
                          <b style={{ color: "#166534" }}>Google Sheets — Tab "Edit 10/2026" (Đã kết nối OAuth an toàn)</b>
                        </div>
                        <span style={{ fontSize: 12, color: "#15803d", fontWeight: 700, background: "#dcfce7", padding: "3px 10px", borderRadius: 6 }}>
                          ✓ Bảo vệ 100% công thức bảng tính
                        </span>
                      </div>

                      <div style={{ padding: "16px", overflowX: "auto", flex: 1, background: "#ffffff" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                          <thead>
                            <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                              <th style={{ padding: "10px" }}>STT</th>
                              <th style={{ padding: "10px" }}>Khách Hàng</th>
                              <th style={{ padding: "10px" }}>Mã Ảnh Khách Chọn</th>
                              <th style={{ padding: "10px" }}>Trạng Thái Lọc</th>
                              <th style={{ padding: "10px" }}>Link Drive Trả File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { stt: 1, name: "Tuấn & Lan (Đà Lạt)", codes: "HPP01099, 1006, 1078 (45 file)", status: "ĐÃ LỌC XONG ✓", link: "drive.google.com/drive/folders/1tUaN..." },
                              { stt: 2, name: "Hoàng & Mai (Phim Trường)", codes: "ZHA_0555-0573 (38 file)", status: "ĐÃ LỌC XONG ✓", link: "drive.google.com/drive/folders/2hOaN..." },
                              { stt: 3, name: "Đức & Anh (Tiệc Cưới)", codes: "DSC_0401..0415 (62 file)", status: "ĐÃ LỌC XONG ✓", link: "drive.google.com/drive/folders/3dUcA..." },
                              { stt: 4, name: "Khánh Vy (Kỷ Yếu)", codes: "ABC1234..1280 (120 file)", status: "ĐÃ LỌC XONG ✓", link: "drive.google.com/drive/folders/4kHaN..." },
                            ].map((r, i) => (
                              <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                <td style={{ padding: "12px 10px", fontWeight: 700 }}>{r.stt}</td>
                                <td style={{ padding: "12px 10px", fontWeight: 600 }}>{r.name}</td>
                                <td style={{ padding: "12px 10px", fontFamily: "monospace", color: "var(--blue)" }}>{r.codes}</td>
                                <td style={{ padding: "12px 10px" }}>
                                  <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
                                    {r.status}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 10px", color: "#2563eb", textDecoration: "underline" }}>
                                  {r.link}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* SCENE 4: Photo Counter & KPI Payroll */}
                  <div className={`scene ${activeScene === 4 ? "on" : ""}`} data-scene="4">
                    <div className="wall night"></div>
                    <div className="mbar dark">
                      <b>Photo Counter</b>
                      <span>KPI &amp; Retoucher Payroll Analytics</span>
                      <div className="r"><span>Th 3 21 thg 10 9:41</span></div>
                    </div>

                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", background: "#ffffff", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      <div className="tb" style={{ padding: "10px 18px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <b>Thống Kê Sản Lượng &amp; Tính Lương Retoucher Tháng 10</b>
                        </div>
                        <span style={{ color: "#16a34a", fontWeight: 700, background: "#dcfce7", padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>
                          Tổng sản lượng: 4,850 Ảnh Hoàn Thiện
                        </span>
                      </div>
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16, flex: 1, background: "#f8fafc" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                          <div style={{ background: "#ffffff", padding: "16px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ fontSize: 12, color: "var(--muted)" }}>Ảnh Đơn Lẻ</span>
                            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0", color: "var(--blue)" }}>3,420</h3>
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Đơn giá: 15.000đ / ảnh</span>
                          </div>
                          <div style={{ background: "#ffffff", padding: "16px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ fontSize: 12, color: "var(--muted)" }}>Ảnh Ghép &amp; Bìa Album</span>
                            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0", color: "var(--violet)" }}>860</h3>
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Đơn giá: 35.000đ / ảnh</span>
                          </div>
                          <div style={{ background: "#ffffff", padding: "16px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <span style={{ fontSize: 12, color: "var(--muted)" }}>Combo Phóng Sự Cưới</span>
                            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0", color: "#16a34a" }}>570</h3>
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Đơn giá: 25.000đ / ảnh</span>
                          </div>
                        </div>

                        <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px", background: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                          <b style={{ fontSize: 14, display: "block", marginBottom: 10, color: "var(--ink)" }}>Bảng Tổng Hợp Lương Retoucher Tháng 10:</b>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                            <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div><b style={{ color: "var(--ink)" }}>Nguyễn Văn An</b><div style={{ fontSize: 11, color: "var(--muted)" }}>520 ảnh đơn · 45 ảnh ghép</div></div>
                              <b style={{ color: "var(--blue)", fontSize: 16 }}>9.375.000đ</b>
                            </div>
                            <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div><b style={{ color: "var(--ink)" }}>Trần Thị Mai</b><div style={{ fontSize: 11, color: "var(--muted)" }}>610 ảnh đơn · 60 ảnh ghép</div></div>
                              <b style={{ color: "var(--blue)", fontSize: 16 }}>11.250.000đ</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="mb-notch"></div>
            </div>
            <div className="mb-base"></div>
          </div>

          {/* Interactive Chips Selector */}
          <div className="chips" role="tablist">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                className={`chip ${activeScene === idx ? "on" : ""}`}
                onClick={() => handleChipClick(idx)}
                aria-selected={activeScene === idx}
              >
                {s.chip}
              </button>
            ))}
          </div>

          <p
            className="caption"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: scenes[activeScene]?.cap || "" }}
          ></p>
        </div>
      </section>

      {/* ───────── 3. MARQUEE BANNER ───────── */}
      <section className="sec" style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div className="wrap head-center reveal">
          <h2 className="mid">
            {isVi ? (
              <>Những công cụ nhỏ,<br /><span className="c-blue">nhưng giải phóng hàng trăm giờ làm việc.</span></>
            ) : (
              <>Small specialized tools,<br /><span className="c-blue">massive studio time savings.</span></>
            )}
          </h2>
        </div>

        <div className="marquee" aria-hidden="true">
          <div
            className="marquee-track"
            data-marquee="Lọc ảnh siêu tốc|folder;Smart Fuzzy Parser|text;Zero-cost Hardlink|zap;Batch Multi-Customer|stack;Google Sheets OAuth|cloud;Tự cập nhật link Drive|link;Báo cáo Missing & Duplicate|chart;Thống kê sản lượng|chart;Tính lương Retoucher|calculator;MVD Convert RAW|photo;Kho Presets & Actions|archive;100% Offline Privacy|lock;Tự động xóa hoàn tất|check;Bảo vệ công thức Sheet|shield;Bộ nhớ <80MB RAM|gauge;Đa luồng Rust Rayon|cpu"
          >
            {[
              ["Lọc ảnh siêu tốc", "folder"],
              ["Smart Fuzzy Parser", "text"],
              ["Zero-cost Hardlink", "zap"],
              ["Batch Multi-Customer", "stack"],
              ["Google Sheets OAuth", "cloud"],
              ["Tự cập nhật link Drive", "link"],
              ["Báo cáo Missing & Duplicate", "chart"],
              ["Thống kê sản lượng", "chart"],
              ["Tính lương Retoucher", "calculator"],
              ["MVD Convert RAW", "photo"],
              ["Kho Presets & Actions", "archive"],
              ["100% Offline Privacy", "lock"],
              ["Bảo vệ công thức Sheet", "shield"],
              ["Bộ nhớ <80MB RAM", "gauge"],
              ["Đa luồng Rust Rayon", "cpu"],
            ].map(([label, icon], i) => (
              <span key={i}>
                <Glyph name={icon} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. SECTION 1: PHOTO PICKER PRO (RAIL) ───────── */}
      <section className="sec" id="loc-anh">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow c-blue">{isVi ? "Lọc ảnh & Bóc tách mã" : "Core Cull Engine"}</span>
            <h2 className="big">
              {isVi ? (
                <>Hàng nghìn mã ảnh lộn xộn?<br /><span className="mark" style={{ "--mk": "#cfe2ff" } as React.CSSProperties}>Bóc tách chuẩn xác</span>, lọc trong 2 giây.</>
              ) : (
                <>Thousands of messy codes?<br /><span className="mark" style={{ "--mk": "#cfe2ff" } as React.CSSProperties}>Extract perfectly</span>, cull in 2s.</>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Nuốt trọn mọi định dạng chat từ Zalo, Messenger, Excel. Tự nhận diện dải số, kế thừa tiền tố máy ảnh và tạo liên kết cứng Hardlink 0ms. <b>Không còn phải ngồi dò tay từng file.</b></>
            ) : (
              <>Digests chaotic chat formats from Zalo, Excel, and chats. Handles ranges, prefixes, and creates 0ms hardlinks. <b>Never manually search files again.</b></>
            )}
          </p>
        </div>

        <div className="rail-wrap reveal">
          <div className="rail" id="rail-picker">
            <article className="xcard" style={{ background: "#dce6f7" }}>
              <div className="canvas" data-w="600" data-h="430">
                <div className="cv" style={{ width: "600px", height: "430px" }}>
                  <div className="wall dusk"></div>
                  <div className="win" style={{ left: "50px", top: "50px", width: "500px", height: "320px", background: "#fff", padding: "16px" }}>
                    <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", fontWeight: 700, fontSize: 14 }}>
                      ⚡ Smart Fuzzy Code Parser
                    </div>
                    <div style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
                      Nhận diện mọi định dạng:
                    </div>
                    <div style={{ background: "#f8fafc", padding: "10px", borderRadius: 8, marginTop: 8, fontFamily: "monospace", fontSize: 12 }}>
                      "HPP01099-01006-01078"<br />
                      "anh dep 0401..0415"<br />
                      "ABC1234, 1235, 1236"
                    </div>
                    <div style={{ marginTop: 12, color: "#16a34a", fontSize: 12, fontWeight: 700 }}>
                      ✓ Kế thừa tiền tố máy ảnh và dải số tự động
                    </div>
                  </div>
                </div>
              </div>
              <p>
                <b>Smart Fuzzy Code Parser.</b> Tự động nuốt sạch ký tự lộn xộn, dải số gạch ngang, dấu chấm, dấu phẩy từ tin nhắn của khách hàng.
              </p>
            </article>

            <article className="xcard" style={{ background: "#e3dcf7" }}>
              <div className="canvas" data-w="600" data-h="430">
                <div className="cv" style={{ width: "600px", height: "430px" }}>
                  <div className="wall"></div>
                  <div className="win" style={{ left: "50px", top: "50px", width: "500px", height: "320px", background: "#fff", padding: "16px" }}>
                    <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", fontWeight: 700, fontSize: 14 }}>
                      ⚡ Zero-Cost Hardlink (0ms)
                    </div>
                    <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                      <div style={{ flex: 1, background: "rgba(47,123,255,0.08)", padding: "14px", borderRadius: 8, textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>Tốc độ lọc</span>
                        <h4 style={{ fontSize: 24, fontWeight: 800, color: "var(--blue)", margin: "4px 0" }}>0.00s</h4>
                        <span style={{ fontSize: 11, color: "#1fae55" }}>Tức thì</span>
                      </div>
                      <div style={{ flex: 1, background: "rgba(31,174,85,0.08)", padding: "14px", borderRadius: 8, textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>Dung lượng tiêu hao</span>
                        <h4 style={{ fontSize: 24, fontWeight: 800, color: "#1fae55", margin: "4px 0" }}>0 Byte</h4>
                        <span style={{ fontSize: 11, color: "#1fae55" }}>Không tốn ổ cứng</span>
                      </div>
                    </div>
                    <p style={{ marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
                      Cơ chế Hardlink trên APFS/NTFS tạo liên kết trực tiếp tới file RAW gốc, tiết kiệm hàng trăm GB dung lượng.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <b>Zero-Cost Hardlink.</b> Tách 500 ảnh RAW ra thư mục riêng ngay lập tức mà không tốn thêm 1 byte ổ cứng, không phải chờ copy nặng nề.
              </p>
            </article>

            <article className="xcard" style={{ background: "#d9eef2" }}>
              <div className="canvas" data-w="600" data-h="430">
                <div className="cv" style={{ width: "600px", height: "430px" }}>
                  <div className="wall blue"></div>
                  <div className="win" style={{ left: "50px", top: "50px", width: "500px", height: "320px", background: "#fff", padding: "16px" }}>
                    <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", fontWeight: 700, fontSize: 14 }}>
                      ⚡ Batch Multi-Customer Mode
                    </div>
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: 6, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                        <span>📁 01_Tuan_Lan</span>
                        <b style={{ color: "#1fae55" }}>✓ 45 file</b>
                      </div>
                      <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: 6, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                        <span>📁 02_Hoang_Mai</span>
                        <b style={{ color: "#1fae55" }}>✓ 38 file</b>
                      </div>
                      <div style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: 6, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
                        <span>📁 03_Duc_Anh</span>
                        <b style={{ color: "#1fae55" }}>✓ 62 file</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                <b>Batch Multi-Customer.</b> Thả một thư mục tháng chứa 50-100 khách hàng con, app tự động bóc tách và phân luồng độc lập.
              </p>
            </article>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
            <button
              className="btn btn-light btn-s"
              onClick={() => scrollRail("rail-picker", -1)}
              aria-label="Previous"
            >
              <Glyph name="chevronLeft" />
            </button>
            <button
              className="btn btn-light btn-s"
              onClick={() => scrollRail("rail-picker", 1)}
              aria-label="Next"
            >
              <Glyph name="chevronRight" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────── 5. SECTION 2: CONTACT THE SHEET (SEGMENTED TABS) ───────── */}
      <section className="sec soft" id="sheet" data-tabs="sheet">
        <div className="wrap head-center reveal">
          <span className="eyebrow c-violet">{isVi ? "Workflow Studio" : "Studio Workflow"}</span>
          <h2 className="big">
            {isVi ? (
              <>Đối soát Google Sheet,<br /><span className="c-violet">trả link Drive tự động.</span></>
            ) : (
              <>Audit Google Sheets,<br /><span className="c-violet">auto-deliver Drive links.</span></>
            )}
          </h2>
          <p className="lead" style={{ margin: "22px auto 0" }}>
            {isVi ? (
              <>Kết nối trực tiếp tài khoản Google. Bóc tách mã chọn ảnh từ cột bảng tính, lọc xong tự động đánh dấu và cập nhật link Drive trả ảnh. <b>Bảo vệ an toàn 100% công thức của studio.</b></>
            ) : (
              <>Direct Google integration. Extracts selection codes from spreadsheets, marks filtered status, and posts Drive links. <b>100% formula-safe.</b></>
            )}
          </p>
        </div>

        <div className="wrap tabbed reveal" data-tabs="sheet">
          <div className="device macbook" ref={sheetMacRef}>
            <div className="mb-lid" ref={sheetLidRef}>
              <div className="mb-screen canvas" data-w="1440" data-h="900">
                <div className="cv" style={{ width: "1440px", height: "900px" }}>
                  <div className="wall night"></div>
                  <div className="mbar dark">
                    <b>Contact the Sheet</b>
                    <span>Tab: Edit 10/2026</span>
                    <div className="r"><span>Th 3 21 thg 10 9:41</span></div>
                  </div>

                  {/* Tab 0: Bóc tách mã từ Sheet */}
                  <div className={`scene ${tabIndex === 0 ? "on" : ""}`}>
                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "#ffffff", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Contact the Sheet */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(16,185,129,0.12)", color: "#059669", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Contact the Sheet · Workflow
                          </span>
                        </div>

                        {/* Top View Tabs of Contact the Sheet */}
                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📁 Đồng bộ thư mục</span>
                          <span style={{ background: "#ffffff", color: "#059669", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            ▶️ Batch Runner
                          </span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>⚙️ Cấu hình Sheet</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>☁️ Cấu hình Drive</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📋 Audit</span>
                        </div>

                        {/* Right: Google OAuth Status */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <span style={{ color: "#059669", fontWeight: 700, border: "1px solid #a7f3d0", background: "#ecfdf5", padding: "2px 8px", borderRadius: 999, fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                            <Glyph name="cloud" style={{ width: 12, height: 12 }} />
                            OAuth2: Connected
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace with Sidebar & Sheet Table */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        {/* Mini Ecosystem Sidebar */}
                        <div style={{ width: "190px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 8px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="crop" style={{ width: 15, height: 15, color: "var(--blue)" }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#059669", fontWeight: 700, fontSize: 12, borderLeft: "3px solid #10b981" }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15 }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="zap" style={{ width: 15, height: 15, color: "#6366f1" }} />
                              <span>MVD Convert</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="chart" style={{ width: 15, height: 15, color: "#8b5cf6" }} />
                              <span>Photo Counter</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* Content Area: Google Sheet Grid with Highlighted Code Extraction */}
                        <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div>
                              <b style={{ fontSize: 13, color: "var(--ink)", display: "block" }}>Google Sheet: "KẾ HOẠCH TRẢ ẢNH CƯỚI 2026" — Tab: "Edit 10/2026"</b>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>Tự động đọc Cột F (Mã khách chọn) · 48 Khách hàng phát hiện trong Sheet</span>
                            </div>
                            <span style={{ fontSize: 11, background: "rgba(16,185,129,0.1)", color: "#059669", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>
                              Trích xuất tự động: 100% Hoàn tất
                            </span>
                          </div>

                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                              <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                                  <th style={{ padding: "8px 10px", width: "45px" }}>STT</th>
                                  <th style={{ padding: "8px 10px", width: "200px" }}>Tên Khách Hàng</th>
                                  <th style={{ padding: "8px 10px", width: "110px" }}>Ngày Chụp</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(16,185,129,0.08)", color: "#059669", fontWeight: 700 }}>Cột F: Mã Ảnh Khách Chọn (Regex Parser)</th>
                                  <th style={{ padding: "8px 10px", width: "160px" }}>Trạng Thái Trích Xuất</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { stt: "01", name: "Tuấn & Lan (Đà Lạt)", date: "12/10/2026", codes: "HPP01099, 1006, 1078, 00987", parsed: "✓ Đã bóc tách 45 mã" },
                                  { stt: "02", name: "Hoàng & Mai (Studio)", date: "15/10/2026", codes: "ZHA_0555-0573, 0576", parsed: "✓ Đã bóc tách 38 mã" },
                                  { stt: "03", name: "Đức & Anh (Tiệc Cưới)", date: "18/10/2026", codes: "DSC_0401..0415, 0420", parsed: "✓ Đã bóc tách 62 mã" },
                                  { stt: "04", name: "Khánh Vy (Kỷ Yếu)", date: "20/10/2026", codes: "ABC1234..1280", parsed: "✓ Đã bóc tách 120 mã" },
                                  { stt: "05", name: "Minh Hằng (Lookbook)", date: "22/10/2026", codes: "MH_0100..0154", parsed: "✓ Đã bóc tách 54 mã" },
                                ].map((r, i) => (
                                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "10px", fontWeight: 700, color: "#64748b" }}>{r.stt}</td>
                                    <td style={{ padding: "10px", fontWeight: 600 }}>{r.name}</td>
                                    <td style={{ padding: "10px", color: "var(--muted)" }}>{r.date}</td>
                                    <td style={{ padding: "10px", fontFamily: "JetBrains Mono, monospace", background: "rgba(16,185,129,0.04)", color: "#047857", fontWeight: 600 }}>
                                      {r.codes}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                      <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: 6, fontWeight: 700, fontSize: 11 }}>
                                        {r.parsed}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div style={{ marginTop: "auto", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 8 }}>
                              <Glyph name="check" style={{ width: 16, height: 16, flexShrink: 0 }} />
                              <span><b>Tự động bóc tách &amp; kế thừa tiền tố:</b> Xử lý trọn vẹn 48 khách hàng trong 0.4 giây. Sẵn sàng lọc ảnh tự động không cần nhập tay.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab 1: Cập nhật link Drive */}
                  <div className={`scene ${tabIndex === 1 ? "on" : ""}`}>
                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "#ffffff", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Contact the Sheet */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(16,185,129,0.12)", color: "#059669", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Contact the Sheet · Google Drive Sync
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📁 Đồng bộ thư mục</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>▶️ Batch Runner</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>⚙️ Cấu hình Sheet</span>
                          <span style={{ background: "#ffffff", color: "#059669", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            ☁️ Cấu hình Drive
                          </span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📋 Audit</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <span style={{ color: "#2563eb", fontWeight: 700, border: "1px solid #bfdbfe", background: "#eff6ff", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>
                            Drive API v3: Hoạt động
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace with Sidebar & Drive Sync Table */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        <div style={{ width: "190px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 8px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="crop" style={{ width: 15, height: 15, color: "var(--blue)" }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#059669", fontWeight: 700, fontSize: 12, borderLeft: "3px solid #10b981" }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15 }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* Drive Auto-Sync Grid */}
                        <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div>
                              <b style={{ fontSize: 13, color: "var(--ink)", display: "block" }}>Thư mục lưu trữ: Google Drive / Tra_Anh_Khach / T10_PreWedding</b>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>Tự động tạo folder riêng theo tên khách &amp; phân quyền truy cập</span>
                            </div>
                            <span style={{ fontSize: 11, background: "#dcfce7", color: "#15803d", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>
                              ✓ Cập nhật hoàn tất 48/48 Folder
                            </span>
                          </div>

                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                              <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                                  <th style={{ padding: "8px 10px", width: "45px" }}>STT</th>
                                  <th style={{ padding: "8px 10px", width: "200px" }}>Khách Hàng</th>
                                  <th style={{ padding: "8px 10px", width: "210px" }}>Thư Mục Drive Tự Động</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(37,99,235,0.08)", color: "#2563eb", fontWeight: 700 }}>Cột H: Link Google Drive Trả Khách</th>
                                  <th style={{ padding: "8px 10px", width: "160px" }}>Phân Quyền Khách</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { stt: "01", name: "Tuấn & Lan (Đà Lạt)", folder: "📁 01_Tuan_Lan_DaLat", link: "drive.google.com/drive/folders/1tUaN_LaN_DaLat", perm: "✓ Xem & Tải (View only)" },
                                  { stt: "02", name: "Hoàng & Mai (Studio)", folder: "📁 02_Hoang_Mai_Studio", link: "drive.google.com/drive/folders/2hOaN_Mai_Studio", perm: "✓ Xem & Tải (View only)" },
                                  { stt: "03", name: "Đức & Anh (Tiệc Cưới)", folder: "📁 03_Duc_Anh_TiecCuoi", link: "drive.google.com/drive/folders/3dUc_Anh_Cuoi", perm: "✓ Xem & Tải (View only)" },
                                  { stt: "04", name: "Khánh Vy (Kỷ Yếu)", folder: "📁 04_Khanh_Vy_KyYeu", link: "drive.google.com/drive/folders/4kHa_Vy_KyYeu", perm: "✓ Xem & Tải (View only)" },
                                  { stt: "05", name: "Minh Hằng (Lookbook)", folder: "📁 05_Minh_Hang_Lookbook", link: "drive.google.com/drive/folders/5mHg_Hang_Look", perm: "✓ Xem & Tải (View only)" },
                                ].map((r, i) => (
                                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "10px", fontWeight: 700, color: "#64748b" }}>{r.stt}</td>
                                    <td style={{ padding: "10px", fontWeight: 600 }}>{r.name}</td>
                                    <td style={{ padding: "10px", color: "var(--ink)", fontWeight: 500 }}>{r.folder}</td>
                                    <td style={{ padding: "10px", fontFamily: "JetBrains Mono, monospace", background: "rgba(37,99,235,0.04)", color: "#2563eb", fontWeight: 600, textDecoration: "underline" }}>
                                      {r.link}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                      <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "3px 8px", borderRadius: 6, fontWeight: 700, fontSize: 11 }}>
                                        {r.perm}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div style={{ marginTop: "auto", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#166534", display: "flex", alignItems: "center", gap: 8 }}>
                              <Glyph name="check" style={{ width: 16, height: 16, flexShrink: 0 }} />
                              <span><b>Tự động tạo folder &amp; cập nhật link:</b> Toàn bộ 48 folder được tạo trực tiếp trên Drive và dán link vào Cột H trong 4.2 giây. Không phải mở trình duyệt copy-paste thủ công.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab 2: Bảo vệ công thức */}
                  <div className={`scene ${tabIndex === 2 ? "on" : ""}`}>
                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "#ffffff", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Contact the Sheet */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(37,99,235,0.12)", color: "var(--blue)", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Formula Shield · Bảo vệ công thức
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📁 Đồng bộ thư mục</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>▶️ Batch Runner</span>
                          <span style={{ background: "#ffffff", color: "var(--blue)", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            🛡️ Formula Shield
                          </span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>☁️ Cấu hình Drive</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📋 Audit</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <span style={{ color: "var(--blue)", fontWeight: 700, border: "1px solid #bfdbfe", background: "#eff6ff", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>
                            Formula Shield: Active
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace with Sidebar & Formula Shield Table */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        <div style={{ width: "190px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 8px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="crop" style={{ width: 15, height: 15, color: "var(--blue)" }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#059669", fontWeight: 700, fontSize: 12, borderLeft: "3px solid #10b981" }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15 }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* Formula Protected Table */}
                        <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                          <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <div>
                              <b style={{ fontSize: 13, color: "var(--ink)", display: "block" }}>Chế độ bảo vệ công thức: Chỉ ghi vào Cột G &amp; Cột H</b>
                              <span style={{ fontSize: 11, color: "var(--muted)" }}>Các cột tính tiền, đặt cọc, trừ nợ và tính lương retoucher được khóa an toàn</span>
                            </div>
                            <span style={{ fontSize: 11, background: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>
                              🔒 Khóa an toàn 4 Cột Kế Toán
                            </span>
                          </div>

                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                              <thead>
                                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                                  <th style={{ padding: "8px 10px", width: "160px" }}>Khách Hàng</th>
                                  <th style={{ padding: "8px 10px", width: "100px", color: "#16a34a" }}>Cột G: Đã Lọc</th>
                                  <th style={{ padding: "8px 10px", width: "140px", color: "#2563eb" }}>Cột H: Link Drive</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(239,68,68,0.06)", color: "#b91c1c", fontWeight: 700 }}>Cột I: Giá Hợp Đồng</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(239,68,68,0.06)", color: "#b91c1c", fontWeight: 700 }}>Cột J: Đã Cọc</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(239,68,68,0.06)", color: "#b91c1c", fontWeight: 700 }}>Cột K: Còn Lại (=I-J) 🔒</th>
                                  <th style={{ padding: "8px 10px", background: "rgba(239,68,68,0.06)", color: "#b91c1c", fontWeight: 700 }}>Cột L: Lương Retouch 🔒</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: "Tuấn & Lan", status: "XONG ✓", link: "drive.google.com/...", price: "15.000.000đ", deposit: "5.000.000đ", remain: "10.000.000đ", wage: "675.000đ" },
                                  { name: "Hoàng & Mai", status: "XONG ✓", link: "drive.google.com/...", price: "8.500.000đ", deposit: "3.000.000đ", remain: "5.500.000đ", wage: "570.000đ" },
                                  { name: "Đức & Anh", status: "XONG ✓", link: "drive.google.com/...", price: "18.000.000đ", deposit: "10.000.000đ", remain: "8.000.000đ", wage: "930.000đ" },
                                  { name: "Khánh Vy", status: "XONG ✓", link: "drive.google.com/...", price: "12.000.000đ", deposit: "4.000.000đ", remain: "8.000.000đ", wage: "1.800.000đ" },
                                  { name: "Minh Hằng", status: "XONG ✓", link: "drive.google.com/...", price: "7.000.000đ", deposit: "2.000.000đ", remain: "5.000.000đ", wage: "810.000đ" },
                                ].map((r, i) => (
                                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "10px", fontWeight: 600 }}>{r.name}</td>
                                    <td style={{ padding: "10px", color: "#16a34a", fontWeight: 700 }}>{r.status}</td>
                                    <td style={{ padding: "10px", color: "#2563eb", textDecoration: "underline" }}>{r.link}</td>
                                    <td style={{ padding: "10px", color: "#64748b" }}>{r.price}</td>
                                    <td style={{ padding: "10px", color: "#64748b" }}>{r.deposit}</td>
                                    <td style={{ padding: "10px", fontWeight: 700, color: "#1e293b", background: "rgba(239,68,68,0.03)" }}>{r.remain} 🔒</td>
                                    <td style={{ padding: "10px", fontWeight: 700, color: "#059669", background: "rgba(239,68,68,0.03)" }}>{r.wage} 🔒</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div style={{ marginTop: "auto", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#1e40af", display: "flex", alignItems: "center", gap: 8 }}>
                              <Glyph name="shield" style={{ width: 16, height: 16, flexShrink: 0 }} />
                              <span><b>Formula Shield Bảo vệ 100%:</b> App chỉ cập nhật đúng ô được phân quyền. Các công thức tính tổng, trừ tiền cọc, tính lương thợ và macro Google Apps Script tuyệt đối không bị ảnh hưởng.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab 3: Kiểm tra trạng thái job */}
                  <div className={`scene ${tabIndex === 3 ? "on" : ""}`}>
                    <div className="win finder" style={{ left: "60px", top: "45px", width: "1320px", height: "800px", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "#ffffff", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
                      {/* Top Bar of Contact the Sheet */}
                      <div className="tb" style={{ borderBottom: "1px solid rgba(11,13,18,0.08)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span className="lights"><i></i><i></i><i></i></span>
                          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>←</span>
                          <span style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            <img src="/brand/dh_app_icon_dock_light.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                            DH Studio Pro
                          </span>
                          <span style={{ fontSize: 11, background: "rgba(245,158,11,0.12)", color: "#d97706", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
                            Audit Engine · Nhật ký đối soát
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: "3px 6px", borderRadius: 8, fontSize: 12 }}>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>📁 Đồng bộ thư mục</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>▶️ Batch Runner</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>⚙️ Cấu hình Sheet</span>
                          <span style={{ color: "var(--muted)", padding: "3px 8px" }}>☁️ Cấu hình Drive</span>
                          <span style={{ background: "#ffffff", color: "#d97706", fontWeight: 700, padding: "3px 10px", borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                            📋 Audit (1 Cảnh báo)
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                          <span style={{ color: "#d97706", fontWeight: 700, border: "1px solid #fde68a", background: "#fef3c7", padding: "2px 8px", borderRadius: 999, fontSize: 11 }}>
                            1 Job Cần Lưu Ý
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }}></span>
                            <span>Vương Dev</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Workspace with Sidebar & Audit View */}
                      <div style={{ display: "flex", flex: 1, minHeight: 0, background: "#e9eef6" }}>
                        <div style={{ width: "190px", background: "#ffffff", borderRight: "1px solid #d6dfeb", display: "flex", flexDirection: "column", padding: "12px 8px", gap: 6 }}>
                          <div style={{ padding: "4px 8px 8px", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>WORKSPACE</span>
                            <b style={{ fontSize: 12, color: "var(--ink)" }}>DH Studio Pro</b>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="crop" style={{ width: 15, height: 15, color: "var(--blue)" }} />
                              <span>Photo Picker Pro</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(16,185,129,0.12)", color: "#059669", fontWeight: 700, fontSize: 12, borderLeft: "3px solid #10b981" }}>
                              <Glyph name="cloud" style={{ width: 15, height: 15 }} />
                              <span>Contact the Sheet</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, color: "#475569", fontSize: 12, fontWeight: 500 }}>
                              <Glyph name="sparkles" style={{ width: 15, height: 15, color: "#f59e0b" }} />
                              <span>Kho Tài Nguyên</span>
                            </div>
                          </div>
                          <div style={{ marginTop: "auto", padding: "8px", borderTop: "1px solid #f1f5f9", textAlign: "center", fontSize: 10, color: "#94a3b8" }}>
                            DevHouse Software
                          </div>
                        </div>

                        {/* Audit Details Area */}
                        <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                            <div style={{ background: "#ffffff", borderRadius: 10, border: "1px solid #d6dfeb", padding: "12px 14px" }}>
                              <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>Tổng số Job trong Sheet:</span>
                              <b style={{ fontSize: 18, color: "var(--ink)" }}>48 Khách hàng</b>
                            </div>
                            <div style={{ background: "#ffffff", borderRadius: 10, border: "1px solid #d6dfeb", padding: "12px 14px" }}>
                              <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>Đã đối soát khớp 100%:</span>
                              <b style={{ fontSize: 18, color: "#16a34a" }}>47 Khách hàng (98%)</b>
                            </div>
                            <div style={{ background: "#ffffff", borderRadius: 10, border: "1px solid #d6dfeb", padding: "12px 14px" }}>
                              <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>Cần kiểm tra lại file:</span>
                              <b style={{ fontSize: 18, color: "#d97706" }}>1 Khách hàng (Thiếu file)</b>
                            </div>
                          </div>

                          <div style={{ flex: 1, background: "#ffffff", borderRadius: 12, border: "1px solid #d6dfeb", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 10, padding: "14px", display: "flex", flexDirection: "column", gap: 6 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <b style={{ color: "#92400e", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                                  <Glyph name="alert" style={{ width: 16, height: 16 }} />
                                  Phát hiện sai lệch: Khách hàng "Mai_Lan_Studio" (Dòng 18 trên Sheet)
                                </b>
                                <span style={{ fontSize: 11, background: "#d97706", color: "#fff", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                                  THIẾU 2 FILE RAW
                                </span>
                              </div>
                              <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.6 }}>
                                Khách chọn <b>35 ảnh</b> từ Google Sheet, nhưng trong thư mục ổ cứng chỉ quét thấy <b>33 ảnh</b>.<br />
                                2 mã ảnh không tìm thấy: <code>DSC_0412.CR3</code>, <code>DSC_0415.CR3</code> (Có thể do thợ chụp chưa sao chép hết từ thẻ nhớ).
                              </div>
                            </div>

                            <div style={{ display: "flex", gap: 10 }}>
                              <button className="btn btn-dark" style={{ padding: "8px 16px", fontSize: 12, background: "var(--blue)" }}>
                                ⚡ Xuất báo cáo gửi Zalo cho thợ chụp
                              </button>
                              <button className="btn btn-light" style={{ padding: "8px 16px", fontSize: 12 }}>
                                Bỏ qua &amp; tiếp tục lọc 47 khách còn lại
                              </button>
                            </div>

                            <div style={{ marginTop: "auto", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#64748b" }}>
                              ℹ️ <b>Đối soát hai chiều tự động:</b> Ngăn chặn 100% tình trạng thợ trả thiếu ảnh cho khách, giúp studio phát hiện ngay file thiếu trước khi giao sản phẩm.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="mb-notch"></div>
            </div>
            <div className="mb-base"></div>
          </div>

          <div className="seg" role="tablist">
            {[
              { id: 0, label: isVi ? "Bóc tách từ Sheet" : "Sheet Code Extraction" },
              { id: 1, label: isVi ? "Tự điền link Drive" : "Drive URL Sync" },
              { id: 2, label: isVi ? "Bảo vệ công thức" : "Formula Protection" },
              { id: 3, label: isVi ? "Kiểm tra trạng thái" : "Audit Status Check" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={tabIndex === tab.id ? "on" : ""}
                onClick={() => {
                  setIsAutoTab(false);
                  setTabIndex(tab.id);
                }}
                role="tab"
                aria-selected={tabIndex === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p
            className="caption"
            aria-live="polite"
            dangerouslySetInnerHTML={{ __html: tabCaptions[tabIndex] || "" }}
          ></p>
        </div>
      </section>

      {/* ───────── 6. SECTION 3: PHOTO COUNTER & KPI (BENTO) ───────── */}
      <section className="sec" id="counter">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow c-green">{isVi ? "Sản lượng & KPI" : "KPI & Audit"}</span>
            <h2 className="big">
              {isVi ? (
                <>Kiểm đếm sản lượng,<br /><span className="c-green">tính lương minh bạch.</span></>
              ) : (
                <>Audit deliverables,<br /><span className="c-green">transparent retoucher payroll.</span></>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Photo Counter tự động bóc tách các thư mục sâu nhất để kiểm đếm số lượng file hoàn thiện bàn giao cho khách, phân loại ảnh và tính lương retoucher theo định mức. <b>Chính xác từng file, không lo nhầm lẫn.</b></>
            ) : (
              <>Photo Counter audits deepest subdirectories, categorizing deliverables and calculating piece-rate salaries. <b>Exact down to the single file.</b></>
            )}
          </p>
        </div>

        <div className="wrap bento">
          <div className="tile span-3 reveal">
            <div className="ico" style={{ background: "var(--green)" }}><Glyph name="folder" /></div>
            <h3>{isVi ? "Quét thư mục sâu nhất" : "Deepest Folder Audit"}</h3>
            <p>{isVi ? "Tự động nhận diện cấu trúc lưu ảnh studio: InAlbum, CongTrang, TiecCuoi; đếm chính xác số lượng file." : "Recognizes studio file structures, accurately counting final deliverables."}</p>
          </div>

          <div className="tile span-3 reveal">
            <div className="ico" style={{ background: "var(--blue)" }}><Glyph name="calculator" /></div>
            <h3>{isVi ? "Tính lương Retoucher theo ảnh" : "Piece-rate Retoucher Payroll"}</h3>
            <p>{isVi ? "Tự động cộng tiền theo định mức ảnh đơn, ảnh cưới, ảnh ghép, phóng sự; xuất bảng lương chi tiết." : "Calculates compensation based on single shots, collages, and event packages."}</p>
          </div>

          <div className="tile span-6 reveal" style={{ minHeight: 0 }}>
            <div style={{ display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
              <div className="ico" style={{ background: "var(--violet)", margin: 0 }}><Glyph name="sparkles" /></div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <h3>{isVi ? "Dự đoán sản lượng & Trợ lý AI" : "AI Workload Forecast & Analytics"}</h3>
                <p>{isVi ? "Theo dõi tiến độ hoàn thiện theo tuần/tháng, dự đoán khối lượng công việc tồn đọng và đối soát hiệu suất studio." : "Tracks weekly/monthly throughput, forecasts backlog, and audits studio productivity."}</p>
              </div>
              <div className="badges" style={{ margin: 0, justifyContent: "flex-start" }}>
                <span>{isVi ? "Báo cáo theo ngày" : "Daily Stats"}</span>
                <span>{isVi ? "Bảng lương tự động" : "Automated Payroll"}</span>
                <span>{isVi ? "Xuất Excel" : "Excel Export"}</span>
                <span>{isVi ? "Đối soát hợp đồng" : "Contract Audit"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 7. SECTION 4: DARK SECTION - PERFORMANCE & PRIVACY ───────── */}
      <section className="sec dark" id="hieu-nang">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow" style={{ color: "#6fd3ff" }}>{isVi ? "Bảo mật & Hiệu năng Native" : "Security & Native Performance"}</span>
            <h2 className="big">
              {isVi ? (
                <>Kiến trúc Rust tối tân.<br /><span className="c-sky">100% Offline, an toàn,<br />nhẹ dưới 80MB RAM.</span></>
              ) : (
                <>Next-Gen Rust Architecture.<br /><span className="c-sky">100% Local-first offline,<br />under 80MB RAM RSS.</span></>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Xây dựng trên nền tảng Rust Native và Tauri v2. Quét hàng trăm nghìn file RAW cực êm, không hú quạt, không chiếm dụng tài nguyên máy tính. <b>Dữ liệu ảnh của khách hàng không bao giờ rời khỏi máy.</b></>
            ) : (
              <>Engineered on native Rust and Tauri v2. Effortlessly scans 100,000+ RAWs with whisper-quiet fans. <b>Client files strictly never leave your machine.</b></>
            )}
          </p>
        </div>

        <div className="wrap bento" style={{ marginTop: 56 }}>
          <div className="tile span-4 reveal" style={{ background: "#171a22", padding: 24, minHeight: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 14 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Hệ Thống Kiểm Soát Tài Nguyên (Rust Native)</span>
              <span style={{ color: "#30c85a", fontSize: 13, fontWeight: 700 }}>● Hoạt động tối ưu</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 20 }}>
              <div style={{ background: "#0d0f14", padding: "14px", borderRadius: 8 }}>
                <span style={{ color: "#8b919c", fontSize: 12 }}>Bộ nhớ RAM tiêu thụ</span>
                <h4 style={{ fontSize: 24, fontWeight: 800, color: "#2f7bff", margin: "4px 0" }}>78 MB</h4>
                <span style={{ color: "#30c85a", fontSize: 11 }}>Cực nhẹ</span>
              </div>
              <div style={{ background: "#0d0f14", padding: "14px", borderRadius: 8 }}>
                <span style={{ color: "#8b919c", fontSize: 12 }}>Tốc độ quét file RAW</span>
                <h4 style={{ fontSize: 24, fontWeight: 800, color: "#30c85a", margin: "4px 0" }}>&lt; 2 Giây</h4>
                <span style={{ color: "#30c85a", fontSize: 11 }}>100.000 file</span>
              </div>
              <div style={{ background: "#0d0f14", padding: "14px", borderRadius: 8 }}>
                <span style={{ color: "#8b919c", fontSize: 12 }}>CPU lúc nghỉ</span>
                <h4 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: "4px 0" }}>0.0%</h4>
                <span style={{ color: "#8b919c", fontSize: 11 }}>Không tốn pin</span>
              </div>
            </div>
          </div>

          <div className="span-2" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="tile reveal" style={{ background: "#171a22", minHeight: 0, flex: 1 }}>
              <div className="ico" style={{ background: "#2f7bff" }}><Glyph name="lock" /></div>
              <h3 style={{ color: "#fff" }}>{isVi ? "100% Offline & Bảo Mật" : "Air-Gapped Privacy"}</h3>
              <p style={{ color: "#9aa1ad" }}>{isVi ? "Ảnh RAW của khách hàng nằm nguyên tại ổ cứng máy tính, không upload lên cloud." : "Photos remain strictly on your hard drive; zero cloud uploads."}</p>
            </div>
            <div className="tile reveal" style={{ background: "#171a22", minHeight: 0, flex: 1 }}>
              <div className="ico" style={{ background: "#7b5cff" }}><Glyph name="sync" /></div>
              <h3 style={{ color: "#fff" }}>{isVi ? "Cập Nhật OTA 1-Click" : "Seamless OTA Updates"}</h3>
              <p style={{ color: "#9aa1ad" }}>{isVi ? "Luôn nhận các thuật toán bóc tách mã mới và cải tiến tính năng nhanh chóng." : "Instant notification and one-click upgrades for newest parsing algorithms."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8. SECTION 5: FORMATS & CONVERT ───────── */}
      <section className="sec" id="dinh-dang">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow c-orange">{isVi ? "Định dạng & Chuyển đổi" : "Formats & Engine"}</span>
            <h2 className="big">
              {isVi ? (
                <>Hỗ trợ mọi định dạng RAW<br /><span className="c-orange">từ mọi dòng máy ảnh.</span></>
              ) : (
                <>All RAW formats supported<br /><span className="c-orange">from any camera brand.</span></>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Xử lý tức thì các định dạng RAW độc quyền của Canon, Sony, Nikon, Fujifilm, Leica, Panasonic. Kèm công cụ MVD Convert chuyển đổi hàng loạt sang JPG/WebP đa luồng.</>
            ) : (
              <>Instant support for Canon, Sony, Nikon, Fujifilm, Leica, and Panasonic RAW formats with high-speed multi-threaded conversion.</>
            )}
          </p>
        </div>

        <div className="wrap reveal" style={{ marginTop: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {[
              { brand: "Canon", ext: ".CR2 / .CR3", model: "EOS R5, R6, 5D IV" },
              { brand: "Sony", ext: ".ARW", model: "A7R V, A7 IV, A1" },
              { brand: "Nikon", ext: ".NEF", model: "Z8, Z9, D850" },
              { brand: "Fujifilm", ext: ".RAF", model: "GFX 100, X-T5" },
              { brand: "Panasonic", ext: ".RW2", model: "Lumix S5 II, GH6" },
              { brand: "Adobe", ext: ".DNG", model: "Digital Negative" },
            ].map((f, i) => (
              <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px", background: "#f8fafc", textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>{f.brand}</span>
                <b style={{ display: "block", fontSize: 16, margin: "6px 0", color: "var(--ink)" }}>{f.ext}</b>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{f.model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 9. SECTION 6: SUPERAPP TOOL CARDS (4 TILES) ───────── */}
      <section className="sec soft" id="bo-cong-cu">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow c-blue">{isVi ? "Bộ công cụ Superapp" : "Superapp Suite"}</span>
            <h2 className="big">
              {isVi ? (
                <>Chọn việc cần làm.<br /><span className="c-blue">Bấm là xong ngay.</span></>
              ) : (
                <>Select your workflow.<br /><span className="c-blue">Finished in seconds.</span></>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Mỗi module trong hệ sinh thái DH Studio Pro được thiết kế chuyên biệt cho từng khâu trong quy trình làm việc studio, tối ưu hóa triệt để thời gian và công sức.</>
            ) : (
              <>Each module in DH Studio Pro is tailored for specific studio workflow bottlenecks, maximizing efficiency.</>
            )}
          </p>
        </div>

        <div className="wrap tools reveal">
          <div className="tool reveal" style={{ "--dot": "#ff7a1a" } as React.CSSProperties}>
            <div className="ico" style={{ background: "linear-gradient(160deg, #ffb35c, #ff6b3d)" }}>
              <Glyph name="photo" />
            </div>
            <h3>Photo Picker Pro</h3>
            <p className="sub">{isVi ? "Trái tim lọc ảnh tự động siêu tốc." : "Ultra-fast automated photo culling core."}</p>
            <ul>
              <li>{isVi ? "Bóc tách mã Zalo, Facebook, Excel" : "Extracts codes from Zalo, WhatsApp, Excel"}</li>
              <li>{isVi ? "Tạo Hardlink 0ms không tốn ổ cứng" : "0ms Hardlinks with zero disk consumption"}</li>
              <li>{isVi ? "Chế độ lọc hàng loạt Batch Multi-Customer" : "Batch Multi-Customer routing"}</li>
              <li>{isVi ? "Kế thừa tiền tố máy ảnh tự động" : "Smart camera prefix inheritance"}</li>
              <li>{isVi ? "Báo cáo ảnh trùng lặp & ảnh thiếu" : "Audit missing & duplicate photos"}</li>
            </ul>
          </div>

          <div className="tool reveal" style={{ "--dot": "#7b5cff" } as React.CSSProperties}>
            <div className="ico" style={{ background: "linear-gradient(160deg, #c79bff, #7b3ff2)" }}>
              <Glyph name="cloud" />
            </div>
            <h3>Contact the Sheet</h3>
            <p className="sub">{isVi ? "Tự động hóa Google Sheets & Drive." : "Google Sheets & Drive automation."}</p>
            <ul>
              <li>{isVi ? "Kết nối OAuth2 Google trực tiếp" : "Direct Google OAuth2 connectivity"}</li>
              <li>{isVi ? "Lấy mã chọn ảnh từ cột bảng tính" : "Extracts selection codes from sheet columns"}</li>
              <li>{isVi ? "Tự động điền link Drive trả khách" : "Auto-populates delivery Drive URLs"}</li>
              <li>{isVi ? "Bảo vệ 100% công thức bảng tính" : "100% formula and macro protection"}</li>
              <li>{isVi ? "Kiểm tra tiến độ job khách hàng" : "Monitors customer job progress"}</li>
            </ul>
          </div>

          <div className="tool reveal" style={{ "--dot": "#1fae55" } as React.CSSProperties}>
            <div className="ico" style={{ background: "linear-gradient(160deg, #5fe68e, #1fae55)" }}>
              <Glyph name="calculator" />
            </div>
            <h3>Photo Counter</h3>
            <p className="sub">{isVi ? "Kiểm đếm sản lượng & Tính lương KPI." : "Deliverable auditing & KPI payroll."}</p>
            <ul>
              <li>{isVi ? "Quét đệ quy thư mục sâu nhất" : "Deepest nested folder file auditor"}</li>
              <li>{isVi ? "Phân loại ảnh đơn, ảnh ghép, phóng sự" : "Groups single shots, collages, event photos"}</li>
              <li>{isVi ? "Tự động tính lương thợ retouch theo ảnh" : "Auto-calculates retoucher piece-rate salary"}</li>
              <li>{isVi ? "Trợ lý AI dự đoán doanh số & công việc" : "AI workload & KPI assistant"}</li>
              <li>{isVi ? "Xuất báo cáo đối soát Excel" : "Exports detailed Excel audit sheets"}</li>
            </ul>
          </div>

          <div className="tool reveal" style={{ "--dot": "#ff4f8b" } as React.CSSProperties}>
            <div className="ico" style={{ background: "linear-gradient(160deg, #ff8ebb, #ff4f8b)" }}>
              <Glyph name="archive" />
            </div>
            <h3>Convert &amp; Resources</h3>
            <p className="sub">{isVi ? "Chuyển đổi RAW & Kho tài nguyên VIP." : "RAW converter & VIP Creative Vault."}</p>
            <ul>
              <li>{isVi ? "Chuyển đổi đa luồng RAW sang JPG/WebP" : "Multi-threaded RAW to JPG/WebP converter"}</li>
              <li>{isVi ? "Giữ nguyên 100% siêu dữ liệu EXIF" : "Preserves 100% EXIF camera metadata"}</li>
              <li>{isVi ? "Kho Presets Lightroom VIP tuyển chọn" : "Curated VIP Lightroom Presets vault"}</li>
              <li>{isVi ? "Actions Photoshop da & màu cao cấp" : "Studio-grade Photoshop Retouch Actions"}</li>
              <li>{isVi ? "3D LUTs màu Cinematic cho Video" : "Cinematic 3D LUTs for wedding video"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 10. SECTION 7: STUDIO TAILORED (BENTO) ───────── */}
      <section className="sec" id="studio">
        <div className="wrap head-split reveal">
          <div>
            <span className="eyebrow c-pink">{isVi ? "Sinh ra cho Studio" : "Studio Dedicated"}</span>
            <h2 className="big">
              {isVi ? (
                <>Những việc trước đây<br /><span className="c-pink">phải làm thủ công hàng giờ.</span></>
              ) : (
                <>Tasks that previously<br /><span className="c-pink">took hours of manual work.</span></>
              )}
            </h2>
          </div>
          <p className="lead">
            {isVi ? (
              <>Quét song song 100.000 file RAW trong 2 giây, tìm kiếm Regex linh hoạt, tự động xóa khách đã hoàn thành, quản lý thư mục yêu thích. <b>Studio vận hành trơn tru mỗi ngày.</b></>
            ) : (
              <>Scans 100,000 RAWs in 2s, flexible regex searching, auto-cleanup of completed jobs, and favorite folders management.</>
            )}
          </p>
        </div>

        <div className="wrap bento">
          <div className="tile span-3 reveal">
            <div className="ico" style={{ background: "var(--blue)" }}><Glyph name="zap" /></div>
            <h3>{isVi ? "Quét song song Rayon < 2s" : "Rayon Concurrency < 2s"}</h3>
            <p>{isVi ? "Tận dụng toàn bộ nhân CPU của máy tính để lập chỉ mục hàng trăm nghìn file RAW tức thì." : "Leverages all CPU cores to index hundreds of thousands of RAW files instantaneously."}</p>
          </div>

          <div className="tile span-3 reveal">
            <div className="ico" style={{ background: "var(--pink)" }}><Glyph name="text" /></div>
            <h3>{isVi ? "Tìm kiếm Regex linh hoạt" : "Flexible Regex Matching"}</h3>
            <p>{isVi ? "Tùy biến bộ lọc theo biểu thức chính quy cho các dự án ảnh thương mại phức tạp." : "Custom regular expression filtering for advanced commercial photo cataloging."}</p>
          </div>

          <div className="tile span-2 reveal">
            <div className="ico" style={{ background: "var(--violet)" }}><Glyph name="check" /></div>
            <h3>{isVi ? "Xóa khách đã xong" : "Remove Completed"}</h3>
            <p>{isVi ? "Tự động dọn dẹp danh sách khách hàng đã lọc xong, giữ giao diện luôn gọn gàng." : "Clears finished customer queues to keep your workspace clutter-free."}</p>
          </div>

          <div className="tile span-2 reveal">
            <div className="ico" style={{ background: "var(--orange)" }}><Glyph name="folder" /></div>
            <h3>{isVi ? "Thư mục yêu thích" : "Favorite Folders"}</h3>
            <p>{isVi ? "Ghim các thư mục ổ cứng thường dùng để mở nhanh chỉ với 1 click chuột." : "Pin frequently accessed hard drive directories for 1-click loading."}</p>
          </div>

          <div className="tile span-2 reveal">
            <div className="ico" style={{ background: "#16181d" }}><Glyph name="history" /></div>
            <h3>{isVi ? "Lịch sử & Hoàn tác" : "History & Undo"}</h3>
            <p>{isVi ? "Xem lại lịch sử các phiên lọc đã thực hiện và khôi phục khi cần thiết." : "Review past culling sessions and restore records whenever needed."}</p>
          </div>
        </div>
      </section>

      {/* ───────── 11. SECTION 8: ALL FEATURES (INTERACTIVE FILTER) ───────── */}
      <section className="sec" id="tat-ca">
        <div className="wrap">
          <div className="head-center reveal">
            <span className="eyebrow c-blue">{isVi ? "Danh sách đầy đủ" : "Full Feature Directory"}</span>
            <h2 className="big">{isVi ? "Tất cả tính năng." : "All Features."}</h2>
            <p className="lead">{isVi ? "Mọi thứ DH Studio Pro làm được, gom theo nhóm. Gõ để tìm nhanh." : "Everything DH Studio Pro delivers, categorized. Type to search."}</p>
          </div>

          <div className="filter" role="toolbar" aria-label="Lọc tính năng">
            <button className={filterCat === "all" ? "on" : ""} onClick={() => setFilterCat("all")}>
              {isVi ? "Tất cả" : "All"}
            </button>
            <button className={filterCat === "picker" ? "on" : ""} onClick={() => setFilterCat("picker")}>
              {isVi ? "Lọc ảnh" : "Photo Picker"}
            </button>
            <button className={filterCat === "sheet" ? "on" : ""} onClick={() => setFilterCat("sheet")}>
              {isVi ? "Google Sheet" : "Google Sheet"}
            </button>
            <button className={filterCat === "counter" ? "on" : ""} onClick={() => setFilterCat("counter")}>
              {isVi ? "Thống kê & KPI" : "KPI & Audit"}
            </button>
            <button className={filterCat === "convert" ? "on" : ""} onClick={() => setFilterCat("convert")}>
              {isVi ? "Chuyển đổi RAW" : "RAW Convert"}
            </button>
            <button className={filterCat === "resources" ? "on" : ""} onClick={() => setFilterCat("resources")}>
              {isVi ? "Kho Tài nguyên" : "Resources"}
            </button>
            <button className={filterCat === "system" ? "on" : ""} onClick={() => setFilterCat("system")}>
              {isVi ? "Bảo mật & Hiệu năng" : "Security"}
            </button>

            <input
              type="search"
              placeholder={isVi ? "Tìm tính năng (gõ 'zalo', 'hardlink', 'sheet', 'lương')..." : "Search features (type 'zalo', 'hardlink', 'sheet')..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm tính năng"
            />
          </div>

          <div className="flist">
            {filteredFeatures.map((item) => (
              <div key={item.id} className="fitem" data-cat={item.cat}>
                <span className="ico" style={{ background: item.color }}>
                  <Glyph name={item.icon} />
                </span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}

            {filteredFeatures.length === 0 && (
              <div className="empty" style={{ textAlign: "center", padding: "40px 0", width: "100%", color: "var(--muted)" }}>
                {isVi ? "Không tìm thấy tính năng nào phù hợp với từ khóa." : "No features match your query."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── 12. SECTION 9: PRICING ───────── */}
      <section className="sec soft" id="gia">
        <div className="wrap head-center reveal">
          <span className="eyebrow c-blue">{isVi ? "Bảng giá thuê bao minh bạch" : "Transparent Subscriptions"}</span>
          <h2 className="big">
            {isVi ? (
              <>Dùng thử 7 ngày miễn phí.<br /><span className="c-blue">Gói thuê bao linh hoạt, tiết kiệm.</span></>
            ) : (
              <>7-Day Free Trial.<br /><span className="c-blue">Flexible &amp; Affordable Subscriptions.</span></>
            )}
          </h2>
          <p className="lead">
            {isVi ? (
              <>Trải nghiệm đầy đủ 100% tính năng trong 7 ngày trên máy tính của bạn. Khi hài lòng, bạn nâng cấp và kích hoạt bản quyền dễ dàng trực tiếp ngay trong ứng dụng qua VietQR tự động 24/7.</>
            ) : (
              <>Experience all features for 7 days on your computer. When satisfied, subscribe and activate instantly inside the app via automated 24/7 VietQR.</>
            )}
          </p>
        </div>

        <div className="wrap plans">
          {/* Card 1: Dùng thử 7 ngày */}
          <div className="plan reveal">
            <span className="badge-p">{isVi ? "TRẢI NGHIỆM MIỄN PHÍ" : "FREE EVALUATION"}</span>
            <h3>{isVi ? "Dùng Thử 7 Ngày" : "Evaluation Trial"}</h3>
            <div className="price">0đ <small>/ 7 ngày</small></div>
            <div className="note">{isVi ? "Trải nghiệm toàn bộ tốc độ và tính năng trên máy tính của bạn mà không tốn chi phí." : "Test all features on your computer with complete freedom."}</div>
            <ul>
              <li><Glyph name="check" /><div><b>{isVi ? "Không cần nhập thẻ tín dụng" : "No credit card required"}</b><span>{isVi ? "Tải về mở app là kích hoạt dùng ngay" : "Instant activation upon launching the app"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Mở khóa toàn bộ tính năng" : "Full feature access"}</b><span>{isVi ? "Lọc ảnh RAW, Google Sheets, Hardlink không giới hạn" : "Unlimited RAW culling & Google Sheets sync"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "100% An toàn & Offline" : "100% Safe & Offline"}</b><span>{isVi ? "Xử lý trực tiếp trên CPU/GPU máy bạn" : "Runs strictly on your local hardware"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Không tự động gia hạn" : "No automatic renewal"}</b><span>{isVi ? "Hoàn toàn không phát sinh chi phí ngầm" : "Zero recurring surprises or hidden fees"}</span></div></li>
            </ul>
            <a
              className="btn btn-light dl"
              href="#download"
              onClick={(e) => {
                if (onOpenDownload) {
                  e.preventDefault();
                  onOpenDownload();
                }
              }}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Glyph name="download" /> {isVi ? "Tải về dùng thử ngay" : "Download Free Trial"}
            </a>
          </div>

          {/* Card 2: Gói 12 Tháng (Featured Pro - Tiết kiệm nhất) */}
          <div className="plan pro reveal">
            <span className="badge-p">{isVi ? "TIẾT KIỆM NHẤT • KHUYÊN DÙNG" : "BEST VALUE • POPULAR"}</span>
            <h3>{isVi ? "Gói Super App 12 Tháng" : "Super App 12 Months"}</h3>
            <div className="price">499.000đ <small>{isVi ? "/ 12 tháng" : "/ 12 months"}</small></div>
            <div style={{ fontSize: 13, color: "#9aa6c0", textDecoration: "line-through", marginBottom: 2 }}>
              {isVi ? "Giá gốc: 899.000đ (Tiết kiệm 45%)" : "Orig. 899,000đ (Save 45%)"}
            </div>
            <div className="note">{isVi ? "Chỉ ~41.000đ/tháng. Đầy đủ trọn bộ hệ sinh thái Super App cho cả năm." : "~41,000đ/month. Full ecosystem access for a full year."}</div>
            <ul>
              <li><Glyph name="check" /><div><b>{isVi ? "Trọn bộ 3 ứng dụng chuyên nghiệp" : "All 3 Professional Apps"}</b><span>{isVi ? "Photo Picker Pro + Contact The Sheet + Photo Counter" : "Photo Picker Pro + Google Sheets + Photo Counter"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "1 tài khoản active / 1 máy tính" : "1 active device per account"}</b><span>{isVi ? "Đăng nhập máy mới tự động out máy cũ, đổi máy linh hoạt 100%" : "New login automatically signs out old device, 100% flexible"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Cập nhật tự động 365 ngày" : "365 days of free updates"}</b><span>{isVi ? "Miễn phí mọi thuật toán và tính năng mới nhất" : "Free access to all new algorithms and tools"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Nâng cấp trực tiếp trong app" : "In-app VietQR activation"}</b><span>{isVi ? "Quét mã VietQR tự động kích hoạt sau 30 giây" : "Scan VietQR in app to activate in 30 seconds"}</span></div></li>
            </ul>
            <button
              className="btn btn-dark"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => onOpenDownload ? onOpenDownload() : undefined}
            >
              <Glyph name="download" /> {isVi ? "Tải app dùng thử trước" : "Download App & Try First"}
            </button>
          </div>

          {/* Card 3: Gói Lọc Ảnh 1 Năm (Photo Picker Pro) */}
          <div className="plan reveal">
            <span className="badge-p">{isVi ? "ƯU ĐÃI NĂM • TIẾT KIỆM" : "ANNUAL PLAN • BEST VALUE"}</span>
            <h3>{isVi ? "Gói Lọc Ảnh 1 Năm" : "Photo Picker 1-Year Plan"}</h3>
            <div className="price">329.000đ <small>{isVi ? "/ 12 tháng" : "/ 12 months"}</small></div>
            <div style={{ fontSize: 13, color: "var(--muted)", textDecoration: "line-through", marginBottom: 2 }}>
              {isVi ? "Giá gốc: 529.000đ (Tiết kiệm 38%)" : "Orig. 529,000đ (Save 38%)"}
            </div>
            <div className="note">{isVi ? "Chỉ ~27.000đ/tháng. Chuyên biệt lọc ảnh RAW không giới hạn trong 365 ngày." : "Only ~27k/mo. Dedicated unlimited RAW photo culling for 365 days."}</div>
            <ul>
              <li><Glyph name="check" /><div><b>{isVi ? "Photo Picker Pro Core Studio" : "Photo Picker Pro Core Studio"}</b><span>{isVi ? "Lọc ảnh RAW (CR2, CR3, ARW, NEF, RAF) siêu tốc với Rust Rayon" : "Multi-threaded native Rust RAW culling at thousands files/s"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Smart Fuzzy Code Parser" : "Smart Fuzzy Code Parser"}</b><span>{isVi ? "Tự bóc tách mã Zalo, Sheets, dải số và kế thừa tiền tố" : "Parses Zalo codes, sheets, range numbers & prefix inheritance"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Zero-Cost Hardlink (0ms · 0 Byte)" : "Zero-Cost Hardlink (0ms · 0 Byte)"}</b><span>{isVi ? "Xuất file tức thì không nhân đôi dung lượng ổ cứng" : "Instant pointer export without doubling disk consumption"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "1 tài khoản active / 1 máy tính" : "1 active device per account"}</b><span>{isVi ? "Đăng nhập máy mới tự động out máy cũ, đổi máy linh hoạt 100%" : "New login automatically signs out old device, 100% flexible"}</span></div></li>
              <li><Glyph name="check" /><div><b>{isVi ? "Cập nhật miễn phí 365 ngày" : "365 days of free updates"}</b><span>{isVi ? "Nhận trọn bộ bản vá & cải tiến tốc độ mới nhất" : "Get all algorithm patches and performance updates"}</span></div></li>
            </ul>
            <a
              className="btn btn-light dl"
              href="#download"
              onClick={(e) => {
                if (onOpenDownload) {
                  e.preventDefault();
                  onOpenDownload();
                }
              }}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Glyph name="download" /> {isVi ? "Tải app trải nghiệm" : "Download Free Trial"}
            </a>
          </div>
        </div>

        {/* Transparent In-App Notice Box */}
        <div className="wrap reveal" style={{ marginTop: 36, maxWidth: 860 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: "22px 26px",
              boxShadow: "var(--shadow-s)",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(47, 123, 255, 0.1)",
                color: "var(--blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Glyph name="shield" style={{ width: 24, height: 24 }} />
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>
              <b style={{ color: "var(--ink)", display: "block", fontSize: 15.5, marginBottom: 2 }}>
                {isVi ? "Quy trình thanh toán & kích hoạt 100% trong ứng dụng" : "100% In-App Activation & Transparent Payment"}
              </b>
              {isVi ? (
                <>
                  Bạn <b>không cần thanh toán trên website</b>. Hãy tải phần mềm về máy và trải nghiệm <b>dùng thử 7 ngày miễn phí</b> đầy đủ tính năng. Khi muốn đăng ký hoặc gia hạn thuê bao, bạn chỉ cần mở mục <i>Quản lý bản quyền</i> ngay bên trong phần mềm và quét mã VietQR tự động.
                </>
              ) : (
                <>
                  No payment is processed on the website. Simply download the desktop app and enjoy a <b>full 7-day free trial</b>. When ready to subscribe, open <i>License Manager</i> inside the app and scan the dynamic VietQR for instant automatic activation.
                </>
              )}
            </div>
          </div>
        </div>

        <div className="wrap badges reveal" style={{ marginTop: 28 }}>
          <span><Glyph name="check" /> {isVi ? "Dùng thử 7 ngày miễn phí" : "7-Day Free Trial"}</span>
          <span><Glyph name="check" /> {isVi ? "1 tài khoản active / 1 máy (Tự out máy cũ, đổi máy linh hoạt)" : "1 active device / account (Seamless device switching)"}</span>
          <span><Glyph name="check" /> {isVi ? "Chuyển đổi máy linh hoạt 100%" : "Flexible device migration"}</span>
          <span><Glyph name="check" /> {isVi ? "Quét VietQR trong app nhận key tức thì" : "Instant in-app VietQR activation"}</span>
          <span><Glyph name="check" /> {isVi ? "Hỗ trợ kỹ thuật 24/7 qua Zalo & UltraViewer" : "24/7 dedicated tech support"}</span>
        </div>
      </section>

      {/* ───────── 13. SECTION 10: FAQ ───────── */}
      <section className="sec" id="hoi-dap">
        <div className="wrap head-center reveal">
          <span className="eyebrow c-blue">{isVi ? "Trước khi bắt đầu" : "Before You Start"}</span>
          <h2 className="big">{isVi ? "Thêm chút an tâm." : "Peace of Mind."}</h2>
        </div>

        <div className="wrap faq reveal" style={{ marginTop: 40 }}>
          <details open>
            <summary>{isVi ? "Máy tính của tôi có tương thích không?" : "Is my computer supported?"}</summary>
            <p>
              {isVi
                ? "DH Studio Pro chạy mượt mà trên macOS 12 trở lên (cả chip Apple Silicon M1/M2/M3/M4 lẫn Intel) và Windows 10/11 64-bit. Giao diện song ngữ Tiếng Việt và Tiếng Anh."
                : "DH Studio Pro runs smoothly on macOS 12+ (Apple Silicon M1-M4 and Intel) and Windows 10/11 64-bit with full English and Vietnamese localization."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Một tài khoản dùng được trên mấy máy tính?" : "How many computers can one account use?"}</summary>
            <p>
              {isVi
                ? "DH Studio Pro quản lý bản quyền theo tài khoản cá nhân. Mỗi tài khoản được sử dụng active trên 1 máy tính tại một thời điểm (khi bạn đăng nhập trên máy mới, máy cũ sẽ tự động đăng xuất an toàn). Bạn có thể đổi qua lại giữa MacBook khi đi làm và PC tại Studio bất kỳ lúc nào một cách hoàn toàn tự do và linh hoạt mà không bị khóa key."
                : "DH Studio Pro licenses per user account. Each account is active on 1 computer at a time (logging in on a new device automatically and securely signs out the previous one). You can switch freely between your MacBook on location and your Studio desktop without any license lockout."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Tôi thanh toán và gia hạn bản quyền như thế nào?" : "How do I subscribe and renew my license?"}</summary>
            <p>
              {isVi
                ? "Bạn không cần thanh toán trên website. Hãy tải phần mềm về máy và dùng thử 7 ngày miễn phí. Khi muốn nâng cấp hoặc gia hạn, bạn chỉ cần mở mục 'Quản lý bản quyền' bên trong ứng dụng, chọn gói cước và quét mã VietQR. Hệ thống SePay sẽ tự động nhận diện và mở khóa phần mềm ngay sau 30 giây."
                : "No web checkout needed. Simply download the app and use the 7-day free trial. To upgrade, open the License Manager inside the desktop app, pick your plan, and scan the VietQR for instant auto-unlock."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Hết 7 ngày dùng thử thì sao? Có bị trừ tiền tự động không?" : "What happens after the 7-day trial? Will I be charged?"}</summary>
            <p>
              {isVi
                ? "Tuyệt đối không! DH Studio Pro không yêu cầu thẻ tín dụng khi tải về. Hết 7 ngày dùng thử, app sẽ dừng các tính năng nâng cao cho đến khi bạn chủ động quét VietQR mua gói cước bên trong app. Bạn hoàn toàn chủ động 100%."
                : "Never! DH Studio Pro requires no credit card for download. After the 7-day trial, advanced features pause until you choose to activate a plan inside the app."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Một tài khoản dùng được trên mấy máy tính?" : "How many computers can one account use?"}</summary>
            <p>
              {isVi
                ? "DH Studio Pro quản lý bản quyền theo tài khoản cá nhân. Mỗi tài khoản được sử dụng active trên 1 máy tính tại một thời điểm (khi bạn đăng nhập trên máy mới, máy cũ sẽ tự động đăng xuất an toàn). Bạn có thể đổi qua lại giữa MacBook khi đi làm và PC tại Studio bất kỳ lúc nào một cách hoàn toàn tự do và linh hoạt mà không bị khóa key."
                : "DH Studio Pro licenses per user account. Each account is active on 1 computer at a time (logging in on a new device automatically and securely signs out the previous one). You can switch freely between your MacBook on location and your Studio desktop without any license lockout."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Phần mềm có làm hỏng hoặc xóa nhầm file RAW gốc không?" : "Can it damage or delete my original RAW photos?"}</summary>
            <p>
              {isVi
                ? "Tuyệt đối không. Ứng dụng đọc file RAW ở chế độ chỉ đọc (Read-only). Khi lọc, app chỉ xuất file sang thư mục mới hoặc tạo Hardlink liên kết, giữ nguyên 100% file gốc trên thẻ nhớ hoặc ổ cứng."
                : "Never. The app treats all RAW images strictly as read-only. Exporting copies files or creates hardlinks without ever touching the originals."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Hardlink hoạt động thế nào và tại sao không tốn dung lượng ổ cứng?" : "How do hardlinks work with zero disk consumption?"}</summary>
            <p>
              {isVi
                ? "Hardlink là tính năng cao cấp của hệ thống tệp APFS (macOS) và NTFS (Windows). Thay vì nhân đôi 50GB file RAW, hệ thống tạo thêm một đường dẫn trỏ tới cùng dữ liệu đó trong 0 mili-giây mà không tốn thêm 1 byte ổ cứng."
                : "Hardlinks are native filesystem pointers on APFS and NTFS. Instead of duplicating 50GB, the system creates a pointer to the same data in 0ms without consuming additional disk space."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Google Sheets có bị lỗi công thức khi app tự cập nhật không?" : "Will Google Sheets formulas break during sync?"}</summary>
            <p>
              {isVi
                ? "Hoàn toàn không. Công nghệ Formula Shield chỉ ghi dữ liệu vào đúng ô (cell) trạng thái hoặc cột link Drive được chỉ định, tuyệt đối không chạm vào macro, hàm tính tiền hay cấu trúc bảng."
                : "Not at all. Formula Shield strictly updates assigned cells, leaving accounting formulas, SUMs, and Google Apps Script macros completely intact."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Ảnh của khách hàng có bị tải lên mạng không?" : "Are client photos uploaded to the cloud?"}</summary>
            <p>
              {isVi
                ? "100% Offline. Toàn bộ quá trình quét, phân tích và xuất file RAW diễn ra hoàn toàn cục bộ trên máy tính của bạn thông qua nhân Rust Native, đảm bảo tính riêng tư tuyệt đối cho khách hàng."
                : "100% Offline and private. All scanning, parsing, and culling operations occur strictly on your local machine powered by native Rust."}
            </p>
          </details>

          <details>
            <summary>{isVi ? "Tôi có được hỗ trợ cài đặt và hướng dẫn sử dụng không?" : "Do I get onboarding and remote installation support?"}</summary>
            <p>
              {isVi
                ? "Đội ngũ kỹ sư DevHouse Software hỗ trợ trực tiếp 24/7 qua Zalo hoặc kết nối UltraViewer / AnyDesk từ xa để thiết lập quy trình chuẩn studio cho bạn."
                : "DevHouse engineers provide 24/7 dedicated onboarding and remote setup via Zalo, AnyDesk, or UltraViewer."}
            </p>
          </details>
        </div>
      </section>

      {/* ───────── 14. FINAL CTA BANNER ───────── */}
      <section className="sec soft final" id="download">
        <div className="wrap reveal">
          <img
            className="icon-big"
            src="/brand/dh_app_icon_dock_light.png"
            alt="DH Studio Pro"
            style={{ width: 92, height: 92, objectFit: "contain", margin: "0 auto 20px" }}
          />

          <h2 className="big">
            {isVi ? (
              <>Sẵn sàng tối ưu hóa<br /><span className="c-blue"><span className="swipe">quy trình Studio</span>?</span></>
            ) : (
              <>Ready to streamline<br /><span className="c-blue"><span className="swipe">your Studio workflow</span>?</span></>
            )}
          </h2>

          <p className="lead" style={{ margin: "22px auto 0" }}>
            {isVi ? "Tải DH Studio Pro ngay hôm nay, dùng thử 7 ngày với đầy đủ 100% tính năng." : "Download DH Studio Pro today with full 7-day access to every tool."}
          </p>

          {/* Direct 1-Click Downloads for Apple Silicon, Intel, Windows */}
          <div className="cta-row" style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              className="btn btn-dark btn-l"
              href={release.downloads?.macArm64?.url || `https://github.com/minhvuogdzz/photo-picker-pro/releases/download/v${release.version}/DH.Studio.Pro_${release.version}_aarch64.dmg`}
              download
              title="Tải trực tiếp cho Mac Apple Silicon (M1/M2/M3/M4)"
            >
              <Glyph name="download" />
              <span>{isVi ? `Mac Apple Silicon (${release.downloads?.macArm64?.formattedSize || "10.8 MB"})` : "Mac Apple Silicon"}</span>
            </a>

            <a
              className="btn btn-light btn-l"
              href={release.downloads?.macIntel?.url || `https://github.com/minhvuogdzz/photo-picker-pro/releases/download/v${release.version}/DH.Studio.Pro_${release.version}_x64.dmg`}
              download
              title="Tải trực tiếp cho Mac Intel"
            >
              <Glyph name="download" />
              <span>{isVi ? `Mac Intel (${release.downloads?.macIntel?.formattedSize || "11.1 MB"})` : "Mac Intel x64"}</span>
            </a>

            <a
              className="btn btn-light btn-l"
              href={release.downloads?.windows?.url || `https://github.com/minhvuogdzz/photo-picker-pro/releases/download/v${release.version}/DH.Studio.Pro_${release.version}_x64-setup.exe`}
              download
              title="Tải trực tiếp cho Windows 64-bit"
            >
              <Glyph name="desktop" />
              <span>{isVi ? `Windows 64-bit (${release.downloads?.windows?.formattedSize || "7.6 MB"})` : "Windows 64-bit"}</span>
            </a>
          </div>

          <div className="meta" style={{ marginTop: 24 }}>
            <span>Phiên bản v{release.version || "2.9.1"} (Bản mới nhất)</span>
            <span>macOS 12+ (Apple Silicon &amp; Intel)</span>
            <span>Windows 10/11 64-bit</span>
            <span>100% Offline &amp; An toàn</span>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
