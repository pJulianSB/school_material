"use client";

import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./NotFound.module.css";

export function NotFoundComponent({ message, buttonText, buttonOnClick }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v7" />
            <path d="M12 17h.01" />
          </svg>
        </span>
        <h2 className={styles.title}>
          {message}
        </h2>
        <PrimaryButton type="button" onClick={buttonOnClick}>
          {buttonText}
        </PrimaryButton>
      </div>
    </section>
  );
}
