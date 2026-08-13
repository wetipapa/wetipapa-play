import Link from "next/link";
import styles from "./Logo.module.css";

type LogoProps = {
  /** compact: 아이콘만 눈에 띄게, 한글 표기는 숨김 (footer 등 좁은 공간용) */
  variant?: "default" | "compact" | "mono";
  className?: string;
};

/**
 * WETI PLAY 기본 가로형 로고.
 * 마스코트 원본 이미지를 새로 그리지 않고, 브랜드 아이콘(스파클 배지)과
 * 텍스트 워드마크를 결합하는 방식으로 구성했다 — 어떤 배경에서도
 * 크기와 상관없이 안정적으로 재현된다.
 */
export default function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={[styles.logo, styles[variant], className].filter(Boolean).join(" ")}
      aria-label="WETI PLAY 홈으로 이동"
    >
      <span className={styles.badge} aria-hidden="true">
        <svg viewBox="0 0 40 40" className={styles.badgeIcon}>
          <path
            d="M20 4c1 6.4 4 9.4 10.4 10.4C24 15.6 21 18.6 20 25c-1-6.4-4-9.4-10.4-10.6C16 13.4 19 10.4 20 4Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={styles.wordmark}>
        <span className={styles.en}>WETI PLAY</span>
        {variant !== "compact" && <span className={styles.ko}>웨티플레이</span>}
      </span>
    </Link>
  );
}
