import Link from "next/link";
import Logo from "@/components/Logo";
import { SparkleIcon } from "@/components/icons";
import styles from "./not-found.module.css";

export const metadata = {
  title: "페이지를 찾을 수 없어요",
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <SparkleIcon className={styles.sparkle} />
        <p className={styles.emoji} aria-hidden="true">
          🧭
        </p>
        <h1 className={styles.title}>앗, 길을 잃었나 봐요!</h1>
        <p className={styles.desc}>
          찾으시는 페이지가 없어졌거나 주소가 바뀐 것 같아요.
          <br />
          아래 버튼을 눌러 WTPP PLAY 홈으로 돌아가요.
        </p>
        <Link href="/" className={styles.home}>
          처음으로 돌아가기
        </Link>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
    </div>
  );
}
