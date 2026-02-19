"use client";

import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./admin.module.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
        <PrimaryButton
        type="submit"
        disabled={false}
        >
            AppEducativa
        </PrimaryButton>
      </section>
    </div>
  );
}

