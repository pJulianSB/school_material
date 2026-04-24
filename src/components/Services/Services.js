import { CreateIcon } from "app/components/icons/CreateIcon";
import { UsersIcon } from "app/components/icons/UsersIcon";
import { MaterialIcon } from "app/components/icons/MaterialIcon";
import { PackageIcon } from "app/components/icons/PackageIcon";
import styles from "./Services.module.css";

const SERVICES_DATA = [
  {
    id: "malla-curricular",
    title: "Construcción de malla curricular",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat risus at libero suscipit, sed viverra sem suscipit.",
    Icon: CreateIcon,
  },
  {
    id: "asesorias-pedagogicas",
    title: "Asesorias pedagógicas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat risus at libero suscipit, sed viverra sem suscipit.",
    Icon: UsersIcon,
  },
  {
    id: "material-clase",
    title: "Material para clase",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat risus at libero suscipit, sed viverra sem suscipit.",
    Icon: MaterialIcon,
  },
  {
    id: "textos-guias",
    title: "Textos guias por áreas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat risus at libero suscipit, sed viverra sem suscipit.",
    Icon: PackageIcon,
  },
];

export function Services() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Nuestros Servicios</h2>

      <div className={styles.cardsContainer}>
        {SERVICES_DATA.map(({ id, title, description, Icon }) => (
          <article key={id} className={styles.card}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon className={styles.icon} />
            </span>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Services.displayName = "Services";
