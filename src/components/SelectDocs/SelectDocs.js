"use client";

import styles from "./selectDocs.module.css";
import { useState } from "react";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Input } from "app/components/ui/Input";
import { Select } from "app/components/ui/Select";
import { TYPE_MATERIAL_OPTIONS } from "app/utils/selectOptions";


export function SelectDocs({ documents, subject, grade, onAddDocument }) {
  const [materialType, setMaterialType] = useState("malla");
  const [description, setDescription] = useState("");

  const handleAddDocument = () => {
    onAddDocument();
  };

  const handleFilterDocuments = () => {
    console.log("Filtrar documentos");
  };

  const handleClearFilters = () => {
    setMaterialType("");
    setDescription("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        <h4 className={styles.filtersTitle}>Parámetros de búsqueda</h4>
        <div className={styles.filtersParams}>
          <label htmlFor="subject">Área:  <span className={styles.filtersParamsValue}>{subject}</span></label>
          
          <label htmlFor="grade">Grado:  <span className={styles.filtersParamsValue}>{grade}</span></label>
          
        </div>
        <h4 className={styles.filtersTitle}>Filtros</h4>
        <div className={styles.filtersContent}>
          <label htmlFor="material-type" className={styles.field}>
            <div>Tipo de material</div>
            <Select
              id="material-type"
              name="materialType"
              options={TYPE_MATERIAL_OPTIONS}
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            />
          </label>
          <label htmlFor="description" className={styles.field}>
            <div>Descripción</div>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <PrimaryButton
          type="button"
          onClick={handleFilterDocuments}
          >
          Filtrar
        </PrimaryButton>
        <TertiaryButton 
          type="button" 
          onClick={handleClearFilters}>
          Limpiar filtros
        </TertiaryButton>
      </div>

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
        <div className={`${styles.cellTitle} ${styles.actionCell}`} role="cell">
          <span>Ver</span>
        </div>
        <div className={`${styles.cellTitle} ${styles.actionCell}`} role="cell">
          <span>Acción</span>
        </div>
      </div>
      {documents.length === 0 ? <div className={styles.emptyLabel}>No hay documentos disponibles</div> : null}
      {documents.map((document, index) => (
        <div className={styles.row} role="row" key={document.id}>
          <div className={`${styles.cell} ${styles.indexCell}`} role="cell">
            <span className={styles.mobileLabel}>No</span>
            <span>{index + 1}</span>
          </div>

          <div className={`${styles.cell} ${styles.typeCell}`} role="cell">
            <span className={styles.mobileLabel}>Tipo</span>
            <span>{document.type}</span>
          </div>

          <div className={`${styles.cell} ${styles.descriptionCell}`} role="cell">
            <span className={styles.mobileLabel}>Descripcion</span>
            <span>{document.description}</span>
          </div>

          <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
            <span className={styles.mobileLabel}>Ver</span>
            {document.material_url ? (
              <a
              href={document.url}
              target="_blank"
              rel="noreferrer"
              className={styles.iconButton}
              aria-label={`Ver documento ${index + 1}`}
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
            <span className={styles.mobileLabel}>Acción</span>
            <PrimaryButton
              type="button"
              onClick={handleAddDocument}
              >
              Agregar
            </PrimaryButton>
          </div>
        </div>      
      ))}
    </div>
  );
}

SelectDocs.displayName = "SelectDocs";