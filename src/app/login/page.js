"use client";

import { useState } from "react";
import { Input } from "app/components/ui/Input";
import { Image } from "app/components/ui/Image";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./login.module.css";

const LOGO_IMAGE = "/app/app_logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <div className={styles.loginHeader}>
          <Image
            src={LOGO_IMAGE}
            alt=""
            width={160}
            height={44} // 27.6%
            className={styles.logo}
            priority
            />
          <h1 className={styles.loginTitle}>Ingreso de Usuarios</h1>
        </div>
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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

