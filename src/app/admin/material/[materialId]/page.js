"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../material.module.css";
import { Select } from "app/components/ui/Select";
import { TextArea } from "app/components/ui/TextArea";
import { LoadMaterial } from "app/components/LoadMaterial/LoadMaterial";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { MissingFields } from "app/components/ui/MissingFields";
import { NotFoundComponent } from "app/components/NotFound/NotFound";
import { sileo, Toaster } from "sileo";
import { uploadMaterialPdf, updateMaterialService, getMaterialById } from "app/services/materialService";
import { TYPE_MATERIAL_OPTIONS, GRADES_OPTIONS, SUBJECTS_OPTIONS, MATERIAL_STATUS_OPTIONS } from "app/utils/selectOptions";

export default function MaterialEditPage() {
  const router = useRouter();
  const { materialId } = useParams();
  const [materialData, setMaterialData] = useState({
    type: "",
    description: "",
    grade: "",
    subject: "",
    status: "",
    totalPackages: 0,
    serial: 0,
  });
  const [material, setMaterial] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getMaterial = async () => {
      const materialDb = await getMaterialById(materialId);
      if (!materialDb) {
        setIsNotFound(true);
        return;
      }
      setMaterialData({
        type: materialDb.type,
        description: materialDb.description,
        grade: materialDb.grade,
        subject: materialDb.subject,
        status: materialDb.status,
        totalPackages: materialDb.total_packages,
        serial: materialDb.serial,
      });
      setMaterial(materialDb.material);
    };
    getMaterial();
  }, [materialId]);

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
    setMaterialData({
      type: "",
      description: "",
      grade: "",
      subject: "",
      status: "",
      totalPackages: 0,
    });
    setMaterial({});
    router.push("/admin/materialList");
  };

  const updateMaterial = async () => {
    const missingFields = [];

    if (!materialData.type) missingFields.push("Tipo de material");
    if (!materialData.grade) missingFields.push("Grado");
    if (!materialData.subject) missingFields.push("Área");
    if (!materialData.status) missingFields.push("Estado");
    if (!materialData.description.trim()) missingFields.push("Descripción");
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
      type: materialData.type,
      description: materialData.description,
      status: materialData.status,
      subject: materialData.subject,
      grade: materialData.grade,
      total_packages: materialData.totalPackages,
      material: {
        id: material.id,
        name: material.name,
        url: material.url,
        path: material.path,
      },
      serial: materialData.serial,
    };

    await updateMaterialService(materialId, payload);
    router.push("/admin/materialList");
  };

  if (isNotFound) {
    return (
      <NotFoundComponent
        message="El material no existe o fue imposible obtenerlo de la base de datos."
        buttonText="Regresar"
        buttonOnClick={() => router.push("/admin/materialList")}
      />
    );
  }

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <h2>Editar material</h2>
      <section className={styles.card}>
        <section className={styles.formMaterial}>
          <div className={styles.columnA}>
            <label htmlFor="material-type" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Tipo de material</div>
              <Select
                id="material-type"
                name="materialType"
                options={TYPE_MATERIAL_OPTIONS}
                value={materialData.type}
                required={true}
                onChange={(e) => setMaterialData({ ...materialData, type: e.target.value })}
              />
            </label>
            <label htmlFor="grade" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Grado</div>
              <Select
                id="grade"
                name="grade"
                options={GRADES_OPTIONS}
                value={materialData.grade}
                required={true}
                onChange={(e) => setMaterialData({ ...materialData, grade: e.target.value })}
              />
            </label>
            <label htmlFor="subject" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Área</div>
              <Select
                id="subject"
                name="subject"
                options={SUBJECTS_OPTIONS}
                value={materialData.subject}
                required={true}
                onChange={(e) => setMaterialData({ ...materialData, subject: e.target.value })}
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
                value={materialData.status}
                required={true}
                onChange={(e) => setMaterialData({ ...materialData, status: e.target.value })}
              />
            </label>
            <label htmlFor="material-description" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Descripción</div>
              <TextArea
                id="material-description"
                name="description"
                rows={3}
                value={materialData.description}
                required={true}
                onChange={(e) => setMaterialData({ ...materialData, description: e.target.value })}
                placeholder="Describe el material..."
              />
            </label>
            <label htmlFor="packagesNumber" className={styles.field}>
              Número de paquetes: {materialData.totalPackages}
            </label>
          </div>
        </section>
        <section className={styles.documentContainer}>
          <LoadMaterial
            material= {material}
            existingDocumentUrl={material.url || ""}
            onUpload={handleUploadMaterial}
          />
        </section>
        <section className={styles.rowBtns}>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={updateMaterial}
            >
            Editar material
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

