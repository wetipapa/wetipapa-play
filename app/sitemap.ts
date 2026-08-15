import type { MetadataRoute } from "next";
import { gameGuides } from "@/config/gameGuides";

const BASE = "https://play.wetipapa.com";

/**
 * 사이트맵.
 *
 * 페이지가 늘 때마다 여기를 손대야 하는 것을 줄이려고, 게임 안내 페이지는
 * `gameGuides`에서 그대로 읽는다. 안내 글을 하나 쓰면 사이트맵에도 자동으로 들어간다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(gameGuides).map((id) => ({
      url: `${BASE}/games/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
