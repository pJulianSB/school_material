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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              faucibus, justo vel bibendum convallis, purus lacus vestibulum
              augue, sit amet tincidunt sem lectus vitae nibh. Integer nec
              facilisis lectus. Cras sed libero sed lorem dapibus malesuada.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              efficitur eros id sapien porttitor, nec placerat felis ultrices.
              Nulla facilisi. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas.
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
