"use client";

import styles from "./UserReceipt.module.css";
import { useState } from "react";
import { LoadMaterial } from "app/components/LoadMaterial/LoadMaterial";
import { Image } from "app/components/ui/Image";
import { uploadSaleSupport } from "app/services/salesService";

const SUPPORT_PHONE = process.env.NEXT_PUBLIC_APP_SUPPORT_PHONE;
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_APP_SUPPORT_EMAIL;

export function UserReceipt({ purchaseNumber, email }) {
  const [invoice, setInvoice] = useState({});

  const handleUploadSaleSupport = async (file) => {
    const { id, path, url: uploadedUrl } = await uploadSaleSupport(file, { type: "invoice" });

    const invoice = {
      id: id,
      name: file.name,
      path: path,
      url: uploadedUrl,
    };
    setInvoice(invoice);
    return uploadedUrl;
  };
  
  return (
    <section className={styles.container}>
      <p className={styles.description}>
        Adjunta el comprobante del pago para solicitar la validación de la compra.
      </p>
      <section>
        <p>Los formatos permitidos son: PDF e imágenes (JPG, JPEG, PNG, GIF, BMP, TIFF, ICO, WEBP).</p>
        <p>El archivo no debe pesar más de 2MB.</p>
      </section>
      <section className={styles.documentContainer}>
        <LoadMaterial
          material= {invoice}
          existingDocumentUrl={invoice.url}
          onUpload={handleUploadSaleSupport}
          onlyPdf={false}
        />
      </section>
      <section>
        <p>El número de la compra es: <span className={styles.purchaseNumber}>{purchaseNumber}</span>.</p>
        <p>La información del comprobante será enviada al correo electrónico: <span className={styles.email}>{email}</span>.</p>
        <p className={styles.supportInfo}>Si no recibes el correo electrónico en las próximas 24 horas, por favor, verifica tu bandeja de spam o comunicate con nuestro equipo de soporte a través de 
          WhatsApp al número <span className={styles.phone}>{SUPPORT_PHONE}</span> o por correo electrónico a <span className={styles.email}>{SUPPORT_EMAIL}</span>.</p>
      </section>
    </section>
  );
}

UserReceipt.displayName = "UserReceipt";
