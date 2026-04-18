import React from "react";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import styles from "./Modal.module.css";

export function Modal({
  title = "",
  children,
  primaryLabel = "Aceptar",
  onPrimaryAction,
  onCancelAction,
  isOpen = true,
  className,
  contentClassName,
  primaryButtonProps = {},
  cancelButtonProps = {},
}) {
  if (!isOpen) return null;

  const wrapperClassNames = [styles.modalCard, className].filter(Boolean).join(" ");
  const contentClassNames = [styles.body, contentClassName].filter(Boolean).join(" ");

  return (
    <div className={styles.overlay} role="presentation" onClick={onCancelAction}>
      <section
        className={wrapperClassNames}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </header>

        <div className={contentClassNames}>{children}</div>

        <footer className={styles.footer}>
          <PrimaryButton type="button" onClick={onPrimaryAction} {...primaryButtonProps}>
            {primaryLabel}
          </PrimaryButton>
          <TertiaryButton type="button" onClick={onCancelAction} {...cancelButtonProps}>
            Cancelar
          </TertiaryButton>
        </footer>
      </section>
    </div>
  );
}

Modal.displayName = "Modal";
