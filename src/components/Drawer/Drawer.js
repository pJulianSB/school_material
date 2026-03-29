"use client";

import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./drawer.module.css";

export function Drawer({ isOpen = false, title = "", onClose, hasAction = false, onAction, actionLabel = "Guardar", children }) {
  return (
    <aside
      className={`${styles.drawer} ${isOpen ? styles.open : styles.closed}`}
      aria-label={title || "Drawer"}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.content}>{children}</div>

      <div className={styles.footer}>
        { hasAction && (
          <PrimaryButton type="button" onClick={onAction}>
            {actionLabel}
          </PrimaryButton>
        )}
        <TertiaryButton type="button" onClick={onClose}>
          Cancelar
        </TertiaryButton>
      </div>
    </aside>
  );
}

Drawer.displayName = "Drawer";

