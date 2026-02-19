"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "app/app/routes";
import styles from "./NavBar.module.css";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      {routes.map(({ path, label }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            href={path}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

NavBar.displayName = "NavBar";
