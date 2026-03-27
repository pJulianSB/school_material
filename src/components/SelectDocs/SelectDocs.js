"use client";

import styles from "./selectDocs.module.css";
import { useState, useMemo } from "react";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Input } from "app/components/ui/Input";
import { Select } from "app/components/ui/Select";
import { SeeIcon } from "app/components/icons/SeeIcon";
import { TYPE_MATERIAL_OPTIONS, TYPE_MATERIAL_MAP } from "app/utils/selectOptions";
import { getAvailableMaterials } from "app/utils/filterFunctions";


export function SelectDocs({ documents, isLoading, subject, grade, currentMaterials, onAddMaterial }) {
  const [materialType, setMaterialType] = useState("malla");
  const [description, setDescription] = useState("");

  const materialsFiltered = useMemo(() => {
    if (!documents || documents.length === 0) return [];

    const availableMaterials = getAvailableMaterials(documents, currentMaterials);

    return availableMaterials.filter(doc => {
      const filterType = materialType === '' || doc.type === TYPE_MATERIAL_MAP[materialType];
      const filterDescription = description === '' || 
        doc.description.toLowerCase().includes(description.toLowerCase());
      return filterType && filterDescription;
    });
  }, [documents, materialType, description, currentMaterials]);

  const handleClearFilters = () => {
    setMaterialType("malla");
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
        <TertiaryButton 
          type="button" 
          onClick={handleClearFilters}>
          Limpiar filtros
        </TertiaryButton>
      </div>
      <section className={styles.documentsContainer}>
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
        { isLoading 
          ? <div className={styles.loadingLabel}>Cargando materiales...</div> 
          : materialsFiltered.length === 0 
            ? <div className={styles.emptyLabel}>No hay materiales disponibles</div> 
            : materialsFiltered.map((material, index) => (
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
                <span className={styles.mobileLabel}>Descripción</span>
                <span>{material.description}</span>
              </div>

              <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
                <span className={styles.mobileLabel}>Ver</span>
                {material.material_url ? (
                  <SeeIcon
                    url={material.material_url}
                    elementLabel="Material"
                    serial={index + 1}
                  />
                ) : (
                  <span className={styles.noUrl}>-</span>
                )}
              </div>

              <div className={`${styles.cell} ${styles.actionCell}`} role="cell">
                <span className={styles.mobileLabel}>Acción</span>
                <PrimaryButton
                  type="button"
                  onClick={() => onAddMaterial(material)}
                  >
                  Agregar
                </PrimaryButton>
              </div>
            </div>      
            ))}
      </section> 
    </div>
  );
}

SelectDocs.displayName = "SelectDocs";