import Link from "next/link";
import Logo from "./Logo";
import styles from "./Header.module.css";

/**
 * 페이지 맨 위.
 *
 * 예전에는 로고와 태그라인뿐이라 **다른 페이지로 갈 길이 없었다.** 홈 한 장짜리
 * 사이트였을 때는 그걸로 됐지만, 게임 안내와 정책 문서가 생긴 뒤로는
 * 여기서 갈 수 있어야 한다.
 *
 * 로고는 그 자체가 이미 홈으로 가는 링크다. 한 번 더 감쌌다가 링크 안에 링크가 생겨
 * 화면 전체가 다시 그려지는 오류가 났다.
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo variant="compact" />
        <nav className={styles.nav} aria-label="주요 메뉴">
          <Link href="/about">소개</Link>
          <Link href="/contact">문의</Link>
        </nav>
      </div>
    </header>
  );
}
