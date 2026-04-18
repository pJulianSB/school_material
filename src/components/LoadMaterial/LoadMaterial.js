"use client";

import { useRef, useState } from "react";
import { sileo, Toaster } from "sileo";
import styles from "./LoadMaterial.module.css";
import { SeeIcon } from "app/components/icons/SeeIcon";

export function LoadMaterial({
  material = "",
  existingDocumentUrl = "",
  onUpload,
  onlyPdf = true,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentUrl = uploadedUrl || existingDocumentUrl;

  const handleSelectClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      sileo.error({
        title: "Error al seleccionar el archivo",
        description: "No se seleccionó ningún archivo",
        fill: "#FAB7FF",
      });
      return;
    }

    const isPdfMime = file.type === "application/pdf";
    const isPdfName = file.name.toLowerCase().endsWith(".pdf");
    const isImageMime = file.type.startsWith("image/");
    const isImageName = file.name.toLowerCase().endsWith(".jpg") || file.name.toLowerCase().endsWith(".jpeg") || file.name.toLowerCase().endsWith(".png") || file.name.toLowerCase().endsWith(".gif") || file.name.toLowerCase().endsWith(".bmp") || file.name.toLowerCase().endsWith(".tiff") || file.name.toLowerCase().endsWith(".ico") || file.name.toLowerCase().endsWith(".webp");
    if (!isPdfMime && !isPdfName && !isImageMime && !isImageName) {
      sileo.error({
        title: "Error al seleccionar el archivo",
        description: "El archivo seleccionado no es válido",
        fill: "#FAB7FF",
      });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile || typeof onUpload !== "function") {
      sileo.error({
        title: "Error al seleccionar el archivo",
        description: "No se seleccionó ningún archivo",
        fill: "#FAB7FF",
      });
      return;
    };

    try {
      setIsLoading(true);
      const url = await onUpload(selectedFile);
      if (typeof url === "string" && url.trim() !== "") {
        setUploadedUrl(url);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <Toaster position="top-right" />
      <div className={styles.fileRow}>
        <label className={styles.mainLabel}>Nombre del documento: </label>
        {material.name ?
          <label>{material.name}</label>
        :
          <span className={styles.urlFallback}>Documento no cargado.</span>
        }
      </div>

      <div className={styles.urlBlock}>
        <label className={styles.mainLabel}>URL del documento: </label>
        {currentUrl ? (
          <SeeIcon url={currentUrl} elementLabel="Documento" serial={material.name} />
        ) : (
          <span className={styles.urlFallback}>Documento no cargado.</span>
        )}
      </div>

      <div className={styles.fileRowBtns}>
        <div>
          <label className={styles.mainLabel}>Archivo seleccionado: </label>
          <span className={styles.fileNameLabel}>
            {selectedFile ? selectedFile.name : ""}
          </span>
        </div>

        <div className={styles.fileRowBtns}>
          <button
            type="button"
            className={styles.primaryLikeButton}
            onClick={handleSelectClick}
            disabled={isLoading}
            >
            Seleccionar Archivo
          </button>

          <input
            ref={inputRef}
            type="file"
            accept={onlyPdf ? "application/pdf,.pdf" : "application/pdf,.pdf,image/jpeg,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.ico,.webp"}
            className={styles.hiddenInput}
            onChange={handleFileChange}
            />

          <button
            type="button"
            className={styles.primaryLikeButton}
            onClick={handleUploadClick}
            disabled={!selectedFile || isLoading}
            >
            {isLoading ? "Cargando documento..." : "Cargar documento"}
          </button>
        </div>
      </div>
    </section>
  );
}

