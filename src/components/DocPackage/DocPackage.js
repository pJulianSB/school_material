"use client";

import styles from "./dockPackage.module.css";

export function DocPackage({ index, id, type, description, url, onRemove }) {
  const handleRemove = () => {
    onRemove?.(id);
  };

  return (
    <div className={styles.row} role="row">
      <div className={`${styles.cell} ${styles.indexCell}`} role="cell">
        <span className={styles.mobileLabel}>No</span>
        <span>{index}</span>
      </div>

      <div className={`${styles.cell} ${styles.typeCell}`} role="cell">
        <span className={styles.mobileLabel}>Tipo</span>
        <span>{type}</span>
      </div>

      <div className={`${styles.cell} ${styles.descriptionCell}`} role="cell">
        <span className={styles.mobileLabel}>Descripcion</span>
        <span>{description}</span>
      </div>

      <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
        <span className={styles.mobileLabel}>Ver</span>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.iconButton}
            aria-label={`Ver documento ${index}`}
            title="Ver documento"
          >
            <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
              <path
                d="M12 5C6.5 5 2.1 8.4 1 12c1.1 3.6 5.5 7 11 7s9.9-3.4 11-7c-1.1-3.6-5.5-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"
                fill="currentColor"
              />
            </svg>
          </a>
        ) : (
          <span className={styles.noUrl}>-</span>
        )}
      </div>

      <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
        <span className={styles.mobileLabel}>Remover</span>
        <button
          type="button"
          onClick={handleRemove}
          className={styles.iconButton}
          aria-label={`Remover documento ${index}`}
          title="Remover documento"
        >
          <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
            <path
              d="M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h2v9H7V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9zM6 21h12a1 1 0 0 0 1-1V8H5v12a1 1 0 0 0 1 1z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

DocPackage.displayName = "DocPackage";

