"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sileo, Toaster } from "sileo";
import { Input } from "app/components/ui/Input";
import { Image } from "app/components/ui/Image";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { signInWithEmail } from "app/services/authenticationService";
import styles from "./login.module.css";

const LOGO_IMAGE = "/app/app_logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = () => {
    const nextErrors = [];
    const normalizedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      nextErrors.push("El correo electrónico es obligatorio.");
    } else if (!emailRegex.test(normalizedEmail)) {
      nextErrors.push("El usuario debe ser un correo electrónico válido.");
    }

    if (!password.trim()) {
      nextErrors.push("La contraseña es obligatoria.");
    }

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleLogin = async () => {
    if (isSubmitting) return;

    const isValid = validateFields();
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await signInWithEmail(email.trim(), password);
      router.push("/admin");
    } catch (error) {
      sileo.error({
        title: "Error de autenticación",
        description: error?.message || "Credenciales incorrectas.",
        fill: "#FAB7FF",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
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
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.length) setErrors([]);
          }}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.length) setErrors([]);
          }}
        />
        {errors.length > 0 ? (
          <ul className={styles.errorList}>
            {errors.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : null}
        <PrimaryButton
          type="button"
          disabled={isSubmitting}
          onClick={handleLogin}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </PrimaryButton>
      </section>
    </div>
  );
}

