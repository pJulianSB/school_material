"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Input } from "app/components/ui/Input";
import { TextArea } from "app/components/ui/TextArea";
import { Checkbox } from "app/components/ui/Checkbox";
import { createEmailService } from "app/services/contactService";
import styles from "./contact.module.css";

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [message, setMessage] = useState("");
  const [allowWhatsappContact, setAllowWhatsappContact] = useState(false);
  const [allowPrivacyPolicy, setAllowPrivacyPolicy] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const nextErrors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) nextErrors.push("El nombre es obligatorio.");
    if (!lastname.trim()) nextErrors.push("El apellido es obligatorio.");
    if (!email.trim()) {
      nextErrors.push("El correo electrónico es obligatorio.");
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.push("El correo electrónico no es válido.");
    }
    if (!cellphone.trim()) nextErrors.push("El celular es obligatorio.");
    if (!message.trim()) nextErrors.push("El mensaje es obligatorio.");
    if (!allowWhatsappContact) nextErrors.push("Debes autorizar el contacto por WhatsApp.");
    if (!allowPrivacyPolicy) nextErrors.push("Debes autorizar políticas de uso y privacidad.");

    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const resetForm = () => {
    setName("");
    setLastname("");
    setEmail("");
    setCellphone("");
    setMessage("");
    setAllowWhatsappContact(false);
    setAllowPrivacyPolicy(false);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSuccess(false);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await createEmailService({
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        cellphone: cellphone.trim(),
        message: message.trim(),
        allowWhatsappContact,
        allowPrivacyPolicy,
      });
      resetForm();
      setErrors([]);
      setIsSuccess(true);
    } catch (error) {
      setErrors([error?.message || "No fue posible enviar la solicitud de contacto."]);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setErrors([]);
    setIsSuccess(false);
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2 className={styles.title}>
          ¿Tienes un proyecto en el cual desees trabajar con nosotros?, vamos a dialogar y encontrar el mejor camino para tu idea
        </h2>
        <section className={styles.formGrid}>
          <div className={styles.column}>
            <label htmlFor="contact-name" className={styles.field}>
              <span>Nombre</span>
              <Input
                id="contact-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="contact-email" className={styles.field}>
              <span>Correo electrónico</span>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.column}>
            <label htmlFor="contact-lastname" className={styles.field}>
              <span>Apellido</span>
              <Input
                id="contact-lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
            <label htmlFor="contact-cellphone" className={styles.field}>
              <span>Celular</span>
              <Input
                id="contact-cellphone"
                name="cellphone"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
            </label>
          </div>
        </section>
        <label htmlFor="contact-message" className={styles.field}>
          <span>Mensaje</span>
          <TextArea
            id="contact-message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className={styles.checkboxes}>
          <Checkbox
            id="allow-whatsapp"
            name="allowWhatsappContact"
            checked={allowWhatsappContact}
            onChange={(e) => setAllowWhatsappContact(e.target.checked)}
            label="Autorizo el contacto por WhatsApp."
          />
          <Checkbox
            id="allow-privacy"
            name="allowPrivacyPolicy"
            checked={allowPrivacyPolicy}
            onChange={(e) => setAllowPrivacyPolicy(e.target.checked)}
            label="Autorizo las políticas de uso y privacidad de datos."
          />
        </div>
        {errors.length > 0 ? (
          <ul className={styles.errorList}>
            {errors.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : null}
        {isSuccess ? (
          <p className={styles.successMessage}>
            Tu solicitud fue registrada correctamente. Pronto nos pondremos en contacto.
          </p>
        ) : null}
        <div className={styles.actions}>
          <PrimaryButton
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </PrimaryButton>
          <TertiaryButton type="button" onClick={handleCancel}>
            Cancelar
          </TertiaryButton>
        </div>
      </section>
    </div>
  );
}

