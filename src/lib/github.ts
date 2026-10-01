import { LatestRelease, ReleaseAsset } from "@/types/release";

const GITHUB_REPO = "minhvuogdzz/photo-picker-pro";

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

// Fallback release info if GitHub API is unreachable or rate limited
const FALLBACK_RELEASE: LatestRelease = {
  version: "2.6.6",
  tagName: "v2.6.6",
  name: "MVD Tech & Design Studio v2.6.6",
  publishedAt: new Date().toISOString(),
  releaseNotes: "- Tự động đăng xuất và làm mới phiên mỗi ngày lúc 0h00 (giờ Việt Nam).\n- Tối ưu hiệu năng chọn ảnh tốc độ cao cho studio.\n- Nâng cấp đồng bộ Google Sheets & Drive.\n- Sửa các lỗi nhỏ và cải thiện độ ổn định hệ thống.",
  downloads: {
    macArm64: {
      name: "MVD.T.D_2.6.6_aarch64.dmg",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.6.6/MVD.T.D_2.6.6_aarch64.dmg`,
      size: 94_000_000,
      formattedSize: "94.2 MB",
    },
    macIntel: {
      name: "MVD.T.D_2.6.6_x64.dmg",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.6.6/MVD.T.D_2.6.6_x64.dmg`,
      size: 96_000_000,
      formattedSize: "96.5 MB",
    },
    windows: {
      name: "MVD.T.D_2.6.6_x64-setup.exe",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.6.6/MVD.T.D_2.6.6_x64-setup.exe`,
      size: 88_000_000,
      formattedSize: "88.4 MB",
    },
  },
};

export async function getLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "MVD-Tech-Design-Web",
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, using fallback release.`);
      return FALLBACK_RELEASE;
    }

    const data = await res.json();
    const assets = (data.assets || []) as Array<{
      name: string;
      browser_download_url: string;
      size: number;
    }>;

    const findAsset = (predicate: (name: string) => boolean): ReleaseAsset | null => {
      const match = assets.find((a) => predicate(a.name.toLowerCase()));
      if (!match) return null;
      return {
        name: match.name,
        url: match.browser_download_url,
        size: match.size,
        formattedSize: formatBytes(match.size),
      };
    };

    const macArm64 =
      findAsset((n) => n.endsWith(".dmg") && (n.includes("aarch64") || n.includes("arm64"))) ||
      FALLBACK_RELEASE.downloads.macArm64;

    const macIntel =
      findAsset((n) => n.endsWith(".dmg") && (n.includes("x64") || n.includes("x86_64"))) ||
      FALLBACK_RELEASE.downloads.macIntel;

    const windows =
      findAsset((n) => n.endsWith(".exe") && !n.endsWith(".sig")) ||
      FALLBACK_RELEASE.downloads.windows;

    const rawTag = data.tag_name || "v2.6.6";
    const version = rawTag.startsWith("v") ? rawTag.slice(1) : rawTag;

    return {
      version,
      tagName: rawTag,
      name: data.name || `MVD Tech & Design Studio v${version}`,
      publishedAt: data.published_at || new Date().toISOString(),
      releaseNotes: data.body || FALLBACK_RELEASE.releaseNotes,
      downloads: {
        macArm64,
        macIntel,
        windows,
      },
    };
  } catch (error) {
    console.error("Failed to fetch latest GitHub release:", error);
    return FALLBACK_RELEASE;
  }
}
