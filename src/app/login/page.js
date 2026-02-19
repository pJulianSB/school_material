"use client";

import { useState } from "react";
import { Input } from "app/components/ui/Input";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./login.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
          <PrimaryButton
          type="submit"
          disabled={false}
          >
              Ingresar
          </PrimaryButton>
        </section>
    </div>
  );
}

