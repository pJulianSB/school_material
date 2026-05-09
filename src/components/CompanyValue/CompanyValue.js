import styles from "./CompanyValue.module.css";

const ICON_IMAGE = "/home/icon.png";

export function CompanyValue() {
  return (
    <section className={styles.container}>
      <div className={styles.backgroundLayer} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>Nuestra Propuesta de Valor</h2>
        <div className={styles.columns}>
          <div className={styles.textColumn}>
            <p>
              Nuestra empresa ofrece a las instituciones educativas una asesoría pedagógica integral, estratégica y contextualizada, 
              orientada a fortalecer la calidad de sus procesos formativos mediante el diseño, ajuste e implementación de herramientas curriculares, 
              evaluativas e institucionales. Acompañamos a directivos y docentes en la cualificación del PEI, las mallas curriculares, 
              los planes de área, los planes de aula, los instrumentos de evaluación y las prácticas pedagógicas, promoviendo la coherencia entre el horizonte institucional, 
              los referentes de calidad, el enfoque por competencias y las necesidades reales del contexto escolar, bajo los requerimientos del Ministerio de Educación Nacional.
            </p>
            <p>
              Generamos valor porque no ofrecemos soluciones aisladas, sino procesos de acompañamiento que permiten a las instituciones revisar, organizar, fortalecer y 
              transformar su gestión pedagógica, favoreciendo prácticas de aula más pertinentes, evaluaciones más formativas y aprendizajes más significativos. 
              De esta manera, contribuimos al mejoramiento continuo, al desarrollo profesional docente y a la formación integral de estudiantes capaces de responder a los retos académicos, sociales y humanos de su entorno.
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
