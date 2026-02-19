"use client";

import { SecondaryButton } from "app/components/ui/SecondaryButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "app/app/routes";
import styles from "./NavBar.module.css";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <Link
        key="/"
        href="/"
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        Material
      </Link>
      <Link
        key="/company"
        href="/company"
        className={`${styles.link} ${pathname === "/company" ? styles.active : ""}`}
        aria-current={pathname === "/company" ? "page" : undefined}
      >
        Empresa
      </Link>
      <Link
        key="/contact"
        href="/contact"
        className={`${styles.link} ${pathname === "/contact" ? styles.active : ""}`}
        aria-current={pathname === "/contact" ? "page" : undefined}
      >
        Contacto
      </Link>
      <Link
        key="/login"
        href="/login"
        className={`${styles.link} ${pathname === "/login" ? styles.active : ""}`}
        aria-current={pathname === "/login" ? "page" : undefined}
      >
        <SecondaryButton
        type="button"
        disabled={false}
        >
            Ingresar
        </SecondaryButton>
      </Link>   
    </nav>
  );
}

NavBar.displayName = "NavBar";
