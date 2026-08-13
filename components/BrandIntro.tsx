import Image from "next/image";
import mascotHero from "@/brand/assets/mascot-hero.png";
import { SparkleIcon } from "./icons";
import styles from "./BrandIntro.module.css";

/**
 * 첫 화면 상단 브랜드 소개 영역.
 * 웨티아빠 원본 마스코트 이미지를 이 페이지에서 유일하게, 가장 크고
 * 의미 있게 사용하는 자리다 (장식으로 반복 사용하지 않는다).
 */
export default function BrandIntro() {
  return (
    <section className={styles.section} aria-labelledby="brand-intro-heading">
      <SparkleIcon className={styles.sparkleA} />
      <SparkleIcon className={styles.sparkleB} />
      <SparkleIcon className={styles.sparkleC} />

      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.relation}>WETI PLAY by 웨티아빠</p>
          <h1 id="brand-intro-heading" className={styles.heading}>
            WETI PLAY
            <span className={styles.headingKo}>웨티플레이</span>
          </h1>
          <p className={styles.copy}>아이와 함께 놀면서 배우는 웨티아빠 학습 놀이터</p>
        </div>

        <div className={styles.mascotWrap}>
          <Image
            src={mascotHero}
            alt="엄지를 척 들며 반갑게 인사하는 웨티아빠 캐릭터"
            priority
            className={styles.mascotImg}
            sizes="(max-width: 640px) 60vw, 320px"
          />
        </div>
      </div>
    </section>
  );
}
