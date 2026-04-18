"use client";

import { Price } from "app/components/ui/Price";
import { TextArea } from "app/components/ui/TextArea";
import styles from "./PackageDetail.module.css";

export function PackageDetail({ packageData }) {
  const materials = packageData?.materials || [];

  return (
    <div className={styles.container}>
      <div className={styles.packageDataContainer}>
        <div className={styles.packageTitleRow}>
          <h3 className={styles.packageTitle}>{packageData?.title || ""}</h3>
          <div>
            <span className={styles.fieldLabel}>Precio: </span>
            <Price value={packageData?.price} />
          </div>
        </div>

        <div className={styles.packageParamsRow}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Área</span>
            <span className={styles.fieldValue}>{packageData?.subject || "-"}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Grado</span>
            <span className={styles.fieldValue}>{packageData?.grade || "-"}</span>
          </div>
        </div>

        <div className={styles.descriptionRow}>
          <span className={styles.fieldLabel}>Descripción</span>
          <TextArea
            id="package-description"
            name="packageDescription"
            rows={4}
            value={packageData?.description || ""}
            readOnly
            aria-readonly="true"
          />
        </div>
      </div>

      <div className={styles.materialsContainer}>
        <div className={`${styles.row} ${styles.rowTitle}`}>
          <div className={`${styles.cellTitle} ${styles.indexCell}`} role="cell">
            <span>No</span>
          </div>
          <div className={`${styles.cellTitle} ${styles.typeCell}`} role="cell">
            <span>Tipo</span>
          </div>
          <div className={`${styles.cellTitle} ${styles.descriptionCell}`} role="cell">
            <span>Descripcion</span>
          </div>
        </div>
        {materials.length === 0 ? <div className={styles.emptyLabel}>Paquete sin materiales</div> : null}
        {materials.map((material, index) => (
          <div className={styles.row} role="row" key={material.id}>
            <div className={`${styles.cell} ${styles.indexCell}`} role="cell">
              <span className={styles.mobileLabel}>No</span>
              <span>{index + 1}</span>
            </div>

            <div className={`${styles.cell} ${styles.typeCell}`} role="cell">
              <span className={styles.mobileLabel}>Tipo</span>
              <span>{material.type}</span>
            </div>

            <div className={`${styles.cell} ${styles.descriptionCell}`} role="cell">
              <span className={styles.mobileLabel}>Descripcion</span>
              <span>{material.description}</span>
            </div>
          </div>      
        ))}
      </div>
    </div>
  );
}

PackageDetail.displayName = "PackageDetail";