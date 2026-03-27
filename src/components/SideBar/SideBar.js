"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOutUser } from "app/services/authenticationService";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { CollapseLeftIcon } from "app/components/icons/CollapseLeftIcon";
import { CreateIcon } from "app/components/icons/CreateIcon";
import { CreatePackageIcon } from "app/components/icons/CreatePackageIcon";
import { ExpandHorizontalIcon } from "app/components/icons/ExpandHorizontalIcon";
import { LogoutIcon } from "app/components/icons/LogoutIcon";
import { MaterialIcon } from "app/components/icons/MaterialIcon";
import { MenuIcon } from "app/components/icons/MenuIcon";
import { PackageIcon } from "app/components/icons/PackageIcon";
import { SalesIcon } from "app/components/icons/SalesIcon";
import { UsersIcon } from "app/components/icons/UsersIcon";
import styles from "./SideBar.module.css";

const routeIconByPath = {
  "/admin": SalesIcon,
  "/admin/users": UsersIcon,
  "/admin/packageList": PackageIcon,
  "/admin/materialList": MaterialIcon,
  "/admin/package": CreatePackageIcon,
  "/admin/material": CreateIcon,
};

export function SideBar({ routes = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  const showLabels = !isCollapsed || isMobileMenuOpen;
  const collapseLabel = isCollapsed ? "Expandir sidebar" : "Contraer sidebar";

  const isRouteActive = (path) => {
    if (pathname === path) return true;
    return path !== "/admin" && pathname.startsWith(`${path}/`);
  };

  const getIconForPath = (path) => routeIconByPath[path] || MaterialIcon;

  return (
    <>
      <button
        type="button"
        className={styles.mobileMenuButton}
        aria-label="Abrir menú de administración"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <MenuIcon />
      </button>

      <button
        type="button"
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayVisible : ""}`}
        aria-label="Cerrar menú"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${isMobileMenuOpen ? styles.mobileOpen : ""}`}
        aria-label="Menú de administración"
      >
        <div className={styles.topActions}>
          <button
            type="button"
            className={styles.collapseButton}
            aria-label={collapseLabel}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? <ExpandHorizontalIcon /> : <CollapseLeftIcon />}
          </button>
        </div>

        <nav className={styles.nav}>
          {routes.map(({ path, label }) => {
            const RouteIcon = getIconForPath(path);
            const active = isRouteActive(path);
            return (
              <Link
                key={path}
                href={path}
                className={`${styles.link} ${active ? styles.active : ""} ${isCollapsed ? styles.tooltipTarget : ""}`}
                aria-current={active ? "page" : undefined}
                data-tooltip={isCollapsed ? label : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <RouteIcon className={styles.linkIcon} />
                {showLabels ? <span className={styles.linkLabel}>{label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <PrimaryButton
            type="button"
            className={`${styles.signOutButton} ${!showLabels ? styles.signOutCollapsed : ""}`}
            onClick={handleSignOut}
            disabled={isSigningOut}
            title={!showLabels ? "Cerrar Sesión" : undefined}
          >
            <LogoutIcon className={styles.linkIcon} />
            {showLabels ? (isSigningOut ? "Cerrando..." : "Cerrar Sesión") : null}
          </PrimaryButton>
        </div>
      </aside>
    </>
  );
}

SideBar.displayName = "SideBar";
