import { CreateIcon } from "app/components/icons/CreateIcon";
import { UsersIcon } from "app/components/icons/UsersIcon";
import { MaterialIcon } from "app/components/icons/MaterialIcon";
import { PackageIcon } from "app/components/icons/PackageIcon";
import styles from "./Services.module.css";

const SERVICES_DATA = [
  {
    id: "malla-curricular",
    title: "Instrumentos orientadores institucionales",
    description: "Diseño, construcción o cualificación de:",
    items: [
      "Proyecto Educativo Institucional – PEI",
      "Sistema Institucional de Evaluación de los Estudiantes – SIEE",
      "Mallas de aprendizaje",
      "Mallas curriculares",
      "Problemas sociales relevantes PSR",
      "Proyectos pedagógicos transversales",
      "Planes de área",
      "Planes de aula",
      "Instrumentos de evaluación y seguimiento pedagógico.",
    ],
    action: "Acompañamos la cualificación a corde a sus requerimientos institucionales",
    Icon: CreateIcon,
  },
  {
    id: "asesorias-pedagogicas",
    title: "Asesorías Pedagógicas",
    description: "La calidad educativa no se transforma solo con documentos; se transforma cuando los maestros fortalecen sus prácticas, resignifican su labor y convierten la formación pedagógica en una oportunidad de mejora continua.",
    items: [
      "Lectura pedagógica de las valoraciones externas con fundamento en las competencias específicas y genéricas.",
      "Incorporación de los nuevos lineamientos curriculares para la formación integral a la estructura curricular:",
      "Incorporación de los Lineamientos curriculares para la formación en ciudadanía y el desarrollo socioemocional  en educación inicial, básica y media.", 
      "Incorporación de los lineamientos curriculares de ciencias sociales para la educación inicial, básica y media.",
      "Elaboración de la malla curricular (articulación de la malla de aprendizaje con los PPT).",
      "Planeamiento por procesos y competencias educativas.",
      "Evaluación formativa –valoración del desarrollo cognitivo, personal y social",
      "Diseño y cualificación del plan de aula desde los requerimientos institucionales",
      "Cualificación de los grados de prejardín, jardín y transición desde la perspectiva del proceso de armonización exigido por el Ministerio de Educación Nacional.",
    ],
    action: "Los procesos de formación se desarrollan desde los requerimientos institucionales, si así se desea, para ello se solicitará sin ningún compromiso documentos institucionales para la revisión del estado del arte.",
    Icon: UsersIcon,
  },
  {
    id: "material-clase",
    title: "Material para clase",
    description: "Con fundamento en los requerimientos de:",
    items: [
      "Los referentes de calidad del Ministerio de Educción Nacional (Estándares básicos de competencia, Orientaciones pedagógicas),", 
      "Lineamientos Curriculares para la formación integral, en educación inicial, básica y media.",
      "Lineamientos Curriculares para la formación ciudadana y el desarrollo socioemocional en educación Inicial, básica y media.", 
      "Las ejes de desarrollo del pensamiento lógico matemático (desde una perspectiva especifica y genérica), pensamiento científico, pensamiento crítico y formación en ciudadanía y la transversalidad de la competencia comunicativa.",
    ],
    action: "Se diseñan materiales para el desarrollo de la práctica de aula, adaptables a su propuesta pedagógica institucional.",
    Icon: MaterialIcon,
  },
  {
    id: "textos-guias",
    title: "Acompañamiento y asesoría pedagógica personalizada.",
    description: "Asesoría pedagógica personalizada para docentes, orientada a resolver dudas sobre su práctica, atender inquietudes específicas, revisar y fortalecer materiales, y acompañar la proyección de su trabajo. Juntos diseñamos planeamientos pedagógicos ajustados a su contexto, promoviendo coherencia curricular, pertinencia y mejora continua.",
    action: "Se diseñan materiales para el desarrollo de la práctica de aula, adaptables a su propuesta pedagógica institucional.",
    Icon: PackageIcon,
  },
];

export function Services() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Nuestros Servicios</h2>

      <div className={styles.cardsContainer}>
        {SERVICES_DATA.map(({ id, title, description, items, action, Icon }) => (
          <article key={id} className={styles.card}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon className={styles.icon} />
            </span>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
            <ul className={styles.cardList}>
              {
                items && items.length > 0 && items.map((item) => (
                  <li key={item} className={styles.cardItem}>{item}</li>
                ))
              }
            </ul>
            { action && <p className={styles.cardAction}>{action}</p> }
          </article>
        ))}
      </div>
    </section>
  );
}

Services.displayName = "Services";
