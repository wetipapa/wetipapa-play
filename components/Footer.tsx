import Logo from "./Logo";
import styles from "./Footer.module.css";

/**
 * 페이지 맨 아래 브랜드 표시.
 *
 * 서비스 목록과 채널 링크는 두지 않는다. 바로 위 본문에 서비스 카드와
 * 채널 카드가 이미 있어서, 같은 링크를 파란 바닥에 한 번 더 늘어놓는 꼴이었다.
 *
 * 문의 창구도 따로 두지 않는다. 블로그와 Threads가 바로 위에 있고 둘 다 댓글·DM이
 * 열려 있다. 답이 도착하는 창구가 이미 있는데 폼을 더 만들면 관리할 곳만 늘어난다.
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
            {/* 부모가 아이 앱을 고를 때 가장 먼저 걱정하는 지점이고, 실제로 사실이라 그대로 강점이 된다.
                회원가입도 서버 저장도 없고, 진행도와 설정은 브라우저 안에만 남는다. */}
            <p className={styles.privacyNote}>기록은 기기에만 남고 따로 수집하지 않아요</p>
          </div>

        </div>

        <p className={styles.copyright}>© {year} WTPP</p>
      </div>
    </footer>
  );
}
