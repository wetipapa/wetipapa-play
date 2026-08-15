import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./DocPage.module.css";

/**
 * 문서 페이지의 공통 껍데기.
 *
 * 소개·개인정보처리방침·이용약관·문의가 모두 같은 골격을 쓴다.
 * 페이지마다 레이아웃을 따로 짜면 글자 크기와 여백이 조금씩 어긋나서,
 * 같은 사이트의 문서로 안 읽힌다.
 *
 * 본문은 `.body` 안에서 태그 선택자로 한 번에 잡는다. 문서는 문단·목록·표만
 * 쓰는 글이라, 줄마다 클래스를 붙이는 것보다 이쪽이 읽기도 고치기도 쉽다.
 */
export default function DocPage({
  kicker,
  title,
  lead,
  updated,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  /** 마지막으로 고친 날. 정책 문서는 언제 기준인지가 내용만큼 중요하다 */
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.wrap}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        <div className={styles.body}>{children}</div>
        {updated && <p className={styles.updated}>마지막으로 고친 날: {updated}</p>}
      </main>
      <Footer />
    </>
  );
}

export { styles as docStyles };
