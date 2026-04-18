"use client";

import styles from "./NavBar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { hasValidSessionToken, observeAuthState } from "app/services/authenticationService";
import { SecondaryButton } from "app/components/ui/SecondaryButton";
import { Cart as CartIcon } from "app/components/icons/Cart";

export function NavBar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const unsubscribe = observeAuthState(async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setIsTokenValid(false);
        return;
      }

      setIsAuthenticated(true);
      const validToken = await hasValidSessionToken(user);
      setIsTokenValid(validToken);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showAdmin = isAuthenticated && isTokenValid;
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <Link
        key="/"
        href="/"
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        Inicio
      </Link>
      <Link
        key="/items"
        href="/items"
        className={`${styles.link} ${pathname === "/items" ? styles.active : ""}`}
        aria-current={pathname === "/items" ? "page" : undefined}
      >
        Paquetes
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
        key="/cart"
        href="/cart"
        className={`${styles.link} ${pathname === "/cart" ? styles.active : ""}`}
        aria-current={pathname === "/cart" ? "page" : undefined}
      >
        <CartIcon />
      </Link>
      {showAdmin ? (
        <Link
          key="/admin"
          href="/admin"
          className={`${styles.link} ${isAdminRoute ? styles.active : ""}`}
          aria-current={isAdminRoute ? "page" : undefined}
        >
          Administrador
        </Link>
      ) : (
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
      )}
    </nav>
  );
}

NavBar.displayName = "NavBar";
