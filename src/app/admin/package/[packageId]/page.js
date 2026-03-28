"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../package.module.css";
import { Select } from "app/components/ui/Select";
import { Input } from "app/components/ui/Input";
import { TextArea } from "app/components/ui/TextArea";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { MissingFields } from "app/components/ui/MissingFields";
import { DocPackage } from "app/components/DocPackage/DocPackage";
import { SelectDocs } from "app/components/SelectDocs/SelectDocs";
import { Drawer } from "app/components/Drawer/Drawer";
import { NotFoundComponent } from "app/components/NotFound/NotFound";
import { sileo, Toaster } from "sileo";
import { getMaterialFiltered } from "app/services/materialService";
import { getPackageById, updatePackageService } from "app/services/packageService";
import { GRADES_OPTIONS, SUBJECTS_OPTIONS, PACKAGE_STATUS_OPTIONS, GRADES_MAP, SUBJECTS_MAP } from "app/utils/selectOptions";

export default function PackagePage() {
  const router = useRouter();
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    status: "",
    price: "",
    serial: 0,
    total_documents: 0,
  });
  const [currentMaterials, setCurrentMaterials] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getPackage = async () => {
      const packageDb = await getPackageById(packageId);
      if (!packageDb) {
        setIsNotFound(true);
        return;
      }
      setPackageData({
        title: packageDb.title,
        description: packageDb.description,
        grade: packageDb.grade,
        subject: packageDb.subject,
        status: packageDb.status,
        price: packageDb.price,
        serial: packageDb.serial,
        total_documents: packageDb.total_documents,
      });
      setCurrentMaterials(packageDb.materials);
    };
    getPackage();
  }, [packageId]);

  const handleCancel = () => {
    setPackageData({
      title: "",
      description: "",
      grade: "",
      subject: "",
      status: "",
      price: "",
      serial: 0,
      total_documents: 0,
    });
    setCurrentMaterials([]);
    router.push("/admin/packageList");
  };

  const updatePackage = async () => {
    const missingFields = [];

    if (!packageData.title) missingFields.push("Título");
    if (!packageData.grade) missingFields.push("Grado");
    if (!packageData.subject) missingFields.push("Área");
    if (!packageData.status) missingFields.push("Estado");
    if (!packageData.price) missingFields.push("Precio");
    if (!packageData.description.trim()) missingFields.push("Descripción");
    if (currentMaterials.length === 0) missingFields.push("Debe agregar al menos un material.");

    if (missingFields.length > 0) {
      sileo.error({
        title: "Error actualizando el paquete",
        description: <MissingFields missingFields={missingFields} />,
        fill: "#FAB7FF",
      });
      return;
    }

    const materialsPayload = currentMaterials.map((material) => ({
      id: material.id,
      type: material.type_value,
      description: material.description,
      material_url: material.material_url,
      material_id: material.material_id,
      material_name: material.material_name,
    }));

    const payload = {
      title: packageData.title,
      description: packageData.description,
      grade: packageData.grade,
      subject: packageData.subject,
      status: packageData.status,
      price: packageData.price,
      materials: materialsPayload,
      total_documents: currentMaterials.length,
    };
    await updatePackageService(packageId, payload);
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
      subject: packageData.subject,
      grade: packageData.grade,
    };
    const materials = await getMaterialFiltered(filters);
    setDocumentList(materials.items);
    setIsLoadingDocuments(false);
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  if (isNotFound) {
    return (
      <NotFoundComponent
        message="El paquete no existe o fue imposible obtenerlo de la base de datos."
        buttonText="Regresar"
        buttonOnClick={() => router.push("/admin/packageList")}
      />
    );
  }

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <h2>Editar paquete</h2>

      <section className={styles.card}>
        <section className={styles.formMaterial}>
          <div className={styles.columnA}>
            <label htmlFor="title" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Título</div>
              <Input
                id="title"
                name="title"
                value={packageData.title}
                required={true}
                onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
              />
            </label>
            <label htmlFor="price" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Precio</div>
              <Input
                id="price"
                name="price"
                value={packageData.price}
                required={true}
                onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
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
                value={packageData.subject}
                required={true}
                onChange={(e) => setPackageData({ ...packageData, subject: e.target.value })}
              />
            </label>
            <label htmlFor="grade" className={styles.field}>
            <div><span className={styles.requiredColor}>*</span>Grado</div>
              <Select
                id="grade"
                name="grade"
                options={GRADES_OPTIONS}
                value={packageData.grade}
                required={true}
                onChange={(e) => setPackageData({ ...packageData, grade: e.target.value })}
              />
            </label>
            <label htmlFor="status" className={styles.field}>
              <div><span className={styles.requiredColor}>*</span>Estado</div>
              <Select
                id="status"
                name="status"
                options={PACKAGE_STATUS_OPTIONS}
                value={packageData.status}
                required={true}
                onChange={(e) => setPackageData({ ...packageData, status: e.target.value })}
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
              value={packageData.description}
              required={true}
              onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
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
            onClick={updatePackage}
            >
            Editar paquete
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
          subject={SUBJECTS_MAP[packageData.subject]}
          grade={GRADES_MAP[packageData.grade]}
          currentMaterials={currentMaterials}
          onAddMaterial={handleAddMaterial}
        />
      </Drawer>
    </div>
  );
}
