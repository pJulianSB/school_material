"use client";

import { usePathname } from "next/navigation";
import { Image } from "app/components/ui/Image";
import { NavBar } from "app/components/NavBar/NavBar";
import { getRouteInfo } from "app/app/routes";
import styles from "./Header.module.css";

const HEADER_IMAGE = "/app/app.png";

export function Header() {
  const pathname = usePathname();
  const { title, subtitle } = getRouteInfo(pathname);

  return (
    <header className={styles.header}>
      <NavBar />
      <section className={styles.logoSection}>
        <div className={styles.columnImage}>
          <Image
            src={HEADER_IMAGE}
            alt=""
            width={170}
            height={71} // 42%
            className={styles.logo}
            priority
          />
        </div>
        <div className={styles.columnText}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </section>
    </header>
  );
}

Header.displayName = "Header";
