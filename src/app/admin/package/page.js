"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./package.module.css";
import { Select } from "app/components/ui/Select";
import { Input } from "app/components/ui/Input";
import { TextArea } from "app/components/ui/TextArea";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { MissingFields } from "app/components/ui/MissingFields";
import { DocPackage } from "app/components/DocPackage/DocPackage";
import { SelectDocs } from "app/components/SelectDocs/SelectDocs";
import { Drawer } from "app/components/Drawer/Drawer";
import { sileo, Toaster } from "sileo";
import { createPackageService, getPackageLastSerial } from "app/services/packageService";
import { getMaterialFiltered } from "app/services/materialService";
import { GRADES_OPTIONS, SUBJECTS_OPTIONS, PACKAGE_STATUS_OPTIONS, GRADES_MAP, SUBJECTS_MAP } from "app/utils/selectOptions";

export default function PackagePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("primero");
  const [subject, setSubject] = useState("matematicas");
  const [status, setStatus] = useState("active");
  const [price, setPrice] = useState("");
  const [currentMaterials, setCurrentMaterials] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);

  const handleCancel = () => {
    setIsEdit(false);
    setTitle("");
    setDescription("");
    setGrade("primero");
    setSubject("matematicas");
    setStatus("active");
    setPrice("");
    setDocuments([]);
    router.push("/admin/packageList");
  };

  const handlePackage = () => {
    if (isEdit) {
      updatePackage();
      return
    } 
    createPackage();
  };

  const updatePackage = () => {
    const payload = {
      title: title,
      description: description,
      grade: grade,
      subject: subject,
      status: status,
      price: price,
      documents: documents,
    };
  };

  const createPackage = async () => {
    const missingFields = [];

    if (!title) missingFields.push("Título");
    if (!grade) missingFields.push("Grado");
    if (!subject) missingFields.push("Área");
    if (!status) missingFields.push("Estado");
    if (!price) missingFields.push("Precio");
    if (!description.trim()) missingFields.push("Descripción");
    if (currentMaterials.length === 0) missingFields.push("Debe agregar al menos un material.");

    if (missingFields.length > 0) {
      sileo.error({
        title: "Error creando el paquete",
        description: <MissingFields missingFields={missingFields} />,
        fill: "#FAB7FF",
      });
      return;
    }

    const materials = currentMaterials.map((material) => ({
      id: material.id,
      type: material.type,
      description: material.description,
      material_url: material.material_url,
      material_id: material.material_id,
      material_name: material.material_name,
    }));

    const payload = {
      title: title,
      price: price,
      description: description,
      status: status,
      subject: subject,
      grade: grade,
      total_documents: currentMaterials.length,
      materials: materials,
      serial: await getPackageLastSerial(),
    };
    await createPackageService(payload);
    router.push("/admin/packageList");
  };

  const handleRemoveMaterial = (id) => {
    setCurrentMaterials(currentMaterials.filter((material) => material.id !== id));
  };

  const handleAddMaterial = (material) => {
    const updateMaterials = [...currentMaterials, material];
    setCurrentMaterials(updateMaterials);
  };

  const handleSelectMaterials = async () => {
    setIsDrawerOpen(true);
    setIsLoadingDocuments(true);
    const filters = {
      subject: subject,
      grade: grade,
    };
    const materials = await getMaterialFiltered(filters);
    setDocumentList(materials.items);
    setIsLoadingDocuments(false);
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <h2>{ isEdit ? "Editar paquete" : "Crear paquete" }</h2>

      <section className={styles.card}>
        <section className={styles.formMaterial}>
          <div className={styles.columnA}>
            <label htmlFor="title" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Título</div>
              <Input
                id="title"
                name="title"
                value={title}
                required={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="price" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Precio</div>
              <Input
                id="price"
                name="price"
                value={price}
                required={true}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label htmlFor="documentsNumber" className={styles.field}>
              Número de documentos activos: {currentMaterials.length}
            </label>
          </div>
          <div className={styles.columnB}>
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
            <label htmlFor="status" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Estado</div>
              <Select
                id="status"
                name="status"
                options={PACKAGE_STATUS_OPTIONS}
                value={status}
                required={true}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
          </div>
        </section>
        <section className={styles.descriptionContainer}>
          <label htmlFor="package-description" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Descripción</div>
            <TextArea
              id="package-description"
              name="description"
              rows={3}
              value={description}
              required={true}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el paquete..."
            />
          </label>
        </section>
        <section className={styles.documentsContainer}>
          <div className={styles.documentsContainerTitle}>
            <h3 className={styles.subtitle}>Materiales del paquete</h3>
            <PrimaryButton
              type="button"
              className={styles.primaryButton}
              onClick={handleSelectMaterials}
              >
              Agregar material
            </PrimaryButton>
          </div>
          <DocPackage
            materials={currentMaterials}
            onRemove={handleRemoveMaterial}
          />
        </section>
        <section className={styles.rowBtns}>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={handlePackage}
            >
            { isEdit ? "Editar paquete" : "Crear paquete" }
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
      <Drawer
        isOpen={isDrawerOpen}
        title="Agregar documentos al paquete"
        onClose={handleCloseDrawer}
      >
        <SelectDocs
          documents={documentList}
          isLoading={isLoadingDocuments}
          subject={SUBJECTS_MAP[subject]}
          grade={GRADES_MAP[grade]}
          currentMaterials={currentMaterials}
          onAddMaterial={handleAddMaterial}
        />
      </Drawer>
    </div>
  );
}
