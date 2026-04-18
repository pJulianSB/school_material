"use client";

import styles from "./PackageItems.module.css";

export function PackageItems({ packageItems, onRemove, onViewDetails }) {

  return (
    <div className={styles.container}>
      <div className={`${styles.row} ${styles.rowTitle}`}>
        <div className={`${styles.cellTitle} ${styles.indexCell}`} role="cell">
          <span>No</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.titleCell}`} role="cell">
          <span>Titulo</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.titleCell}`} role="cell">
          <span>Área</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.titleCell}`} role="cell">
          <span>Grado</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.titleCell}`} role="cell">
          <span>Precio</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.descriptionCell}`} role="cell">
          <span>Descripcion</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.actionCell}`} role="cell">
          <span>Ver</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.actionCell}`} role="cell">
          <span>Remover</span>
        </div>
      </div>
      {packageItems.length === 0 ? <div className={styles.emptyLabel}>Proceso de compra sin paquetes.</div> : null}
      {packageItems.map((packageItem, index) => (
        <div className={styles.row} role="row" key={packageItem.id}>
          <div className={`${styles.cell} ${styles.indexCell}`} role="cell">
            <span className={styles.mobileLabel}>No</span>
            <span>{index + 1}</span>
          </div>

          <div className={`${styles.cell} ${styles.titleCell}`} role="cell">
            <span className={styles.mobileLabel}>Titulo</span>
            <span>{packageItem.title}</span>
          </div>

          <div className={`${styles.cell} ${styles.titleCell}`} role="cell">
            <span className={styles.mobileLabel}>Área</span>
            <span>{packageItem.subject}</span>
          </div>

          <div className={`${styles.cell} ${styles.titleCell}`} role="cell">
            <span className={styles.mobileLabel}>Grado</span>
            <span>{packageItem.grade}</span>
          </div>

          <div className={`${styles.cell} ${styles.titleCell}`} role="cell">
            <span className={styles.mobileLabel}>Precio</span>
            <span>{packageItem.price}</span>
          </div>

          <div className={`${styles.cell} ${styles.descriptionCell}`} role="cell">
            <span className={styles.mobileLabel}>Descripcion</span>
            <span>{packageItem.description}</span>
          </div>

          <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
            <span className={styles.mobileLabel}>Ver</span>
            <button
              type="button"
              onClick={() => onViewDetails(packageItem)}
              className={styles.iconButton}
              aria-label={`Ver detalles del paquete ${index + 1}`}
              title="Ver detalles del paquete"
              >
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                  <path
                    d="M12 5C6.5 5 2.1 8.4 1 12c1.1 3.6 5.5 7 11 7s9.9-3.4 11-7c-1.1-3.6-5.5-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"
                    fill="currentColor"
                    />
                </svg>
            </button>
          </div>
          <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
            <span className={styles.mobileLabel}>Remover</span>
            <button
              type="button"
              onClick={() => onRemove(packageItem.id, packageItem.price)}
              className={styles.iconButton}
              aria-label={`Remover paquete ${index + 1}`}
              title="Remover paquete"
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
      ))}
    </div>
  );
}

PackageItems.displayName = "PackageItems";
