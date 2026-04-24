import styles from "./Tutorial.module.css";

const TUTORIAL_STEPS = [
  {
    number: 1,
    title: "Seleccionar paquetes",
    description: `Explora la lista de paquetes que tenemos para diferentes áreas y grados, 
     podrás seleccionar los paquetes que más te interesen y agregarlos al carrito de compras.`,
    image: "/home/stepA.png",
  },
  {
    number: 2,
    title: "Realizar el pago",
    description: "Para realizar el pago, selecciona el método de pago que prefieras y sigue las instrucciones para completar la transacción.",
    image: "/home/stepB.png",
  },
  {
    number: 3,
    title: "Adjuntar comprobante",
    description: "Adjunta el comprobante de pago para validar la compra. En el transcurso de 24 horas, recibirás un correo electrónico con el material adquirido.",
    image: "/home/stepC.png",
  },
  {
    number: 4,
    title: "Revisar correo",
    description: "Recibirás un correo electrónico con el material, puedes revisarlo y si tienes alguna inquietud puedes comunicarte con nuestro equipo de soporte al correo soporte@appeeducativa.com.",
    image: "/home/stepD.png",
  },
];

export function Tutorial() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Paso a paso para adquirir nuestros paquetes de clase</h2>
      <div className={styles.cardsGrid}>
        {TUTORIAL_STEPS.map((step) => (
          <article key={step.number} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={step.image} alt={step.title} className={styles.image} />
              <h3 className={styles.cardTitle}>Paso {step.number}: {step.title}</h3>
            </div>

            <p className={styles.cardDescription}>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Tutorial.displayName = "Tutorial";
