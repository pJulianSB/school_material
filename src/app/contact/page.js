"use client";

import { Button } from "app/components/ui/Button";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
        <Button
        type="submit"
        className={styles.button}
        disabled={false}
        >
            Contact
        </Button>
      </section>
    </div>
  );
}

