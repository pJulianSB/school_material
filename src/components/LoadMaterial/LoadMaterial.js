"use client";

import { useRef, useState } from "react";
import styles from "./LoadMaterial.module.css";

export function LoadMaterial({
  material = "",
  existingDocumentUrl = "",
  onUpload,
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
    if (!file) return;

    const isPdfMime = file.type === "application/pdf";
    const isPdfName = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdfMime && !isPdfName) {
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile || typeof onUpload !== "function") return;

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
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.urlLink}
          >
            {currentUrl}
          </a>
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
            accept="application/pdf,.pdf"
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

