import { getVisibleServices } from "@/config/services";
import ServiceCard from "./ServiceCard";
import styles from "./ServiceGrid.module.css";

export default function ServiceGrid() {
  const items = getVisibleServices();

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
      </div>
    </section>
  );
}
