import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WETI PLAY(웨티플레이) - 웨티아빠 학습 놀이터",
    short_name: "WETI PLAY",
    description: "아이와 함께 놀면서 배우는 웨티아빠 학습 놀이터",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ea",
    theme_color: "#fff7ea",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
