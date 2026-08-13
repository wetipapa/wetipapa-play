// WETI PLAY 서비스 레지스트리
// -----------------------------------------------------------------------
// 새 학습 서비스를 추가하려면 이 배열에 객체 하나만 더 추가하면 된다.
// 화면(홈페이지의 서비스 카드 그리드)은 이 데이터를 그대로 읽어 자동으로
// 카드를 렌더링하므로, 페이지 컴포넌트를 다시 손댈 필요가 없다.
//
// 자세한 추가 예시는 README.md의 "새 서비스 추가하기" 항목을 참고할 것.
import type { ComponentType } from "react";
import { ClockIcon, RacingIcon, VocaIcon } from "@/components/icons";

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
export type ServiceAccent = "voca" | "racing" | "clock" | "neutral" | string;

/** 향후 영어/수학/생활학습/게임 등으로 서비스가 늘어날 때 쓰는 분류 태그 */
export type ServiceCategory = "영어" | "수학" | "생활학습" | "게임" | string;

export interface WetiService {
  /** 내부 식별자 (URL 슬러그가 아니어도 되지만 소문자-kebab 권장) */
  id: string;
  /** 한글 서비스명 (예: 웨티 보카) */
  name: string;
  /** 영문/보조 표기 (선택) */
  nameEn?: string;
  /** 카드에 크게 보이는 한 줄 소개 (아이 눈높이) */
  tagline: string;
  /** 부모를 위한 조금 더 자세한 설명 */
  description: string;
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
    name: "웨티 보카",
    nameEn: "WETI VOCA",
    tagline: "사진으로 만드는 나만의 영어단어장",
    description:
      "내가 찍은 사진으로 영어 단어카드를 만들고, 다양한 유형의 테스트로 재미있게 복습해요.",
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
    name: "웨티 레이싱",
    nameEn: "WETI RACING",
    tagline: "구구단을 풀고 부스터로 달려요",
    description:
      "구구단 문제를 빠르게 풀수록 부스터가 터져요! 신나는 레이싱과 함께 구구단이 저절로 외워져요.",
    url: "https://racing.wetipapa.com",
    ctaLabel: "레이스 시작",
    status: "live",
    badge: "NEW",
    category: "수학",
    accent: "racing",
    icon: RacingIcon,
    order: 2,
  },
  {
    id: "clock",
    name: "웨티 시계탐험대",
    nameEn: "WETI CLOCK",
    tagline: "시곗바늘을 움직이며 시간을 배워요",
    description:
      "직접 시곗바늘을 돌려보며 몇 시 몇 분인지 익히는 탐험 게임이에요. 놀다 보면 시계 읽기가 쉬워져요.",
    url: "https://clock.wetipapa.com",
    ctaLabel: "시간 모험 시작",
    status: "live",
    category: "생활학습",
    accent: "clock",
    icon: ClockIcon,
    order: 3,
  },
];

/** order 기준 정렬 + 노출 목록. 화면에서는 항상 이 함수를 통해서 읽는다. */
export function getVisibleServices(): WetiService[] {
  return [...services].sort((a, b) => a.order - b.order);
}
