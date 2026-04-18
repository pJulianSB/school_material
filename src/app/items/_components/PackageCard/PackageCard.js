"use client";

import { Price } from "app/components/ui/Price";
import { TextArea } from "app/components/ui/TextArea";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import styles from "./PackageCard.module.css";

const DEFAULT_PACKAGE_IMAGE =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80";

export function PackageCard({
  packageData = {},
  onAddToCart,
  onViewDetail,
}) {
  const {
    title = "",
    subject = "-",
    grade = "-",
    description = "",
    total_documents,
    materials = [],
    price = 0,
    imageUrl,
  } = packageData;

  const totalDocumentsValue =
    total_documents != null ? total_documents : materials.length;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl || DEFAULT_PACKAGE_IMAGE}
          alt={`Imagen del paquete ${title || "educativo"}`}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title || "Paquete educativo"}</h3>

        <div className={styles.paramsRow}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Área</span>
            <span className={styles.fieldValue}>{subject}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Grado</span>
            <span className={styles.fieldValue}>{grade}</span>
          </div>
        </div>

        <div className={styles.descriptionRow}>
          <span className={styles.fieldLabel}>Descripción</span>
          <TextArea
            id={`package-description-${title || "default"}`}
            name="packageDescription"
            rows={3}
            value={description}
            readOnly
            aria-readonly="true"
          />
        </div>

        <div className={styles.totalDocumentsRow}>
          <span className={styles.fieldLabel}>Total documentos</span>
          <span className={styles.documentsTag}>{totalDocumentsValue}</span>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.fieldLabel}>Precio</span>
          <Price value={price} />
        </div>

        <div className={styles.actionsRow}>
          <PrimaryButton type="button" onClick={() => onAddToCart?.(packageData)}>
            Comprar
          </PrimaryButton>
          <TertiaryButton type="button" onClick={() => onViewDetail?.(packageData)}>
            Ver Detalle
          </TertiaryButton>
        </div>
      </div>
    </article>
  );
}

PackageCard.displayName = "PackageCard";
