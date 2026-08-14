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
          {/* 헤더에 이미 WTPP 로고가 있어 여기서 이름을 한 번 더 부르지 않는다.
              첫 화면에서 크게 읽혀야 하는 건 브랜드 이름이 아니라 "여기서 뭘 하는 곳인지"다. */}
          <h1 id="brand-intro-heading" className={styles.heading}>
            아이와 함께 놀면서 배우는
            <span className={styles.headingAccent}>학습 놀이터</span>
          </h1>
        </div>

        <div className={styles.mascotWrap}>
          <Image
            src={mascotHero}
            alt="웨티 머리에 손을 얹고 웃고 있는 웨티아빠와 아들 웨티 캐릭터"
            priority
            className={styles.mascotImg}
            sizes="(max-width: 640px) 128px, 176px"
          />
        </div>
      </div>
    </section>
  );
}
