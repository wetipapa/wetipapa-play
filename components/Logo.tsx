import Image from "next/image";
import Link from "next/link";
import wtppSymbol from "@/brand/source/wtpp_symbol_color.png";
import styles from "./Logo.module.css";

type LogoProps = {
  /** compact: 심벌을 작게, 서비스 표기는 숨김 (footer 등 좁은 공간용) */
  variant?: "default" | "compact" | "mono";
  className?: string;
};

/**
 * WTPP PLAY 가로형 로고.
 *
 * 대표 CI 자리에는 `WTPP` 마스터 심벌을 쓴다 (brand-assets/confirmed/ci/).
 * 예전에는 반짝임 배지를 그려 넣었는데, 대표 브랜드가 WTPP로 바뀌면서
 * 헤더·파비콘·OG가 전부 같은 심벌을 쓰도록 맞췄다.
 * 심벌은 확정 마스터를 그대로 가져온 것이라 여기서 다시 그리지 않는다.
 */
export default function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={[styles.logo, styles[variant], className].filter(Boolean).join(" ")}
      aria-label="WTPP PLAY 홈으로 이동"
    >
      <Image src={wtppSymbol} alt="" aria-hidden="true" className={styles.symbol} sizes="40px" priority />
      <span className={styles.wordmark}>
        <span className={styles.en}>WTPP</span>
        {variant !== "compact" && <span className={styles.service}>PLAY</span>}
      </span>
    </Link>
  );
}
