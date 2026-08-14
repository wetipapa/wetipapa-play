import Logo from "./Logo";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo variant="compact" />
        <p className={styles.tagline}>웨티아빠 학습 놀이터</p>
      </div>
    </header>
  );
}
