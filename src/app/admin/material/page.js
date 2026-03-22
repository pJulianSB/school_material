"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./material.module.css";
import { Select } from "app/components/ui/Select";
import { TextArea } from "app/components/ui/TextArea";
import { LoadMaterial } from "app/components/LoadMaterial/LoadMaterial";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { MissingFields } from "app/components/ui/MissingFields";
import { sileo, Toaster } from "sileo";
import { uploadMaterialPdf, createMaterialService, getMaterialLastSerial } from "app/services/materialService";
import { TYPE_MATERIAL_OPTIONS, GRADES_OPTIONS, SUBJECTS_OPTIONS, MATERIAL_STATUS_OPTIONS } from "app/utils/selectOptions";

export default function MaterialPage() {
  const router = useRouter();
  const [materialType, setMaterialType] = useState("malla");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("primero");
  const [subject, setSubject] = useState("matematicas");
  const [status, setStatus] = useState("free");
  const [totalPackages, setTotalPackages] = useState(0);
  const [material, setMaterial] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleUploadMaterial = async (file) => {
    const { id, path, url: uploadedUrl } = await uploadMaterialPdf(file, { type: materialType });

    const material = {
      id: id,
      name: file.name,
      path: path,
      url: uploadedUrl,
    };
    setMaterial(material);
    return uploadedUrl;
  };

  const handleCancel = () => {
    setIsEdit(false);
    setMaterial({});
    setTotalPackages(0);
    setDescription("");
    setMaterialType("malla");
    setGrade("primero");
    setSubject("matematicas");
    setStatus("free");
    router.push("/admin/materialList");
  };

  const handleMaterial = () => {
    if (isEdit) {
      updateMaterial();
      return
    } 
    createMaterial();
  };

  const updateMaterial = () => {
    const payload = {
      id: material.id,
      materialType: materialType,
      grade: grade,
    };
  };

  const createMaterial = async () => {
    const missingFields = [];

    if (!materialType) missingFields.push("Tipo de material");
    if (!grade) missingFields.push("Grado");
    if (!subject) missingFields.push("Área");
    if (!status) missingFields.push("Estado");
    if (!description.trim()) missingFields.push("Descripción");
    if (!material || !material.name) missingFields.push("Seleccionar documento PDF");
    if (!material.url) missingFields.push("Guardar documento PDF");

    if (missingFields.length > 0) {
      sileo.error({
        title: "Error creando el material",
        description: <MissingFields missingFields={missingFields} />,
        fill: "#FAB7FF",
      });
      return;
    }

    const payload = {
      type: materialType,
      description: description,
      status: status,
      subject: subject,
      grade: grade,
      total_packages:totalPackages,
      material: {
        id: material.id,
        name: material.name,
        url: material.url,
        path: material.path,
      },
      serial: await getMaterialLastSerial(),
      active: true
    };

    await createMaterialService(payload);
    sileo.success({
      title: "Material creado de forma correcta",
    }).then(() => {
      router.push("/admin/materialList");
    });
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <h2>{ isEdit ? "Editar material" : "Crear material" }</h2>

      <section className={styles.card}>
        <section className={styles.formMaterial}>
          <div className={styles.columnA}>
            <label htmlFor="material-type" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Tipo de material</div>
              <Select
                id="material-type"
                name="materialType"
                options={TYPE_MATERIAL_OPTIONS}
                value={materialType}
                required={true}
                onChange={(e) => setMaterialType(e.target.value)}
              />
            </label>
            <label htmlFor="grade" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Grado</div>
              <Select
                id="grade"
                name="grade"
                options={GRADES_OPTIONS}
                value={grade}
                required={true}
                onChange={(e) => setGrade(e.target.value)}
              />
            </label>
            <label htmlFor="subject" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Área</div>
              <Select
                id="subject"
                name="subject"
                options={SUBJECTS_OPTIONS}
                value={subject}
                required={true}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.columnB}>
            <label htmlFor="status" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Estado</div>
              <Select
                id="status"
                name="status"
                options={MATERIAL_STATUS_OPTIONS}
                value={status}
                required={true}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
            <label htmlFor="material-description" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Descripción</div>
              <TextArea
                id="material-description"
                name="description"
                rows={3}
                value={description}
                required={true}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el material..."
              />
            </label>
            <label htmlFor="packagesNumber" className={styles.field}>
              Número de paquetes: {totalPackages}
            </label>
          </div>
        </section>
        <section className={styles.documentContainer}>
          <LoadMaterial
            material= {material}
            existingDocumentUrl={material.url}
            onUpload={handleUploadMaterial}
          />
        </section>
        <section className={styles.rowBtns}>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={handleMaterial}
            >
            { isEdit ? "Editar documento" : "Crear documento" }
          </PrimaryButton>
          <TertiaryButton
            type="button"
            disabled={false}
            onClick={handleCancel}
            >
              Cancelar
          </TertiaryButton>
        </section>
      </section>
    </div>
  );
}

