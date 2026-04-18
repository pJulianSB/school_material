"use client";

import { Image } from "app/components/ui/Image";
import styles from "./Footer.module.css";
import { SecondaryButton } from "../ui/SecondaryButton";
import { useRouter } from "next/navigation";

const PROFILE_IMAGE = "/app/profile.jpeg";
const WHATSAPP_ICON = "/whatsapp.svg";
const LINKEDIN_ICON = "/linkedin.svg";
const WHATSAPP_URL = "https://wa.me/";
const LINKEDIN_URL = "https://www.linkedin.com/in/";

export function Footer() {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <section className={styles.mainSection}>
        <div className={styles.columnCard}>
          <div className={styles.columnImage}>
            <Image
              src={PROFILE_IMAGE}
              alt="Pablo Julian Salamanca"
              width={65}
              height={65}
              rounded={50}
            />
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aurelio Lopez Medina</h2>
            <p className={styles.cardSubtitle}>
              <a href="mailto:aulomepedagogia@gmail.com">aulomepedagogia@gmail.com</a>
            </p>
          </div>
        </div>
        <div className={styles.columnCard}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Visítanos en nuestras redes sociales</h2>
            <div className={styles.cardContent}>
              <div className={styles.socialLinks}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  >
                  <Image
                    src={WHATSAPP_ICON}
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    rounded={50}
                    />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  >
                  <Image
                    src={LINKEDIN_ICON}
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    rounded={50}
                    />
                </a>
              </div>
              <SecondaryButton
                type="button"
                disabled={false}
                onClick={() => router.push("/contact")}
              >
                Contactanos!
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.copyrightSection}>
        <p>Copyright 2026 - Bigpro SAS - All Rights Reserved </p>
      </section>
    </footer>
  );
}

Footer.displayName = "Footer";
