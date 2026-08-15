import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WTPP PLAY - 아이와 함께 놀면서 배우는 학습 놀이터",
    short_name: "WTPP PLAY",
    description: "아이와 함께 놀면서 배우는 웨티파파 학습 놀이터",
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
