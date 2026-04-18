"use client";

import styles from "./PaymentInfo.module.css";

const PAYMENT_METHODS = [
  {
    id: "bancolombia",
    title: "Bancolombia",
    subtitle: "Cuenta de ahorros para transferencias y consignaciones.",
    number: "#Cuenta corriente 1234567890",
    image: "/app/bancolombia.png"
  },
  {
    id: "nequi",
    title: "Nequi",
    subtitle: "Pago inmediato por número celular con validación instantánea.",
    number: "#Número celular 1234567890",
    image: "/app/nequi.png",
  },
  {
    id: "clave-breb",
    title: "Clave Breb",
    subtitle: "Transferencia interbancaria con código de referencia de compra.",
    number: "#Código de referencia 1234567890",
    image: "/app/breb.png",
  },
];

export function PaymentInfo() {
  return (
    <section className={styles.container}>
      <p className={styles.description}>
        Selecciona un método de pago y revisa cuidadosamente los datos antes de cargar el
        comprobante.
      </p>

      <section className={styles.methodsSection}>
        {PAYMENT_METHODS.map((method) => (
          <article key={method.id} className={styles.methodCard}>
            <div className={styles.imageColumn}>
              <img
                src={method.image}
                alt={`Método de pago ${method.title}`}
                className={styles.image}
              />
            </div>
            <div className={styles.textColumn}>
              <h4 className={styles.methodTitle}>{method.title}</h4>
              <p className={styles.methodSubtitle}>{method.subtitle}</p>
              <p className={styles.methodSubtitle}>{method.number}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.paymentInfoSection}>
        <section className={styles.accountOwnerSection}>
          <h4 className={styles.sectionTitle}>Titular de la cuenta</h4>
          <div className={styles.ownerLabels}>
            <label className={styles.ownerLabel}>Nombres: Aurelio Lopez Medina.</label>
            <label className={styles.ownerLabel}>Celular: 317 890 1234</label>
            <label className={styles.ownerLabel}>Cédula: 1001234567</label>
          </div>
        </section>
        <section className={styles.instructionsSection}>
          <h4 className={styles.sectionTitle}>Instrucciones de pago</h4>
          <div className={styles.ownerLabels}>
            <label className={styles.ownerLabel}>1. Realiza el pago por el método que prefieras.</label>
            <label className={styles.ownerLabel}>2. Verifica el valor total y conserva tu comprobante.</label>
            <label className={styles.ownerLabel}>3. En el siguiente paso adjunta el recibo para validar tu compra.</label>
          </div>
        </section>
        </section>
    </section>
  );
}

PaymentInfo.displayName = "PaymentInfo";
