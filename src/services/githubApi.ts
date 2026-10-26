import { LatestRelease } from "@/types/release";

const GITHUB_REPO = "minhvuogdzz/photo-picker-pro";

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export const FALLBACK_RELEASE: LatestRelease = {
  version: "2.9.1",
  tagName: "v2.9.1",
  name: "DH Studio Pro v2.9.1",
  publishedAt: "2026-10-26T05:18:40Z",
  releaseNotes: "DH Studio Pro v2.9.1 - Tối ưu hiệu năng Rust Rayon, hỗ trợ chip Apple Silicon M1-M4 & Intel x64, Windows 64-bit.",
  downloads: {
    macArm64: {
      name: "DH.Studio.Pro_2.9.1_aarch64.dmg",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.9.1/DH.Studio.Pro_2.9.1_aarch64.dmg`,
      size: 11358413,
      formattedSize: "10.8 MB",
    },
    macIntel: {
      name: "DH.Studio.Pro_2.9.1_x64.dmg",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.9.1/DH.Studio.Pro_2.9.1_x64.dmg`,
      size: 11640000,
      formattedSize: "11.1 MB",
    },
    windows: {
      name: "DH.Studio.Pro_2.9.1_x64-setup.exe",
      url: `https://github.com/${GITHUB_REPO}/releases/download/v2.9.1/DH.Studio.Pro_2.9.1_x64-setup.exe`,
      size: 7969177,
      formattedSize: "7.6 MB",
    },
  },
};

export async function fetchLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      return FALLBACK_RELEASE;
    }

    const data = await res.json();
    const assets = (data.assets || []) as Array<{
      name: string;
      browser_download_url: string;
      size: number;
    }>;

    const findAsset = (predicate: (name: string) => boolean) => {
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

    const rawTag = data.tag_name || "v2.9.1";
    const version = rawTag.startsWith("v") ? rawTag.slice(1) : rawTag;

    return {
      version,
      tagName: rawTag,
      name: data.name || `DH Studio Pro v${version}`,
      publishedAt: data.published_at || FALLBACK_RELEASE.publishedAt,
      releaseNotes: data.body && data.body.trim().length > 10 ? data.body : FALLBACK_RELEASE.releaseNotes,
      downloads: {
        macArm64,
        macIntel,
        windows,
      },
    };
  } catch {
    return FALLBACK_RELEASE;
  }
}
