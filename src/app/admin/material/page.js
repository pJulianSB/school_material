"use client";

import { useState } from "react";
import styles from "./material.module.css";
import { Select } from "app/components/ui/Select";
import { TextArea } from "app/components/ui/TextArea";
import { LoadMaterial } from "app/components/LoadMaterial/LoadMaterial";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";

import { TYPE_MATERIAL_OPTIONS, GRADES_OPTIONS, SUBJECTS_OPTIONS, MATERIAL_STATUS_OPTIONS } from "app/utils/selectOptions";

export default function MaterialPage() {
  const [materialType, setMaterialType] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  const [packages, setPackages] = useState("0");
  const [material, setMaterial] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleUploadMaterial = async (file) => {
    // Simula el proceso de carga en DB/storage
    await new Promise((resolve) => setTimeout(resolve, 900));
    const generatedUrl = URL.createObjectURL(file);
    setMaterial(file);
    setUrl(generatedUrl);
    return generatedUrl;
  };

  const handleCancel = () => {
    setIsEdit(false);
    setMaterial("");
    setUrl("");
    setPackages("0");
    setDescription("");
    setGrade("");
    setSubject("");
  };

  return (
    <div className={styles.page}>
      <h2>Detalle del material</h2>

      <section className={styles.card}>
        <section className={styles.formMaterial}>
          <div className={styles.columnA}>
            <label htmlFor="material-type" className={styles.field}>
              Tipo de material
              <Select
                id="material-type"
                name="materialType"
                options={TYPE_MATERIAL_OPTIONS}
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              />
            </label>
            <label htmlFor="grade" className={styles.field}>
              Grado
              <Select
                id="grade"
                name="grade"
                options={GRADES_OPTIONS}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </label>
            <label htmlFor="subject" className={styles.field}>
              Área
              <Select
                id="subject"
                name="subject"
                options={SUBJECTS_OPTIONS}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.columnB}>
            <label htmlFor="status" className={styles.field}>
              Estado
              <Select
                id="status"
                name="status"
                options={MATERIAL_STATUS_OPTIONS}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
            <label htmlFor="material-description" className={styles.field}>
              Descripción
              <TextArea
                id="material-description"
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el material..."
              />
            </label>
            <label htmlFor="packagesNumber" className={styles.field}>
              Número de paquetes: {packages}
            </label>
          </div>
        </section>
        <section className={styles.documentContainer}>
          <LoadMaterial
            material= {material}
            existingDocumentUrl={url}
            onUpload={handleUploadMaterial}
          />
        </section>
        <section className={styles.rowBtns}>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={handleUploadMaterial}
            >
            { isEdit ? "Editar documento" : "Crear documento" }
          </PrimaryButton>
          <TertiaryButton
            type="button"
            disabled={false}
            >
              Cancelar
          </TertiaryButton>
        </section>
      </section>
    </div>
  );
}

