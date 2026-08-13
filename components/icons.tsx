// WETI PLAY 서비스 아이콘 모음
// -----------------------------------------------------------------------
// 저작권 이슈 없이 자유롭게 쓸 수 있도록 전부 직접 그린 단순 SVG 아이콘이다.
// 모두 currentColor를 사용해 카드의 서비스 컬러를 그대로 물려받는다.

type IconProps = {
  className?: string;
};

/** 웨티 보카 – 사진 카드 + 말풍선 글자 */
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

/** 웨티 레이싱 – 달리는 자동차 + 속도선 */
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

/** 웨티 시계탐험대 – 탐험 나침반 느낌의 시계 */
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

/** 웨티아빠 스파클(✦) 모티프 – 장식용, 배경 등에서 반복 사용 */
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
export function BlogIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect x="7" y="5" width="30" height="38" rx="5" fill="currentColor" opacity="0.14" />
      <rect
        x="7"
        y="5"
        width="30"
        height="38"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M14 16 H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 24 H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 32 H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(28 28) rotate(45)">
        <rect x="-3" y="-13" width="6" height="16" rx="2" fill="currentColor" />
        <path d="M-3 3 L3 3 L0 9 Z" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Threads 채널 아이콘 (@ 느낌의 단순 루프) */
export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.14" />
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M24 14c-6 0-9 4-9 9c0 4 2.4 6.2 6 6.2c3 0 4.6-1.6 4.9-3.6c0.3 3.2-1.6 5-5 5c-4.6 0-8-3-8-8.6C12.9 14.6 17.3 11 23.7 11c7 0 11.3 4.3 11.3 11.3c0 6-3 9.4-7.4 9.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
