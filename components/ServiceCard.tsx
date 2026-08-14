import type { WetiService } from "@/config/services";
import styles from "./ServiceCard.module.css";

const accentVarStyle = (accent: string) =>
  ({
    "--accent": `var(--wp-color-${accent})`,
    "--accent-tint": `var(--wp-color-${accent}-tint)`,
    "--accent-ink": `var(--wp-color-${accent}-ink)`,
  }) as React.CSSProperties;

export default function ServiceCard({ service }: { service: WetiService }) {
  const Icon = service.icon;
  const isLive = service.status === "live" && Boolean(service.url);

  const badgeLabel =
    service.badge ?? (service.status === "coming-soon" ? "준비중" : undefined);

  const content = (
    <>
      {/* 아이콘을 따로 한 줄 쓰면 카드가 세로로 길어지고 그만큼 빈 자리가 는다.
          아이콘 옆에 이름과 한 줄 소개를 붙여 한 덩어리로 읽히게 한다. */}
      <div className={styles.head}>
        <span className={styles.iconWrap}>
          <Icon className={styles.icon} />
        </span>
        <span className={styles.headText}>
          <h3 className={styles.name}>{service.name}</h3>
          <p className={styles.tagline}>{service.tagline}</p>
        </span>
        {badgeLabel && (
          <span
            className={[styles.badge, service.status === "coming-soon" ? styles.neutralBadge : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {badgeLabel}
          </span>
        )}
      </div>

      <span className={isLive ? styles.cta : styles.ctaDisabled}>
        {isLive ? service.ctaLabel : "곧 만나요"}
        {isLive && (
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        )}
      </span>
    </>
  );

  const style = accentVarStyle(service.accent);
  const ariaLabel = `${service.name}. ${service.tagline}. ${isLive ? service.ctaLabel : "준비 중인 서비스입니다"}`;

  if (isLive) {
    return (
      <a
        href={service.url}
        className={styles.card}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={`${styles.card} ${styles.disabled}`}
      style={style}
      role="group"
      aria-label={ariaLabel}
      aria-disabled="true"
    >
      {content}
    </div>
  );
}
