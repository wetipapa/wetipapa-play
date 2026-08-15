import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

/**
 * 페이지 맨 아래 브랜드 표시.
 *
 * 서비스 목록과 채널 링크는 두지 않는다. 바로 위 본문에 서비스 카드와
 * 채널 카드가 이미 있어서, 같은 링크를 파란 바닥에 한 번 더 늘어놓는 꼴이었다.
 *
 * 대신 **소개·문의·정책 문서로 가는 길**은 여기 둔다. 본문에 없고 여기밖에 없는 링크라
 * 중복이 아니고, 사이트 맨 아래에서 찾는 것이 사람들이 익숙한 자리다.
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

        <nav className={styles.links} aria-label="사이트 정보">
          <Link href="/about">소개</Link>
          <Link href="/contact">문의</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </nav>

        <p className={styles.copyright}>© {year} WTPP</p>
      </div>
    </footer>
  );
}
