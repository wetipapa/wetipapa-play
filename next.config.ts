import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 개발 서버가 AGENTS.md/CLAUDE.md를 자동 생성하지 않도록 비활성화한다.
  agentRules: false,
  images: {
    // 서비스 링크는 wetipapa.com 서브도메인으로만 연결되며,
    // 이 프로젝트가 직접 렌더링하는 이미지는 전부 로컬(brand) 자산이다.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
