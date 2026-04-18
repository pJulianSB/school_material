"use client";

import { Cart } from "app/components/icons/Cart";
import styles from "./PurchaseConfirmation.module.css";

const SUPPORT_PHONE = process.env.NEXT_PUBLIC_APP_SUPPORT_PHONE;
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_APP_SUPPORT_EMAIL;

export function PurchaseConfirmation({ purchaseNumber, email }) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>¡Gracias por confiar en APPEducativa!</h4>
        <div className={styles.subtitle}>
          <p> Agradecemos tu compra</p> 
          <Cart size={30} color="var(--color-primary)" />
        </div>
      </div>
      <p className={styles.description}>
        Revisa el resumen y confirma la operación.
      </p>
      <section>
        <p>El número de la compra es: <span className={styles.purchaseNumber}>{purchaseNumber}</span>.</p>
        <p>La información del comprobante será enviada al correo electrónico: <span className={styles.email}>{email}</span>.</p>
        <p className={styles.supportInfo}>Si no recibes el correo electrónico en las próximas 24 horas, por favor, verifica tu bandeja de spam o comunicate con nuestro equipo de soporte a través de WhatsApp al número <span className={styles.phone}>{SUPPORT_PHONE}</span> o por correo electrónico a <span className={styles.email}>{SUPPORT_EMAIL}</span>.</p>
      </section>
    </section>
  );
}

PurchaseConfirmation.displayName = "PurchaseConfirmation";
