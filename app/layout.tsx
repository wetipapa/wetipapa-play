import type { Metadata, Viewport } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const siteUrl = "https://play.wetipapa.com";
const title = "WTPP PLAY - 아이와 함께 놀면서 배우는 학습 놀이터";
const description =
  "아이와 함께 놀면서 배우는 웨티아빠 학습 놀이터. 웨티 보카, 웨티 레이싱, 웨티 시계탐험대를 한곳에서 만나보세요.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | WTPP PLAY",
  },
  description,
  keywords: [
    "WTPP",
    "WTPP PLAY",
    "웨티아빠",
    "어린이 학습",
    "영어 단어장",
    "구구단 게임",
    "시계 배우기",
    "유아 학습 게임",
  ],
  authors: [{ name: "웨티아빠" }],
  creator: "웨티아빠",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "WTPP PLAY",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jua.variable} ${notoSansKr.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
