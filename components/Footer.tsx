import Logo from "./Logo";
import styles from "./Footer.module.css";

/**
 * 페이지 맨 아래 브랜드 표시.
 *
 * 서비스 목록과 채널 링크는 두지 않는다. 바로 위 본문에 서비스 카드와
 * 채널 카드가 이미 있어서, 같은 링크를 파란 바닥에 한 번 더 늘어놓는 꼴이었다.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo variant="compact" className={styles.footerLogo} />
            <p className={styles.desc}>아이와 함께 놀면서 배우는 학습 놀이터</p>
          </div>

        </div>

        <p className={styles.copyright}>© {year} WTPP</p>
      </div>
    </footer>
  );
}
