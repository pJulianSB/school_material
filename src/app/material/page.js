"use client";

import { useState } from "react";
import { Input } from "app/components/ui/Input";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./material.module.css";

export default function MaterialPage() {
  const [username, setUsername] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <Input
            id="username"
            name="username"
            type="text"
            placeholder="Tu usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={styles.input}
            autoComplete="username"
        />
          
        <PrimaryButton
        type="submit"
        disabled={!username}
        >
            Login
        </PrimaryButton>
      </section>
    </div>
  );
}

