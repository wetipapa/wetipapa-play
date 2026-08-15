// WTPP PLAY 서비스 아이콘 모음
// -----------------------------------------------------------------------
// 저작권 이슈 없이 자유롭게 쓸 수 있도록 전부 직접 그린 단순 SVG 아이콘이다.
// 모두 currentColor를 사용해 카드의 서비스 컬러를 그대로 물려받는다.

type IconProps = {
  className?: string;
};

/** 단어 뚝딱 – 사진 카드 + 말풍선 글자 */
export function VocaIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="8" y="10" width="40" height="40" rx="6" fill="currentColor" opacity="0.16" />
      <rect
        x="8"
        y="10"
        width="40"
        height="40"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="20" cy="22" r="4" fill="currentColor" />
      <path
        d="M12 42 L24 30 L32 38 L40 26 L48 34 V44 A2 2 0 0 1 46 46 H14 A2 2 0 0 1 12 44 Z"
        fill="currentColor"
      />
      <g>
        <rect x="38" y="6" width="22" height="16" rx="8" fill="currentColor" />
        <path d="M42 22 L42 28 L48 22 Z" fill="currentColor" />
        <text
          x="49"
          y="18"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#fff"
          fontFamily="Malgun Gothic, sans-serif"
        >
          ABC
        </text>
      </g>
    </svg>
  );
}

/** 구구단 레이싱 – 달리는 자동차 + 속도선 */
export function RacingIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 34 H16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M2 42 H14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M6 26 H16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path
        d="M14 40 L18 26 A4 4 0 0 1 22 23 H38 A4 4 0 0 1 42 26 L46 40 Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M14 40 L18 26 A4 4 0 0 1 22 23 H38 A4 4 0 0 1 42 26 L46 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="10" y="40" width="40" height="8" rx="4" fill="currentColor" />
      <circle cx="20" cy="50" r="6" fill="#fff" stroke="currentColor" strokeWidth="3" />
      <circle cx="42" cy="50" r="6" fill="#fff" stroke="currentColor" strokeWidth="3" />
      <path d="M24 30 H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** 구구단 팡팡 – 수식이 적힌 풍선과 다트 */
export function PopIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* 뒤쪽 작은 풍선 */}
      <ellipse cx="46" cy="20" rx="9" ry="10" fill="currentColor" opacity="0.18" />
      <path d="M46 30 v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* 앞쪽 큰 풍선 */}
      <ellipse cx="26" cy="26" rx="15" ry="17" fill="currentColor" opacity="0.16" />
      <ellipse cx="26" cy="26" rx="15" ry="17" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 43 l-3 4 h6 z" fill="currentColor" />
      {/* 곱셈 기호 */}
      <path d="M21 21 L31 31 M31 21 L21 31" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />

      {/* 터진 조각 */}
      <path d="M44 34 l4 5 M52 32 l5 2 M47 26 l6 -3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />

      {/* 다트 */}
      <path d="M8 56 L20 46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 46 l7 -3 -3 7 z" fill="currentColor" />
    </svg>
  );
}

/** 시계탐험대 – 탐험 나침반 느낌의 시계 */
/** 분수 쓱싹 — 반으로 갈라진 원과 칼자국 */
export function SliceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M24 8a16 16 0 0 1 16 16 16 16 0 0 1-16 16z" fill="currentColor" opacity="0.85" />
      <path
        d="M24 8a16 16 0 0 0-16 16 16 16 0 0 0 16 16"
        fill="currentColor"
        opacity="0.16"
      />
      <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M24 6v36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M9 41 39 11" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="34" r="22" fill="currentColor" opacity="0.16" />
      <circle cx="32" cy="34" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M24 6 H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 6 V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 18;
        const r2 = i % 3 === 0 ? 14.5 : 16;
        const x1 = 32 + r1 * Math.sin(angle);
        const y1 = 34 - r1 * Math.cos(angle);
        const x2 = 32 + r2 * Math.sin(angle);
        const y2 = 34 - r2 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.7"
          />
        );
      })}
      <path d="M32 34 L32 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 34 L41 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="34" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** 준비 중인 서비스를 위한 기본 아이콘 (반짝이는 물음표) */
export function ComingSoonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.14" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="currentColor"
        fontFamily="Malgun Gothic, sans-serif"
      >
        ?
      </text>
    </svg>
  );
}

/** 웨티파파 스파클(✦) 모티프 – 장식용, 배경 등에서 반복 사용 */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 1c0.6 4.6 2.4 7.4 6 8.4c-3.6 1-5.4 3.8-6 8.4c-0.6-4.6-2.4-7.4-6-8.4c3.6-1 5.4-3.8 6-8.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 네이버 블로그 채널 아이콘 (노트 + 연필로 "기록/포스트"를 표현) */
/*
 * 아래 두 개는 네이버와 Threads의 공식 마크다.
 * 손으로 비슷하게 그리면 알아보기도 어렵고 남의 상표를 어설프게 베낀 꼴이 된다.
 * 마크는 비율과 색을 바꾸지 않고 그대로 쓰고, 배경 원만 각 브랜드 색으로 둔다.
 */

/** 네이버 공식 마크 */
export function BlogIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
    </svg>
  );
}

/** Threads 공식 마크 */
export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
    </svg>
  );
}
