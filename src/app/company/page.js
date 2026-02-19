"use client";

import { useState } from "react";
import { Input } from "app/components/ui/Input";
import { Button } from "app/components/ui/Button";
import styles from "./company.module.css";

export default function CompanyPage() {
  const [username, setUsername] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
          <Button
          type="submit"
          className={styles.button}
          disabled={false}
          >
              Company
          </Button>
        </section>
    </div>
  );
}

