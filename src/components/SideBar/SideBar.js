"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.css";

export function SideBar({ routes = [] }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} aria-label="Menú de administración">
      <nav className={styles.nav}>
        {routes.map(({ path, label }) => (
          <Link
            key={path}
            href={path}
            className={`${styles.link} ${pathname === path ? styles.active : ""}`}
            aria-current={pathname === path ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

SideBar.displayName = "SideBar";
