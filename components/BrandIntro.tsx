import Image from "next/image";
import mascotHero from "@/brand/assets/mascot-hero.png";
import { SparkleIcon } from "./icons";
import styles from "./BrandIntro.module.css";

/**
 * 첫 화면 상단 브랜드 소개 영역.
 * 웨티아빠와 웨티가 함께 있는 확정 컷을 이 페이지에서 유일하게, 가장 크고
 * 의미 있게 사용하는 자리다 (장식으로 반복 사용하지 않는다).
 * "아빠와 아이가 함께 배운다"가 첫 화면에서 바로 읽혀야 하는 자리라 단독
 * 캐릭터가 아니라 합본 컷을 쓴다.
 */
export default function BrandIntro() {
  return (
    <section className={styles.section} aria-labelledby="brand-intro-heading">
      <SparkleIcon className={styles.sparkleA} />
      <SparkleIcon className={styles.sparkleB} />
      <SparkleIcon className={styles.sparkleC} />

      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 id="brand-intro-heading" className={styles.heading}>
            WTPP PLAY
          </h1>
          <p className={styles.copy}>아이와 함께 놀면서 배우는 학습 놀이터</p>
        </div>

        <div className={styles.mascotWrap}>
          <Image
            src={mascotHero}
            alt="나란히 서서 웃고 있는 웨티아빠와 아들 웨티 캐릭터"
            priority
            className={styles.mascotImg}
            sizes="(max-width: 640px) 128px, 176px"
          />
        </div>
      </div>
    </section>
  );
}
