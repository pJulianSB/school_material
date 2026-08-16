import styles from "./CompanyValue.module.css";

const ICON_IMAGE = "/home/icon.webp";

export function CompanyValue() {
  return (
    <section className={styles.container}>
      <div className={styles.backgroundLayer} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>Nuestra Propuesta de Valor</h2>
        <div className={styles.columns}>
          <div className={styles.textColumn}>
            <p>
            Transformamos la gestión pedagógica de las instituciones educativas mediante una asesoría integral, estratégica y contextualizada, orientada a fortalecer la calidad de sus procesos formativos.
            Acompañamos a directivos y docentes en la cualificación del PEI, mallas curriculares, planes de área, planes de aula, evaluación y prácticas pedagógicas, asegurando coherencia con el horizonte institucional, los referentes de calidad, el enfoque por competencias y los requerimientos del Ministerio de Educación Nacional.
            Más que soluciones aisladas, ofrecemos procesos de acompañamiento que impulsan el mejoramiento continuo, el desarrollo profesional docente y la formación integral de estudiantes capaces de responder a los retos académicos, sociales y humanos de su entorno.  
            </p>
            <p className={styles.textStrong}>
            Contáctenos y construyamos juntos una ruta pedagógica para fortalecer la calidad educativa de su institución.  
            </p>
          </div>
          <div className={styles.imageColumn}>
            <img src={ICON_IMAGE} alt="Propuesta de valor" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
}

CompanyValue.displayName = "CompanyValue";
