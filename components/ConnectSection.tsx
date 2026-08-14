import { getVisibleChannels } from "@/config/channels";
import styles from "./ConnectSection.module.css";

/**
 * "웨티아빠 더 만나기" 섹션.
 * 아이의 게임 선택 영역과는 시각적으로 확실히 구분되는 부모 대상 섹션이다.
 * 채널은 config/channels.ts에 등록된 것만(=주소가 확인된 것만) 노출된다.
 */
export default function ConnectSection() {
  const items = getVisibleChannels();

  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="connect-heading">
      <div className={styles.inner}>
        <h2 id="connect-heading" className={styles.heading}>
          웨티아빠 더 만나기
        </h2>
        <p className={styles.lead}>
          아들 웨티와 함께하는 소소한 일상을 블로그와 Threads에 남기고 있어요.
        </p>

        <ul className={styles.list}>
          {items.map((channel) => {
            const Icon = channel.icon;
            return (
              <li key={channel.id}>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  aria-label={`${channel.name}. ${channel.reason}. 새 탭에서 열림`}
                >
                  <span
                    className={styles.iconWrap}
                    style={{ background: channel.brand.bg, color: channel.brand.fg }}
                  >
                    <Icon className={styles.icon} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.name}>{channel.name}</span>
                    <span className={styles.reason}>{channel.reason}</span>
                  </span>
                  <span className={styles.cta}>
                    {channel.ctaLabel}
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
