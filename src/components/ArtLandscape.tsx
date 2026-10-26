import React from "react";

const PALETTES = [
  ["#7fb2f0", "#e6eef8", "#b7c6dc", "#7d93b3", "#4f6684", "#20453f", "#3f8fa0", "#173f4d"],
  ["#f6a98b", "#ffe6d2", "#d6b3b4", "#a07d93", "#6d5b78", "#2f3d3f", "#7f8fa8", "#2c3a52"],
  ["#8ccdf2", "#f2f9ff", "#c9d7e3", "#8ea7bd", "#5d7d95", "#1f4a3c", "#38a3b4", "#145e6c"],
  ["#f7c873", "#fff0d6", "#e2c4a2", "#b3906f", "#7d6650", "#33452f", "#6e9a8a", "#2c4f47"],
  ["#a796ef", "#efe9ff", "#c4bce4", "#8e83c0", "#5d5694", "#26304a", "#5f86c4", "#263e70"],
  ["#79c7dd", "#e5f6fa", "#b5cfd2", "#7ea4a7", "#4c7a7c", "#1d4a3a", "#2f9c90", "#145750"],
];

function rand(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function ridge(r: () => number, W: number, base: number, amp: number, n: number, sharp: number) {
  const pts: [number, number][] = [[-2, base - amp * r() * 0.3]];
  for (let k = 1; k <= n; k++) {
    const x = (k / (n + 1)) * W + (r() - 0.5) * (W / n) * 0.5;
    const peak = k % 2 === 1;
    const h = peak ? 0.55 + r() * 0.45 : 0.15 + r() * 0.35 * (1 - sharp);
    pts.push([x, base - amp * h]);
  }
  pts.push([W + 2, base - amp * r() * 0.3]);
  return pts;
}

export function generateLandscapeSvg(seed: number): string {
  const r = rand(seed + 11);
  const p = PALETTES[seed % PALETTES.length];
  const W = 160;
  const H = 120;
  const hz = 70 + r() * 8;
  const far = ridge(r, W, hz, 40 + r() * 14, 5 + Math.floor(r() * 3), 0.6);
  const mid = ridge(r, W, hz, 26 + r() * 10, 6 + Math.floor(r() * 3), 0.3);
  const near = ridge(r, W, hz, 12 + r() * 8, 8, 0);
  const poly = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const closed = (pts: [number, number][]) => `${poly(pts)} ${W + 2},${hz} -2,${hz}`;
  const flip = (pts: [number, number][]): [number, number][] => pts.map(([x, y]) => [x, 2 * hz - y]);
  const id = `ls${seed}`;
  const sunX = 22 + r() * 116;
  const sunY = 16 + r() * 16;
  const hasSun = r() > 0.35;
  const snowLine = Math.min(...far.map(([, y]) => y)) + 9;
  let trees = "";
  for (let x = -2; x < W + 4; x += 2.6 + r() * 2.4) {
    const th = 4 + r() * 6;
    trees += `M${x.toFixed(1)} ${(hz - th).toFixed(1)}L${(x + th * 0.32).toFixed(1)} ${hz}L${(x - th * 0.32).toFixed(1)} ${hz}Z`;
  }
  let shimmer = "";
  for (let k = 0; k < 7; k++) {
    const y = hz + 4 + r() * (H - hz - 6);
    const x = r() * W * 0.8;
    shimmer += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(10 + r() * 30).toFixed(1)}" height=".7" rx=".35" fill="#fff" opacity="${(0.12 + r() * 0.2).toFixed(2)}"/>`;
  }
  const cloud = r() > 0.4 ? `<ellipse cx="${(r() * W).toFixed(0)}" cy="${(14 + r() * 18).toFixed(0)}" rx="${(18 + r() * 16).toFixed(0)}" ry="4" fill="#fff" opacity=".45" filter="url(#${id}b)"/>` : "";

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>
<linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[2]}"/><stop offset="1" stop-color="${p[3]}"/></linearGradient>
<linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[6]}"/><stop offset="1" stop-color="${p[7]}"/></linearGradient>
<radialGradient id="${id}g" cx="${(sunX / W).toFixed(2)}" cy="${(sunY / H).toFixed(2)}" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<clipPath id="${id}c"><rect width="${W}" height="${snowLine.toFixed(1)}"/></clipPath>
<filter id="${id}b"><feGaussianBlur stdDeviation="2.4"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#${id}s)"/>
${hasSun ? `<rect width="${W}" height="${hz}" fill="url(#${id}g)"/><circle cx="${sunX.toFixed(1)}" cy="${sunY.toFixed(1)}" r="5.5" fill="#fff" opacity=".85"/>` : ""}
${cloud}
<polygon points="${closed(far)}" fill="url(#${id}f)"/>
<polygon points="${closed(far)}" fill="#fff" opacity=".85" clip-path="url(#${id}c)"/>
<polygon points="${closed(mid)}" fill="${p[3]}"/>
<polygon points="${closed(near)}" fill="${p[4]}"/>
<path d="${trees}" fill="${p[5]}"/>
<rect y="${hz}" width="${W}" height="${H - hz}" fill="url(#${id}w)"/>
<g opacity=".32" filter="url(#${id}b)"><polygon points="${poly(flip(far))} ${W + 2},${hz} -2,${hz}" fill="${p[2]}"/><polygon points="${poly(flip(mid))} ${W + 2},${hz} -2,${hz}" fill="${p[3]}"/></g>
<path d="${trees}" fill="${p[5]}" opacity=".35" transform="translate(0 ${2 * hz}) scale(1 -1)"/>
<rect y="${(hz - 0.3).toFixed(1)}" width="${W}" height="1" fill="#fff" opacity=".35"/>
${shimmer}
</svg>`;
}

export function ArtLandscape({ seed, className, style }: { seed: number; className?: string; style?: React.CSSProperties }) {
  const svgHtml = React.useMemo(() => generateLandscapeSvg(seed), [seed]);
  return (
    <span
      className={`art ${className || ""}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
