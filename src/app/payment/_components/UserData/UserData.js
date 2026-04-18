"use client";

import { useMemo, useState } from "react";
import { Input } from "app/components/ui/Input";
import styles from "./UserData.module.css";

const INITIAL_DATA = {
  names: "",
  lastnames: "",
  cellphone: "",
  school: "",
  province: "",
  city: "",
  address: "",
  neighborhood: "",
  email: "",
  confirmEmail: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function UserData() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [touched, setTouched] = useState({
    email: false,
    confirmEmail: false,
  });

  const emailError = useMemo(() => {
    if (!touched.email && !formData.email) return "";
    if (!formData.email) return "El correo es obligatorio.";
    if (!EMAIL_REGEX.test(formData.email)) return "El formato del correo no es válido.";
    return "";
  }, [formData.email, touched.email]);

  const confirmEmailError = useMemo(() => {
    if (!touched.confirmEmail && !formData.confirmEmail) return "";
    if (!formData.confirmEmail) return "La confirmación de correo es obligatoria.";
    if (formData.confirmEmail !== formData.email) return "Los correos no coinciden.";
    return "";
  }, [formData.confirmEmail, formData.email, touched.confirmEmail]);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => () => {
    if (field === "email" || field === "confirmEmail") {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.description}>
        Diligencia la información del comprador para continuar con el proceso de compra.
      </p>

      <div className={styles.formGrid}>
        <label htmlFor="user-names" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Nombres
          </span>
          <Input
            id="user-names"
            name="names"
            value={formData.names}
            onChange={handleChange("names")}
            required
          />
        </label>

        <label htmlFor="user-lastnames" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Apellidos
          </span>
          <Input
            id="user-lastnames"
            name="lastnames"
            value={formData.lastnames}
            onChange={handleChange("lastnames")}
            required
          />
        </label>

        <label htmlFor="user-cellphone" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Celular
          </span>
          <Input
            id="user-cellphone"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleChange("cellphone")}
            required
          />
        </label>

        <label htmlFor="user-school" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Colegio
          </span>
          <Input
            id="user-school"
            name="school"
            value={formData.school}
            onChange={handleChange("school")}
            required
          />
        </label>

        <label htmlFor="user-province" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Departamento
          </span>
          <Input
            id="user-province"
            name="province"
            value={formData.province}
            onChange={handleChange("province")}
            required
          />
        </label>

        <label htmlFor="user-city" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Ciudad
          </span>
          <Input
            id="user-city"
            name="city"
            value={formData.city}
            onChange={handleChange("city")}
            required
          />
        </label>

        <label htmlFor="user-address" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Dirección
          </span>
          <Input
            id="user-address"
            name="address"
            value={formData.address}
            onChange={handleChange("address")}
            required
          />
        </label>

        <label htmlFor="user-neighborhood" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Barrio
          </span>
          <Input
            id="user-neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange("neighborhood")}
            required
          />
        </label>

        <label htmlFor="user-email" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Email
          </span>
          <Input
            id="user-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            required
          />
          {emailError ? <small className={styles.error}>{emailError}</small> : null}
        </label>

        <label htmlFor="user-confirm-email" className={styles.field}>
          <span>
            <span className={styles.required}>*</span>Confirmar Email
          </span>
          <Input
            id="user-confirm-email"
            name="confirmEmail"
            type="email"
            value={formData.confirmEmail}
            onChange={handleChange("confirmEmail")}
            onBlur={handleBlur("confirmEmail")}
            required
          />
          {confirmEmailError ? (
            <small className={styles.error}>{confirmEmailError}</small>
          ) : null}
        </label>
      </div>
    </section>
  );
}

UserData.displayName = "UserData";
