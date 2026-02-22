"use client";

import { useRef, useState } from "react";
import styles from "./LoadMaterial.module.css";

export function LoadMaterial({
  label = "Documento PDF",
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
      <label className={styles.mainLabel}>{label}</label>

      <div className={styles.fileRow}>
        <span className={styles.fileNameLabel}>
          {selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}
        </span>

        <button
          type="button"
          className={styles.primaryLikeButton}
          onClick={handleSelectClick}
          disabled={isLoading}
        >
          Seleccionar Archivo
        </button>
      </div>

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

      <div className={styles.urlBlock}>
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
          <span className={styles.urlFallback}>El documento no ha sido guardado</span>
        )}
      </div>
    </section>
  );
}

