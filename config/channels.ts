// 웨티아빠 콘텐츠 채널 레지스트리
// -----------------------------------------------------------------------
// "웨티아빠 더 만나기" 섹션과 Footer 보조 링크가 이 배열을 그대로 읽는다.
// 새 채널(유튜브, 인스타그램 등)이 생기면 이 배열에 항목만 추가하면 된다.
//
// 확인된 공식 주소만 채워 넣을 것. 주소가 아직 확정되지 않은 채널은
// url을 비워두면(undefined) 화면에 노출되지 않는다 — 잘못된 링크나
// 빈 링크가 실수로 배포되는 일을 막기 위한 안전장치다.
import type { ComponentType } from "react";
import { BlogIcon, ThreadsIcon } from "@/components/icons";

export interface WetiChannel {
  id: string;
  /** 채널명 (예: 웨티아빠 네이버 블로그) */
  name: string;
  /** 방문 이유를 설명하는 한 문장 */
  reason: string;
  /** 실제 채널 URL. 확인되지 않았다면 undefined로 두면 자동으로 숨겨진다 */
  url?: string;
  ctaLabel: string;
  icon: ComponentType<{ className?: string }>;
  /**
   * 아이콘 배지의 색. 공식 마크는 각 브랜드가 쓰는 조합으로 둬야 한눈에 알아본다
   * (네이버는 초록 바탕에 흰 N, Threads는 검정 바탕에 흰 글리프).
   */
  brand: { bg: string; fg: string };
  order: number;
}

export const channels: WetiChannel[] = [
  {
    id: "blog",
    name: "웨티아빠 네이버 블로그",
    reason: "아이와 직접 해본 학습법과 자료를 확인해보세요",
    url: "https://blog.naver.com/wetipapa",
    ctaLabel: "블로그 놀러가기",
    icon: BlogIcon,
    brand: { bg: "#03C75A", fg: "#ffffff" },
    order: 1,
  },
  {
    id: "threads",
    name: "웨티아빠 Threads",
    reason: "새로운 게임과 육아·교육 이야기를 가장 먼저 만나보세요",
    url: "https://www.threads.com/@wetipapa",
    ctaLabel: "Threads 팔로우",
    icon: ThreadsIcon,
    brand: { bg: "#000000", fg: "#ffffff" },
    order: 2,
  },
];

/** url이 확인된 채널만 화면에 노출한다 */
export function getVisibleChannels(): WetiChannel[] {
  return [...channels]
    .filter((c) => Boolean(c.url))
    .sort((a, b) => a.order - b.order);
}
