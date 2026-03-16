"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOutUser } from "app/services/authenticationService";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./SideBar.module.css";

export function SideBar({ routes = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    try {
      setIsSigningOut(true);
      await signOutUser();
      router.push("/");
    } finally {
      setIsSigningOut(false);
    }
  };

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
      <div className={styles.footer}>
        <PrimaryButton
          type="button"
          className={styles.signOutButton}
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Cerrando..." : "Cerrar Sesión"}
        </PrimaryButton>
      </div>
    </aside>
  );
}

SideBar.displayName = "SideBar";
