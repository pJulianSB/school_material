import React from "react";
import styles from "./SeeIcon.module.css";

export const SeeIcon = ({ url, elementLabel, serial }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={styles.iconButton}
      aria-label={`Ver ${elementLabel} ${serial}`}
      title={`Ver ${elementLabel}`}
    >
      <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
        <path
          d="M12 5C6.5 5 2.1 8.4 1 12c1.1 3.6 5.5 7 11 7s9.9-3.4 11-7c-1.1-3.6-5.5-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"
          fill="currentColor"
          />
      </svg>
    </a>
  );
};

SeeIcon.displayName = "SeeIcon";