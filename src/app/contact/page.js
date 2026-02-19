"use client";

import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
        <PrimaryButton
        type="submit"
        disabled={false}
        >
            Contact
        </PrimaryButton>
      </section>
    </div>
  );
}

