import { PrimaryButton } from "app/components/ui/PrimaryButton";
import styles from "./Banner.module.css";

function resolveBannerPath(image) {
  if (!image) return "/home/banner1.png";
  return image.startsWith("/") ? image : `/${image}`;
}

export function Banner({ image, title, description, buttonText }) {
  const bannerImage = resolveBannerPath(image);

  return (
    <section
      className={styles.banner}
      style={{ "--banner-image": `url("${bannerImage}")` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <PrimaryButton type="button">{buttonText}</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

Banner.displayName = "Banner";
