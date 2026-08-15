// WTPP PLAY 서비스 레지스트리
// -----------------------------------------------------------------------
// 새 학습 서비스를 추가하려면 이 배열에 객체 하나만 더 추가하면 된다.
// 화면(홈페이지의 서비스 카드 그리드)은 이 데이터를 그대로 읽어 자동으로
// 카드를 렌더링하므로, 페이지 컴포넌트를 다시 손댈 필요가 없다.
//
// 자세한 추가 예시는 README.md의 "새 서비스 추가하기" 항목을 참고할 것.
import type { ComponentType } from "react";
import { ClockIcon, PopIcon, RacingIcon, SliceIcon, VocaIcon } from "@/components/icons";

/** 서비스 카드에 붙는 선택적 배지 */
export type ServiceBadge = "NEW" | "추천" | "준비중";

/** 서비스 진행 상태. coming-soon은 링크 없이 비활성 카드로 표시된다. */
export type ServiceStatus = "live" | "coming-soon";

/**
 * 서비스별 포인트 컬러 키.
 * 각 키는 brand/tokens.css 에 정의된 --wp-color-{key} / {key}-tint / {key}-ink
 * 세 변수 세트와 짝을 이룬다. 새 계열 색이 필요하면 tokens.css에 세트를
 * 하나 추가하고 여기에 같은 이름의 키를 쓰면 된다.
 */
export type ServiceAccent = "voca" | "racing" | "pop" | "clock" | "slice" | "neutral" | string;

/** 향후 영어/수학/생활학습/게임 등으로 서비스가 늘어날 때 쓰는 분류 태그 */
export type ServiceCategory = "영어" | "수학" | "생활학습" | "게임" | string;

export interface WetiService {
  /** 내부 식별자 (URL 슬러그가 아니어도 되지만 소문자-kebab 권장) */
  id: string;
  /** 한글 서비스명 (예: 단어 뚝딱) */
  name: string;
  /** 영문/보조 표기 (선택) */
  nameEn?: string;
  /**
   * 카드에 보이는 한 줄 소개.
   * 이름이 이미 주제를 담고 있으니(구구단 레이싱) 여기서 같은 말을 되풀이하지 않는다.
   * 허브는 고르는 곳이라 이 한 줄이면 된다. 자세한 설명은 각 서비스 첫 화면이 맡는다.
   * 예전에는 아래에 긴 설명이 하나 더 있었는데, 태그라인을 풀어 쓴 말이라
   * 카드 네 개를 훑는 자리에서는 읽히지 않았다.
   */
  tagline: string;
  /** 실제 서비스 URL. status가 'coming-soon'이면 없어도 된다 */
  url?: string;
  /** 카드의 시작 버튼 문구 (예: 단어 공부 시작) */
  ctaLabel: string;
  status: ServiceStatus;
  badge?: ServiceBadge;
  category: ServiceCategory;
  accent: ServiceAccent;
  icon: ComponentType<{ className?: string }>;
  /** 노출 순서 (작을수록 먼저 표시) */
  order: number;
}

export const services: WetiService[] = [
  {
    id: "voca",
    name: "단어 뚝딱",
    nameEn: "WETI VOCA",
    tagline: "찍기만 하면 아이 맞춤 테스트로",
    url: "https://voca.wetipapa.com",
    ctaLabel: "단어 공부 시작",
    status: "live",
    badge: "추천",
    category: "영어",
    accent: "voca",
    icon: VocaIcon,
    order: 1,
  },
  {
    id: "racing",
    name: "구구단 레이싱",
    nameEn: "WETI RACING",
    tagline: "문제를 맞히면 부스터로 달려요",
    url: "https://racing.wetipapa.com",
    ctaLabel: "레이스 시작",
    status: "live",
    category: "수학",
    accent: "racing",
    icon: RacingIcon,
    order: 2,
  },
  {
    // 레이싱과 같은 구구단을 다루지만 노는 방식이 다르다 — 레이싱은 트랙을 달리는 승부,
    // 팡팡은 내려오는 풍선을 터뜨리는 것. 한 줄 설명은 무엇을 하는 게임인지부터 보여주고,
    // 틀린 문제 반복은 설명에서 뒤에 붙인다.
    id: "pop",
    name: "구구단 팡팡",
    nameEn: "WETI POP",
    tagline: "하늘에서 내려오는 풍선을 팡팡!",
    url: "https://pop.wetipapa.com",
    ctaLabel: "풍선 터뜨리기",
    status: "live",
    category: "수학",
    accent: "pop",
    icon: PopIcon,
    order: 3,
  },
  {
    id: "clock",
    name: "시계탐험대",
    nameEn: "WETI CLOCK",
    tagline: "시곗바늘을 움직이며 시간을 배워요",
    url: "https://clock.wetipapa.com",
    ctaLabel: "시간 모험 시작",
    status: "live",
    category: "생활학습",
    accent: "clock",
    icon: ClockIcon,
    order: 4,
  },
  {
    id: "slice",
    name: "분수 쓱싹",
    nameEn: "WTPP SLICE",
    tagline: "문제에 맞는 그림만 골라 쓱싹!",
    url: "https://slice.wetipapa.com",
    ctaLabel: "쓱싹 시작",
    status: "live",
    badge: "NEW",
    category: "수학",
    accent: "slice",
    icon: SliceIcon,
    order: 5,
  },
];

/** order 기준 정렬 + 노출 목록. 화면에서는 항상 이 함수를 통해서 읽는다. */
export function getVisibleServices(): WetiService[] {
  return [...services].sort((a, b) => a.order - b.order);
}
