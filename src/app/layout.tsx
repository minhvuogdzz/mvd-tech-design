import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MVD Tech & Design | Hệ Sinh Thái Phần Mềm Studio & Nhiếp Ảnh Gia Chuyên Nghiệp",
  description:
    "Bộ công cụ All-in-One dành cho Studio & Thợ ảnh: Lọc hàng nghìn ảnh RAW thần tốc với Photo Picker Pro, tự động hóa đồng bộ chọn ảnh Google Sheets & Drive với Contact The Sheet, thống kê số lượng và kho tài nguyên sáng tạo.",
  keywords: [
    "MVD Tech & Design",
    "Photo Picker Pro",
    "Contact The Sheet",
    "phần mềm lọc ảnh",
    "lọc ảnh studio",
    "đồng bộ google sheets chọn ảnh",
    "phần mềm chọn ảnh cưới",
    "Dương Minh Vương",
  ],
  authors: [{ name: "Dương Minh Vương" }],
  icons: {
    icon: "/brand/mvd_app_icon_minimal_dark_squircle.png",
    apple: "/brand/mvd_app_icon_minimal_dark_squircle.png",
  },
  openGraph: {
    title: "MVD Tech & Design | Hệ Sinh Thái Phần Mềm Studio & Nhiếp Ảnh Gia",
    description:
      "Lọc ảnh RAW/JPG siêu tốc, tự động hóa đồng bộ Google Sheets & Drive chọn ảnh trả file cho khách hàng chỉ với 1 click.",
    type: "website",
    locale: "vi_VN",
    siteName: "MVD Tech & Design Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090a0f] text-zinc-100 antialiased selection:bg-amber-500 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
