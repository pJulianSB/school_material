"use client";

import { Button } from "app/components/ui/Button";
import styles from "./admin.module.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
        <Button
        type="submit"
        className={styles.button}
        disabled={false}
        >
            AppEducativa
        </Button>
      </section>
    </div>
  );
}

