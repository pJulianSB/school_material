import styles from "./page.module.css";
import { Banner } from "app/components/Banner/Banner";
import { Tutorial } from "app/components/Tutorial/Tutorial";
import { Services } from "app/components/Services/Services";
import { CompanyValue } from "app/components/CompanyValue/CompanyValue";
import { PrimaryButton } from "app/components/ui/PrimaryButton";

const BANNER_IMAGE = "/home/banner4.png";
const BANNER_IMAGE2 = "/home/banner2.png";
const bannerTitle2 = "Materiales de clase que potencian tu enseñanza.";
const bannerDescription2 = "Encuentra recursos pedagógicos estructurados y adaptados a tus necesidades para desarrollar clases inolvidables y dinámicas.";
const bannerButtonText2 = "Ver catálogo de materiales";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section
          className={styles.banner}
          style={{ "--main-banner": `url("${BANNER_IMAGE}")` }}
        >
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h1 className={styles.title}>Simplifica la planeación de tu próximo periodo académico.</h1>
              <p className={styles.description}>Descubre contenidos pedagógicos diseñados para mejorar la experiencia de aula.</p>
              <PrimaryButton type="button">Explorar paquetes de clase</PrimaryButton>
            </div>
          </div>
        </section>
        <section className={styles.tutorial}>
          <Tutorial />
        </section>
        <CompanyValue />
        <Services />
        <section className={styles.slogan}>
          <h2 className={styles.sloganTitle}>Materiales estratégicos que potencian tu enseñanza y optimizan tu tiempo.</h2>
          <h2 className={styles.sloganTitle}>Somos tu aliado experto para cada periodo académico.</h2>
          <PrimaryButton type="button">Explora nuestros materiales</PrimaryButton>
        </section>
        <Banner
          image={BANNER_IMAGE2}
          title={bannerTitle2}
          description={bannerDescription2}
          buttonText={bannerButtonText2}
        />
      </main>
    </div>
  );
}
