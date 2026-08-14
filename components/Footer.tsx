import Logo from "./Logo";
import { getVisibleServices } from "@/config/services";
import { getVisibleChannels } from "@/config/channels";
import styles from "./Footer.module.css";

export default function Footer() {
  const services = getVisibleServices().filter((s) => s.status === "live");
  const channels = getVisibleChannels();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo variant="compact" className={styles.footerLogo} />
            <p className={styles.desc}>아이와 함께 놀면서 배우는 학습 놀이터</p>
          </div>

          {services.length > 0 && (
            <nav className={styles.col} aria-label="학습 서비스 바로가기">
              <p className={styles.colTitle}>학습 서비스</p>
              <ul className={styles.linkList}>
                {services.map((s) => (
                  <li key={s.id}>
                    <a href={s.url}>{s.name}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {channels.length > 0 && (
            <nav className={styles.col} aria-label="웨티아빠 채널">
              <p className={styles.colTitle}>웨티아빠 채널</p>
              <ul className={styles.linkList}>
                {channels.map((c) => (
                  <li key={c.id}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <p className={styles.copyright}>© {year} WTPP</p>
      </div>
    </footer>
  );
}
