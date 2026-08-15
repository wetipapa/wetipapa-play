import Link from "next/link";
import { getVisibleServices } from "@/config/services";
import { gameGuides } from "@/config/gameGuides";
import ServiceCard from "./ServiceCard";
import styles from "./ServiceGrid.module.css";

/**
 * 서비스 카드 그리드.
 *
 * 카드 전체가 게임으로 가는 링크라, 그 안에 안내 페이지 링크를 또 넣을 수 없다.
 * (링크 안의 링크는 만들 수 없다.) 그래서 안내로 가는 길은 **그리드 아래 한 줄**로 뺐다.
 * 바로 놀 사람은 카드를 누르고, 고르기 전에 읽을 부모는 아래 줄로 간다.
 */
export default function ServiceGrid() {
  const items = getVisibleServices();
  const guided = items.filter((s) => gameGuides[s.id]);

  return (
    <section className={styles.section} aria-labelledby="service-grid-heading">
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <h2 id="service-grid-heading" className={styles.heading}>
            어떤 놀이터로 갈까요?
          </h2>
          <p className={styles.subheading}>카드를 눌러 바로 시작해요</p>
        </div>

        <ul className={styles.grid}>
          {items.map((service) => (
            <li key={service.id} className={styles.gridItem}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        {guided.length > 0 && (
          <p className={styles.guides}>
            <span className={styles.guidesLabel}>고르기 전에 읽어 보기</span>
            {guided.map((s) => (
              <Link key={s.id} href={`/games/${s.id}`}>
                {s.name}
              </Link>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
